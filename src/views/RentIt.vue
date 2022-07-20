<template>
  <div>
    <v-container class="pr-8 pl-8 mt-12 mb-12">
      <v-row class="justify-center align-center text-center mt-8">
        <v-col :cols="12" :xs="12" :md="5" :sm="12" class="my-n4 mx-n8">
          <div v-if="this.user.isAdmin">
            <v-dialog transition="dialog-top-transition" max-width="78%">
              <template v-slot:activator="{ on, attrs }">
                <v-col
                  :cols="12"
                  :xs="12"
                  :md="12"
                  :sm="12"
                  class="text-center"
                >
                  <v-btn
                    color="#153040"
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
                    Filter cars
                  </v-btn></v-col
                >
              </template>
              <template v-slot:default="dialog"> 
              
                <v-card>
                  <v-card-text class="pt-12 px-12">
                    <v-row
                      class="
                        text-h4
                        mt-2
                        black--text
                        d-flex
                        ml-0
                        justify-center
                        mb-6
                      "
                      style="font-family: 'Jockey One', sans-serif !important"
                    >
                      Find your car</v-row
                    >
                    <v-row class="justify-space-around">
                      <v-col :cols="12" :xs="12" :md="4" :sm="4">
                        <div
                          class="text-h6 black--text mb-2 topMarginMainFilter"
                          style="
                            font-family: 'Jockey One', sans-serif !important;
                          "
                        >
                          Location
                        </div>
                        <v-select
                          color="#153040"
                          item-color="orange"
                          :items="items"
                          dense
                          placeholder="Choose location"
                          outlined
                          v-model="location"
                        ></v-select>
                      </v-col>

                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMarginMainFilter"
                      >
                        <div
                          class="text-h6 black--text mb-2"
                          style="
                            font-family: 'Jockey One', sans-serif !important;
                          "
                        >
                          Check-Out date
                        </div>
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
                            @change="changeDateMin"
                            :allowed-dates="allowedDates"
                            placeholder="Pick date"
                            :min="currentDate"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="#FDA300"
                              @click="modalCheckOut = false"
                            >
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

                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMarginMainFilter"
                      >
                        <div
                          class="text-h6 black--text mb-2"
                          style="
                            font-family: 'Jockey One', sans-serif !important;
                          "
                        >
                          Drop Off date
                        </div>
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
                            :min="
                              oneDayLaterString
                                ? oneDayLaterString
                                : oneDayLater
                            "
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="#FDA300"
                              @click="modalDropOff = false"
                            >
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
                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="12"
                        :sm="12"
                        class="mt-12"
                      >
                        <v-slider
                          min="100"
                          max="1000"
                          v-model="price"
                          color="#153040"
                          thumb-label="always"
                          track-color="#FDA300"
                          class="mt-6"
                        ></v-slider
                        ><v-subheader
                          class="pl-0 mx-2 mt-n12 mb-8"
                          color="#153040"
                        >
                          Price per day in €
                        </v-subheader></v-col
                      >
                    </v-row>

                    <v-row class="justify-center px-6 topMarginRow">
                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMargin"
                      >
                        <v-text-field
                          v-model="make"
                          label="Make"
                          outlined
                          dense
                          color="#153040"
                        ></v-text-field
                      ></v-col>
                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMargin"
                      >
                        <v-text-field
                          v-model="name"
                          label="Name"
                          outlined
                          dense
                          color="#153040"
                        ></v-text-field
                      ></v-col>
                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMargin"
                        ><v-select
                          v-model="bodyType"
                          label="Body type"
                          :items="bodyTypeItems"
                          outlined
                          dense
                          color="#153040"
                        ></v-select
                      ></v-col>
                    </v-row>

                    <v-row class="justify-center px-6">
                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMargin"
                      >
                        <v-text-field
                          v-model="seats"
                          label="Seats"
                          outlined
                          dense
                          color="#153040"
                        ></v-text-field
                      ></v-col>

                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMargin"
                        ><v-text-field
                          v-model="power"
                          label="Power"
                          outlined
                          dense
                          color="#153040"
                        ></v-text-field
                      ></v-col>

                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMargin"
                      >
                        <v-select
                          v-model="fuel"
                          label="Fuel"
                          outlined
                          dense
                          :items="fuelItems"
                          color="#153040"
                        ></v-select
                      ></v-col>
                    </v-row>
                    <v-row class="justify-center px-6">
                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMargin"
                      >
                        <v-text-field
                          v-model="luggageCapacity"
                          label="Luggage capacity"
                          outlined
                          dense
                          color="#153040"
                        ></v-text-field
                      ></v-col>
                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMargin"
                      >
                        <v-text-field
                          v-model="productionYear"
                          label="Production Year"
                          outlined
                          dense
                          color="#153040"
                        ></v-text-field
                      ></v-col>
                      <v-col
                        :cols="12"
                        :xs="12"
                        :md="4"
                        :sm="4"
                        class="topMargin"
                      >
                        <v-select
                          v-model="transmission"
                          label="Transmission"
                          outlined
                          dense
                          :items="transmissionItems"
                          color="#153040"
                        ></v-select
                      ></v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-row class="justify-center text-center mb-6">
                      <v-btn
                        color="#153040"
                        class="
                          white--text
                          px-10
                          text-capitalize text-h6
                          my-2
                          mx-2
                        "
                        style="font-family: 'Jockey One', sans-serif !important"
                        @click="dialog.value = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="#153040"
                        class="
                          white--text
                          px-10
                          text-capitalize text-h6
                          my-2
                          mx-2
                        "
                        style="font-family: 'Jockey One', sans-serif !important"
                        @click="emptyData()"
                      >
                        Clear
                      </v-btn>
                      <v-btn
                        color="#FDA300"
                        class="
                          white--text
                          px-10
                          text-capitalize text-h6
                          my-2
                          mx-2
                        "
                        style="font-family: 'Jockey One', sans-serif !important"
                        @click="getCars(), (dialog.value = false), isSearched = true"
                      >
                        Search
                      </v-btn>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div></v-col
        >
        <v-col :cols="12" :xs="12" :md="5" :sm="12" class="my-n4 mx-n8">
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
                        class="
                          text-h4
                          mt-2
                          black--text
                          d-flex
                          mb-4
                          justify-center
                        "
                        style="font-family: 'Jockey One', sans-serif !important"
                      >
                        New car</v-row
                      >
                      <v-row
                        class="black--text fontSize justify-center"
                        style="padding: 2% 8%"
                      >
                        <v-col :cols="12" :xs="12" :md="3" :sm="4" class="mx-2">
                          <v-row class="mb-2">
                            <p><b>Make: </b> {{ make }}</p></v-row
                          >
                          <v-row class="mb-2"
                            ><p><b>Name: </b> {{ name }}</p></v-row
                          >
                          <v-row class="mb-2">
                            <p><b>Body type: </b> {{ bodyType }}</p>
                          </v-row>
                          <v-row class="mb-2">
                            <p><b>Seats: </b> {{ seats }}</p>
                          </v-row>
                          <v-row class="mb-0">
                            <p><b>Doors: </b> {{ doors }}</p></v-row
                          >
                        </v-col>
                        <v-col :cols="12" :xs="7" :md="3" :sm="4" class="mx-2">
                          <v-row class="mb-2">
                            <p>
                              <b>Luggage Capacity: </b> {{ luggageCapacity }}
                            </p></v-row
                          >
                          <v-row class="mb-2">
                            <p><b>Power: </b> {{ power }}</p>
                          </v-row>
                          <v-row class="mb-2">
                            <p>
                              <b>Driver licence category: </b>
                              {{ driverLicenceCategory }}
                            </p></v-row
                          >
                          <v-row class="mb-2">
                            <p>
                              <b>Production year: </b> {{ productionYear }}
                            </p></v-row
                          >
                          <v-row class="mb-2">
                            <p><b>Current station: </b> {{ location }}</p>
                          </v-row>
                        </v-col>
                        <v-col :cols="12" :xs="12" :md="3" :sm="6">
                          <v-img
                            :src="imageURL"
                            max-width="250"
                            class="offeredCarImg ml-2"
                          ></v-img
                        ></v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-text v-if="!isVisableSuccesModal">
                      <v-row
                        class="
                          text-h4
                          mt-2
                          black--text
                          d-flex
                          ml-0
                          justify-center
                        "
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
                          <v-select
                            color="#153040"
                            item-color="orange"
                            :items="bodyTypeItems"
                            label="Body type"
                            v-model="bodyType"
                          ></v-select>

                          <v-text-field
                            v-model="seats"
                            label="Seats"
                            color="orange"
                          ></v-text-field>
                          <v-text-field
                            v-model="luggageCapacity"
                            label="Luggage Capacity"
                            color="orange"
                          ></v-text-field>

                          <v-select
                            color="#153040"
                            item-color="orange"
                            :items="transmissionItems"
                            label="Transmission"
                            v-model="transmission"
                          ></v-select>
                          <v-text-field
                            v-model="power"
                            label="Power (hp)"
                            color="orange"
                          ></v-text-field
                        ></v-col>
                        <v-col :cols="12" :xs="12" :md="5" :sm="12">
                          <v-select
                            color="#153040"
                            item-color="orange"
                            :items="fuelItems"
                            label="Fuel"
                            v-model="fuel"
                          ></v-select>
                          <v-text-field
                            v-model="doors"
                            label="Doors"
                            color="orange"
                          ></v-text-field>

                          <v-text-field
                            v-model="productionYear"
                            label="Production year"
                            color="orange"
                          ></v-text-field>
                          <v-text-field
                            v-model="driverLicenceCategory"
                            label="Driver licence category"
                            color="orange"
                          ></v-text-field>

                          <v-select
                            color="#153040"
                            item-color="orange"
                            :items="items"
                            label="Current station"
                            placeholder="Choose location"
                            v-model="location"
                          ></v-select>

                          <v-text-field
                            v-model="price"
                            label="Price (€)"
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
                    </v-card-text>

                    <v-card-actions class="justify-end">
                      <v-row class="justify-center mb-10">
                        <v-btn
                          :cols="12"
                          :xs="12"
                          :md="3"
                          :sm="12"
                          color="#153040"
                          class="
                            white--text
                            mb-3
                            px-8
                            text-capitalize text-h6
                            mx-3
                          "
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
    <!----------------





