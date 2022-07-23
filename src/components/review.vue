<template>
  <v-container
    class="px-12 black--text my-8"
    style="font-size: 16px"
    height="200"
  >
    <v-row style="width: 100% !important">
      <v-col cols="10" xs="11" md="9" sm="9" lg="9">
        <b>{{ review.name }} {{ review.surname }}</b></v-col
      >
      <v-col cols="2" xs="2" md="3" sm="3" lg="3">
        <v-icon
          @click="deleteReview"
          v-if="user && review.email == user.email"
          size="30"
          color="error"
        >
          mdi-delete-circle
        </v-icon></v-col
      >
    </v-row>
    <v-row>
      <v-rating
        class="pt-n2"
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
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return { rating: 4.5 };
  },
  props: {
    review: Object,
    deleteReviewFrontend: Function,
  },
  computed: {
    ...mapGetters({ user: "currentUser" }),
  },
  methods: {
    ...mapMutations({ setCurrentUser: "setCurrentUser" }),
    async deleteReview() {
      try {
        await axios.delete(
          `https://carentbackend.herokuapp.com/review/delete/${this.review._id}`
        );
        this.deleteReviewFrontend(this.review._id);
        this.$toast.success("Review was deleted sucesfully!", {
          position: "top-center",
          timeout: 4369,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 1.08,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.scrollable {
  overflow-y: scroll;
  max-height: 105px !important;
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
  border-radius: 30px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: orange;
}
</style>
