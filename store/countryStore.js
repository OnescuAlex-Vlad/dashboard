import axios from "axios";

export const state = () => ({
  countryItems: []
});

export const actions = {
  getCountries({ commit }) {
    axios.get("http://localhost:8080/countries").then(countryItems => {
      commit("GET_COUNTRIES", countryItems.data);
    });
  },

  postCountry({ commit }, country) {
    const fd = new FormData();
    fd.append("title", country.title);
    fd.append("roCountryName", country.roCountryName);
    fd.append("ruCountryName", country.ruCountryName);
    fd.append("enCountryName", country.enCountryName);
    axios.post("http://localhost:8080/countries/", fd).then(() => {
      commit("ADD_COUNTRY", country);
    });
  },

  removeCountry({ commit }, id) {
    axios.delete("http://localhost:8080/countries/" + id).then(() => {
      commit("DELETE_COUNTRY", id);
    });
  },

  editCountry({ commit }, country) {
    axios
      .put("http://localhost:8080/countries/" + country.id, country)
      .then(() => {
        commit("EDIT_COUNTRY", country);
      });
  }
};

export const mutations = {
  GET_COUNTRIES(state, newCountries) {
    state.countryItems = newCountries;
  },

  DELETE_COUNTRY(state, id) {
    let index = state.countryItems.findIndex(c => c.id == id);
    state.countryItems.splice(index, 1);
  },

  ADD_COUNTRY(state, countryObject) {
    countryObject.index = state.countryItems.length + 1;
    state.countryItems.push(countryObject);
  },

  EDIT_COUNTRY(state, editedCountry) {
    let index = state.countryItems.findIndex(c => c.id == editedCountry.id);
    state.countryItems.splice(index, 1, editedCountry);
  }
};
