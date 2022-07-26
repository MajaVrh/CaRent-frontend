<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel v-for="(rentedCars, i) in userInfo.carInfo" :key="i">
        <v-expansion-panel-header
          class="text-capitalize"
          v-if="!rentedCars.hasReturned || !isActiveRents"
        >
          <b v-if="rentedCars && rentedCars.car"> {{ rentedCars.car.make }} {{ rentedCars.car.name }} </b>
          <b v-else> DELETED CAR </b>
        </v-expansion-panel-header>
        <v-expansion-panel-content v-if="rentedCars && rentedCars.car">
          <v-row align="center">
            <v-col xs="12" md="6" sm="12" lg="4">
              <p><b>Vehicle loaction: </b> {{ rentedCars.location }}</p>
              <p>
                <b> Check out date: </b>
                {{ moment(rentedCars.checkOut).format("DD.MM.YYYY") }}
              </p>
              <p>
                <b>Drop off date: </b>
                {{ moment(rentedCars.dropOff).format("DD.MM.YYYY") }}
              </p>
              <p><b>Rent price: </b> {{ rentedCars.totalPrice }}€</p>
            </v-col>
            <v-col
              xs="12"
              md="6"
              sm="12"
              lg="4"
              class="align-center justify-center"
              ><v-img
                width="250"
                height="fit-content"
                :src="rentedCars.car.imageURL"
                class="mx-auto my-auto"
              ></v-img>
            </v-col>
            <v-col
              xs="12"
              md="12"
              sm="12"
              lg="4"
              class="justify-center align-center mx-auto"
              v-if="isActiveRents"
            >
              <v-btn
                @click="setToReturned(rentedCars)"
                color="orange"
                width="170"
                class="mx-auto d-flex white--text mt-4 px-15 text-capitalize text-h6 mx-2"
                style="font-family: 'Jockey One', sans-serif !important"
                >Car returned</v-btn
              >
            </v-col>
          </v-row>
        </v-expansion-panel-content>
        <v-expansion-panel-content v-else-if="rentedCars && !rentedCars.car">
          NO INFORMATION
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "usersRentInfo",
  props: {
    userInfo: null,
    isActiveRents: Boolean,
  },
  methods: {
    async setToReturned(idCarInfo) {
      const userID = this.userInfo.user._id;
      const idCarInfo2 = idCarInfo._id;
      console.log(idCarInfo2);
      try {
        await axios.patch("https://carentbackend.herokuapp.com/rent/updateReturnal", {
          idUser: userID,
          idCarInfo: idCarInfo2,
        });
        this.$router.go("/userRents");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
