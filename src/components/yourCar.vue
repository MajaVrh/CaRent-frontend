<template>
  <v-container class="mx-6">
    <v-row
      class="text-h4 black--text d-flex ml-0 mb-2"
      style="font-family: 'Jockey One', sans-serif !important"
    >
      Car name</v-row
    >
    <v-row>
      <v-col>
        <p>Doors: 5</p>
        <p>Places: 5</p>
        <p>Luggage Capacity: 2</p>
        <p>Transmission: Manual</p>
      </v-col>
      <v-col>
        <p>Fuel: Diesel</p>
        <p>Body type: Sedan</p>
        <p>Experience Driving: 2</p>
        <p>Air conditioning: yes</p>
      </v-col>
      <v-col sm="5" md="4" xs="12" align="center">
        <v-img
          src="https://www.eurostarrental.com/api/userfiles/vehicleMaster/rc-upload-1648462548935-2.png"
          max-width="250"
        ></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="9" md="8">
        <table>
          <tr>
            <th>Check-Out</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td align="center"></td>
            <td align="center">Pula</td>
            <td align="center">25.4.2022</td>
            <td align="center">15:00</td>
          </tr>

          <tr>
            <th>Drop Off</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td></td>
            <td>Pula</td>
            <td>25.4.2022</td>
            <td>15:00</td>
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
        >
          Remaining time: 00:05:24:03
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
</style>
