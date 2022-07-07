import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import moment from 'moment'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueWindowSize from "vue-window-size";
import Pluralize from 'pluralize'

Vue.config.productionTip = false;
Vue.use(VueWindowSize);
Vue.prototype.moment = moment;
Vue.prototype.Pluralize = Pluralize;
Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
