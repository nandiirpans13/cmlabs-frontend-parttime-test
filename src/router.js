import Vue from "vue";
import Router from "vue-router";

// Layouts
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        header: AppHeader,
        default: () => import("./views/Home.vue"),
        footer: AppFooter
      }
    },
    {
      path: "/meal/:name_ingredients",
      name: "meals",
      components: {
        header: AppHeader,
        default: () => import("./views/Meal.vue"),
        footer: AppFooter
      }
    },
    {
      path: "/detail-meal/:id_meal",
      name: "detail-meal",
      components: {
        header: AppHeader,
        default: () => import("./views/DetailMeals.vue"),
        footer: AppFooter
      }
    },
    {
      path: "*",
      name: "not-found",
      components: {
        header: AppHeader,
        default: () => import("./views/NotFound.vue"),
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
