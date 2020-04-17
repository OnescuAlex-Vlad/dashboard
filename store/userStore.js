import axios from "axios";

export const state = () => ({
  userItems: []
});

export const actions = {
  getUsers({ commit }) {
    axios.get("http://localhost:8080/users").then(userItems => {
      commit("GET_USERS", userItems.data);
    });
  },

  postUser({ commit }, user) {
    axios.post("http://localhost:8080/users/", user).then(() => {
      commit("ADD_USER", user);
    });
  },

  removeUser({ commit }, id) {
    axios.delete("http://localhost:8080/users/" + id).then(() => {
      commit("DELETE_USER", id);
    });
  },

  editUser({ commit }, user) {
    axios.put("http://localhost:8080/users/" + user.id, user).then(() => {
      commit("EDIT_USER", user);
    });
  }
};

export const mutations = {
  GET_USERS(state, newUsers) {
    state.userItems = newUsers;
  },

  DELETE_USER(state, id) {
    let index = state.userItems.findIndex(u => u.id == id);
    state.userItems.splice(index, 1);
  },

  ADD_USER(state, userObject) {
    userObject.index = state.userItems.length + 1;
    state.userItems.push(userObject);
  },

  EDIT_USER(state, editUser) {
    let index = state.userItems.findIndex(u => u.id == editUser.id);
    state.userItems.splice(index, 1, editUser);
  }
};
