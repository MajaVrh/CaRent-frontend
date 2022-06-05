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
          </v-card-title>
          <v-container class="text-left pl-15 pr-15">
            <v-card-text
              class="text-h6 mt-2 mb-2"
              style="padding: 0 !important"
            >
              Enter the requiered inforamtion
            </v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="name"
                :rules="[rules.required]"
                label="Name"
                color="orange"
              ></v-text-field>
              <v-text-field
                v-model="surname"
                :rules="[rules.required]"
                label="Surname"
                color="orange"
              ></v-text-field>
              <v-text-field
                type="email"
                v-model="email"
                label="Email"
                :rules="[rules.required, rules.emailRules]"
                color="orange"
              ></v-text-field>
              <v-text-field
                type="password"
                v-model="password"
                label="Password"
                color="orange"
                :rules="[rules.required, rules.min]"
              ></v-text-field>
              <v-text-field
                type="password"
                :rules="[rules.required, rules.matchPassword]"
                v-model="passwordConfirm"
                label="Confirm password"
                color="orange"
              ></v-text-field>
              <v-slider
                color="orange"
                label="Age"
                hint="Be honest"
                min="1"
                max="100"
                thumb-label
                track-color="gray"
                v-model="age"
                :rules="[rules.age, rules.required]"
              ></v-slider>
              <v-alert v-if="error" color="red" type="warning">{{
                error
              }}</v-alert>
              <v-card-actions class="justify-center mt-5">
                <v-btn
                  type="submit"
                  color="orange"
                  class="white--text"
                  width="250"
                  height="40"
                  >Register</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      age: 18,
      password: "",
      passwordConfirm: "",
      error: "",
      rules: {
        age: (val) => val >= 18 || `You are to young `,
        required: (value) => !!value || "Required",
        min: (value) => value.length > 5 || "Min 6 charcters",
        matchPassword: () =>
          this.passwordConfirm == this.password || "Passwords must match",
        emailRules: (v) => /.+@.+/.test(v) || "E-mail must be valid",
      },
    };
  },
  mounted() {
    const appBody = document.querySelector("#colorChange");
    if (window.location.pathname == "/register") {
      appBody.classList.add("backCol");
    }
  },
  methods: {
    async register() {
      try {
        const res = await axios.post("http://localhost:8000/register", {
          name: this.name,
          surname: this.surname,
          password: this.password,
          email: this.email,
          age: this.age,
        });
        this.$router.push("/");
        console.log(res.data);
      } catch (error) {
        console.log(error.response.data);
        this.error = error.response.data.msg;
      }
    },
  },

  beforeDestroy() {
    const appBody = document.querySelector("#colorChange");
    if (window.location.pathname != "/register") {
      appBody.classList.remove("backCol");
    }
  },
};
</script>

<style></style>
