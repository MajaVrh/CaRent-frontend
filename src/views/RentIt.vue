<template>
  <div>
    <v-container class="pr-8 pl-8 mt-12 mb-12">
      <v-row
        v-if="this.user.isAdmin"
        class="text-h4 black--text d-flex ml-0"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        Rent it</v-row
      >

      <v-row class="justify-space-around align-center text-center px-10 mt-8">
        <v-col :cols="12" :xs="12" :md="6" :sm="12" class="my-n4"
          ><filter1 v-if="this.user.isAdmin"
        /></v-col>
        <v-col :cols="12" :xs="12" :md="6" :sm="12" class="my-n4">
          <template>
            <div v-if="this.user.isAdmin">
              <v-dialog transition="dialog-top-transition " max-width="78%">
                <template v-slot:activator="{ on, attrs }">
                  <v-col
                    :cols="12"
                    :xs="12"
                    :md="12"
                    :sm="12"
                    class="text-center"
                  >
                    <v-btn
                      color="#FDA300"
                      class="white--text px-10 text-capitalize text-h6 buttons"
                      style="font-family: 'Jockey One', sans-serif !important"
                      min-width="10rem"
                      max-width="10rem"
                      v-bind="attrs"
                      v-on="on"
                      @click="
                        (searchVisible = !searchVisible), (addVisible = false)
                      "
                    >
                      Add new car
                    </v-btn></v-col
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card class="pt-12">
                    <v-card-text
                      v-if="isVisableSuccesModal"
                      class="mt-n12 pt-12"
                    >
                      <v-row
                        class="text-h4 mt-2 black--text d-flex mb-4 justify-center"
                        style="font-family: 'Jockey One', sans-serif !important"
                      >
                        New car</v-row
                      >
                      <v-row class="black--text fontSize justify-center">
                        <v-col :cols="12" :xs="12" :md="3" :sm="4">
                          <v-row class="mb-2"><b>Make: </b>{{ make }}</v-row>
                          <v-row class="mb-2"><b>Name: </b>{{ name }}</v-row>
                          <v-row class="mb-2"
                            ><b>Body type: </b>{{ bodyType }}</v-row
                          >
                          <v-row class="mb-2"
                            ><b>Places: </b>{{ places }}</v-row
                          >
                          <v-row class="mb-0"><b>Doors: </b>{{ doors }}</v-row>
                        </v-col>
                        <v-col :cols="12" :xs="7" :md="3" :sm="4">
                          <v-row class="mb-2"
                            ><b>Luggage Capacity: </b
                            >{{ luggageCapacity }}</v-row
                          >
                          <v-row class="mb-2"><b>Power: </b>{{ power }}</v-row>
                          <v-row class="mb-2"
                            ><b>Min driver age: </b>{{ luggageCapacity }}</v-row
                          >
                          <v-row class="mb-2"
                            ><b>Production year: </b>{{ productionYear }}</v-row
                          >
                          <v-row class="mb-2"
                            ><b>Current station: </b>{{ currentStation }}</v-row
                          >
                        </v-col>
                        <v-col :cols="12" :xs="12" :md="3" :sm="6">
                          <v-img
                            :src="imageURL"
                            max-width="250"
                            class="offeredCarImg ml-2"
                          ></v-img
                        ></v-col>
                        <v-alert
                          type="success"
                          outlined
                          text
                          width="76%"
                          class="justify-center"
                          v-if="isVisibleSuccesNewCar"
                          >You have successfully added a new car!</v-alert
                        >
                      </v-row>
                    </v-card-text>
                    <v-card-text v-if="!isVisableSuccesModal">
                      <v-row
                        class="text-h4 mt-2 black--text d-flex ml-0 justify-center"
                        style="font-family: 'Jockey One', sans-serif !important"
                      >
                        Add new car</v-row
                      >

                      <v-row class="justify-space-around">
                        <v-col :cols="12" :xs="12" :md="5" :sm="12">
                          <v-text-field
                            v-model="make"
                            label="Make"
                            color="orange"
                          ></v-text-field>
                          <v-text-field
                            v-model="name"
                            label="Name"
                            color="orange"
                          ></v-text-field>

                          <v-text-field
                            v-model="bodyType"
                            label="Body type"
                            color="orange"
                          ></v-text-field>
                          <v-text-field
                            v-model="places"
                            label="Places"
                            color="orange"
                          ></v-text-field>
                          <v-text-field
                            v-model="luggageCapacity"
                            label="Luggage Capacity"
                            color="orange"
                          ></v-text-field>
                          <v-text-field
                            v-model="transmission"
                            label="Transmission"
                            color="orange"
                          ></v-text-field>
                          <v-text-field
                            v-model="power"
                            label="Power"
                            color="orange"
                          ></v-text-field
                        ></v-col>
                        <v-col :cols="12" :xs="12" :md="5" :sm="12">
                          <v-text-field
                            v-model="fuel"
                            label="Fuel"
                            color="orange"
                            class="topMargin"
                          ></v-text-field>
                          <v-text-field
                            v-model="doors"
                            label="Doors"
                            color="orange"
                          ></v-text-field>

                          <v-text-field
                            v-model="productionYear"
                            label="production Year"
                            color="orange"
                          ></v-text-field>
                          <v-text-field
                            v-model="minDriversAge"
                            label="Min driver age"
                            color="orange"
                          ></v-text-field>
                          <v-text-field
                            v-model="currentStation"
                            label="Current Station"
                            color="orange"
                          ></v-text-field>
                          <v-text-field
                            v-model="price"
                            label="Price"
                            color="orange"
                          ></v-text-field>

                          <v-row class="d-flex text-start jutify-start">
                            <v-col :xs="12" :md="5" :sm="5">
                              <v-btn
                                @click="openUploadModal"
                                accept="image/*"
                                color="#153040"
                                outlined
                                class="mt-4 ml-0 orange--text text-capitalize"
                                >Add image
                              </v-btn></v-col
                            >
                            <v-col :xs="12" :md="6" :sm="6">
                              <v-img
                                :src="imageURL"
                                max-width="190"
                                class="mx-auto align-center"
                              ></v-img
                            ></v-col>
                          </v-row>
                        </v-col>
                      </v-row>

                      <v-row class="justify-center">
                        <v-alert
                          v-if="isVisibleWarningEmptyFields"
                          class="py-3 text-start"
                          outlined
                          type="warning"
                          prominent
                          border="left"
                          width="90%"
                        >
                          Some of the input fields are empty!
                        </v-alert></v-row
                      >
                    </v-card-text>

                    <v-card-actions class="justify-end">
                      <v-row class="justify-center mb-10">
                        <v-btn
                          :cols="12"
                          :xs="12"
                          :md="3"
                          :sm="12"
                          color="#153040"
                          class="white--text mb-3 px-8 text-capitalize text-h6 mx-3"
                          style="
                            font-family: 'Jockey One', sans-serif !important;
                          "
                          min-width="8.2rem"
                          @click="emptyData(), (dialog.value = false)"
                        >
                          Close
                        </v-btn>

                        <v-btn
                          :cols="12"
                          :xs="12"
                          :md="3"
                          :sm="12"
                          color="orange"
                          class="white--text px-8 text-capitalize text-h6 mx-3"
                          style="
                            font-family: 'Jockey One', sans-serif !important;
                          "
                          min-width="8.2rem"
                          v-if="!isVisableSuccesModal"
                          @click="addCar"
                        >
                          Add new
                        </v-btn></v-row
                      >
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </div>
          </template></v-col
        >
      </v-row>
    </v-container>

    <div>




      <v-container>
        <v-card flat v-if="!this.user.isAdmin" class="justify-center">
          <v-card-text class="mt-n12 px-12">
            <v-row
              class="text-h4 mt-n12 black--text d-flex ml-0 mb-6"
              style="font-family: 'Jockey One', sans-serif !important"
            >
              Find your car</v-row
            >
            <v-row class="justify-space-between">
              <v-col
                :cols="12"
                :xs="12"
                :md="2"
                :sm="3"
                class="text-h5 black--text"
                style="font-family: 'Jockey One', sans-serif !important"
                >Check-Out</v-col
              >
              <v-col :cols="12" :xs="12" :md="3" :sm="3">
                <v-select
                  color="#153040"
                  item-color="orange"
                  :items="items"
                  label="Location"
                  dense
                  outlined
                  v-model="checkOutLocation"
                ></v-select>
              </v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-dialog
                  ref="dialogdate1"
                  v-model="modalCheckOut"
                  :return-value.sync="dateCheckOut"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateCheckOut"
                      label="Date"
                      color="#153040"
                      readonly
                      dense
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateCheckOut"
                    scrollable
                    color="#153040"
                    :allowed-dates="allowedDates"
                    :min="currentDate"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="#FDA300" @click="modalCheckOut = false">
                      Close
                    </v-btn>
                    <v-btn
                      text
                      color="#FDA300"
                      @click="
                        $refs.dialogdate1.save(dateCheckOut),
                          funkcija(dateCheckOut)
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-dialog
                  ref="dialogtime1"
                  v-model="modalCheckOutTime"
                  :return-value.sync="timeCheckOut"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="timeCheckOut"
                      label="Time"
                      outlined
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      color="#153040"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="modalCheckOutTime"
                    v-model="timeCheckOut"
                    full-width
                    color="#153040"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="#FDA300"
                      @click="modalCheckOutTime = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="#FDA300"
                      @click="$refs.dialogtime1.save(timeCheckOut)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog></v-col
              >
            </v-row>

            <v-row class="justify-space-between topMarginRow">
              <v-col
                :cols="12"
                :xs="12"
                :md="2"
                :sm="3"
                class="text-h5 black--text"
                style="font-family: 'Jockey One', sans-serif !important"
                >Drop Off
              </v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3">
                <v-select
                  color="#153040"
                  item-color="orange"
                  :items="items"
                  label="Location"
                  dense
                  outlined
                  v-model="dropOffLocation"
                ></v-select>
              </v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-dialog
                  ref="dialogdate2"
                  v-model="modalDropOff"
                  :return-value.sync="dateDropOff"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateDropOff"
                      label="Date"
                      color="#153040"
                      readonly
                      dense
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateDropOff"
                    scrollable
                    color="#153040"
                    :allowed-dates="allowedDates"
                    :min="currentDate"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="#FDA300" @click="modalDropOff = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="#FDA300"
                      @click="
                        $refs.dialogdate2.save(dateDropOff),
                          funkcija(dateDropOff)
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-dialog
                  ref="dialogtime2"
                  v-model="modalDropOffTime"
                  :return-value.sync="timeDropOff"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="timeDropOff"
                      label="Time"
                      outlined
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      color="#153040"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="modalDropOffTime"
                    v-model="timeDropOff"
                    full-width
                    color="#153040"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="#FDA300"
                      @click="modalDropOffTime = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="#FDA300"
                      @click="$refs.dialogtime2.save(timeDropOff)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog></v-col
              >
            </v-row>
            <v-row>
              <v-card-text
                v-if="!moreFilterVisible"
                class="black--text justify-center text-center mt-n8"
                >More options
                <br />
                <v-icon
                  @click="moreFilterVisible = !moreFilterVisible"
                  class="text-center justify-center align-center mx-2"
                  color="orange"
                  x-large
                  >mdi-arrow-down-drop-circle</v-icon
                >
              </v-card-text>
              <v-card-text
                v-if="moreFilterVisible"
                class="black--text justify-center text-center mt-n8"
                >Less options
                <br />
                <v-icon
                  @click="moreFilterVisible = !moreFilterVisible"
                  class="text-center justify-center align-center mx-2"
                  color="orange"
                  x-large
                  >mdi-arrow-up-drop-circle</v-icon
                >
              </v-card-text>
            </v-row>

            <hr class="mt-2 mb-n12" v-if="moreFilterVisible" />
          </v-card-text>
          <v-card-text v-if="moreFilterVisible">
            <v-row class="justify-center px-6">
              <v-col :cols="12" :xs="12" :md="12" :sm="12" class="mt-12">
                <v-slider
                  min="100"
                  max="1000"
                  color="#153040"
                  thumb-label="always"
                  track-color="#FDA300"
                  class="mt-6"
                ></v-slider
                ><v-subheader class="pl-0 mx-2 mt-n12 mb-8" color="#153040">
                  Price per day in €
                </v-subheader></v-col
              >
            </v-row>

            <v-row class="justify-center px-6 topMarginRow">
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-text-field
                  label="Make"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-text-field
                  label="Name"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach"
                ><v-text-field
                  label="Body type"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-text-field
                  label="Places"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
            </v-row>

            <v-row class="justify-center px-6 topMarginRow">
              <v-col :cols="12" :xs="12" :md="3" :sm="3">
                <v-text-field
                  label="Doors"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach"
                ><v-text-field
                  label="Power"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-text-field
                  label="Luggage Capacity"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-text-field
                  label="Fuel"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-row class="justify-center text-center mb-6">
              <v-btn
                color="#FDA300"
                class="white--text px-10 text-capitalize text-h6 my-2 mx-2"
                style="font-family: 'Jockey One', sans-serif !important"
                @click="dialog.value = false"
              >
                Search
              </v-btn>

              <v-btn
                color="#153040"
                class="white--text px-10 text-capitalize text-h6 my-2 mx-2"
                style="font-family: 'Jockey One', sans-serif !important"
                @click="dialog.value = false"
              >
                Cancel
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-container>

      <v-container class="mt-n8 mb-8">
        <offeredCar
          v-for="car in cars"
          :key="car._id"
          :id="car._id"
          :carP="car"
          :deleteCarFrontend="deleteCarFrontend"
          :isUser="isUser"
          :dateCheckOut = "new Date(dateCheckOut)"
          :dateDropOff = "new Date(dateDropOff)"
          :checkOutLocation = "checkOutLocation"
          :dropOffLocation = "dropOffLocation"
        />
      
      </v-container>
    </div>
  </div>
