<template>
  <v-app id="colorChange">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list-item style="margin-top: 5rem">
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Menu</v-list-item-title>
          <v-list-item-subtitle> Where do you wanna go? </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav style="padding: 0">
        <v-list-item-group v-model="selectedItem" color="orange" class="p-0">
          <v-list-item
            class="pl-5"
            v-for="(item, i) in items"
            :key="i"
            link
            :to="item.link"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar
        style="z-index: 999 !important"
        clipped-left
        clipped-right
        elevation="1"
        color="#153040"
        height="70"
        justify-center
        fixed
        v-if="this.$route.name != 'login'"
      >
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
      <v-navigation-drawer app clipped right v-model="drawerAccount">
        <v-list-item style="margin-top: 5rem">
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
      <router-view />
    </v-main>

    <v-footer dark padless color="#153040" v-if="this.$route.name != 'login'">
      <v-container
        :cols="12"
        class="
          text-h4
          white--text
          text-no-wrap
          d-flex
          justify-space-around
          mt-15
        "
        style="font-family: 'Jockey One', sans-serif !important"
        ><div>Ca<span class="orange--text lighten-1">R</span>ent</div>
      </v-container>

      <v-container :cols="8" class="pb-8">
        <v-card
          flat
          tile
          class="lighten-1 white--text text-center pb-16"
          color="#153040"
        >
          <v-row class="pb-8">
            <v-col :cols="12" :xs="12" :md="4" :sm="12">
              <v-card color="#153040" outlined>
                <v-icon size="30" class="pb-1 mr-1"> mdi-email </v-icon>
                <b> Email</b>
              </v-card>
              <v-card color="#153040" outlined>
                carent@gmail.com <br />
                carent.help@gmail.com
              </v-card>
            </v-col>
            <v-col :cols="12" :xs="12" :md="4" :sm="12">
              <v-card color="#153040" outlined>
                <v-icon size="30" class="pb-1 mr-1"> mdi-phone-classic </v-icon>
                <b> Phone</b>
              </v-card>
              <v-card color="#153040" outlined>
                + 099 123 4567 <br />

                + 099 123 4555
              </v-card>
            </v-col>
            <v-col :cols="12" :xs="12" :md="4" :sm="12">
              <v-card color="#153040" outlined>
                <v-icon size="30" class="pb-1 mr-1"
                  >mdi-clock-time-four
                </v-icon>
                <b> Worikng hours</b>
              </v-card>
              <v-card color="#153040" outlined>
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
      { text: "Home", link: "/" },
      { text: "Vehicles and stations", link: "/vehiclesandstations" },
      { text: "Rent it", link: "/" },
      { text: "My account", link: "/" },
      { text: "Contact us", link: "/" },
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

<style>
.login {
  background-color: #153040 !important;
}
</style>
