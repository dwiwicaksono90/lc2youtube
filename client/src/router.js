import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import DetailVideo from './views/DetailVideo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          name: 'detailVideo',
          path: '/:id',
          component: () => import('./views/DetailVideo.vue')
        }
      ]
    }
    // ,
    // {
    //   path: '/detail/:id',
    //   name: 'DetailVideo',
    //   component: DetailVideo
    // }
    // {
    //   path: '/abo',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
