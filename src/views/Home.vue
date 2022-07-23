<template>
  <div class="py-0 my-0">
    <div>
      <v-img class="img-home" height="20rem" src="../assets/image_2.png">
        <span
          class="text-h2 white--text bigTXT"
          style="font-family: 'Jockey One', sans-serif !important"
          >Rent a car!</span
        >
      </v-img>
    </div>
    <v-container class="mt-12 d-flex justify-space-around">
      <v-card flat tile class="lighten-1 white--text text-center">
        <v-row
          class="text-h4 black--text d-flex justify-center"
          style="font-family: 'Jockey One', sans-serif !important"
        >
          Why CaRent?</v-row
        >
        <v-row class="justify-space-between text-h6 font-weight-regular">
          <v-col :cols="12" :xs="12" :md="4" :sm="12">
            <v-card flat>
              All our cars are completely correct, because they are regularly
              serviced and maintained, and cleaned and disinfected before each
              rental.
            </v-card>
          </v-col>
          <v-col :cols="12" :xs="12" :md="4" :sm="12">
            <v-card flat>
              They are also fully equipped with all the necessary and modern
              features, ensuring maximum comfort and safety for our customers.
            </v-card>
          </v-col>
          <v-col :cols="12" :xs="12" :md="4" :sm="12">
            <v-card flat>
              Traveling with one of our great cars through all of Croatia wiil
              be good time for your business or private trip is guaranteed.
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <hr />
    <v-container>
      <v-row
        class="text-h4 black--text d-flex pr-8 pl-8"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        About us</v-row
      >
      <v-row class="text-h6 font-weight-regular pl-6 pr-6">
        <v-col :cols="12" :xs="9" :md="7" :sm="12">
          <v-card flat>
            Our offices are located in the centers of some of the most
            attractive cities and their airports. Find us at seven easily
            accessible locations throughout Croatia -
            <b>
              Zagreb, Pula, Split, Vukovar, Dubrovnik, Rijeka, Varaždin,
              Vinkovci</b
            >
            . <br />
            Whether you are on a holiday or just passing through we are here to
            make your time easy and comfortable. Our vehicle fleet is consisted
            of various group and models, all new, a/c equipped, manual or
            automatic transmission, gps, child seat, wi-fi ... simply choose
            your preferences and enjoy your trip.
          </v-card>
        </v-col>
        <v-col
          :cols="12"
          :xs="3"
          :md="5"
          :sm="8"
          class="justify-center text-center align-center"
        >
          <v-card flat>
            <v-img
              loading="lazy"
              class="img-home-car"
              src="../assets/auto1.png"
              fill
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <hr />
    <v-container>
      <v-row
        class="text-h4 black--text d-flex justify-strart pr-8 pl-8"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        Rental conditions</v-row
      >

      <v-row class="text-h6 font-weight-regular d-flex ml-6 mt-6">
        <v-card flat>
          <li>identity card or passport with a minimum age of 18 years</li>
          <li>full rent by payment to a transaction account</li>
          <li>
            driving license required, the category depends on the vehicle you
            rent
          </li>
        </v-card></v-row
      >
    </v-container>
    <hr />

    <v-container class="text-h6 font-weight-regular">
      <v-row
        class="text-h4 black--text d-flex pr-8 pl-8"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        User reviews</v-row
      >

      <v-sheet flat class="mx-auto mx-n10 reviews" min-width="100%">
        <v-slide-group class="py-4 px-3" center-active show-arrows>
          <v-slide-item v-for="review in reviews" :key="review._id">
            <v-card
              class="mx-4 my-6 animacija"
              height="250"
              width="246"
              :elevation="10 - 1"
            >
              <v-row align="center" justify="center">
                <review
                  :review="review"
                  :deleteReviewFrontend="deleteReviewFrontend"
                />
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

      <v-row class="ml-12" v-if="user && !user.isAdmin">
        Write your review for CaRent!</v-row
      >
      <v-dialog v-model="dialog" persistent max-width="800">
        <template v-slot:activator="{ on, attrs }">
          <v-row class="ml-12">
            <v-btn
              color="#153040"
              class="white--text px-7 mt-6 py-2 text-capitalize text-h6 justify-center align-center align-text"
              style="font-family: 'Jockey One', sans-serif !important"
              v-bind="attrs"
              v-on="on"
              v-if="user && !user.isAdmin"
              >Write review</v-btn
            ></v-row
          >
        </template>
        <v-card class="px-6 pt-4">
          <v-card-title
            class="text-h5"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            Write your review
          </v-card-title>
          <v-card-text style="font-size: 18px; color: black"
            >Here you can write your review for CaRent. We appreciate your
            opinion!</v-card-text
          >
          <v-card-text class="m-0 p-0">
            <v-rating
              class="mb-2 mt-n4"
              v-model="rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              icon-label="custom icon label text {0} of {1}"
            ></v-rating>
            <v-textarea
              outlined
              name="body"
              v-model="comment"
              placeholder="You can write your opinion here!"
              label="You can write your opinion here!"
              color="#153040"
              min-height="200"
            ></v-textarea>
          </v-card-text>

          <v-card-actions class="mt-n3 justify-center text-center">
            <v-row class="mt-n6 mb-4 justify-center text-center">
              <v-btn
                color="#FDA300"
                class="white--text my-1 px-10 text-capitalize text-h6 mx-2"
                style="font-family: 'Jockey One', sans-serif !important"
                width="8rem"
                type="submit"
                @click="addReview()"
                >Comment
              </v-btn>

              <v-btn
                color="#153040"
                class="white--text my-1 px-10 text-capitalize text-h6 mx-2"
                style="font-family: 'Jockey One', sans-serif !important"
                width="8rem"
                @click="dialog = false"
              >
                Cancel
              </v-btn></v-row
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
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
          ><v-img loading="lazy" class="rentit" src="../assets/auto2.png" fill
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
            :to="{ name: 'RentIt' }"
          >
            Rent it
          </v-btn></v-col
        >
        <v-col :cols="12" :xs="12" :md="4" :sm="4"
          ><v-img
            loading="lazy"
            class="mb-3 rentit"
            src="../assets/auto3.png"
            fill
        /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import review from "@/components/review";
