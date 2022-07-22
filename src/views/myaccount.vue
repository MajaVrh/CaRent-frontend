<template>
  <v-container class="pr-8 pl-8 mt-12 mb-12 pb-12" v-if="user">
    <v-row
      class="text-h4 black--text d-flex ml-0"
      style="font-family: 'Jockey One', sans-serif !important"
    >
      Personal details</v-row
    >
    <v-row class="ml-0 mb-6">You can edit your profile here</v-row>

    <v-row class="text-center justify-center mx-0 mt-0">
      <v-col
        :cols="10"
        :xs="8"
        :md="6"
        :sm="12"
        class="text-center justify-center align-center"
      >
        <v-text-field
          color="orange"
          label="Email"
          class="mt-n1"
          disabled
          v-model="user.email"
        ></v-text-field>
        <v-text-field
          color="orange"
          label="Name"
          class="mt-n1"
          :disabled="!settingsON"
          :rules="[rules.required]"
          v-model="user.name"
        >
        </v-text-field>
        <v-text-field
          color="orange"
          label="Surname"
          class="mt-n1"
          :disabled="!settingsON"
          :rules="[rules.required]"
          v-model="user.surname"
        ></v-text-field>
        <v-text-field
          color="orange"
          label="Adress"
          class="mt-n1"
          :disabled="!settingsON"
          v-model="user.adress"
        ></v-text-field>
        <v-text-field
          color="orange"
          label="Postal code"
          class="mt-n1"
          :disabled="!settingsON"
          v-model="user.postalCode"
        ></v-text-field>
        <v-text-field
          color="orange"
          label="City"
          class="mt-n1"
          :disabled="!settingsON"
          v-model="user.city"
        ></v-text-field>
        <v-text-field
          color="orange"
          label="Country"
          class="mt-n1"
          :disabled="!settingsON"
          v-model="user.country"
        ></v-text-field>
        <v-row class="justify-center mt-2">
          <v-btn
            width="180"
            color="orange"
            class="white--text text-capitalize mt-2 mx-2"
            v-if="settingsON"
            @click="updateData"
            >done
          </v-btn>

          <v-btn
            width="180"
            color="#153040"
            class="white--text text-capitalize mt-2 mx-2"
            v-if="settingsON"
            @click="settingsON = !settingsON"
            >cancel
          </v-btn></v-row
        >
      </v-col>

      <v-col :cols="12" :xs="12" :md="6" :sm="12">
        <v-row class="text-center justify-center align-center mt-2"> </v-row>
        <v-row class="text-center justify-center align-center">
          <v-btn
            width="180"
            color="#153040"
            class="white--text text-capitalize"
            v-if="!settingsON"
            @click="settingsON = !settingsON"
            >Edit profile</v-btn
          >
        </v-row>
        <v-row class="text-center justify-center align-center mt-6">
          <v-btn
            width="180"
            color="error"
            class="white--text text-capitalize"
            @click="isVisableDelete = !isVisableDelete"
            v-if="isVisableDelete"
            >Delete account</v-btn
          >
        </v-row>

        <v-alert
          v-if="!isVisableDelete"
          prominent
          outlined
          text
          type="error"
          class="mt-6"
        >
          <v-row align="center">
            <v-col :cols="12" :xs="12" :md="6" :sm="6" class="grow"
              >Your account will be deleted!</v-col
            >
            <v-col :cols="10" :xs="12" :md="6" :sm="6" class="shrink">
              <v-row class="justify-end mr-2">
                <v-btn
                  width="7rem"
                  color="white"
                  class="error--text text-capitalize mx-1 my-1"
                  @click="isVisableDelete = !isVisableDelete"
                  >Cancel
                </v-btn>
                <v-btn
                  width="7rem"
                  color="error"
                  class="text-capitalize mx-1 my-1"
                  @click="deleteUser"
                  >Take action</v-btn
                ></v-row
              >
            </v-col>
          </v-row>
        </v-alert>
        <v-row class="text-end justify-center align-center mt-12">
          <v-icon size="200" color="grey lighten-1">
            mdi-account-cog
          </v-icon></v-row
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "myaccount",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required",
      },
      settingsON: false,

      isVisableDelete: true,
    };
  },
  computed: {
    ...mapGetters({ user: "currentUser" }),
  },
  methods: {
    ...mapMutations({ setCurrentUser: "setCurrentUser", logOut: "logOut" }),

    alertChangesSuccess() {
      this.$toast.success("You successfully made changes!", {
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
        rentInfo: null,
      });
    },

    async updateData() {
      try {
        const res = await axios.post("http://localhost:8000/user/update", {
          newName: this.user.name,
          newSurname: this.user.surname,
          newAdress: this.user.adress,
          newPostalCode: this.user.postalCode,
          newCity: this.user.city,
          newCountry: this.user.country,
        });
        this.setCurrentUser(res.data);
        this.settingsON = !this.settingsON;

        this.alertChangesSuccess();
      } catch (error) {
        console.log(error);
      }
    },
    async fetchRents() {
      try {
        const res = await axios.get("http://localhost:8000/user/rent");
        this.rentInfo = res.data;
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser() {
      if (this.hasRentsNotReturned()) {
        this.$toast.error(
          "Please return your rented vehicles before deleteing your account",
          {
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
          }
        );
      } else {
        try {
          const res = await axios.delete("http://localhost:8000/user/delete");
          this.setCurrentUser(res.data);
          this.logOut();
          this.$router.push("/index");
        } catch (error) {
          console.log(error);
        }
      }
    },
    hasRentsNotReturned() {
      let check = [];
      for (let i in this.rentInfo.carInfo) {
        check.push(this.rentInfo.carInfo[i].hasReturned);
      }
      if (check.includes(false)) {
        return true;
      }
    },
  },
  mounted() {
    this.fetchRents();
  },
};
</script>

<style></style>
