<template>
  <v-container>
    <h1>Register</h1>

    <auth-form buttonText="Register" :submitForm="registerUser" hasName="true" />
  </v-container>
</template>

<script>
import AuthForm from "../../components/Auth/AuthFormComponent.vue";

export default {
  components: {
    AuthForm
  },
  methods: {
    async registerUser(registrationInfo) {
      await this.$axios.post("/signup", registrationInfo);
      this.$auth.loginWith("local", {
        data: registrationInfo
      });
    }
  }
};
</script>