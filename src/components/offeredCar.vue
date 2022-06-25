<template>
  <div v-if="car">
    <hr />
    <v-container class="justify-center px-10">
      <v-row
        class="text-h4 black--text ml-0"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        {{ car.make }}{{ car.name }}</v-row
      >
      <v-row class="justify-center align-center">
        <v-col sm="4" md="3" xs="12">
          <p>Doors: {{ car.doors }}</p>
          <p>Places: {{ car.places }}</p>
          <p>Body type: {{ car.bodyType }}</p>
          <p>Transmission: {{ car.transmission }}</p>
          <p>Power: {{ car.power }}</p>
        </v-col>
        <v-col sm="4" md="3" xs="12">
          <p>Fuel: {{ car.fuel }}</p>
          <p>Luggage Capacity: {{ car.luggageCapacity }}</p>
          <p>Min driver age: {{ car.minDriversAge }}</p>
          <p>Production year: {{ car.productionYear }}</p>
          <p>Current station: {{ car.currentStation }}</p>
        </v-col>
        <v-col :cols="12" sm="4" md="3" xs="12">
          <v-row class="mt-n4 justify-center">
            <v-img
              :src="car.imageURL"
              max-width="255"
              class="offeredCarImg mb-8"
            ></v-img
          ></v-row>
        </v-col>
        <v-col cols="12" sm="4" md="" xs="12" class="text-center mx-8">
          <v-row
            class="text-h5 black--text mb-2 justify-center text-center mt-n8 priceText"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            {{ car.price }}€ per Day</v-row
          >
          <v-row class="justify-center">
            <v-btn
              color="#FDA300"
              class="white--text px-10 text-capitalize text-h6"
              v-if="isUser"
              style="font-family: 'Jockey One', sans-serif !important"
            >
              Rent it
            </v-btn></v-row
          >
          <v-row class="text-center justify-center align-center">
            <v-dialog transition="dialog-top-transition" max-width="78%">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="text-center justify-center align-center mx-2"
                  color="orange"
                  v-if="!isUser"
                  x-large
                  v-bind="attrs"
                  v-on="on"
                  >mdi-pencil-circle</v-icon
                >
              </template>
              <template v-slot:default="dialog">
                <v-card class="pt-12">
                  <v-card-text class="mt-n12 pt-12 px-12">
                    <v-row
                      class="text-h4 mt-2 black--text d-flex ml-0 justify-center"
                      style="font-family: 'Jockey One', sans-serif !important"
                    >
                      Edit car information
                    </v-row></v-card-text
                  >

                  <v-card-text>
                    <v-row class="justify-center mt-4">
                      <v-col class="mx-12" :cols="12" :xs="12" :md="4" :sm="10">
                        <v-text-field
                          v-model="newMake"
                          label="Make"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-model="newName"
                          label="Name"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-model="newBodyType"
                          label="Body type"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-model="newPlaces"
                          label="Places"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-model="newDoors"
                          label="Doors"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-model="newLuggageCapacity"
                          label="Luggage Capacity"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-model="newPower"
                          label="Power"
                          color="orange"
                        ></v-text-field
                      ></v-col>
                      <v-col class="mx-12" :cols="12" :xs="12" :md="4" :sm="10">
                        <v-text-field
                          v-model="newFuel"
                          label="Fuel"
                          class="topMargin"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-model="newTransmission"
                          label="Transmission"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-model="newProductionYear"
                          label="Production Year"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-model="newMinDriversAge"
                          label="Min Drivee Age"
                          color="orange"
                        >
                        </v-text-field>
                        <v-text-field
                          v-model="newPrice"
                          label="Price"
                          color="orange"
                        ></v-text-field>

                        <v-text-field
                          v-model="newCurrentStation"
                          label="Current station"
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
                              :src="newImgURL"
                              max-width="190"
                              class="mx-auto align-center"
                            ></v-img
                          ></v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-row class="justify-center mb-8">
                      <v-btn
                        :cols="12"
                        :xs="12"
                        :md="3"
                        :sm="12"
                        color="#153040"
                        class="white--text mb-3 px-8 text-capitalize text-h6 mx-3"
                        style="font-family: 'Jockey One', sans-serif !important"
                        min-width="8.2rem"
                        @click="dialog.value = false"
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
                        @click="updateCar(), (dialog.value = false)"
                      >
                        Confirm
                      </v-btn></v-row
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <v-icon
              color="error"
              class="mx-2"
              x-large
              @click="isVisableDelete = !isVisableDelete"
              v-if="!isUser"
              >mdi-delete-circle</v-icon
            ></v-row
          ></v-col
        >
      </v-row>

      <v-alert
        v-if="isVisableDelete"
        prominent
        outlined
        text
        type="error"
        class="mt-6"
      >
        <v-row align="center">
          <v-col :cols="12" :xs="12" :md="6" :sm="5" class="grow"
            >This car will be deleted!</v-col
          >
          <v-col :cols="10" :xs="8" :md="6" :sm="7" class="shrink">
            <v-row class="justify-end mr-2 ml-1">
              <v-btn
                min-width="7.5rem"
                color="white"
                class="error--text text-capitalize mx-2 my-1"
                @click="isVisableDelete = !isVisableDelete"
                >Cancel
              </v-btn>
              <v-btn
                min-width="7.5rem"
                color="error"
                class="text-capitalize mx-2 my-1"
                @click="deleteCar"
                >Take action</v-btn
              ></v-row
            >
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        class="mt-8"
        type="success"
        outlined
        text
        v-if="isVisibleAlertSuccess"
        >You have successfully made changes!</v-alert
      >
    </v-container>
  </div>
