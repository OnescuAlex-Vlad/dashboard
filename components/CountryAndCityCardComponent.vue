<template>
  <div>
    <v-container fluid class="pa-6">
      <div class="d-inline-block pa-3" v-for="item in cardItems" :key="item.id">
        <v-img aspect-ratio="1" height="200" width="200" :src="item.imageName"></v-img>

        <v-card class="pa-2 d-flex flex-row">
          <p class="font-weight-bold text--primary my-2">{{ item.title }}</p>
          <v-spacer></v-spacer>
          <v-btn icon @click="editItem(item)">
            <v-icon color="black">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteItem(item)">
            <v-icon color="black">mdi-delete</v-icon>
          </v-btn>
        </v-card>
      </div>
    </v-container>
    <template>
      <v-btn
        class="button"
        fab
        dark
        large
        color="indigo darken-2"
        fixed
        right
        bottom
        @click="dialog = !dialog"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <v-card-title class="justify-center grey lighten-2">{{ dialogProps.title }}</v-card-title>
        <v-card-text class="pa-3">
          <v-container class="pa-4">
            <v-row>
              <v-col>
                <v-file-input
                  :label="`${dialogProps.imagePlaceholderName}`"
                  @change="onFileSelected"
                ></v-file-input>

                <v-text-field counter="50" :label="dialogProps.roPlaceholderName" class="pt-1 mt-3"></v-text-field>

                <v-text-field counter="50" :label="dialogProps.ruPlaceholderName" class="pt-1 mt-3"></v-text-field>

                <v-text-field counter="50" :label="dialogProps.enPlaceholderName" class="pt-1 mt-3"></v-text-field>
              </v-col>
              <v-col v-if="cardItems">
                <v-img :src="editedItem.image"></v-img>
              </v-col>
              <v-col v-else>
                <v-img :src="selectedImage"></v-img>
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
export default {
  props: ["dialogProps", "cardItems"],

  data() {
    return {
      dialog: false,
      selectedImage: "",
      editedItem: ""
    };
  },

  methods: {
    onFileSelected(imageEvent) {
      let image = imageEvent;
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = imageEvent => {
        this.selectedImage = imageEvent.target.result;
      };
    },

    editItem(item) {
      this.editedIndex = this.cardItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.cardItems.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.cardItems.splice(index, 1);
    }
  }
};
</script>