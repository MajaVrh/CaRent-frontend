<template>
  <v-container style="margin-top: -4.4rem" fill-height>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card
          width="500"
          class="py-12 animacija"
          style="padding-left: 5%; padding-right: 5%"
        >
          <v-card-title
            class="justify-center titleCarent"
            style="
              font-family: 'Jockey One', sans-serif !important;
              font-size: 5.5rem;
              color: #153040;
            "
          >
            Ca<span class="orange--text lighten-1">R</span>ent</v-card-title
          >
          <v-container class="text-left">
            <v-card-text
              class="text-h6 mt-2 mb-2"
              style="padding: 0 !important"
            >
              Enter the requiered inforamtion
            </v-card-text>
            <v-text-field
              :rules="emailRule"
              v-model="email"
              label="Email"
              name="email"
              color="orange"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="requiredRule"
              type="password"
              name="password"
              label="Password"
              color="orange"
            ></v-text-field>
            <v-card-actions class="justify-center mt-5">
              <v-btn
                class="text-h6 text-capitalize white--text d-flex pr-8 pl-8"
                style="font-family: 'Jockey One', sans-serif !important"
                color="orange"
                width="200"
                height="40"
                @click="login"
                >Login</v-btn
              >
            </v-card-actions>
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
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      emailRule: [
        (v) => !!v || "Is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      requiredRule: [(v) => !!v || "Is required"],
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
        const res = await axios.post("https://carentbackend.herokuapp.com/user/login", {
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
         this.$toast.error(e.response.data.msg, {
          position: "top-center",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
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
