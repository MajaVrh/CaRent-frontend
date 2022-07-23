<template>
  <v-container class="animacija" style="margin-top: -2.4rem" fill-height>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card width="500" class="py-5 animacija">
          <v-card-title
            class="justify-center titleCarent"
            style="
              font-family: 'Jockey One', sans-serif !important;
              color: #153040;
              font-size: 5.5rem;
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
                  class="text-h6 text-capitalize white--text d-flex pr-8 pl-8"
                  style="font-family: 'Jockey One', sans-serif !important"
                  width="200"
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
import { mapMutations, mapActions } from "vuex";

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
    ...mapMutations({ setAuthToken: "setAuthToken" }),
    ...mapActions({ loadUser: "loadUser" }),
    async register() {
      try {
        const res = await axios.post("http://localhost:8000/user/register", {
          name: this.name,
          surname: this.surname,
          password: this.password,
          email: this.email,
          age: this.age,
        });
        let token = res.data;
        this.setAuthToken(token.token);
        localStorage.setItem("token", token.token);
        console.log(res.data);
        this.$router.push("/");
        this.loadUser();
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

<style>
.animacija {
  animation-name: animacija;
  animation-duration: 0.4s;
  animation-direction: normal;
  animation-timing-function: ease-in;
}

@keyframes animacija {
  0% {
    opacity: 0;
    transform: translateY(10%);
    transition: all 1s cubic-bezier(0.36, 0.69, 0.3, 0.64);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media only screen and (max-width: 400px) {
  .titleCarent {
    font-size: 4rem !important;
  }
}

@media only screen and (max-width: 330px) {
  .titleCarent {
    font-size: 3.8rem !important;
  }
}
</style>
