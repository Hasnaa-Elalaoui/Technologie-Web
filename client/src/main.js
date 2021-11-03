import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import ListeDesRestaurants from './components/ListeDesRestaurants.vue'
import Restaurant from './components/Restaurant.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueRouter)


// On définit des routes
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/restaurants',
    },
    {
      path: '/restaurants',
      component: ListeDesRestaurants
    },
    {
      path: '/RestaurantDetail/',
      component: Restaurant
    }
  ],
  mode: 'history'
});
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
