// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import Login from './components/Login';
import Create from './components/Create';
import Setup from './components/Setup';
import Dashboard from './components/Dashboard';
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Login },
  { path: '/create', component: Create },
  { path: '/setup/:id', name: 'setup', component: Setup },
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
