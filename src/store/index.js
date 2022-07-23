import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    currentUser: "",
    isAuth: false,
    loading: true,
    checkDrop: null,
    isRented: false,
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setAuthToken(state, payload) {
      if (payload) {
        axios.defaults.headers.common["Authorization"] = payload;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
      state.token = payload;
    },
    setIsAuth(state, payload) {
      state.isAuth = payload;
    },
    setIsLoading(state, payload) {
      state.loading = payload;
    },
    logOut(state) {
      state.currentUser = null;
      state.isAuth = false;
    },
    setCheckDrop(state, payload) {
      state.checkDrop = payload;
    },
    setRentedState(state, payload) {
      state.isRented = payload;
    },
  },

  getters: {
    currentUser(state) {
      return state.currentUser;
    },
    loading(state) {
      return state.loading;
    },
    isAuth(state) {
      return state.isAuth;
    },
    checkDrop(state) {
      return state.checkDrop;
    },
    isRented(state) {
      return state.isRented;
    },
  },
  actions: {
    //context -> commit za pozivanje mutacija, state-ovo gore, ------ cotext.commit
    async loadUser({ commit }) {
      if (localStorage.token) {
        commit("setAuthToken", localStorage.token);
      }
      try {
        const res = await axios.get("https://carentbackend.herokuapp.com/auth");

        commit("setIsAuth", true);
        commit("setCurrentUser", res.data);
        commit("setIsLoading", false);
        console.log(res.data);
      } catch (error) {
        commit("setIsAuth", false);
        commit("setCurrentUser", null);
        commit("setIsLoading", false);
      }
    },
  },
});
