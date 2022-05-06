<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card width="500" class="py-5 px-5">
          <v-card-title
            class="text-h1 justify-center"
            style="
              font-family: 'Jockey One', sans-serif !important;
              color: #153040;
            "
          >
            Ca<span class="orange--text lighten-1">R</span>ent
            <v-container class="text-left pl-15 pr-15">
              <v-card-text class="text-h6 mt-2 mb-2" style="padding: 0 !important">
                Enter the requiered inforamtion
              </v-card-text>
              <v-text-field label="Name" color="orange"></v-text-field>
              <v-text-field label="Surname" color="orange"></v-text-field>
              <v-text-field label="Email" color="orange"></v-text-field>
              <v-text-field label="Password" color="orange"></v-text-field>
              <v-text-field
                label="Confirm password"
                color="orange"
              ></v-text-field>
              <v-card-actions class="justify-center mt-5">
                <v-btn
                  color="orange"
                  class="white--text"
                  width="250"
                  height="40"
                  >Register</v-btn
                >
              </v-card-actions>
            </v-container>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "register",
  mounted() {
    const appBody = document.querySelector("#colorChange");
    if (window.location.pathname == "/register") {
      appBody.classList.add("backCol");
    }
  },

  beforeDestroy() {
    const appBody = document.querySelector("#colorChange");
    if (window.location.pathname != "/register") {
      appBody.classList.remove("backCol");
    }
  },
};
</script>

<style>
</style>