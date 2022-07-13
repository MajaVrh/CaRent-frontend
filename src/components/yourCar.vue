<template>
  <v-container class="skew">
    <v-row
      class="text-h4 black--text d-flex ml-0 mb-2"
      style="font-family: 'Jockey One', sans-serif !important"
    >
      {{ carInfo.car.name }}</v-row
    >
    <v-row class="justify-space-between">
      <v-col lg="2" sm="5" md="3" xs="12">
        <p>Doors: {{ carInfo.car.doors }}</p>
        <p>Seats: {{ carInfo.car.seats }}</p>
        <p>Luggage Capacity: {{ carInfo.car.luggageCapacity }}</p>
        <p>Transmission: {{ carInfo.car.transmission }}</p>
      </v-col>
      <v-col lg="2" sm="5" md="3" xs="12">
        <p>Fuel: {{ carInfo.car.fuel }}</p>
        <p>Body type: {{ carInfo.car.bodyType }}</p>
        <p>Experience Driving: {{ carInfo.car.minDriversAge }}</p>
        <p>Air conditioning: yes</p>
      </v-col>
      <v-col sm="12" md="6" xs="12" lg="8" align="center">
        <v-img
          :src="carInfo.car.imageURL"
          max-width="350"
          class="mt-n5"
          contain
          no-gutters
        ></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12" md="7" lg="6">
        <table>
          <tr>
            <th>Check-Out</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
          <tr>
            <td align="center"></td>
            <td align="center">{{ carInfo.location }}</td>
            <td align="center">
              {{ moment(carInfo.checkOut).format("DD.MM.YYYY") }}
            </td>
          </tr>

          <tr>
            <th>Drop Off</th>
            <th>Company</th>
            <th>Contact</th>
          </tr>
          <tr>
            <td></td>
            <td>{{ carInfo.location }}</td>
            <td>{{ moment(carInfo.dropOff).format("DD.MM.YYYY") }}</td>
          </tr>
        </table>
      </v-col>
      <v-col
        class="mt-2"
        align="center"
        xs="12"
        sm="4"
        md="4"
        lg="4"
        v-if="windowWidth > 960"
      >
        <p
          class="text-h5"
          style="font-family: 'Jockey One', sans-serif !important"
          v-if="daysRent != null"
        >
          Remaining time: {{ daysRent }} {{ Pluralize("day", daysRent) }}
        </p>
      </v-col>
    </v-row>
    <p
      class="text-h5 mt-10"
      align="center"
      style="font-family: 'Jockey One', sans-serif !important"
      v-if="windowWidth < 960"
    >
      Remaining time: {{ daysRent }} {{ Pluralize("day", daysRent) }}
    </p>
    <hr v-if="!isLast" class="my-12" color="#153040" />
    <hr v-else class="my-12" color="white" />
  </v-container>
</template>

<script scoped>
export default {
  name: "yourCar",
  props: {
    isLast: Boolean,
    carName: Number,
    carInfo: Object,
  },
  data() {
    return {
      daysRent: null,
      dateDropOff: new Date(this.carInfo.dropOff),
      dateCheckOut: new Date(this.carInfo.checkOut),
    };
  },
  methods: {
    calcTimeDiff() {
      const dateDif = Math.abs(this.dateDropOff - this.dateCheckOut);
      const daysRent = Math.ceil(dateDif / (1000 * 60 * 60 * 24));
      this.daysRent = daysRent;
      console.log(daysRent);
    },
  },
  mounted() {
    this.calcTimeDiff();
  },
};
</script>

<style lang="scss">
td,
th {
  width: 12rem;
  text-align: center;
}
@media only screen and (max-width: 425px) {
  table,
  td,
  th,
  tr {
    font-size: 0.9rem !important;
  }
}
@media only screen and (min-width: 426px) {
  table,
  td,
  th,
  tr {
    font-size: 1rem !important;
    text-align: left;
  }
}
@media only screen and (min-width: 600px) {
  .skew {
    width: 70% !important;
  }
}
</style>
