import Home from "./modules/home";
import Users from "./modules/users";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...Home, ...Users],
});

export default router;