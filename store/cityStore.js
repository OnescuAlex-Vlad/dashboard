import axios from "axios";

export const state = () => ({
  cityItems: []
});

export const actions = {
  getCities({ commit }) {
    axios.get("http://localhost:8080/cities").then(cityItems => {
      commit("GET_CITY", cityItems.data);
    });
  },

  postCity({ commit }, city) {
    const fd = new FormData();
    fd.append("title", city.title);
    fd.append("roCityName", city.roCityName);
    fd.append("ruCityName", city.ruCityName);
    fd.append("enCityName", city.enCityName);
    axios.post("http://localhost:8080/cities/", fd).then(() => {
      commit("ADD_CITY", city);
    });
  },

  removeCity({ commit }, id) {
    axios.delete("http://localhost:8080/cities/" + id).then(() => {
      commit("DELETE_CITY", id);
    });
  },

  editCity({ commit }, city) {
    axios.put("http://localhost:8080/cities/" + city.id, city).then(() => {
      commit("EDIT_CITY", city);
    });
  }
};

export const mutations = {
  GET_CITY(state, newCities) {
    state.cityItems = newCities;
  },

  DELETE_CITY(state, id) {
    let index = state.cityItems.findIndex(c => c.id == id);
    state.cityItems.splice(index, 1);
  },

  ADD_CATEGORY(state, cityObject) {
    cityObject.index = state.cityItems.length + 1;
    state.cityItems.push(cityObject);
  },

  EDIT_CATEGORY(state, editedCity) {
    let index = state.cityItems.findIndex(c => c.id == editedCity.id);
    state.cityItems.splice(index, 1, editedCity);
  }
};
