// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import Login from './pages/Login';
import Create from './pages/Create';
import SurveyList from './pages/SurveyList';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/create', component: Create }, // admin
  { path: '/surveys', name: 'surveys', component: SurveyList }, // admin
  { path: '/setup/:id', name: 'setup', component: Setup }, // admin
  { path: '/setup/:id/d', name: 'dashboardpreview', component: Dashboard },
  { path: '/d/:id', name: 'dashboard', component: Dashboard }
];
const router = new VueRouter({
  routes: routes
});
/* eslint-disable no-new */
new Vue({
  router: router,
  template: '<App/>',
  components: { App }
}).$mount('#app');

// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
