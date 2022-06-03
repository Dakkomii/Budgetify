import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from "@/firebaseConfig";
import { firestorePlugin } from 'vuefire'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faCalendarDay, faSackDollar, faTags, faStar, faReceipt, faCircleDollarToSlot, faCirclePlus, faLink, faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCartShopping)
library.add(faCalendarDay)
library.add(faSackDollar)
library.add(faTags)
library.add(faStar)
library.add(faReceipt)
library.add(faCircleDollarToSlot)
library.add(faCirclePlus)
library.add(faLink)
library.add(faTrash)
library.add(faFloppyDisk)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(firestorePlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.config.productionTip = false

let app 

auth.onAuthStateChanged(()=>{
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }  
});
