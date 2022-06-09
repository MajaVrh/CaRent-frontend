<template>
  <div>
    <v-container class="pr-8 pl-8 mt-12 mb-12">
      <v-row
        class="text-h4 black--text d-flex ml-0"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        Rent it</v-row
      >

      <v-row
        class="justify-center align-center text-center px-12"
        v-if="this.user.isAdmin"
      >
        <v-col :cols="12" :xs="12" :md="5" :sm="12" class="text-center">
          <v-btn
            color="#153040"
            class="white--text px-10 text-capitalize text-h6 buttons"
            style="font-family: 'Jockey One', sans-serif !important"
            min-width="10rem"
            max-width="10rem"
            @click="(searchVisible = !searchVisible), (addVisible = false)"
          >
            Filter cars
          </v-btn></v-col
        >

        <v-col :cols="12" :xs="12" :md="5" :sm="12" class="text-center">
          <v-btn
            color="orange"
            class="white--text px-10 text-capitalize text-h6 buttons"
            style="font-family: 'Jockey One', sans-serif !important"
            min-width="10rem"
            max-width="10rem"
            @click="(addVisible = !addVisible), (searchVisible = false)"
          >
            Add new car
          </v-btn></v-col
        >

        <v-card class="squareBlock mt-12" v-if="addVisible">
          <v-row
            class="text-h4 black--text d-flex ml-0"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            Add new car
          </v-row>
          <v-row class="justify-space-around">
            <v-col :cols="12" :xs="12" :md="5" :sm="12">
              <v-text-field label="Make" color="orange"></v-text-field>
              <v-text-field label="Name" color="orange"></v-text-field>
              <v-text-field label="Body type" color="orange"></v-text-field>
              <v-text-field label="Places" color="orange"></v-text-field>
              <v-text-field label="Power" color="orange"></v-text-field
            ></v-col>
            <v-col :cols="12" :xs="12" :md="5" :sm="12">
              <v-text-field
                class="topMargin"
                label="Doors"
                color="orange"
              ></v-text-field>
              <v-text-field
                label="Luggage Capacity"
                color="orange"
              ></v-text-field>
              <v-text-field
                label="Air conditioning"
                color="orange"
              ></v-text-field>
              <v-text-field label="Fuel" color="orange"></v-text-field>
              <v-file-input
                accept="image/*"
                label="Image "
                color="orange"
                prepend-icon="mdi-camera"
              ></v-file-input
            ></v-col>
          </v-row>
          <v-row class="justify-center">
            <v-btn
              :cols="12"
              :xs="12"
              :md="3"
              :sm="12"
              color="#153040"
              class="white--text mb-3 px-8 text-capitalize text-h6 mx-3"
              style="font-family: 'Jockey One', sans-serif !important"
              min-width="8.2rem"
              @click="addVisible = !addVisible"
            >
              Cancel
            </v-btn>

            <v-btn
              :cols="12"
              :xs="12"
              :md="3"
              :sm="12"
              color="orange"
              class="white--text px-8 text-capitalize text-h6 mx-3"
              style="font-family: 'Jockey One', sans-serif !important"
              min-width="8.2rem"
            >
              Add new
            </v-btn></v-row
          >
        </v-card>
      </v-row>
      <v-card class="squareBlock mt-12" v-if="searchVisible">
        <v-row
          class="text-h4 black--text d-flex ml-0"
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
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="#FDA300"
                  @click="
                    $refs.dialogdate1.save(dateCheckOut), funkcija(dateCheckOut)
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
                <v-btn text color="#FDA300" @click="modalCheckOutTime = false">
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
                    $refs.dialogdate2.save(dateDropOff), funkcija(dateDropOff)
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
                <v-btn text color="#FDA300" @click="modalDropOffTime = false">
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
        <v-row
          class="white--text mt-0 px-15 text-capitalize text-h6 justify-center"
        >
          <v-btn
            color="#153040"
            class="white--text px-10 text-capitalize text-h6"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            Search
          </v-btn></v-row
        >
      </v-card>
    </v-container>
    <hr />

    <v-container>
      <offeredCar />
    </v-container>
    <hr />
  </div>
</template>

<script>
import offeredCar from "@/components/offeredCar";

import { mapGetters } from "vuex";
export default {
  data: () => ({
    items: [
      "Pula",
      "Rijeka",
      "Split",
      "Varaždin",
      "Vukovar",
      "Zadar",
      "Zagreb",
    ],

    searchVisible: false,
    addVisible: false,

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
  }),
  components: {
    offeredCar,
  },
  mounted() {
    this.isAdmin();
  },
  computed: {
    ...mapGetters({ user: "currentUser" }),
  },
  methods: {
    allowedDates: (val) => parseInt(val.split("-")[2], 10),
    funkcija(a) {
      console.log(a);
    },
    isAdmin() {
      if (this.user.isAdmin) {
        this.searchVisible = false;
      } else this.searchVisible = true;
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

@media only screen and (max-width: 600px) {
  .topMarginEach {
    margin-top: -2rem !important;
  }
}

@media only screen and (max-width: 959px) {
  .topMargin {
    margin-top: -1.5rem !important;
  }
}
hr {
  margin-top: 4%;
  margin-bottom: 4%;
  padding: 0.2rem 0 !important;
  background-color: rgb(219, 219, 219);
}

.buttons {
  padding: 3rem !important;
  min-width: 70% !important;
  font-size: 25px !important;
}
</style>
