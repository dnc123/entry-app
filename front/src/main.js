import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Button from './components/base/Button';

Vue.config.productionTip = false;

let app = new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app');

function initBaseComponents() {
  Vue.component('Button', Button);
}