import MyAppSite from "./MyAppSite.vue";
import { createApp } from "vue";
import router from "@/router";
import store from "@/store";

// bootstrap
import "bootstrap/dist/css/bootstrap.css"; // add
import "bootstrap-vue/dist/bootstrap-vue.css"; // add

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
// ...
library.add(fas, far, fab);

// var vm = new Vue({
//   router,
//   store,
//   render: (h) => h(MyAppSite),
// });
// vm.component("fa-icon", FontAwesomeIcon);
// vm.config.productionTip = false;
// vm.mount("#app");
createApp(MyAppSite)
  .use(store)
  .use(router)
  .component("fa-icon", FontAwesomeIcon)
  .mount("#app");
