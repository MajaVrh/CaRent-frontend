<template>
  <v-container class="skew">
    <v-row class="mt-4">
      <v-col :cols="12" sm="12" xs="12" md="6" lg="6">
        <div
          class="text-h6 black--text"
          style="font-family: 'Jockey One', sans-serif !important"
        >
          Rents from
        </div>
        <v-dialog
          ref="dialogdate1"
          v-model="modalRentsFrom"
          :return-value.sync="dateRentsFrom"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRentsFrom"
              color="#153040"
              readonly
              dense
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="dateRentsFrom"
            scrollable
            color="#153040"
            @change="changeRentsTo"
            :allowed-dates="allowedDates"
            placeholder="Pick date"
          >
            <v-spacer></v-spacer>
            <v-btn text color="#FDA300" @click="modalRentsFrom = false">
              CLOSE
            </v-btn>
            <v-btn
              text
              color="#FDA300"
              @click="$refs.dialogdate1.save(dateRentsFrom)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>

      <v-col :cols="12" sm="12" xs="12" md="6" lg="6">
        <div
          class="text-h6 black--text topMargin"
          style="font-family: 'Jockey One', sans-serif !important"
        >
          Rents until
        </div>
        <v-dialog
          ref="dialogdate2"
          v-model="modalRentsTo"
          :return-value.sync="dateRentsTo"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRentsTo"
              color="#153040"
              readonly
              dense
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="dateRentsTo"
            scrollable
            color="#153040"
            :allowed-dates="allowedDates"
            placeholder="Pick date"
            :min="dateRentsFrom"
          >
            <v-spacer></v-spacer>
            <v-btn text color="#FDA300" @click="modalRentsTo = false">
              CLOSE
            </v-btn>
            <v-btn
              text
              color="#FDA300"
              @click="$refs.dialogdate2.save(dateRentsTo)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row class="mb-6 justify-center">
      <v-btn
        color="#FDA300"
        class="white--text text-capitalize text-h6"
        style="font-family: 'Jockey One', sans-serif !important"
        min-width="8rem"
        max-width="8rem"
        @click="getReports()"
      >
        Search
      </v-btn>
      <v-btn
        color="#153040"
        class="white--text text-capitalize text-h6 mx-3"
        style="font-family: 'Jockey One', sans-serif !important"
        min-width="8rem"
        max-width="8rem"
        @click="(filterResults = null), (totalPrice = 0)"
      >
        Clear
      </v-btn>
    </v-row>
    <v-card width="1000" class="mb-5 mx-auto">
      <v-card-title>Total earnings: {{ totalPrice }}€</v-card-title>
      <div v-for="(filterResult, i) in filterResults" :key="i">
        <hr class="mb-8 mt-2" />
        <report-results :filterResult="filterResult" />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import reportResults from "../components/reportResults.vue";
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      modalRentsTo: false,
      modalRentsFrom: false,
      dateRentsFrom: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      dateRentsTo: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      currentDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      oneDayLater: new Date(),

      oneDayLaterString: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),

      filterResults: null,
      totalPrice: 0,
    };
  },
  components: {
    reportResults,
  },
  methods: {
    changeDateMin() {
      this.oneDayLater = new Date();
      this.oneDayLater.setDate(new Date(this.dateRentsFrom).getDate() + 1);
      this.oneDayLater = moment(this.oneDayLater).format("YYYY-MM-DD");
      this.dateRentsTo = this.oneDayLater;
      this.oneDayLaterString = null;
    },
    allowedDates: (val) => parseInt(val.split("-")[2], 10),
    async getReports() {
      try {
        const res = await axios.post("http://localhost:8000/rent/reports", {
          dateRentsTo: this.dateRentsTo,
          dateRentsFrom: this.dateRentsFrom,
        });
        console.log("res data", res.data);
        this.filterResults = res.data;
        if (this.filterResults.length == 0) {
          this.$toast.error("No cars have been rented at this time", {
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
        let sum = 0;
        for (let carInfo in this.filterResults) {
          sum += this.filterResults[carInfo].totalPrice;
        }
        this.totalPrice = sum;
      } catch (error) {
        console.log(error);
      }
    },
    changeRentsTo() {
      this.dateRentsTo = this.dateRentsFrom;
    },
  },
  mounted() {
    this.oneDayLater = new Date();
    this.oneDayLater.setDate(new Date(this.dateRentsFrom).getDate() + 1);
    this.oneDayLater = moment(this.oneDayLater).format("YYYY-MM-DD");
    this.dateRentsTo = this.oneDayLater;
    this.oneDayLaterString = null;
  },
};
</script>

<style>
@media only screen and (min-width: 600px) {
  .skew {
    width: 55% !important;
  }
}

@media only screen and (max-width: 959px) {
  .topMargin {
    margin-top: -1.5rem !important;
  }
}
</style>
