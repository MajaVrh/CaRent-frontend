<template>
  <div>
    <v-dialog transition="dialog-top-transition" max-width="78%">
      <template v-slot:activator="{ on, attrs }">
        <v-col :cols="12" :xs="12" :md="12" :sm="12" class="text-center">
          <v-btn
            color="#153040"
            class="white--text px-10 text-capitalize text-h6 buttons"
            style="font-family: 'Jockey One', sans-serif !important"
            min-width="10rem"
            max-width="10rem"
            v-bind="attrs"
            v-on="on"
            @click="(searchVisible = !searchVisible), (addVisible = false)"
          >
            Filter cars
          </v-btn></v-col
        >
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-card-text class="pt-12 px-12">
            <v-row
              class="text-h4 mt-2 black--text d-flex ml-0 justify-center mb-6"
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
                  placeholder="Make"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-text-field
                  label="Name"
                  placeholder="Name"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach"
                ><v-text-field
                  label="Body type"
                  placeholder="Body type"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-text-field
                  label="Places"
                  placeholder="Places"
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
                  placeholder="Doors"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach"
                ><v-text-field
                  label="Power"
                  placeholder="Power"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-text-field
                  label="Luggage Capacity"
                  placeholder="Luggage Capacity"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="3" :sm="3" class="topMarginEach">
                <v-text-field
                  label="Fuel"
                  placeholder="Fuel"
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
      </template>
    </v-dialog>
  </div>
</template>
<script>
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
    moreFilterVisible: false,
    searchVisible: false,
    addVisible: false,
    imageName: "",
    cars: [],

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

  methods: {
    allowedDates: (val) => parseInt(val.split("-")[2], 10),
    funkcija(a) {
      console.log(a);
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

.dialogTopMargin {
  margin-top: 10rem !important;
}
</style>