export default {
  name: "Home",
  components: { review },

  data: () => ({
    rating: 5,
    dialog: false,
    comment: "",

    reviews: [],
  }),
  mounted() {
    this.getReview();
  },
  computed: {
    ...mapGetters({ user: "currentUser" }),
  },
  methods: {
    ...mapMutations({ setCurrentUser: "setCurrentUser" }),
    async addReview() {
      try {
        if (this.comment) {
          await axios.post("https://carentbackend.herokuapp.com/review/add", {
            name: this.user.name,
            surname: this.user.surname,
            mark: this.rating,
            comment: this.comment,
            email: this.user.email,
          });
          this.getReview();
          this.comment = "";
          this.rating = 5;

          this.dialog = false;
          this.alertReviewSuccess();
        } else {
          this.alertCommentNeeded();
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteReviewFrontend(id) {
      this.reviews = this.reviews.filter((x) => x._id !== id);
    },

    alertCommentNeeded() {
      this.$toast.error("You need to write a comment!", {
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
    alertReviewSuccess() {
      this.$toast.success(
        "Your review has been successfully added. Thank you!",
        {
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
        }
      );
    },

    async getReview() {
      try {
        let res = await axios.get("https://carentbackend.herokuapp.com/reviews");
        this.reviews = res.data;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
body {
  overflow-x: hidden;
}

.bigTXT {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 4rem;
}

hr {
  margin-top: 4%;
  margin-bottom: 4%;
  border: none;
  padding: 0.2rem 0 !important;
  background-color: rgb(219, 219, 219);
}

.margina {
  margin-top: -2rem;
}

@media only screen and (max-width: 960px) {
  .img-home-car {
    margin-left: 40%;
    width: 75%;
    display: flex;
    justify-content: center;
  }
}

@media only screen and (max-width: 860px) {
  .img-home-car {
    margin-left: 40%;
    width: 70%;
    display: flex;
    justify-content: center;
  }
}

@media only screen and (max-width: 600px) {
  .img-home-car {
    width: 70%;
    margin-left: 10%;
    display: flex;
    justify-content: center;
  }

  .margina {
    margin-top: 2rem !important;
    margin-bottom: -5rem !important;
  }
  .rentit {
    margin-top: -1rem;
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

.animacija {
  animation-name: animacija;
  animation-duration: 0.5s;
  animation-direction: normal;
  animation-timing-function: ease-in;
}

@keyframes animacija {
  0% {
    opacity: 0;
    transform: translateY(10%);
    transition: all 1s cubic-bezier(0.36, 0.69, 0.3, 0.64);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
