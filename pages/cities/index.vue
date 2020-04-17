<template>
  <div>
    <city-card :dialogProps="dialogProps" :cardItems="cityState" />
  </div>
</template>

<script>
import CityCard from "../../components/CountryAndCityCardComponent.vue";

export default {
  components: {
    CityCard
  },

  data() {
    return {
      dialogProps: {
        title: "Add City | Edit City",
        imagePlaceholderName: "Main City Image",
        roPlaceholderName: "RO: Nume oras",
        ruPlaceholderName: "RU: название города",
        enPlaceholderName: "EN: City name"
      }
    };
  },

  // middleware: "auth",

  mounted() {
    this.$store.dispatch("cityStore/getCities");
  },

  computed: {
    cityState() {
      return this.$store.state.cityStore.cityItems;
    }
  },

  methods: {
    deleteCity(cityBodyObject) {
      this.$store.dispatch("cityStore/removeCity", cityBodyObject.id);
    }
  }
};
</script>