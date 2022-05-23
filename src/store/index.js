import { createStore } from "vuex";
import actions from "@/store/taskmanagement/actions";
import getters from "@/store/taskmanagement/getters";
import mutations from "@/store/taskmanagement/mutations";
import state from "@/store/taskmanagement/state";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  // modules:{
  //   taskmanagement: {
  //     namespaced: false,
  //     state, // 定義したstateを`state`オプションに指定
  //     getters,
  //     actions,
  //     mutations,
  //   }
  // },
  plugins: [
    createPersistedState({
      key: "vue-gauth",
      paths: ["userInfo"],
      storage: window.sessionStorage,
    }),
  ],
  state, // 定義したstateを`state`オプションに指定
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== "production",
});
