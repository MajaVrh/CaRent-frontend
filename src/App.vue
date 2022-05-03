<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Menu</v-list-item-title>
          <v-list-item-subtitle> Where do you wanna go? </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav style="padding: 0">
        <v-list-item-group v-model="selectedItem" color="orange" class="p-0">
          <v-list-item class="pl-5" v-for="(item, i) in items" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar elevation="1" color="#153040" height="70" justify-center>
        <v-app-bar-nav-icon
          @click="closeDrawer()"
          color="white"
          x-large
        ></v-app-bar-nav-icon>
        <v-app-bar-title
          class="text-h4 white--text text-no-wrap"
          style="font-family: 'Jockey One', sans-serif !important"
          ><div>
            Ca<span class="orange--text lighten-1">R</span>ent
          </div></v-app-bar-title
        >
        <v-spacer></v-spacer>

        <v-avatar color="dark">
          <v-icon color="white" x-large @click="closeDrawerAccount()"
            >mdi-account-circle</v-icon
          ></v-avatar
        >
      </v-app-bar>
      <v-navigation-drawer right v-model="drawerAccount" app>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list dense nav style="padding: 0">
          <v-list-item-group
            v-model="selectedItemAccount"
            color="orange"
            class="p-0"
          >
            <v-list-item
              class="pl-5"
              v-for="(item, i) in itemsAccount"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <hr style="background-color: orange; padding: 0.15rem 0" />
      <router-view />
    </v-main>

    <v-footer dark padless color="#153040">
      <v-container
        class="text-h4 white--text text-no-wrap d-flex justify-center mt-16"
        style="font-family: 'Jockey One', sans-serif !important"
        ><div>Ca<span class="orange--text lighten-1">R</span>ent</div>
      </v-container>

      <v-container class="pb-8 d-flex justify-space-around">
        <v-card
          flat
          tile
          class="lighten-1 white--text text-center pb-16"
          color="#153040"
        >
          <v-row class="pb-8 justify-space-between" style="width: 50rem">
            <v-col style="width: 10rem">
              <v-card color="#153040" class="text-left" outlined>
                <v-icon size="30" class="pb-1 mr-1"> mdi-email </v-icon>
                <b> Email</b>
              </v-card>
              <v-card color="#153040" class="text-left" outlined>
                carent@gmail.com <br />
                carent.help@gmail.com
              </v-card>
            </v-col>
            <v-col style="width: 10rem">
              <v-card color="#153040" outlined>
                <v-icon size="30" class="pb-1 mr-1"> mdi-phone-classic </v-icon>
                <b> Phone</b>
              </v-card>
              <v-card color="#153040" outlined>
                + 099 123 4567 <br />

                + 099 123 4555
              </v-card>
            </v-col>
            <v-col style="width: 10rem">
              <v-card color="#153040" class="text-right" outlined>
                <v-icon size="30" class="pb-1 mr-1"
                  >mdi-clock-time-four
                </v-icon>
                <b> Worikng hours</b>
              </v-card>
              <v-card color="#153040" class="text-right" outlined>
                Monday-Friday <br />
                08:00-16:00 <br />
              </v-card>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-card-text>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4 white--text"
              icon
            >
              <v-icon large>
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    drawerAccount: false,
    selectedItem: 1,
    selectedItemAccount: 1,
    items: [
      { text: "Home" },
      { text: "Vehicles and stations" },
      { text: "Rent it" },
      { text: "My account" },
      { text: "Contact us" },
    ],
    itemsAccount: [
      { text: "My rents" },
      { text: "Log out" },

      { text: "My account" },
    ],
    icons: ["mdi-facebook", "mdi-instagram"],
  }),
  methods: {
    closeDrawer() {
      if (this.drawerAccount == true) {
        this.drawerAccount = !this.drawerAccount;
      }
      this.drawer = !this.drawer;
    },
    closeDrawerAccount() {
      if (this.drawer == true) {
        this.drawer = !this.drawer;
      }
      this.drawerAccount = !this.drawerAccount;
    },
  },
};
</script>

<style></style>
