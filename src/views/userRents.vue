<template>
  <v-container class="skew">
    <v-tabs color="orange">
      <v-tab @click="isActiveRents = true">Active rents</v-tab>
      <v-tab-item>
        <v-card heigth="fit-content" class="ma-8 pa-2" v-if="areRents">
          <v-expansion-panels flat>
            <v-expansion-panel v-for="(userInfo, i) in rentInfo" :key="i">
              <v-expansion-panel-header
                class="text-capitalize"
                v-if="!badIndexes.includes(i) && userInfo.user"
              >
                {{ userInfo.user.name }} {{ userInfo.user.surname }} ({{
                  userInfo.user.email
                }})
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <usersRentInfo
                  :userInfo="userInfo"
                  :isActiveRents="isActiveRents"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <div v-else> <p class="mt-5">not a single vehicle was rented. Please try to check again later 🚗</p> </div>

      </v-tab-item>
      <v-tab @click="isActiveRents = false">All rents</v-tab>
      <v-tab-item>
        <v-card heigth="fit-content" class="ma-8 pa-2" v-if="rentInfo">
          <v-expansion-panels flat>
            <v-expansion-panel v-for="(userInfo, i) in rentInfo" :key="i">
              <v-expansion-panel-header class="text-capitalize" v-if="userInfo.user">
                {{ userInfo.user.name }} {{ userInfo.user.surname }} ({{
                  userInfo.user.email
                }})
              </v-expansion-panel-header>
              <v-expansion-panel-header class="text-capitalize" v-else-if="!userInfo.user">
                DELETED USER
              </v-expansion-panel-header>
              <v-expansion-panel-content v-if="userInfo">
                <usersRentInfo
                  :userInfo="userInfo"
                  :isActiveRents="isActiveRents"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <div v-else> <p class="mt-5">not a single vehicle was rented. Please try to check again later 🚗</p> </div>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import usersRentInfo from "../components/usersRentInfo.vue";
export default {
  components: { usersRentInfo },
  name: "userRents",
  data() {
    return {
      rentInfo: null,
      isActiveRents: true,
      badIndexes: [],
      areRents: true
    };
  },
  computed: {
    ...mapGetters({ user: "currentUser", loading: "loading" }),
  },
  methods: {

    
    async fetchRents() {
      try {
        const res = await axios.get("https://carentbackend.herokuapp.com/rent");
        this.rentInfo = res.data;
        console.log("rents", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    checkForUserRents() {
      let vibeCheck = false;
      for (let i in this.rentInfo) {
        for (let o in this.rentInfo[i].carInfo) {
          if (this.rentInfo[i].carInfo[o].hasReturned == false && this.rentInfo[i].user) {vibeCheck = false; break;}
          vibeCheck = true; 
        }
        if (vibeCheck) {
          this.badIndexes.push(parseInt(i));
        }
        vibeCheck = false;
        
      }
      console.log('bad indexes', this.badIndexes)
    },
     checkForAnyRents() {
      let vibeCheck = [];
      for (let i in this.rentInfo) {
        for (let o in this.rentInfo[i].carInfo) {
          vibeCheck.push(this.rentInfo[i].carInfo[o].hasReturned)
        }
      }
      if(!vibeCheck.includes(false)){
        this.areRents = false
      }
    },
  },
  async mounted() {
    await this.fetchRents();
    this.checkForUserRents();
    this.checkForAnyRents()
    console.log(this.rentInfo)
    
  },
};
</script>

<style>
@media only screen and (min-width: 600px) {
  .skew {
    width: 70% !important;
  }
}
</style>