<template>
  <div>
    <table-component
      :tableProps="tableProps"
      :tableTitle="tableTitle"
      @editDialog="sendEmit($event)"
    />

    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn class="button" fab dark large color="indigo darken-2" fixed right bottom v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="justify-center grey lighten-2">{{ formTitle }}</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.number" label="Number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.romanian_tour" label="Romanian"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.russian_tour" label="Russian"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.english_tour" label="English"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text depressed @click="dialog = false">Cancel</v-btn>
          <v-btn rounded color="indigo darken-2" @click="dialog = false" dark>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TableComponent from "../../components/TableComponent.vue";

export default {
  components: {
    TableComponent
  },

  data() {
    return {
      dialog: false,
      tableTitle: "Categories",
      editedIndex: -1,
      editedItem: {
        number: "",
        romanian_tour: "",
        russian_tour: "",
        english_tour: ""
      },
      defaultItem: {
        number: 0,
        romanian_tour: "",
        russian_tour: "",
        english_tour: ""
      }
    };
  },

  // middleware: "auth",

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  mounted() {
    this.$store.dispatch("categoryStore/getCategories");
  },

  computed: {
    categoryState() {
      return this.$store.state.cityStore.cityItems;
    },

    tableHeaders() {
      return [
        {
          text: "Nr#",
          align: "left",
          sortable: false,
          value: "number"
        },
        { text: "RO: Slug", value: "romanian_tour" },
        { text: "RU: Slug", value: "russian_tour" },
        { text: "EN: Slug", value: "english_tour" },
        { text: "Actions", value: "action", sortable: false }
      ];
    },

    tableProps() {
      return {
        headers: this.tableHeaders,
        data: this.categoryState
      };
    },

    formTitle() {
      return this.editedIndex === -1 ? "New Category" : "Edit Category";
    }
  },

  methods: {
    sendEmit(item) {
      this.editedIndex = this.categoryState.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteCategory(categoryBodyObject) {
      this.$store.dispatch(
        "categoryStore/removeCategory",
        categoryBodyObject.id
      );
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tableData[this.editedIndex], this.editedItem);
      } else {
        this.tableData.push(this.editedItem);
      }
      this.close();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>