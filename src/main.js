import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import starter from "./plugins/starter-kit";
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.use(starter);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