</template>

<script scoped>
import axios from "axios";
export default {
  name: "offeredCar",
  data: () => ({
    newMake: "",
    newName: "",
    newBodyType: "",
    newPlaces: "",
    newPower: "",
    newDoors: "",
    newLuggageCapacity: "",

    newFuel: "",
    newImgName: "",
    newImgURL: "",
    newTransmission: "",
    newProductionYear: "",
    newMinDriversAge: "",
    newPrice: "",
    newCurrentStation: "",

    isVisibleAlertSuccess: false,
    isVisableDelete: false,
    car: null,
  }),
  props: {
    carName: Number,
    carP: Object,
    deleteCarFrontend: Function,
    isUser: Boolean,
  },
  mounted() {
    this.setCarInfo();
  },

  methods: {
    async deleteCar() {
      try {
        await axios.delete(`http://localhost:8000/car/delete/${this.car._id}`);
        this.deleteCarFrontend(this.car._id);
      } catch (error) {
        console.log(error);
      }
    },

    async setCarInfo() {
      try {
        this.car = this.carP;
        this.newMake = this.car.make;
        this.newName = this.car.name;
        this.newBodyType = this.car.bodyType;
        this.newPlaces = this.car.places;
        this.newPower = this.car.power;
        this.newDoors = this.car.doors;
        this.newLuggageCapacity = this.car.luggageCapacity;

        this.newFuel = this.car.fuel;
        this.newImgURL = this.car.imageURL;
        this.newTransmission = this.car.transmission;
        this.newProductionYear = this.car.productionYear;
        this.newMinDriversAge = this.car.minDriversAge;
        this.newPrice = this.car.price;
        this.newCurrentStation = this.car.currentStation;
      } catch (error) {
        console.log(error);
      }
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
              this.newImgName = result.info.original_filename;
              this.newImgURL = result.info.url;
            }
          }
        )
        .open();
    },

    isEmpty(str) {
      if (str == "") {
        return false;
      } else return true;
    },
    async updateCar() {
      try {
        const res = await axios.post(
          `http://localhost:8000/car/update/${this.car._id}`,
          {
            newMake: this.newMake,
            newName: this.newName,
            newBodyType: this.newBodyType,
            newPlaces: this.newPlaces,
            newPower: this.newPower,
            newDoors: this.newDoors,
            newLuggageCapacity: this.newLuggageCapacity,

            newFuel: this.newFuel,
            newImgURL: this.newImgURL,
            newTransmission: this.newTransmission,
            newProductionYear: this.newProductionYear,
            newMinDriversAge: this.newMinDriversAge,
            newCurrentStation: this.newCurrentStation,
            newPrice: this.newPrice,
          }
        );
        console.log(res.data);

        this.car = res.data;
        this.isVisibleAlertSuccess = true;
        setTimeout(() => {
          this.isVisibleAlertSuccess = false;
        }, "3000");
        //    window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@media only screen and (max-width: 700px) {
  .offeredCarImg {
    width: 250px;
    margin-left: 1rem !important;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
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

@media only screen and (max-width: 959px) {
  .topMargin {
    margin-top: -1.5rem !important;
  }
}
</style>
