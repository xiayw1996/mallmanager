import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import Goods from '@/components/goods/goods.vue'
import Categories from '@/components/goods/categories.vue'
import GoodsCats from '@/components/goods/goodsCats.vue'
import Orders from '@/components/orders/orders.vue'
import Reports from '@/components/reports/reports.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'users',
      path: 'users',
      component: Users
    },
    {
      name: 'right',
      path: 'rights',
      component: Right
    },
    {
      name: 'role',
      path: 'role',
      component: Role
    },
    {
      name: 'goods',
      path: 'goods',
      component: Goods
    },
    {
      name: 'categories',
      path: 'categories',
      component: Categories
    },
    {
      name: 'goodsCats',
      path: 'goodsCats',
      component: GoodsCats
    },
    {
      name: 'orders',
      path: 'orders',
      component: Orders
    },
    {
      name: 'reports',
      path: 'reports',
      component: Reports
    }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
