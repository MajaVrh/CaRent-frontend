<template>
  <v-container style="margin-top: -4.4rem" fill-height>
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
              <v-card-text
                class="text-h6 mt-2 mb-2"
                style="padding: 0 !important"
              >
                Enter the requiered inforamtion
              </v-card-text>
              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                color="orange"
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                name="password"
                label="Password"
                color="orange"
              ></v-text-field>
              <v-card-actions class="justify-center mt-5">
                <v-btn
                  color="orange"
                  class="white--text"
                  width="250"
                  height="40"
                  @click="login"
                  >Login</v-btn
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
import axios from "axios";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    const appBody = document.querySelector("#colorChange");
    if (window.location.pathname == "/login") {
      appBody.classList.add("backCol");
    }
  },

  methods: {
    ...mapMutations({ setAuthToken: "setAuthToken" }),
    ...mapActions({ loadUser: "loadUser" }),
    async login() {
      try {
        const res = await axios.post("http://localhost:8000/login", {
          password: this.password,
          email: this.email,
        });
        let token = res.data;
        this.setAuthToken(token.token);
        localStorage.setItem("token", token.token);
        console.log(res.data);
        this.$router.push("/");
        this.loadUser();
      } catch (e) {
        console.log(e);
      }
    },
  },

  beforeDestroy() {
    const appBody = document.querySelector("#colorChange");
    if (window.location.pathname != "/login") {
      appBody.classList.remove("backCol");
    }
  },
};
</script>

<style></style>
