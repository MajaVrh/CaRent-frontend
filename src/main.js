import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import moment from 'moment'

import VueWindowSize from "vue-window-size";

Vue.config.productionTip = false;
Vue.use(VueWindowSize);

Vue.prototype.moment = moment

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
