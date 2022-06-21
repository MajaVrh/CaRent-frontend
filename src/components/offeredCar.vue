<template>
  <div>
    <hr />
    <v-container class="justify-center px-10">
      <v-row
        class="text-h4 black--text ml-0"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        {{ car.name }} {{ car.make }}</v-row
      >
      <v-row class="justify-center align-center">
        <v-col sm="4" md="3" xs="12">
          <p>Doors: {{ car.doors }}</p>
          <p>Places: {{ car.places }}</p>
          <p>Luggage Capacity: {{ car.luggageCapacity }}</p>
          <p>Transmission: {{ car.transmission }}</p>
        </v-col>
        <v-col sm="4" md="3" xs="12">
          <p>Fuel: {{ car.fuel }}</p>
          <p>Body type: {{ car.bodyType }}</p>
          <p>Experience Driving: {{ car.driving }}</p>
          <p>Air conditioning: {{ car.airConditioning }}</p>
        </v-col>
        <v-col sm="4" md="3" xs="12">
          <v-row class="mt-n4 justify-center ml-n4">
            <v-img
              :src="car.imageURL"
              max-width="250"
              class="offeredCarImg mb-2"
            ></v-img
          ></v-row>
        </v-col>
        <v-col cols="12" sm="4" md="" xs="12" class="text-center ml-8">
          <v-row
            class="text-h5 black--text mb-2 justify-center text-center mt-n8 priceText"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            200 € per Day</v-row
          >
          <v-row class="justify-center">
            <v-btn
              color="#FDA300"
              class="white--text px-10 text-capitalize text-h6"
              v-if="isUser"
              style="font-family: 'Jockey One', sans-serif !important"
            >
              Rent it
            </v-btn></v-row
          >
          <v-row class="text-center justify-center align-center"
            ><v-icon
              class="text-center justify-center align-center"
              color="orange"
              v-if="!isUser"
              x-large
              >mdi-pencil-circle</v-icon
            >

            <v-icon
              color="error"
              class="mx-1"
              x-large
              @click="deleteCar"
              v-if="!isUser"
              >mdi-delete-circle</v-icon
            ></v-row
          ></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script scoped>
import axios from "axios";
export default {
  name: "offeredCar",

  props: {
    carName: Number,
    car: Object,
    deleteCarFrontend: Function,
    isUser: Boolean,
  },
  methods: {
    async deleteCar() {
      try {
        await axios.delete(`http://localhost:8000/car/delete/${this.car._id}`);
        this.deleteCarFrontend(this.car._id);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@media only screen and (max-width: 700px) {
  .offeredCarImg {
    width: 150px;
    margin-left: 1rem !important;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }
}
hr {
  margin-top: 4%;
  margin-bottom: 4%;
  padding: 0.1rem 0 !important;

  background-color: rgb(219, 219, 219);

  border: none;
  justify-self: center;
}
</style>
