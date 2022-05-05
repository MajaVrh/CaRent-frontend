<template>
  <div class="py-0 my-0">
    <div>
      <v-img class="img-home" height="20rem" src="../assets/image_2.png">
        <span
          class="text-h2 white--text bigTXT"
          style="font-family: 'Jockey One', sans-serif !important"
          >Rent a car!</span
        >
      </v-img>
    </div>
    <v-container class="mt-12 d-flex justify-space-around">
      <v-card flat tile class="lighten-1 white--text text-center">
        <v-row
          class="text-h4 black--text d-flex justify-center"
          style="font-family: 'Jockey One', sans-serif !important"
        >
          Why CaRent?</v-row
        >
        <v-row class="justify-space-between text-h6 font-weight-regular">
          <v-col :cols="12" :xs="12" :md="4" :sm="12">
            <v-card flat>
              All our cars are completely correct, because they are regularly
              serviced and maintained, and cleaned and disinfected before each
              rental.
            </v-card>
          </v-col>
          <v-col :cols="12" :xs="12" :md="4" :sm="12">
            <v-card flat>
              They are also fully equipped with all the necessary and modern
              features, ensuring maximum comfort and safety for our customers.
            </v-card>
          </v-col>
          <v-col :cols="12" :xs="12" :md="4" :sm="12">
            <v-card flat>
              Traveling with one of our great cars through all of Croatia wiil
              be good time for your business or private trip is guaranteed.
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <hr />
    <v-container>
      <v-row
        class="text-h4 black--text d-flex pr-8 pl-8"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        About us</v-row
      >
      <v-row class="text-h6 font-weight-regular pl-6 pr-6">
        <v-col :cols="12" :xs="9" :md="7" :sm="12" class="">
          <v-card flat>
            Our offices are located in the centers of some of the most
            attractive cities and their airports. Find us at seven easily
            accessible locations throughout Croatia -
            <b> Zagreb, Pula, Split, Vukovar, Dubrovnik, Rijeka, Varaždin</b>
            . <br />
            Whether you are on a holiday or just passing through we are here to
            make your time easy and comfortable. Our vehicle fleet is consisted
            of various group and models, all new, a/c equipped, manual or
            automatic transmission, gps, child seat, wi-fi ... simply choose
            your preferences and enjoy your trip.
          </v-card>
        </v-col>
        <v-col
          :cols="12"
          :xs="3"
          :md="5"
          :sm="8"
          class="justify-center text-center align-center"
        >
          <v-card flat>
            <v-img class="img-home-car" src="../assets/auto1.png" fill />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <hr />
    <v-container>
      <v-row
        class="text-h4 black--text d-flex justify-strart pr-8 pl-8"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        Rental conditions</v-row
      >
      <v-row class="text-h6 font-weight-regular d-flex ml-6 mt-6">
        <v-card flat>
          <li>identity card or passport with a minimum age of 19 years</li>
          <li>full rent in cash or by payment to a transaction account</li>
          <li>driving license with driving experience longer than one year</li>
        </v-card></v-row
      >
    </v-container>
    <hr />
    <v-container>
      <v-row class="justify-center text-center align-center margina">
        <v-col :cols="12" :xs="12" :md="4" :sm="4"
          ><v-img class="img-home" src="../assets/auto2.png" fill
        /></v-col>
        <v-col :cols="12" :xs="10" :md="4" :sm="4">
          <v-row
            class="text-h5 black--text justify-center align-center"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            You need a car, rent it now!</v-row
          >
          <v-btn
            tile
            color="#FDA300"
            class="white--text mt-6 px-15 text-capitalize text-h6"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            Rent it
          </v-btn></v-col
        >
        <v-col :cols="12" :xs="12" :md="4" :sm="4"
          ><v-img class="img-home mb-5" src="../assets/auto3.png" fill
        /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
body {
  overflow-x: hidden;
}

.bigTXT {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 4rem;
}

hr {
  margin-top: 4%;
  margin-bottom: 4%;
  padding: 0.2rem 0 !important;
  background-color: rgb(219, 219, 219);
}

.margina {
  margin-top: -2rem;
}

@media only screen and (max-width: 960px) {
  .img-home-car {
    margin-left: 40%;
    width: 75%;
    display: flex;
    justify-content: center;
  }
}

@media only screen and (max-width: 860px) {
  .img-home-car {
    margin-left: 40%;
    width: 70%;
    display: flex;
    justify-content: center;
  }
}

@media only screen and (max-width: 600px) {
  .img-home-car {
    width: 60%;
    margin-left: 10%;
    display: flex;
    justify-content: center;
  }
}
</style>
