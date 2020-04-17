import axios from "axios";

export const state = () => ({
  offerItems: []
});

export const actions = {
  getOffers({ commit }) {
    axios.get("http://localhost:8080/offers").then(offerItems => {
      commit("GET_OFFER", offerItems.data);
    });
  },

  postOffer({ commit }, offer) {
    const fd = new FormData();
    fd.append("title", offer.title);
    fd.append("description", offer.description);
    axios.post("http://localhost:8080/offers/", fd).then(() => {
      commit("ADD_OFFER", offer);
    });
  },

  removeOffer({ commit }, id) {
    axios.delete("http://localhost:8080/offers/" + id).then(() => {
      commit("DELETE_OFFER", id);
    });
  },

  editOffer({ commit }, offer) {
    axios.put("http://localhost:8080/offers/" + offer.id, offer).then(() => {
      commit("EDIT_OFFER", offer);
    });
  }
};

export const mutations = {
  GET_OFFER(state, newOffers) {
    state.offerItems = newOffers;
  },

  DELETE_OFFER(state, id) {
    let index = state.offerItems.findIndex(o => o.id == id);
    state.offerItems.splice(index, 1);
  },

  ADD_OFFER(state, offerObject) {
    offerObject.index = state.offerItems.length + 1;
    state.offerItems.push(offerObject);
  },

  EDIT_OFFER(state, editedOffer) {
    let index = state.offerItems.findIndex(o => o.id == editedOffer.id);
    state.offerItems.splice(index, 1, editedOffer);
  }
};
