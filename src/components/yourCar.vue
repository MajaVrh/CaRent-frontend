<template>
  <v-container class="mx-6">
    <v-row
      class="text-h4 black--text d-flex ml-0 mb-2"
      style="font-family: 'Jockey One', sans-serif !important"
    >
      {{carInfo.car.name}}</v-row
    >
    <v-row>
      <v-col>
        <p>Doors: {{ carInfo.car.doors }}</p>
        <p>Seats: {{ carInfo.car.seats }}</p>
        <p>Luggage Capacity: {{ carInfo.car.luggageCapacity }}</p>
        <p>Transmission: {{ carInfo.car.transmission }}</p>
      </v-col>
      <v-col>
        <p>Fuel: {{ carInfo.car.fuel }}</p>
        <p>Body type: {{ carInfo.car.bodyType }}</p>
        <p>Experience Driving: {{ carInfo.car.minDriversAge }}</p>
        <p>Air conditioning: yes</p>
      </v-col>
      <v-col sm="5" md="4" xs="12" align="center">
        <v-img
          :src= "carInfo.car.imageURL"
          max-width="300"
          contain
        ></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="9" md="8">
        <table>
          <tr>
            <th>Check-Out</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
          <tr>
            <td align="center"></td>
            <td align="center">{{ carInfo.checkOutLocation }}</td>
            <td align="center">{{ moment(carInfo.checkOut).format("DD.MM.YYYY")}}</td>
          </tr>

          <tr>
            <th>Drop Off</th>
            <th>Company</th>
            <th>Contact</th>

          </tr>
          <tr>
            <td></td>
            <td>{{ carInfo.dropOffLocation }}</td>
            <td>{{ moment(carInfo.dropOff).format("DD.MM.YYYY")}}</td>
          </tr>
        </table>
      </v-col>
      <v-col
        style="margin-top: 2rem; text-align: center"
        align="center"
        xs="12"
        sm="3"
        md="4"
        v-if="!(windowWidth < 700)"
      >
        <p
          class="orange--text text-h5"
          style="font-family: 'Jockey One', sans-serif !important"
          v-if="daysRent"
        >
          Remaining time: {{ daysRent }}
        </p>
      </v-col>
    </v-row>
    <p
      class="orange--text text-h5"
      style="
        font-family: 'Jockey One', sans-serif !important;
        text-align: center;
        margin-top: 2rem;
        margin-left: -2.5rem;
      "
      v-if="windowWidth < 700"
    >
      Remaining time: 00:05:24:03
    </p>
    <hr v-if="!isLast" class="mt-15" color="#153040" />
    <hr v-else class="mt-15" color="white" />
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
  data(){
    return{
      daysRent: null,
      dateDropOff: new Date(this.carInfo.dropOff),
      dateCheckOut: new Date(this.carInfo.checkOut)
    }
  },
  methods: {
    calcTimeDiff() {
      const dateDif = Math.abs(
       this.dateDropOff - this.dateCheckOut
      );
      const daysRent = Math.ceil(dateDif / (1000 * 60 * 60 * 24));
      this.daysRent = daysRent;
      console.log(daysRent)
      
    },
  },
  mounted() {
    this.calcTimeDiff()
  }
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
</style>
