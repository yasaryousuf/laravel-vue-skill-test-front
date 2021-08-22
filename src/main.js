import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router"
import vuex from "./store"

import store from '@/store';
import VueMoment from 'vue-moment';

import moment from 'moment'


//Layouts
import DefaultLayout from "@/views/global/layouts/DefaultLayout";
import AuthLayout from "@/views/global/layouts/AuthLayout";



//CSS Import file
import "@/scss/main.scss";

//Global Component Registration
Vue.component('default-layout', DefaultLayout)
Vue.component('auth-layout', AuthLayout)


Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(value).format('MMM DD, YYYY')
  }
  return '';
})

new Vue({
  vuetify,
  router,
  store,
  vuex,
  VueMoment,
  moment,
  render: h => h(App)
}).$mount('#app')

