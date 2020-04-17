import axios from "axios";

export const state = () => ({
  categoryItems: []
});

export const actions = {
  getCategories({ commit }) {
    axios.get("http://localhost:8080/categories").then(categoryItems => {
      commit("GET_CATEGORY", categoryItems.data);
    });
  },

  postCategory({ commit }, category) {
    axios.post("http://localhost:8080/categories/", category).then(() => {
      commit("ADD_CATEGORY", category);
    });
  },

  removeCategory({ commit }, id) {
    axios.delete("http://localhost:8080/categories/" + id).then(() => {
      commit("DELETE_CATEGORY", id);
    });
  },

  editCategory({ commit }, category) {
    axios
      .put("http://localhost:8080/categories/" + category.id, category)
      .then(() => {
        commit("EDIT_CATEGORY", category);
      });
  }
};

export const mutations = {
  GET_CATEGORY(state, newCategories) {
    state.categoryItems = newCategories;
  },

  DELETE_CATEGORY(state, id) {
    let index = state.categoryItems.findIndex(c => c.id == id);
    state.categoryItems.splice(index, 1);
  },

  ADD_CATEGORY(state, categoryObject) {
    categoryObject.index = state.categoryItems.length + 1;
    state.categoryItems.push(categoryObject);
  },

  EDIT_CATEGORY(state, editedCategory) {
    let index = state.categoryItems.findIndex(c => c.id == editedCategory.id);
    state.categoryItems.splice(index, 1, editedCategory);
  }
};
