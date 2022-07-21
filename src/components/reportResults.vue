<template>
  <div class="px-10">
    <v-row align="center">
      <v-col xs="12" md="6" sm="6" lg="4">
        <p class="text-capitalize">
          User: {{ filterResult.user.name }} {{ filterResult.user.surname }}
        </p>
        <p>Vehicle loaction: {{ detailedFilterResult.location }}</p>
        <p>
          Check out date:
          {{ moment(detailedFilterResult.checkOut).format("DD.MM.YYYY") }}
        </p>
        <p>
          Drop off date:
          {{ moment(detailedFilterResult.dropOff).format("DD.MM.YYYY") }}
        </p>
        <p>Rent price: {{ detailedFilterResult.totalPrice }} €</p>
      </v-col>
      <v-col xs="12" md="6" sm="6" lg="8" class="align-center justify-center"
        ><v-img
          width="250"
          height="fit-content"
          :src="detailedFilterResult.car.imageURL"
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
    detailedFilterResult: Object,
  },
};
</script>

<style></style>
