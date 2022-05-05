<template>
  <v-container fill-height color="red">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-container
          class="text-h1 white--text"
          style="font-family: 'Jockey One', sans-serif !important"
        >
          Ca<span class="orange--text lighten-1">R</span>ent
        </v-container>
        <v-btn width="200" :to="{name: 'Home'}">Home page</v-btn><br>
        <v-btn width="200">Register</v-btn><br>
        <v-btn width="200">Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "login",
  components: {},
  mounted() {
    const appBody = document.querySelector("#colorChange")
      if (window.location.pathname == "/login" ) {
        appBody.classList.add("login")
      }
  },
  beforeDestroy() {
    const appBody = document.querySelector("#kikiriki")
      if (window.location.pathname != "/login" ) {
        appBody.classList.remove("login")
      }
  }
};
</script>

<style>
</style>