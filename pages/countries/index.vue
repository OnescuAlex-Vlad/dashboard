<template>
  <div>
    <country-card :dialogProps="dialogProps" :cardItems="countryState" />
  </div>
</template>

<script>
import CountryCard from "../../components/CountryAndCityCardComponent.vue";

export default {
  components: {
    CountryCard
  },

  data() {
    return {
      dialogProps: {
        title: "Add Country | Edit Country",
        imagePlaceholderName: "Main Country Image",
        roPlaceholderName: "RO: Nume tara",
        ruPlaceholderName: "RU: название страны",
        enPlaceholderName: "EN: Country name"
      }
    };
  },

  // middleware: "auth",

  mounted() {
    this.$store.dispatch("countryStore/getCountries");
  },

  computed: {
    countryState() {
      return this.$store.state.countryStore.countryItems;
    }
  },

  methods: {
    deleteCountry(countryBodyObject) {
      this.$store.dispatch("countryStore/removeCountry", countryBodyObject.id);
    }
  }
};
</script>