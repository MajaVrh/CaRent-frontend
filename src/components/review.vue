<template>
  <v-container
    class="px-12 black--text my-8"
    style="font-size: 16px"
    height="200"
  >
    <v-row>
      <b>{{ review.name }} {{ review.surname }}</b></v-row
    >
    <v-row>
      <v-rating
        v-model="review.mark"
        color="yellow darken-3"
        background-color="grey darken-1"
        empty-icon="$ratingFull"
        readonly
      ></v-rating
    ></v-row>

    <v-row class="scrollable">{{ review.comment }}</v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return { rating: 4.5 };
  },
  props: {
    review: Object,
  },
};
</script>

<style>
.scrollable {
  overflow-y: scroll;
  max-height: 140px !important;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: orange;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
