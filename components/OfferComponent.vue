<template>
  <div>
    <v-row>
      <v-col>
        <v-autocomplete placeholder="Search offers" prepend-icon="mdi-magnify"></v-autocomplete>
      </v-col>
      <v-col>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Depart"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu1 = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Return"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
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
    <v-dialog v-model="dialog" width="1000px">
      <v-card>
        <v-card-title class="justify-center grey lighten-2">Add Offer | Edit Offer</v-card-title>
        <v-card-text>
          <v-container>
            <v-tabs background-color="grey" dark centered v-model="tab">
              <v-tabs-slider></v-tabs-slider>
              <v-tab>Romanian</v-tab>
              <v-tab>Russian</v-tab>
              <v-tab>English</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-row>
                  <v-col>
                    <v-text-field label="SEO: Page Title" counter="50"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field label="SEO: Page Slug" counter="50"></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field label="SEO: Page description" counter="150"></v-text-field>
                <v-row>
                  <v-col>
                    <v-text-field label="Offer name" counter="50"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field label="Price"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field label="Supply"></v-text-field>
                  </v-col>
                </v-row>

                <vue-editor v-model="content"></vue-editor>

                <v-row>
                  <v-col>
                    <v-menu
                      v-model="menu3"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Depart"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" @input="menu3 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-menu
                      v-model="menu4"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Return"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" @input="menu4 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-text-field label="Hotel address"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select :items="categories" label="Categories"></v-select>
                  </v-col>
                  <v-col>
                    <v-select :items="countries" label="Countries"></v-select>
                  </v-col>
                  <v-col>
                    <v-select :items="cities" label="Cities"></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field label="Nights" type="Number" clearable></v-text-field>
                  </v-col>
                  <v-col>
                    <v-file-input @change="onFileSelected" label="Main image"></v-file-input>
                  </v-col>
                  <v-col>
                    <v-file-input label="Other Images"></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-checkbox label="Show on site" color="green"></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-checkbox label="Special offer" color="green"></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-checkbox label="Show on main page" color="green"></v-checkbox>
                  </v-col>
                </v-row>
                <v-card max-width="200" v-if="selectedImages">
                  <v-img
                    class="white--text bold align-end"
                    width="200"
                    height="200"
                    :src="selectedImages"
                  >
                    <v-card-title>Main Image</v-card-title>
                  </v-img>
                  <v-btn fab top right small absolute dark @click="selectedImages = null">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col>
                    <v-text-field label="SEO: Page Title" counter="50"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field label="SEO: Page Slug" counter="50"></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field label="SEO: Page description" counter="150"></v-text-field>
                <v-text-field label="Offer name" counter="50"></v-text-field>

                <vue-editor v-model="content"></vue-editor>
              </v-tab-item>
              <v-tab-item>
                <v-row>
                  <v-col>
                    <v-text-field label="SEO: Page Title" counter="50"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field label="SEO: Page Slug" counter="50"></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field label="SEO: Page description" counter="150"></v-text-field>
                <v-text-field label="Offer name" counter="50"></v-text-field>

                <vue-editor v-model="content"></vue-editor>
              </v-tab-item>
            </v-tabs-items>
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

    <v-container fluid class="pa-6">
      <div class="d-inline-block">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          ></v-img>
          <v-card-title>Title</v-card-title>

          <v-card-text>Description</v-card-text>
          <v-card-actions class="justify-space-between">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn text v-on="on">
                  <v-icon color="primary">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn text v-on="on">
                  <v-icon color="primary">mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn text v-on="on">
                  <v-icon color="primary">mdi-link</v-icon>
                </v-btn>
              </template>
              <span>View</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>

    <v-footer absolute>
      <v-col class="text-center" cols="12">
        <v-pagination v-model="page" :length="6"></v-pagination>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      page: 1,
      dialog: false,
      tab: null,
      content: "Offer Description",
      categories: [
        "Avia",
        "Hotele",
        "Auto",
        "Activitati",
        "Tururi",
        "Croaziere",
        "Asigurare",
        "Credite",
        "Alte Servicii"
      ],
      countries: ["Italy", "Maldive", "Turkey", "Greece"],
      cities: ["Rome", "Male", "Ankara", "Athens"],
      selectedImages: ""
    };
  },

  methods: {
    onFileSelected(imageEvent) {
      let image = imageEvent;
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = imageEvent => {
        this.selectedImages = imageEvent.target.result;
      };
    }
  }
};
</script>