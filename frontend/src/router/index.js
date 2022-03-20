import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import OrderView from '../views/OrderView.vue'
import SubOrderView from '../views/SubOrderView.vue'
import WaiterSubOrderView from '../views/WaiterSubOrderView.vue'
import PayView from '../views/PayView.vue'
import OrderReportView from '../views/OrderReportView.vue'
import UserReportView from '../views/UserReportView.vue'
import SingleSubOrderView from '../views/SingleSubOrderView.vue'
import SingleOrderView from '../views/SingleOrderView.vue'
import AddEquipmentView from '../views/AddEquipmentView.vue'
import EquipmentsReportView from '../views/EquipmentsReportView.vue'
import MonthlyReportView from '../views/MonthlyReportView.vue'

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
    path: '/addequipment',
    name: 'addequipment',
    component: AddEquipmentView
  },
  {
    path: '/monthlyreport',
    name: 'monthlyreport',
    component: MonthlyReportView
  },
  {
    path: '/equipmentreport',
    name: 'equipmentreport',
    component: EquipmentsReportView
  },
  {
    path: '/singlesuborder/:suborderid',
    name: 'singlesuborder',
    component: SingleSubOrderView
  },
  {
    path: '/singleorder/:orderid',
    name: 'singleorder',
    component: SingleOrderView
  },
  {
    path: '/pay/:tableid',
    name: 'pay',
    component: PayView
  },
  {
    path: '/suborder',
    name: 'suborder',
    component: SubOrderView
  },
  {
    path: '/orderreport',
    name: 'orderreport',
    component: OrderReportView
  },
  {
    path: '/userreport',
    name: 'userreport',
    component: UserReportView
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
