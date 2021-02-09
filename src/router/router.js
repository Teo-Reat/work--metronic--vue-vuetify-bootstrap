import Vue from "vue";
import Router from "vue-router";
// import routes from "./default";
import routes from "./crm";

Vue.use(Router);

const isAuthenticated = () => true;

const router = new Router({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta?.requiresAuth)) {
    if (isAuthenticated()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
