<template>
  <v-container class="m-6 mt-7" v-if="car">
    <v-row
      class="text-h4 black--text d-flex ml-0 mb-2"
      style="font-family: 'Jockey One', sans-serif !important"
    >
      {{ car.name }} {{ car.make }}</v-row
    >
    <v-row>
      <v-col>
        <p>Doors: {{ car.doors }}</p>
        <p>Seats: {{ car.seats }}</p>
        <p>Luggage Capacity: {{ car.luggageCapacity }}</p>
        <p>Transmission: {{ car.transmission }}</p>
      </v-col>
      <v-col>
        <p>Fuel: {{ car.fuel }}</p>
        <p>Body type: {{ car.bodyType }}</p>
        <p>Experience Driving: {{ car.minDriversAge }}</p>
        <p>Air conditioning: yes</p>
      </v-col>
      <v-col sm="5" md="4" xs="12" align="center">
        <v-img :src="car.imageURL" max-width="250" contain></v-img>
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
            <td align="center">{{ checkDrop.checkOutLocation }}</td>
            <td align="center">
              {{ moment(checkDrop.checkOutDate).format("DD.MM.YYYY") }}
            </td>
          </tr>

          <tr>
            <th>Drop Off</th>
            <th>Company</th>
            <th>Contact</th>
          </tr>
          <tr>
            <td></td>
            <td>{{ checkDrop.dropOffLocation }}</td>
            <td>{{ moment(checkDrop.dropOffDate).format("DD.MM.YYYY") }}</td>
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
          class="text-h5"
          style="font-family: 'Jockey One', sans-serif !important"
          v-if="daysRent"
        >
          Total: {{ car.price * daysRent }}$
        </p>
        <p
          v-else
          class="text-h5"
          style="font-family: 'Jockey One', sans-serif !important"
        >
          Total: {{ car.price }}$
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

    <hr class="my-12" color="#153040" />
    <v-row
      class="text-h4 black--text d-flex ml-0 mb-2"
      style="font-family: 'Jockey One', sans-serif !important"
    >
      Personal details</v-row
    >
    <v-row class="d-flex ml-0"> Enter the required information </v-row>

    <v-row>
      <v-col>
        <v-text-field label="Name"></v-text-field
        ><v-text-field label="Surname"></v-text-field
        ><v-text-field label="Email"></v-text-field
        ><v-text-field label="Age"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="Adress"></v-text-field
        ><v-text-field label="Postal Code"></v-text-field
        ><v-text-field label="City"></v-text-field
        ><v-text-field label="Country"></v-text-field>
      </v-col>
    </v-row>

    <hr class="my-12" color="#153040" />

    <v-row
      class="text-h4 black--text d-flex ml-0 mb-2"
      style="font-family: 'Jockey One', sans-serif !important"
    >
      Payment</v-row
    >
    <v-row class="d-flex ml-0"> Enter the required information </v-row>

    <v-row align="center" justify="center">
      <v-col align="center" justify="center"> aa </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "payIt",

  data() {
    return {
      id: this.$route.params.id,
      car: null,
      daysRent: null,
    };
  },
  methods: {
    async fetchRents() {
      try {
        const res = await axios.get(`http://localhost:8000/car/${this.id}`);
        this.car = res.data;

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    calcTimeDiff() {
      const dateDif = Math.abs(
        this.checkDrop.dropOffDate - this.checkDrop.checkOutDate
      );
      const daysRent = Math.ceil(dateDif / (1000 * 60 * 60 * 24));
      this.daysRent = daysRent;
    },
    ...mapMutations({ setCheckDrop: "setCheckDrop" }),
  },
  computed: {
    ...mapGetters({ checkDrop: "checkDrop" }),
  },

  mounted() {
    if(!this.checkDrop){this.$router.push({name: 'RentIt'})}
    this.fetchRents();
    this.calcTimeDiff();
  },
  beforeDestroy(){
    this.setCheckDrop(null)
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
