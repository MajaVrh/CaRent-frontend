<template>
  <v-container v-if="rentInfo && rentInfo.carInfo.length > 0 && hasRents" class="mt-12 skew">
    <div
      v-for="(rent, i) in rentInfo.carInfo"
      :key="rent._id"
      class="animacija"
    >
      <your-car
        :carName="rent.car.carName"
        :isLast="i == rentInfo.carInfo.length - 1"
        :carInfo="rent"
        v-if="!rent.hasReturned"
      />
    </div>
  </v-container>
  <v-container v-else>
    <v-col align="center">
      <p
        class="text-h4 mt-12 black--text"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        You haven't rented a single car yet. You need a car?
      </p>
      <v-btn
        color="#FDA300"
        class="white--text mt-6 text-capitalize text-h5"
        width="300"
        height="50"
        style="font-family: 'Jockey One', sans-serif !important"
        :to="{ name: 'RentIt' }"
        >Rent it!</v-btn
      >
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";
import yourCar from "@/components/yourCar";
export default {
  name: "myRents",
  data() {
    return {
      rentInfo: null,
      hasRents: true,
    };
  },
  components: {
    yourCar,
  },
  methods: {
    async fetchRents() {
      try {
        const res = await axios.get("http://localhost:8000/user/rent");
        this.rentInfo = res.data;
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    checkForUserRents() {
      let vibeCheck = [];
      this.rentInfo.carInfo.forEach((element) => {
        vibeCheck.push(element.hasReturned);
      });
      if (!vibeCheck.includes(false)) this.hasRents = false;
    },
  },

  async mounted() {
    await this.fetchRents();
    this.checkForUserRents();
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
@media only screen and (min-width: 600px) {
  .skew {
    width: 70% !important;
  }
}
</style>
