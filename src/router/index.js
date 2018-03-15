import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/Home.vue'
import Content from '../components/content/Content'
import ContentCreate from '@/components/content/ContentCreate'
import ContentEdit from '@/components/content/ContentEdit'
import ContentShow from '@/components/content/ContentShow'
import Login from 'bright-block-auth/src/components/auth/Login'
import authorization from 'bright-block-auth'

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
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/getBrowser',
      name: 'login',
      component: Login
    }, {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!authorization.isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
