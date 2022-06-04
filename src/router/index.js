import routes from "./routes";
import { authorizeToken } from "./guards";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  // mode: "history",
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(authorizeToken);

export default router;
