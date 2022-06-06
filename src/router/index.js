import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",

    component: Home,
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/vehiclesandstations",
    name: "VehiclesAndStations",
    component: () => import("../views/VehiclesAndStations.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
  },
  {
    path: "/myaccount",
    name: "myaccount",
    meta: { loginNeeded: true },
    component: () => import("../views/myaccount.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/contact.vue"),
  },
  {
    path: "/myrents",
    name: "myRents",
    component: () => import("../views/myRents.vue"),
  },
  {
    path: "/rentit",
    name: "RentIt",
    meta: { loginNeeded: true },
    component: () => import("../views/RentIt.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = store.getters["currentUser"];
  const isLoading = store.getters["loading"];
  if (to.meta.loginNeeded && !user && !isLoading) {
    next("/index");
  }

  next();
});

export default router;
