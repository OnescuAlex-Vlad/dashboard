<template>
  <v-container>
    <h1>Login</h1>

    <auth-form buttonText="Login" :submitForm="loginUser" />
  </v-container>
</template>

<script>
import AuthForm from "../../components/Auth/AuthFormComponent.vue";

export default {
  components: {
    AuthForm
  },
  methods: {
    loginUser(loginInfo) {
      this.$auth.loginWith("local", {
        data: loginInfo
      });
      alert("Button");
    }
  }
};
</script>