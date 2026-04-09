import Vue from "vue";
import Router from "vue-router";

// Layouts
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";

// Views
import Home from "./views/Home.vue";
import Meal from "./views/Meal.vue";
import DetailMeals from "./views/DetailMeals.vue";

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
        default: Home,
        footer: AppFooter
      }
    },
    {
      path: "/meal/:name_ingredients",
      name: "meals",
      components: {
        header: AppHeader,
        default: Meal,
        footer: AppFooter
      }
    },
    {
      path: "/detail-meal/:id_meal",
      name: "detail-meal",
      components: {
        header: AppHeader,
        default: DetailMeals,
        footer: AppFooter
      }
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
