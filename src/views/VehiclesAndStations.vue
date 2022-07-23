<template>
  <div class="py-0 my-0">
    <v-container mt-12>
      <v-row
        class="text-h4 black--text d-flex justify-strart pr-8 pl-8"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        Rent a car</v-row
      >

      <v-row class="text-h6 font-weight-regular ml-6 mt-6 pr-3">
        <v-card flat>
          Discover all regions of Croatia with ease, safety and confidence! Rent
          a car in Croatia in an affordable way! We offer you the easiest way to
          explore Croatia. With our car rentals, you'll find one of the best
          rental solutions for your business, pleasure or private needs. Choose
          a car from our fleet of the latest models of vehicles at the most
          economical price available.
        </v-card></v-row
      >
    </v-container>

    <hr />
    <v-container mt-12>
      <v-row
        class="text-h4 black--text d-flex justify-strart pr-8 pl-8"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        Our fleet</v-row
      >
      <v-row class="text-h6 font-weight-regular ml-6 mt-6 pr-3">
        <v-card flat>
          We offer 6 car categories: sedan, station-wagon, SUV , crossover, van,
          other.You can find a vehicle that suits you. Choose the type of
          gearbox, number of doors, engine, number of seats ... according to
          your wishes.
        </v-card></v-row
      >
    </v-container>

    <v-container>
      <v-row class="justify-center text-center align-center text-h6">
        <v-col
          :cols="10"
          :xs="8"
          :md="4"
          :sm="4"
          v-for="carPic in carPictures"
          :key="carPic.filename"
        >
          <v-card justify="center" align="center" flat>
            <v-img
              loading="lazy"
              class="img-home mb-5"
              :src="require(`@/assets/${carPic.filename}`)"
              contain
              :aspect-ratio="16 / 9"
              justify="center"
            />
            <p style="margin-top: -2rem" class="carPicName">
              {{ carPic.name }}
            </p></v-card
          >
        </v-col>
      </v-row>
      <v-row class="text-h6 font-weight-regular ml-6 mt-6">
        <v-card flat>
          Go to the

          <b> Rent It </b>
          page where you can filter vehicles by various categories and prices
          and make a vehicle reservation
        </v-card></v-row
      >
    </v-container>
    <hr />
    <v-container>
      <v-row>
        <v-col cols="10" md="6">
          <v-row
            class="text-h4 black--text d-flex justify-strart pr-8 pl-8"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            Stations</v-row
          ><v-row class="text-h6 font-weight-regular ml-6 mt-6">
            <v-card flat>
              You can pick up the vehicle at one of our stations. The stations
              are located in several locations. Station locations:
              <b> Zagreb, Pula, Split, Vinkovci, Dubrovnik, Rijeka</b>. You also
              need to return the vehicle to one of our stations.
            </v-card></v-row
          ></v-col
        >
        <v-col cols="12" md="6" class="mapa">
          <l-map
            :worldCopyJump="true"
            style="height: 300px; z-index: 1 !important"
            :zoom="zoom"
            :maxZoom="15"
            :center="center"
          >
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <div v-for="(marker, index) in markers" :key="index">
              <l-marker :lat-lng="marker.latlng"
                ><l-icon
                  :icon-size="dynamicSize"
                  :icon-anchor="dynamicAnchor"
                  :icon-url="require('@/assets/pin.png')"
                >
                </l-icon>
                <l-tooltip>{{ marker.name }}</l-tooltip>
              </l-marker>
            </div>
          </l-map></v-col
        >
      </v-row>
    </v-container>
    <hr />
    <v-container mt-12>
      <v-row
        class="text-h4 black--text d-flex justify-strart pr-8 pl-8"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        How to rent a vehicle.</v-row
      >
      <v-row class="text-h6 font-weight-regular ml-6 mt-6 pr-3">
        <v-card flat>
          <li>go to the Rent it page</li>
          <li>choose the station/location where you want to rent a vehicle</li>
          <li>select the dates when you want to rent the vehicle</li>
          <li>find the vehicle you want</li>
          <li>fill in the necessary fields and pay via internet banking</li>
          <li>
            pick up the vehicle on the day you chose (you need to have your
            driver's license with you)
          </li>
          <li>
            return the vehicle on the day your rental expires (the employee will
            check if there is any damage on the vehicle)
          </li>
        </v-card></v-row
      >
    </v-container>

    <hr />
    <v-container>
      <v-row class="justify-center text-center align-center margina">
        <v-col
          class="justify-center text-center align-center"
          :cols="12"
          :xs="12"
          :md="4"
          :sm="4"
          ><v-img class="rentit" src="../assets/auto2.png" fill
        /></v-col>
        <v-col :cols="12" :xs="10" :md="4" :sm="4">
          <v-row
            class="text-h5 black--text justify-center align-center"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            You need a car, rent it now!</v-row
          >
          <v-btn
            color="#FDA300"
            class="white--text mt-6 px-15 text-capitalize text-h6"
            style="font-family: 'Jockey One', sans-serif !important"
            @click="goTo()"
          >
            Rent it
          </v-btn></v-col
        >
        <v-col :cols="12" :xs="12" :md="4" :sm="4"
          ><v-img class="mb-3 rentit" src="../assets/auto3.png" fill
        /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LTooltip } from "vue2-leaflet";

export default {
  name: "Vehiclesandstations",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LTooltip,
  },
  data() {
    return {
      carPictures: [
        {
          filename: "sedan.jpg",
          name: "Sedan",
        },
        {
          filename: "station_wagon.jpg",
          name: "Station wagon",
        },
        {
          filename: "crossover.jpg",
          name: "Crossover",
        },
        {
          filename: "suv.png",
          name: "SUV",
        },
        {
          filename: "van.png",
          name: "Van",
        },
        {
          filename: "other.jpg",
          name: "Other",
        },
      ],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 6,

      markers: [
        { latlng: [45.287865, 18.802666], name: "Vinkovci " },
        { latlng: [46.312, 16.361], name: "Varaždin" },
        { latlng: [44.86833, 13.84806], name: "Pula" },
        { latlng: [45.328979, 14.457664], name: "Rijeka" },
        { latlng: [42.640278, 18.108334], name: "Dubrovnik" },
        { latlng: [45.815399, 15.966568], name: "Zagreb" },
        { latlng: [43.508133, 16.440193], name: "Split" },
      ],
      center: [44.714205, 16.956848],
      iconSize: 32,
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
  },
  methods: {
    goTo() {
      try {
        if (this.user) {
          this.$router.push("/RentIt");
        } else this.$router.push("/index");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
p {
  margin-top: -2.5rem;
}

hr {
  margin-top: 4%;
  margin-bottom: 4%;
  padding: 0.2rem 0 !important;
  background-color: rgb(219, 219, 219);
  border: none;
}

a {
  text-decoration: none !important;
}

@media only screen and (max-width: 960px) {
  .mapa {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .margina {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
}

@media only screen and (max-width: 660px) {
  .margina {
    margin-top: 2rem !important;
    margin-bottom: -5rem !important;
  }
  .rentit {
    margin-top: -1rem;
  }
}

.carPicName {
  font-size: 22px;
  font-weight: bold;
}

a {
  text-decoration: none !important;
}

.mapa {
  margin-top: -4%;
  margin-bottom: -4%;
}

.margina {
  margin-bottom: 3rem !important;
}
</style>
