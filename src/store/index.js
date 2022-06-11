import { createStore } from "vuex";
import actions from "@/store/taskmanagement/actions";
import getters from "@/store/taskmanagement/getters";
import mutations from "@/store/taskmanagement/mutations";
import state from "@/store/taskmanagement/state";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

export default createStore({
  // plugins: [
  //   createPersistedState({
  //     key: "taskmanagement",
  //     paths: ["auth"],
  //     storage: window.sessionStorage,
  //   }),
  // ],
  plugins: [
    createPersistedState({
      key: "taskmanagement",
      paths: ["auth"],
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 7, secure: true }), //7日間有効
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
  state, // 定義したstateを`state`オプションに指定
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== "production",
});
