<template>
  <div>
    <offer-component />
  </div>
</template>

<script>
import OfferComponent from "../../components/OfferComponent.vue";

export default {
  components: {
    OfferComponent
  },

  // middleware: "auth",

  mounted() {
    this.$store.dispatch("offerStore/getOffers");
  },

  computed: {
    cityState() {
      return this.$store.state.offerStore.offerItems;
    }
  },

  methods: {
    deleteOffer(offerBodyobject) {
      this.$store.dispatch("offerStore/removeOffer", offerBodyobject.id);
    }
  }
};
</script>