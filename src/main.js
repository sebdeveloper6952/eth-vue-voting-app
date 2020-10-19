import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import Candidate from "./components/Candidate";
import "./scss/styles.scss";

// Vue plugins
Vue.use(Buefy);

// Components
Vue.component("candidate-component", Candidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
