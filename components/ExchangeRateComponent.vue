<template>
  <v-container fluid class="pa-6">
    <v-row no-gutters>
      <v-flex md6>
        <div class="pa-3">
          <v-card class="pt-6 px-4 pb-4">
            <v-list-item-title class="headline mb-1">17</v-list-item-title>
            <v-list-item-subtitle>EURO</v-list-item-subtitle>
          </v-card>
        </div>
      </v-flex>
      <v-flex md6>
        <div class="pa-3">
          <v-card class="pt-6 px-4 pb-4">
            <v-list-item-title class="headline mb-1">18</v-list-item-title>
            <v-list-item-subtitle>USD</v-list-item-subtitle>
          </v-card>
        </div>
      </v-flex>
    </v-row>
    <v-flex md12>
      <div class="pa-3">
        <v-card class="pa-10">
          <v-sheet>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6" md="3">
                <v-text-field label="EUR"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field label="USD"></v-text-field>
              </v-col>
              <div class="pa-5">
                <v-flex md2>
                  <v-btn class="primary">SAVE</v-btn>
                </v-flex>
              </div>
            </v-row>
          </v-sheet>
        </v-card>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      EUR: 0,
      USD: 0
    };
  },
  mounted() {
    axios.get("https://api.exchangeratesapi.io/latest").then(EUR => EUR);
  }
};
</script>