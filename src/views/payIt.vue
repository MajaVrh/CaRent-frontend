<template>
  <v-container class="m-6 mt-7 skew" v-if="car">
    <v-form @submit.prevent="rentCar()">
      <v-row
        class="text-h4 black--text d-flex ml-0 mb-2"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        {{ car.name }} {{ car.make }}</v-row
      >
      <v-row class="justify-space-between">
        <v-col lg="2" sm="5" md="3" xs="12">
          <p><b>Doors:</b> {{ car.doors }}</p>
          <p><b>Seats: </b> {{ car.seats }}</p>
          <p><b>Luggage Capacity:</b> {{ car.luggageCapacity }}</p>
          <p><b>Transmission:</b> {{ car.transmission }}</p>
        </v-col>
        <v-col lg="2" sm="6" md="4" xs="12">
          <p><b> Fuel:</b> {{ car.fuel }}</p>
          <p><b>Body type:</b> {{ car.bodyType }}</p>
          <p><b>Experience Driving:</b> {{ car.driverLicenseCategory }}</p>
          <p><b>Air conditioning:</b> yes</p>
        </v-col>
        <v-col lg="8" sm="12" md="5" xs="12" no-gutters align="center">
          <v-img
            class="mt-n5"
            :src="car.imageURL"
            max-width="350"
            contain
          ></v-img>
        </v-col>
      </v-row>

      <v-row>
        <v-col sm="12" md="8" lg="6" xs="12">
          <table>
            <tr>
              <th>Check-Out location</th>
              <th>Checkout date</th>
              <th>DropOff date</th>
            </tr>
            <tr>
              <td align="center">{{ checkDrop.location }}</td>
              <td align="center">
                {{ moment(checkDrop.checkOutDate).format("DD.MM.YYYY") }}
              </td>
              <td>{{ moment(checkDrop.dropOffDate).format("DD.MM.YYYY") }}</td>
            </tr>
          </table>
        </v-col>
        <v-col
          style="margin-top: 2rem"
          class="text-center justify-center align-center"
          xs="12"
          sm="12"
          md="4"
          v-if="windowWidth >= 960"
        >
          <p
            class="mt-n5 fontTotal"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            Total: {{ totalPrice }}$
          </p>
        </v-col>
      </v-row>
      <v-col
        style="margin-top: 2rem"
        class="d-flex mx-auto text-center justify-center align-center"
        xs="5"
        sm="3"
        md="4"
        v-if="windowWidth < 960"
      >
        <p
          class="text-h5"
          style="font-family: 'Jockey One', sans-serif !important"
        >
          Total: {{ totalPrice }}$
        </p>
      </v-col>
      <hr class="my-12" color="#153040" />
      <v-row
        class="text-h4 black--text d-flex ml-0 mb-2"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        Personal details</v-row
      >
      <v-row class="d-flex ml-0"> Enter the required information </v-row>

      <v-row>
        <v-col class="" cols="12" sm="12" md="6" xs="12" lg="6">
          <v-text-field
            :rules="requiredRule"
            color="orange"
            label="Name"
            v-model="Name"
          ></v-text-field
          ><v-text-field
            :rules="requiredRule"
            color="orange"
            label="Surname"
            v-model="Surname"
          ></v-text-field
          ><v-text-field
            type="email"
            :rules="emailRule"
            color="orange"
            label="Email"
            v-model="Email"
          ></v-text-field
          ><v-text-field
            type="number"
            :rules="requiredRule"
            color="orange"
            label="Age"
            v-model="Age"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6" xs="12" lg="6" class="topMargin">
          <v-text-field
            :rules="requiredRule"
            color="orange"
            label="Adress"
            v-model="Adress"
          ></v-text-field
          ><v-text-field
            type="number"
            :rules="requiredRule"
            color="orange"
            label="Postal Code"
            v-model="postalCode"
          ></v-text-field
          ><v-text-field
            :rules="requiredRule"
            color="orange"
            label="City"
            v-model="City"
          ></v-text-field
          ><v-text-field
            :rules="requiredRule"
            color="orange"
            label="Country"
            v-model="Country"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-checkbox
          v-model="license"
          :label="`I have a category ${car.driverLicenseCategory} driver's license `"
          color="orange"
          :rules="requiredRule"
          hide-details
        ></v-checkbox
      ></v-row>
      <hr class="my-12" color="#153040" />

      <v-row
        class="text-h4 black--text d-flex ml-0 mb-2"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        Payment</v-row
      >
      <v-row class="d-flex ml-0"> Enter the required information </v-row>

      <v-container
        style="width: 100%; margin-left: 10%"
        class="credContainer align-center"
        v-if="windowWidth > 1285"
      >
        <v-card
          class="credBack"
          width="600"
          color="blue-grey darken-4"
          style="border: 2px solid black !important"
        >
          <div class="line"></div>

          <v-text-field
            color="white"
            background-color="#f4f4f496"
            label="CVV"
            class="alignCvv"
            outlined
            dense
            :rules="requiredRule"
            maxlength="3"
            v-model="CVV"
          ></v-text-field>
        </v-card>
        <v-card
          class="credFront px-10"
          width="600"
          style="border: 2px solid black !important"
        >
          <v-row>
            <v-col>
              <v-text-field
                color="white"
                background-color="#f4f4f496"
                label="Card number"
                outlined
                dense
                :rules="requiredRule"
                maxlength="16"
                v-model="cardNumber"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                color="white"
                background-color="#f4f4f496"
                outlined
                dense
                label="Name on card"
                :rules="requiredRule"
                v-model="nameOnCard"
                style="width: 12rem !important"
                class="mb-n8"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                class=""
                color="white"
                background-color="#f4f4f496"
                label="MM/YY"
                outlined
                dense
                :rules="requiredRule"
                maxlength="5"
                v-model="MY"
                style="width: 12rem !important"
              ></v-text-field
            ></v-col>
            <v-col>
              <v-img
                style="margin-left: 10rem !important; position: absolute"
                class="mb-12"
                src="../assets/chip.png"
                max-width="80"
              ></v-img
            ></v-col>
          </v-row>
          <v-row class="ml-n2">
            <i class="fa-brands fa-cc-visa cardIcons fa-3x white--text"></i>

            <i
              class="fa-brands fa-cc-mastercard cardIcons fa-3x white--text"
            ></i>

            <i class="fa-brands fa-cc-amex cardIcons fa-3x white--text"></i>

            <i
              class="fa-brands fa-cc-diners-club cardIcons fa-3x white--text"
            ></i>
          </v-row>
        </v-card>
      </v-container>
      <v-container v-else>
        <v-card color="#2B6182" class="px-10 py-10 mt-5 cardSmall">
          <v-row>
            <v-col
              ><v-text-field
                color="white"
                background-color="#f4f4f496"
                filled
                outlined
                dense
                label="Name on card"
                :rules="requiredRule"
                v-model="nameOnCard"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                color="white"
                background-color="#f4f4f496"
                filled
                outlined
                dense
                label="Card number"
                :rules="requiredRule"
                maxlength="16"
                v-model="cardNumber"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                color="white"
                background-color="#f4f4f496"
                filled
                outlined
                dense
                label="MM/YY"
                :rules="requiredRule"
                maxlength="5"
                v-model="MY"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                color="white"
                background-color="#f4f4f496"
                filled
                outlined
                dense
                label="CVV"
                :rules="requiredRule"
                maxlength="3"
                v-model="CVV"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <i class="fa-brands fa-cc-visa cardIcons fa-2x"></i>

              <i class="fa-brands fa-cc-mastercard cardIcons fa-2x"></i>

              <i class="fa-brands fa-cc-amex cardIcons fa-2x"></i>

              <i class="fa-brands fa-cc-diners-club cardIcons fa-2x"></i>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      <v-row>
        <v-col align="center" class="my-5">
          <v-btn
            type="submit"
            color="orange"
            width="170"
            class="white--text mt-4 px-15 text-capitalize text-h6 mx-2"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            Confirm
          </v-btn>
          <v-btn
            type="button"
            color="#153040"
            :to="{ name: 'RentIt' }"
            width="170"
            class="white--text mt-4 px-15 text-capitalize text-h6 mx-2"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "payIt",

  data() {
    return {
      id: this.$route.params.id,
      car: null,
      daysRent: null,
      requiredRule: [(v) => !!v || "Is required"],
      emailRule: [
        (v) => !!v || "Is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      Name: "",
      Surname: "",
      Email: "",
      Age: "",
      Adress: "",
      postalCode: "",
      City: "",
      Country: "",
      nameOnCard: "",
      cardNumber: "",
      MY: "",
      CVV: "",
      zipCode: "",
      totalPrice: null,
      license: false,
    };
  },
  methods: {
    async fetchRents() {
      try {
        const res = await axios.get(`http://localhost:8000/car/${this.id}`);
        this.car = res.data;
        if (this.daysRent) this.totalPrice = res.data.price * this.daysRent;
        else this.totalPrice = res.data.price;
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    fieldError() {
      this.$toast.error("All fields must be filled", {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
      });
    },

    async rentCar() {
      if (
        this.Name.length < 1 ||
        this.Surname.length < 1 ||
        this.Email.length < 1 ||
        this.Age.length < 1 ||
        this.Adress.length < 1 ||
        this.postalCode.length < 1 ||
        this.City.length < 1 ||
        this.Country.length < 1 ||
        this.nameOnCard.length < 1 ||
        this.cardNumber.length < 1 ||
        this.MY.length < 1 ||
        this.CVV.length < 1 ||
        this.license != true
      ) {
        console.log(
          this.Name,
          this.Surname,
          this.Email,
          this.Age,
          this.Adress,
          this.postalCode,
          this.City,
          this.Country,
          this.nameOnCard,
          this.cardNumber,
          this.MY,
          this.CVV,
          this.zipCode,
          this.license
        );
        return this.fieldError();
      }
      try {
        const res = await axios.post("http://localhost:8000/rent", {
          carId: this.car._id,
          location: this.checkDrop.location,
          checkOut: this.checkDrop.checkOutDate,
          dropOff: this.checkDrop.dropOffDate,
          Name: this.Name,
          Surname: this.Surname,
          Email: this.Email,
          Age: this.Age,
          Adress: this.Adress,
          postalCode: this.postalCode,
          City: this.City,
          Country: this.Country,
          totalPrice: this.totalPrice,
        });
        await axios.post("http://localhost:8000/rent/contact", {
          email: this.Email,
          userName: this.Name,
          userSurname: this.Surname,

          carName: this.car.name,
          carLocation: this.checkDrop.location,
          carMake: this.car.make,

          rentedFrom: moment(this.checkDrop.checkOutDate).format("YYYY-MM-DD"),
          rentedUntil: moment(this.checkDrop.dropOffDate).format("YYYY-MM-DD"),
        });
        console.log(res);
        this.setRentedState(true);
        this.$router.push({ name: "RentIt" });
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
    ...mapMutations({
      setCheckDrop: "setCheckDrop",
      setRentedState: "setRentedState",
    }),
  },
  computed: {
    ...mapGetters({ checkDrop: "checkDrop" }),
  },

  mounted() {
    if (!this.checkDrop) {
      return this.$router.push({ name: "RentIt" });
    }
    this.fetchRents();
    this.calcTimeDiff();
  },

  beforeDestroy() {
    this.setCheckDrop(null);
  },
};
</script>

<style lang="scss">
.text-field-label-top {
  color: white !important;
}

td,
th {
  width: 15rem;
  text-align: center;
  font-size: 5rem;
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

@media only screen and (max-width: 425px) {
  table,
  td,
  th,
  tr {
    font-size: 0.9rem !important;
  }
}

.credContainer {
  position: relative;
  height: 20rem;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 7rem;
}
.credFront {
  padding: 2rem;
  position: absolute;
  width: 40%;
  height: 100%;

  background: url("../assets/kartica.jpg");
  background-size: cover;
}
.credBack {
  position: absolute;
  height: 100%;
  width: 40%;
  margin-top: 4rem;
  margin-left: 10rem;

  .line {
    height: 20%;
    margin-top: 3rem;
    margin-bottom: 2rem;
    background-color: #c0c0c0;
  }
}
@media only screen and (min-width: 600px) {
  .skew {
    width: 70% !important;
  }
}

.cardIcons {
  margin: 0.5rem;
  margin-top: -0.8rem;
  color: white;
}
.fontTotal {
  font-size: 1.9rem;
}
.alignCvv {
  width: 15% !important;
  margin-left: auto !important;
  margin-right: 2rem !important;
}

.cardSmall {
  background: url("../assets/kartica.jpg");
  background-size: cover;
}

@media only screen and (max-width: 959px) {
  .topMargin {
    margin-top: -1.5rem !important;
  }
}
</style>
