import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import OrderView from '../views/OrderView.vue'
import SubOrderView from '../views/SubOrderView.vue'
import WaiterSubOrderView from '../views/WaiterSubOrderView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/order/:tableid',
    name: 'order',
    component: OrderView
  },
  {
    path: '/suborder',
    name: 'suborder',
    component: SubOrderView
  },
  {
    path: '/waitersuborder',
    name: 'waitersuborder',
    component: WaiterSubOrderView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
