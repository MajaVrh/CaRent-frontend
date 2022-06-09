<template>
  <v-container class="justify-center px-10">
    <v-row
      class="text-h4 black--text ml-0"
      style="font-family: 'Jockey One', sans-serif !important"
    >
      Car name</v-row
    >
    <v-row class="justify-center align-center">
      <v-col sm="4" md="3" xs="12">
        <p>Doors: 5</p>
        <p>Places: 5</p>
        <p>Luggage Capacity: 2</p>
        <p>Transmission: Manual</p>
      </v-col>
      <v-col sm="4" md="3" xs="12">
        <p>Fuel: Diesel</p>
        <p>Body type: Sedan</p>
        <p>Experience Driving: 2</p>
        <p>Air conditioning: yes</p>
      </v-col>
      <v-col sm="4" md="3" xs="12">
        <v-row class="mt-n4 justify-center ml-n4">
          <v-img
            src="https://www.eurostarrental.com/api/userfiles/vehicleMaster/rc-upload-1648462548935-2.png"
            max-width="250"
            class="offeredCarImg mb-2"
          ></v-img
        ></v-row>
        <v-row
          class="text-h5 black--text mb-2 justify-center text-center mt-n8 priceText"
          style="font-family: 'Jockey One', sans-serif !important"
        >
          200 € per Day</v-row
        >
      </v-col>
      <v-col cols="12" sm="4" md="" xs="12" class="text-center">
        <v-btn
          color="#FDA300"
          class="white--text px-12 text-capitalize text-h6"
          style="font-family: 'Jockey One', sans-serif !important"
        >
          rent it
        </v-btn></v-col
      >
    </v-row>
  </v-container>
</template>

<script scoped>
export default {
  name: "offeredCar",
  props: {
    isLast: Boolean,
    carName: Number,
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
</style>
