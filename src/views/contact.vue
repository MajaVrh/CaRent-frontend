<template>
  <v-container class="py-10 px-10">
    <v-row align="center" justify="center">
      <v-alert
        type="success"
        outlined
        text
        justify="center"
        width="98%"
        v-if="isVisible"
        >This message has been set successfully!</v-alert
      >
      <v-alert
        v-if="isVisibleWarning"
        outlined
        type="warning"
        prominent
        border="left"
        width="98%"
      >
        Some of the input fields are empty!
      </v-alert>
      <v-alert
        v-if="isVisibleWarningEmail"
        outlined
        type="warning"
        prominent
        border="left"
        width="98%"
      >
        Invalid email!
      </v-alert>
    </v-row>
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-card width="1000" class="px-15 py-10 mb-15" flat :elevation="10 - 1">
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
            class="mx-15"
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="email"
            name="email"
            color="#153040"
            class="mx-15"
          ></v-text-field>
          <v-textarea
            outlined
            name="body"
            v-model="text"
            label="Write a message"
            color="#153040"
            min-height="200"
            class="mx-15 my-8"
          ></v-textarea>
          <v-btn
            @click="send"
            class="text-capitalize white--text"
            color="orange"
            width="250"
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
      isVisible: false,
      isVisibleWarning: false,
      isVisibleWarningEmail: false,
    };
  },
  methods: {
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

        this.isVisible = true;
        this.subject = "";
        this.email = "";
        this.text = "";
        setTimeout(() => {
          this.isVisible = false;
        }, "4000");
      } else {
        if (!this.email.includes(".", "@")) {
          this.isVisibleWarningEmail = true;
          setTimeout(() => {
            this.isVisibleWarningEmail = false;
          }, "4000");
        } else {
          this.isVisibleWarning = true;
          setTimeout(() => {
            this.isVisibleWarning = false;
          }, "4000");
        }
      }
    },
  },
};
</script>

<style></style>