----------->
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
            <v-row class="justify-space-around">
              <v-col
                :cols="12"
                :xs="12"
                :md="4"
                :sm="4"
                class="topMarginMainFilter"
              >
                <div
                  class="text-h6 black--text mb-2"
                  style="font-family: 'Jockey One', sans-serif !important"
                >
                  Location
                </div>
                <v-select
                  color="#153040"
                  item-color="orange"
                  :items="items"
                  dense
                  placeholder="Choose location"
                  outlined
                  v-model="location"
                ></v-select>
              </v-col>

              <v-col
                :cols="12"
                :xs="12"
                :md="4"
                :sm="4"
                class="topMarginMainFilter"
              >
                <div
                  class="text-h6 black--text mb-2"
                  style="font-family: 'Jockey One', sans-serif !important"
                >
                  Check-Out date
                </div>
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
                    @change="changeDateMin"
                    :allowed-dates="allowedDates"
                    placeholder="Pick date"
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

              <v-col
                :cols="12"
                :xs="12"
                :md="4"
                :sm="4"
                class="topMarginMainFilter"
              >
                <div
                  class="text-h6 black--text mb-2"
                  style="font-family: 'Jockey One', sans-serif !important"
                >
                  Drop Off date
                </div>
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
                    :min="oneDayLaterString ? oneDayLaterString : oneDayLater"
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
                  v-model="price"
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
              <v-col :cols="12" :xs="12" :md="4" :sm="4" class="topMargin">
                <v-text-field
                  v-model="make"
                  label="Make"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="4" :sm="4" class="topMargin">
                <v-text-field
                  v-model="name"
                  label="Name"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="4" :sm="4" class="topMargin"
                ><v-select
                  v-model="bodyType"
                  label="Body type"
                  :items="bodyTypeItems"
                  outlined
                  dense
                  color="#153040"
                ></v-select
              ></v-col>
            </v-row>

            <v-row class="justify-center px-6">
              <v-col :cols="12" :xs="12" :md="4" :sm="4" class="topMargin">
                <v-text-field
                  v-model="seats"
                  label="Seats"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>

              <v-col :cols="12" :xs="12" :md="4" :sm="4" class="topMargin"
                ><v-text-field
                  v-model="power"
                  label="Power"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>

              <v-col :cols="12" :xs="12" :md="4" :sm="4" class="topMargin">
                <v-select
                  v-model="fuel"
                  label="Fuel"
                  outlined
                  dense
                  :items="fuelItems"
                  color="#153040"
                ></v-select
              ></v-col>
            </v-row>
            <v-row class="justify-center px-6">
              <v-col :cols="12" :xs="12" :md="4" :sm="4" class="topMargin">
                <v-text-field
                  v-model="luggageCapacity"
                  label="Luggage capacity"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="4" :sm="4" class="topMargin">
                <v-text-field
                  v-model="productionYear"
                  label="Production Year"
                  outlined
                  dense
                  color="#153040"
                ></v-text-field
              ></v-col>
              <v-col :cols="12" :xs="12" :md="4" :sm="4" class="topMargin">
                <v-select
                  v-model="transmission"
                  label="Transmission"
                  outlined
                  dense
                  :items="transmissionItems"
                  color="#153040"
                ></v-select
              ></v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-row class="justify-center text-center mb-6">
              <v-btn
                color="#FDA300"
                class="white--text text-capitalize text-h6 my-2 mx-2"
                style="font-family: 'Jockey One', sans-serif !important"
                @click="getCars(), isSearched = true"
                min-width="8rem"
                max-width="8rem"
              >
                Search
              </v-btn>

              <v-btn
                color="#153040"
                class="white--text text-capitalize text-h6 my-2 mx-2"
                style="font-family: 'Jockey One', sans-serif !important"
                min-width="8rem"
                max-width="8rem"
                @click="emptyData()"
              >
                Clear
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-container>
      <div v-if="isSearched">
      <v-container class="mt-n8 mb-8" v-for="car in cars" :key="car._id">
  
        <offeredCar
          class="justify-center"
          :id="car._id"
          :carP="car"
          :deleteCarFrontend="deleteCarFrontend"
          :isUser="isUser"
          :dateCheckOut="new Date(dateCheckOut)"
          :dateDropOff="new Date(dateDropOff)"
          :location="location"
          
        />
     
      </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import offeredCar from "@/components/offeredCar";

