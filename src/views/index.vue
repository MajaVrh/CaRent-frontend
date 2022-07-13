<template>
  <v-container style="margin-top: -4.4rem" fill-height>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-container
          class="text-h1 white--text"
          style="font-family: 'Jockey One', sans-serif !important"
        >
          Ca<span class="orange--text lighten-1">R</span>ent
        </v-container>
        <v-btn
          height="45"
          width="200"
          class="white--text mt-4 px-15 text-capitalize text-h6"
          style="
            font-family: 'Jockey One', sans-serif !important;
            background-color: white;
          "
          outlined
          color="orange"
          :to="{ name: 'Home' }"
          >Home page</v-btn
        ><br />
        <v-btn
          height="45"
          class="white--text mt-4 px-15 text-capitalize text-h6"
          style="font-family: 'Jockey One', sans-serif !important"
          width="200"
          color="orange"
          :to="{ name: 'register' }"
          >Register</v-btn
        ><br />
        <v-btn
          height="45"
          class="white--text mt-4 px-15 text-capitalize text-h6"
          style="font-family: 'Jockey One', sans-serif !important"
          width="200"
          color="orange"
          :to="{ name: 'login' }"
          >Login</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "login",
  components: {},
  mounted() {
    const appBody = document.querySelector("#colorChange");
    if (window.location.pathname == "/index") {
      appBody.classList.add("backCol");
    }
  },
  beforeDestroy() {
    const appBody = document.querySelector("#colorChange");
    if (window.location.pathname != "/index") {
      appBody.classList.remove("backCol");
    }
  },
};
</script>

<style>
.v-btn::before {
  background-color: transparent;
}
</style>
