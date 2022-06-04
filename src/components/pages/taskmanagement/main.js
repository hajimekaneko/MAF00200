// import Vue from "vue";
import TaskManagement from "./TaskManagement.vue";
import { createApp } from "vue";
import router from "@/router";
import store from "@/store";
// import gAuth from 'vue-google-oauth2'

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

createApp(TaskManagement)
  .use(store)
  .use(router)
  .component("fa-icon", FontAwesomeIcon)
  .mount("#app");
