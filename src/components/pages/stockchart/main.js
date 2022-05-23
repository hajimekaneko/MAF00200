import StockChart from "./StockChart.vue";
import { createApp } from "vue";
import router from "@/router";
import store from "@/store";

// bootstrap
import "bootstrap/dist/css/bootstrap.css"; // add
import "bootstrap-vue/dist/bootstrap-vue.css"; // add

// new Vue({
//   router,
//   store,
//   render: (h) => h(StockChart),
// }).$mount("#app");
createApp(StockChart).use(store).use(router).mount("#app");