</template>

<script>
import offeredCar from "@/components/offeredCar";
import filter1 from "@/components/filter1";

import axios from "axios";

import { mapGetters } from "vuex";

export default {
  data: () => ({
    make: "",
    name: "",
    bodyType: "",
    places: "",
    power: "",
    doors: "",
    luggageCapacity: "",

    fuel: "",
    price: "",
    transmission: "",
    productionYear: "",
    minDriversAge: "",
    currentStation: "",

    imageURL: "",
    isVisibleWarningEmptyFields: false,
    isVisibleSuccesNewCar: false,
    isUser: true,

    isVisableSuccesModal: false,
    searchVisible: false,
    addVisible: false,
    imageName: "",
    cars: [],

    moreFilterVisible: false,

    items: [
      "Pula",
      "Rijeka",
      "Split",
      "Varaždin",
      "Vukovar",
      "Zadar",
      "Zagreb",
    ],

    currentDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateCheckOut: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modalCheckOut: false,
    timeCheckOut: null,

    modalCheckOutTime: false,

    dateDropOff: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modalDropOff: false,
    timeDropOff: null,

    modalDropOffTime: false,

    checkOutLocation: "",
    dropOffLocation: ""
  }),
  components: {
    offeredCar,
    filter1,
  },
  mounted() {
    this.isAdmin();
    this.getCars();
  },
  computed: {
    ...mapGetters({ user: "currentUser" }),
  },

  methods: {
    allowedDates: (val) => parseInt(val.split("-")[2], 10),
    funkcija(a) {
      console.log(a);
    },

    deleteCarFrontend(id) {
      this.cars = this.cars.filter((x) => x._id !== id);
    },

    isEmpty(str) {
      if (str == "") {
        return false;
      } else return true;
    },
    async addCar() {
      try {
        console.log("-------------------------");
        const res = await axios.post("http://localhost:8000/car/add", {
          make: this.make,
          name: this.name,
          bodyType: this.bodyType,
          places: this.places,
          power: this.power,
          doors: this.doors,
          luggageCapacity: this.luggageCapacity,
          fuel: this.fuel,
          imageURL: this.imageURL,
          transmission: this.transmission,
          productionYear: this.productionYear,
          minDriversAge: this.minDriversAge,
          currentStation: this.currentStation,
          price: this.price,
        });
        this.isVisibleSuccesNewCar = true;
        this.isVisableSuccesModal = true;

        this.cars.push(res.data.newCar);
        console.log(res.data.newCar);
        this.addVisible = false;
      } catch (error) {
        this.isVisibleWarningEmptyFields = true;
        setTimeout(() => {
          this.isVisibleWarningEmptyFields = false;
        }, "4000");
        console.log(error.response.data);
        this.error = error.response.data.msg;
      }
    },
    emptyData() {
      this.isVisibleSuccesNewCar = false;
      this.isVisableSuccesModal = false;
      (this.make = ""),
        (this.name = ""),
        (this.bodyType = ""),
        (this.places = ""),
        (this.power = ""),
        (this.doors = ""),
        (this.luggageCapacity = ""),
        (this.fuel = ""),
        (this.imageURL = "");
      this.transmission = "";
      this.productionYear = "";
      this.minDriversAge = "";
      this.price = "";
      this.currentStation = "";
    },
    isAdmin() {
      if (this.user.isAdmin) {
        this.searchVisible = false;
        this.isUser = false;
      } else this.searchVisible = true;
    },
    openUploadModal() {
      this.image = "";
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: "dmp1jlecv",
            upload_preset: "ml_default",
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done uploading..: ", result.info);
              this.imageName = result.info.original_filename;
              this.imageURL = result.info.url;
            }
          }
        )
        .open();
    },

    async getCars() {
      try {
        let res = await axios.get("http://localhost:8000/car");
        this.cars = res.data;
        console.log(this.cars);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.squareBlock {
  width: 100%;
  padding: 3rem;
  border: 1.7px solid black;
}
.topMarginRow {
  margin-top: -2rem !important;
}

@media only screen and (max-width: 959px) {
  .topMargin {
    margin-top: -1.5rem !important;
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
.buttons {
  padding: 3rem !important;
  min-width: 80% !important;
  font-size: 25px !important;
}

.fontSize {
  font-size: 17px;
}
</style>
