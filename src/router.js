import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue';

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import HojaDeVida from './components/HojaDeVida.vue'

const routes = [
//   {
//   path: '/',
//   name: 'root',
//   component: App
// },
{
  path: '/',
  name: "logIn",
  component: LogIn
},
{
  path: '/user/signUp',
  name: "signUp",
  component: SignUp
},
{
  path: '/home',
  name: "home",
  component: Home
},
{
  path: '/hojaDeVida',
  name: "hojaDeVida",
  component: HojaDeVida
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;