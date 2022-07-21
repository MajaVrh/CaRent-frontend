<template>
  <v-app id="colorChange">
    <v-navigation-drawer v-model="drawer" app clipped v-if="exist">
      <v-list-item style="margin-top: 5rem">
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Menu</v-list-item-title>
          <v-list-item-subtitle class="text-subtitle-1">
            Where do you wanna go?
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav style="padding: 0">
        <v-list-item-group v-model="selectedItem" color="orange" class="p-0">
          <div v-for="(item, i) in items" :key="i">
            <v-list-item
              class="pl-5"
              link
              :to="item.link"
              v-if="item.logedOut && !user"
            >
              <v-list-item-content>
                <v-list-item-title
                  style="font-size: 16px"
                  v-text="item.text"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              click:logout
              class="pl-5 py-1"
              v-else-if="item.loginNeeded && user && !item.adminNeeded"
              link
              :to="item.link"
              @click="actionClick(item.action)"
            >
              <v-list-item-content>
                <v-list-item-title
                  style="font-size: 16px"
                  v-text="item.text"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              click:logout
              class="pl-5 py-1"
              v-else-if="user"
              link
              :to="item.link"
              @click="actionClick(item.action)"
            >
              <v-list-item-content>
                <v-list-item-title
                  style="font-size: 16px"
                  v-text="item.text"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-list-item
            style="margin: 0px !important"
            class="pl-5 py-1"
            v-if="user && user.isAdmin"
            link
            :to="{ name: 'userList' }"
          >
            <v-list-item-content>
              <v-list-item-title style="font-size: 16px"
                >Users
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            style="margin: 0px !important"
            class="pl-5 py-1"
            v-if="user && user.isAdmin"
            link
            :to="{ name: 'userRents' }"
          >
            <v-list-item-content>
              <v-list-item-title style="font-size: 16px"
                >Users' rents</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="pl-5 py-1"
            v-if="user && user.isAdmin"
            link
            :to="{ name: 'Reports' }"
          >
            <v-list-item-content>
              <v-list-item-title style="font-size: 16px"
                >Reports</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="pl-5 py-1"
            link
            v-if="!user"
            :to="{ name: 'contact' }"
          >
            <v-list-item-content>
              <v-list-item-title style="font-size: 16px" text="Contact us"
                >Contact us</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="pl-5 py-1"
            link
            v-else-if="user && !user.isAdmin"
            :to="{ name: 'contact' }"
          >
            <v-list-item-content>
              <v-list-item-title style="font-size: 16px" text="Contact us"
                >Contact us</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main style="margin-top: 4.3rem">
      <v-app-bar
        style="z-index: 999 !important"
        clipped-left
        clipped-right
        elevation="1"
        color="#153040"
        height="70"
        justify-center
        fixed
        v-if="exist"
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
      <v-navigation-drawer
        app
        clipped
        right
        v-model="drawerAccount"
        v-if="exist"
      >
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
            <!-- user -->
            <div v-for="(item, i) in itemsAccount" :key="i">
              <v-list-item
                click:logout
                class="pl-5"
                v-if="item.logedIn && user && !user.isAdmin"
                link
                :to="item.link"
                @click="actionClick(item.action)"
              >
                <v-list-item-content>
                  <v-list-item-title
                    style="font-size: 16px"
                    v-text="item.text"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- logoutan -->
              <v-list-item
                click:logout
                class="pl-5 py-1"
                v-else-if="item.logedOut && !user"
                link
                :to="item.link"
                @click="actionClick(item.action)"
              >
                <v-list-item-content>
                  <v-list-item-title
                    style="font-size: 16px"
                    v-text="item.text"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- admin -->
              <v-list-item
                click:logout
                class="pl-5 py-1"
                v-else-if="user && user.isAdmin && item.Admin"
                link
                :to="item.link"
                @click="actionClick(item.action)"
              >
                <v-list-item-content>
                  <v-list-item-title
                    style="font-size: 16px"
                    v-text="item.text"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </v-main>

    <v-footer dark padless color="#153040" v-if="exist">
      <v-container
        :cols="12"
        class="text-h4 white--text text-no-wrap d-flex justify-space-around mt-15"
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
                <b> Working hours</b>
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
              :key="icon.id"
              class="mx-4 white--text"
              icon
              :href="icon.link"
            >
              <v-icon large>
                {{ icon.icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "App",

  data: () => ({
    falsePages: ["/login", "/index", "/register"],
    exist: true,
    contactCheck: false,
    drawer: false,
    drawerAccount: false,
    selectedItem: 1,
    selectedItemAccount: 1,

    items: [
      {
        text: "Home",
        link: "/",
        logedOut: true,
      },
      {
        text: "Vehicles and stations",
        link: "/vehiclesandstations",
        logedOut: true,
      },
      {
        text: "Rent it",
        link: "/rentit",
        logedIn: true,
      },
    ],
    itemsAccount: [
      { text: "My rents", link: "/myrents", logedIn: true },
      { text: "My account", link: "/myaccount", logedIn: true, Admin: true },
      { text: "Log out", action: "logout", logedIn: true, Admin: true },
      { text: "Create account", link: "/register", logedOut: true },
      { text: "Login", link: "/login", logedOut: true },
    ],
    icons: [
      { id: 1, icon: "mdi-facebook", link: "https://www.facebook.com/" },
      { id: 2, icon: "mdi-instagram", link: "https://www.instagram.com/" },
    ],
  }),

  computed: {
    ...mapGetters({ user: "currentUser", loading: "loading" }),
  },

  methods: {
    ...mapMutations({ setAuthToken: "setAuthToken", logOutStore: "logOut" }),
    ...mapActions({ loadUser: "loadUser" }),

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

    ExisElement() {
      const isPage = this.falsePages.includes(this.$route.path);
      this.exist = !isPage;
    },
    actionClick(action) {
      if (action === "logout") {
        this.logout();
      }
    },
    logout() {
      localStorage.removeItem("token");

      this.setAuthToken(null);
      this.logOutStore();
      this.$router.push("/index");
      console.log("User removed");
    },
  },
  updated() {
    this.ExisElement();
  },
  async mounted() {
    this.ExisElement();
    await this.loadUser();
  },
};
</script>

<style>
body {
  overflow-x: hidden !important;
}

.backCol {
  background-color: #153040 !important;
}
h1,
th {
  font-family: "Jockey One", sans-serif;
}
</style>
