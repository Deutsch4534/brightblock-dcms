import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/Home.vue'
import GetBrowser from '../components/auth/GetBrowser.vue'
import Login from '../components/auth/Login.vue'
import Content from '../components/content/Content'
import ContentCreate from '@/components/content/ContentCreate'
import ContentEdit from '@/components/content/ContentEdit'
import ContentShow from '@/components/content/ContentShow'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/content',
      name: 'content',
      meta: { requiresAuth: true },
      component: Content,
      children: [
        {
          path: '/content/create',
          component: ContentCreate
        },
        {
          path: '/content/:notesId',
          component: ContentShow,
          props: true

        },
        {
          path: '/content/:notesId/edit',
          component: ContentEdit,
          props: true
        }
      ]
    }, {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/getBrowser',
      name: 'getBrowser',
      component: GetBrowser
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (authorization.isLoggedIn()) {
//     // authorization.loadUserData()
//     next()
//   } else if (authorization.isSignInPending()) {
//     next()
//   } else {
//     next()
//   }
// })

export default router
