<template>
  <v-container class="py-10">
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-card width="800" class="py-8 mb-15" flat :elevation="10 - 1">
          <v-card-title
            class="mb-4 text-h3 justify-center"
            style="font-family: 'Jockey One', sans-serif !important"
          >
            Contact us
          </v-card-title>
          <v-text-field
            label="Subject"
            v-model="subject"
            name="firstName"
            color="#153040"
            style="margin-right: 8%; margin-left: 8%"
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="email"
            name="email"
            color="#153040"
            style="margin-right: 8%; margin-left: 8%"
          ></v-text-field>
          <v-textarea
            outlined
            name="body"
            v-model="text"
            label="Write a message"
            color="#153040"
            min-height="200"
            style="margin-right: 8%; margin-left: 8%"
            class="mt-8 mb-4"
          ></v-textarea>

          <v-btn
            @click="send"
            color="#FDA300"
            class="white--text px-15 text-capitalize text-h6"
            style="font-family: 'Jockey One', sans-serif !important"
            >send</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "contact",
  data() {
    return {
      subject: "",
      email: "",
      text: "",
    };
  },
  methods: {
    messageSent() {
      this.$toast.success("Message has been successfully sent!", {
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
    emptyFileds() {
      this.$toast.error(" Some of the input fields are empty!", {
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

    invalidEmail() {
      this.$toast.error("Invalid email!", {
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
    async send() {
      if (
        this.subject != "" &&
        this.email != "" &&
        this.text != "" &&
        this.email.includes(".", "@")
      ) {
        await axios.post("http://localhost:8000/contact", {
          subject: this.subject,
          from: this.email,
          text: this.text,
        });

        this.subject = "";
        this.email = "";
        this.text = "";
        this.messageSent();
      } else {
        if (!this.email.includes(".", "@")) {
          this.invalidEmail();
        } else {
          this.emptyFileds();
        }
      }
    },
  },
};
</script>

<style></style>
