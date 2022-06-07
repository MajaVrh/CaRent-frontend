<template>
  <v-container class="mt-15 mb-15" v-if="user">
    <h1 class="mb-10">Personal details</h1>
    <v-alert type="success" outlined text v-if="!isVisible"
      >You have successfully made changes!</v-alert
    >
    <v-alert
      v-if="!isVisableDelete"
      prominent
      outlined
      text
      type="error"
      class="mt-6"
    >
      <v-row align="center">
        <v-col :cols="10" :xs="8" :md="6" :sm="4" class="grow"
          >Your account will be deleted!</v-col
        >
        <v-col :cols="10" :xs="8" :md="6" :sm="4" class="shrink">
          <v-row class="justify-end mr-2">
            <v-btn
              color="whitw"
              class="error--text text-capitalize mr-2"
              @click="isVisableDelete = !isVisableDelete"
              >Cancel
            </v-btn>
            <v-btn
              color="error"
              class="text-capitalize ml-1"
              @click="deleteUser"
              >Take action</v-btn
            ></v-row
          >
        </v-col>
      </v-row>
    </v-alert>
    <v-row class="justify-space-around text-center mt-0">
      <v-col :cols="10" :xs="8" :md="4" :sm="4" class="">
        <v-row class="text-center justify-center align-center mt-2">
          <v-icon size="300" color="grey lighten-1">
            mdi-account-circle
          </v-icon>
        </v-row>
        <v-row class="text-center justify-center align-center">
          <v-btn
            width="180"
            color="#153040"
            class="white--text text-capitalize"
            v-if="!settingsON"
            @click="settingsON = !settingsON"
            >Settings</v-btn
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
      </v-col>
      <v-col
        :cols="10"
        :xs="8"
        :md="6"
        :sm="4"
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
        <v-row class="justify-center">
          <v-btn
            width="180"
            color="orange"
            class="white--text text-capitalize mt-2 mr-2"
            v-if="settingsON"
            @click="updateData"
            >done
          </v-btn>

          <v-btn
            width="180"
            color="#153040"
            class="white--text text-capitalize mt-2 ml-1"
            v-if="settingsON"
            @click="settingsON = !settingsON"
            >cancel
          </v-btn></v-row
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
      isVisible: true,
      isVisableDelete: true,
    };
  },
  computed: {
    ...mapGetters({ user: "currentUser" }),
  },
  methods: {
    ...mapMutations({ setCurrentUser: "setCurrentUser", logOut: "logOut" }),

    async updateData() {
      try {
        const res = await axios.post("http://localhost:8000/update", {
          newName: this.user.name,
          newSurname: this.user.surname,
          newAdress: this.user.adress,
          newPostalCode: this.user.postalCode,
          newCity: this.user.city,
          newCountry: this.user.country,
        });
        this.setCurrentUser(res.data);
        this.settingsON = !this.settingsON;

        this.isVisible = false;

        setTimeout(() => {
          this.isVisible = true;
        }, "3000");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser() {
      try {
        const res = await axios.delete("http://localhost:8000/delete");
        this.setCurrentUser(res.data);
        this.logOut();
        this.$router.push("/index");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
