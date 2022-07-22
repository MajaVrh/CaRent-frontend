<template>
  <div class="px-10">
    <v-row align="center">
      <v-col xs="12" md="6" sm="6" lg="4">
         <p class="text-capitalize">
         <b>  Car: </b>{{ filterResult.car.make  }} {{ filterResult.car.name }}
        </p>
        <p> <b>Vehicle loaction: </b>{{ filterResult.location }}</p>
        <p>
          <b>Check out date: </b>
          {{ moment(filterResult.checkOut).format("DD.MM.YYYY") }}
        </p>
        <p>
          <b>Drop off date: </b>
          {{ moment(filterResult.dropOff).format("DD.MM.YYYY") }}
        </p>
        <p><b> Rent price: </b> {{ filterResult.totalPrice }} €</p>
      </v-col>
      <v-col xs="12" md="6" sm="6" lg="8" class="align-center justify-center"
        ><v-img
          width="250"
          height="fit-content"
          :src="filterResult.car.imageURL"
          class="mx-auto my-auto"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    filterResult: Object,
  },
};
</script>

<style></style>