import axios from "axios";
import moment from "moment";
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    make: "",
    name: "",
    bodyType: "",
    seats: "",
    power: "",
    doors: "",
    isSearched: false,
    luggageCapacity: "",
    fuel: "",
    price: 1000,
    transmission: "",
    productionYear: "",
    driverLicenceCategory: "",
    location: "",

    imageURL: "",

    isUser: true,

    isVisableSuccesModal: false,
    searchVisible: false,
    addVisible: false,
    imageName: "",
    cars: [],

    moreFilterVisible: false,
    bodyTypeItems: [
      "Sedan",
      "Station wagon",
      "Crossover",
      "SUV",
      "Van",
      "Hatchback",
      "Other",
    ],
    items: [
      "Pula",
      "Rijeka",
      "Split",
      "Varaždin",
      "Vukovar",
      "Zadar",
      "Zagreb",
    ],

    transmissionItems: ["Manual", "Automatic"],

    fuelItems: ["Diesel", "Petrol", "LPG", "Electric", "Hybrid"],

    currentDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
      dateCheckOut: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modalCheckOut: false,
    timeCheckOut: null,

    oneDayLater: new Date(),

    oneDayLaterString: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),

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
    if(this.user.isAdmin){this.isSearched=true}
    this.rentSuccessful();
    this.isAdmin();
    this.getCars();
    this.oneDayLater = new Date();
    this.oneDayLater.setDate(new Date(this.dateCheckOut).getDate() + 1);
    this.oneDayLater = moment(this.oneDayLater).format("YYYY-MM-DD");
    this.dateDropOff = this.oneDayLater;
    this.oneDayLaterString = null;
  },
  computed: {
    ...mapGetters({ user: "currentUser", isRented: "isRented" }),
  },

  methods: {
    changeDateMin() {
      this.oneDayLater = new Date();
      this.oneDayLater.setDate(new Date(this.dateCheckOut).getDate() + 1);

      this.oneDayLater = moment(this.oneDayLater).format("YYYY-MM-DD");
      this.dateDropOff = this.oneDayLater;
      this.oneDayLaterString = null;
    },
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
    rentSuccessful() {
      if (this.isRented) {
        this.$toast.success("Rented succesfully", {
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
          rtl: false,
        });
      }
    },

    alertEmptyFiled() {
      this.$toast.error("Some of the input fields are empty!", {
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
        rtl: false,
      });
    },

    alertAddCar() {
      this.$toast.success("You have successfully added a new car!", {
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
        rtl: false,
      });
    },

    async addCar() {
      try {
        console.log("-------------------------");
        const res = await axios.post("http://localhost:8000/car/add", {
          make: this.make,
          name: this.name,
          bodyType: this.bodyType,
          seats: this.seats,
          power: this.power,
          doors: this.doors,
          luggageCapacity: this.luggageCapacity,
          fuel: this.fuel,
          imageURL: this.imageURL,
          transmission: this.transmission,
          productionYear: this.productionYear,
          driverLicenceCategory: this.driverLicenceCategory,
          location: this.location,
          price: this.price,
        });

        this.isVisableSuccesModal = true;
        this.alertAddCar();
        this.cars.push(res.data.newCar);
        console.log(res.data.newCar);
        this.addVisible = false;
      } catch (error) {
        this.alertEmptyFiled();
        console.log(error.response.data);
        this.error = error.response.data.msg;
      }
    },
    emptyData() {
      this.isVisableSuccesModal = false;
      (this.make = ""),
        (this.name = ""),
        (this.bodyType = ""),
        (this.seats = ""),
        (this.power = ""),
        (this.doors = ""),
        (this.luggageCapacity = ""),
        (this.fuel = ""),
        (this.imageURL = "");
      this.transmission = "";
      this.productionYear = "";
      this.driverLicenceCategory = "";
      this.price = 1000;
      this.location = "";
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
        let res = await axios.post("http://localhost:8000/car", {
          make: this.make,
          name: this.name,
          bodyType: this.bodyType,
          seats: this.seats,
          power: this.power,
          doors: this.doors,
          luggageCapacity: this.luggageCapacity,
          fuel: this.fuel,
          imageURL: this.imageURL,
          transmission: this.transmission,
          productionYear: this.productionYear,
          driverLicenceCategory: this.driverLicenceCategory,
          location: this.location,
          price: Number(this.price),
          dateCheckOut: this.dateCheckOut,
          dateDropOff: this.dateDropOff,
        });
        console.log(this.make);
        this.cars = res.data;

        console.log(this.cars);
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations({ setRentedState: "setRentedState" }),
  },
  beforeDestroy() {
    this.setRentedState(false);
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
.topMargin {
  margin-top: -1.5rem !important;
}

@media only screen and (max-width: 959px) {
  .topMargin {
    margin-top: -1.5rem !important;
  }
  .topMarginMainFilter {
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
