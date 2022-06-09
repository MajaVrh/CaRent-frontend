<template>
  <v-container class="py-10 px-10">
    <h1
      class="mb-15 text-h3"
      style="font-family: 'Jockey One', sans-serif !important"
    >
      Contact us
    </h1>
    <v-row align="center" justify="center">
      <v-alert
        type="success"
        outlined
        text
        justify="center"
        width="1250"
        v-if="!isVisible"
        >This message has been set successfully!</v-alert
      >
    </v-row>
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-card width="1250" class="px-15 py-10 mb-15" color="grey lighten-3">
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
      isVisible: true,
    };
  },
  methods: {
    async send() {
      await axios.post("http://localhost:8000/contact", {
        subject: this.subject,
        from: this.email,
        text: this.text,
      });
      this.subject = "";
      this.email = "";
      this.text = "";
      this.isVisible = false;

      setTimeout(() => {
        this.isVisible = true;
      }, "6000");
    },
  },
};
</script>

<style>
</style>