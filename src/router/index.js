import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UploadView from '../views/UploadView.vue'
import WishListView from '../views/WishListView.vue'
import PurchasedListView from '../views/PurchasedListView.vue'
import BudgetingView from '../views/BudgetingView.vue'
import Error404View from '../views/Error404View.vue'
import ItemView from '../views/ItemView.vue'
import CategoryWishListView from '../views/CategoryWishListView.vue'
import CategoryPurchasedListView from '../views/CategoryPurchasedListView.vue'



import { auth } from "@/firebaseConfig.js"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: WishListView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/purchasedlist',
    name: 'purchasedlist',
    component: PurchasedListView, 
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/wishlist/:category',
    name: 'wishlistCategory',
    component: CategoryWishListView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/purchasedlist/:category',
    name: 'purchasedlistCategory',
    component: CategoryPurchasedListView, 
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/item/:itemId',
    name: 'ItemView',
    component: ItemView, 
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/budgeting',
    name: 'budgeting',
    component: BudgetingView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '*',
    name: 'error404',
    component: Error404View
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/')
    // could also just fire off a redirect login here, or redirect based on a meta property!
  } else {
    next()
  }
})

export default router
