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
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.number" label="Number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="permisions" label="Permisions"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
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
      tableTitle: "Users",
      editedIndex: -1,
      editedItem: {
        number: "",
        firstName: "",
        lastName: "",
        permisions: "",
        phone: "",
        email: ""
      },
      defaultItem: {
        number: "",
        firstName: "",
        lastName: "",
        permisions: "",
        phone: "",
        email: ""
      },
      permisions: ["Administrator", "Operator"]
    };
  },

  // middleware: "auth",

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  mounted() {
    this.$store.dispatch("userStore/getUsers");
  },

  computed: {
    userState() {
      return this.$store.state.userStore.userItems;
    },

    tableHeaders() {
      return [
        {
          text: "Nr",
          align: "left",
          sortable: false,
          value: "number"
        },
        { text: "First name", value: "firstName" },
        { text: "last name", value: "lastName" },
        { text: "Permisions", value: "permisions" },
        { text: "Phone", value: "phone" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "action", sortable: false }
      ];
    },

    tableProps() {
      return {
        headers: this.tableHeaders,
        data: this.userData
      };
    },

    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    }
  },

  methods: {
    sendEmit(item) {
      this.editedIndex = this.userData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteUser(userBodyObject) {
      this.$store.dispatch("userStore/removeUser", userBodyObject.id);
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