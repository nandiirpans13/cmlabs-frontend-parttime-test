import "@/assets/vendor/nucleo/css/nucleo.css";

import "@/assets/scss/styles.scss";
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import globalComponents from "./globalComponents";
import globalDirectives from "./globalDirectives";
import VueLazyload from "vue-lazyload";

export default {
  install(Vue) {
    Vue.use(globalComponents);
    Vue.use(globalDirectives);
    Vue.use(VueLazyload);
  }
};
