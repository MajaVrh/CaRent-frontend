<template>
  <div class="py-0 my-0">
    <v-container mt-12>
      <v-row
        class="text-h4 black--text d-flex pr-8 pl-8"
        style="font-family: 'Jockey One', sans-serif !important"
      >
        User list</v-row
      ></v-container
    >
    <v-container pr-8 pl-8 mb-12>
      <v-row>
        <v-col :cols="12" :xs="12" :md="6" :sm="12">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            color="orange"
            style="   width=20rem !important; "
          ></v-text-field
        ></v-col>
      </v-row>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="users"
        class="elevation-1 mt-8"
        hide-default-footer
        ><template v-slot:item.makeAdmin="{ item }">
          <v-btn
            color="orange"
            class="white--text text-capitalize text-subtitle-2"
            v-if="!item.isAdmin"
            height="2rem"
            width="8rem"
            @click="setAdmin(item.email)"
            >Make admin</v-btn
          >
          <v-btn
            class="text-capitalize white--text text-subtitle-2"
            height="2rem"
            width="8rem"
            color="#153040 "
            @click="revokeAdmin(item.email)"
            v-else
            >Revoke admin</v-btn
          >
        </template></v-data-table
      >
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "userList",
  data() {
    return {
      users: [],
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
          class: "black--text text-subtitle-1 font-weight-bold",
        },
        {
          text: "Surname",
          value: "surname",
          sortable: false,
          class: "black--text text-subtitle-1 font-weight-bold",
        },
        {
          text: "Email",
          value: "email",
          sortable: false,
          class: "black--text text-subtitle-1 font-weight-bold ",
        },

        {
          text: "Admin status",
          value: "makeAdmin",
          sortable: false,
          width: "8rem",
          class: " black--text text-subtitle-1  font-weight-bold",
        },
      ],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    alertStatus() {
      this.$toast.warning("You have changed the user's admin status!", {
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

    async getUsers() {
      try {
        let res = await axios.get("http://localhost:8000/users");
        this.users = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async setAdmin(email) {
      try {
        await axios.patch(`http://localhost:8000/user/setAdmin/${email}`);
        this.getUsers();
        this.alertStatus();
      } catch (error) {
        console.log(error);
      }
    },
    async revokeAdmin(email) {
      try {
        await axios.patch(`http://localhost:8000/user/revokeAdmin/${email}`);
        this.getUsers();
        this.alertStatus();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.v-data-table.row-height-50 td {
  height: 18px !important;
}
</style>
