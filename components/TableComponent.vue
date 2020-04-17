<template>
  <div class="pa-3">
    <v-data-table :headers="tableProps.headers" :items="tableData" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="indigo darken-2">
          <v-toolbar-title class="white--text">{{ tableTitle }}</v-toolbar-title>
          <v-divider class="mx-4" color="white" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["tableProps", "tableTitle"],
  data: () => ({
    editedIndex: -1,
    tableData: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.tableData = this.tableProps.data;
    },

    editItem(item) {
      this.$emit("editDialog", item);
    },

    deleteItem(item) {
      const index = this.tableData.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tableData.splice(index, 1);
    }
  }
};
</script>