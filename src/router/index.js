import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/Home.vue'
import Projects from '../components/projects/Projects'
import ConfirmDeleteProject from '../components/projects/ConfirmDeleteProject'
import CreateProject from '../components/projects/CreateProject'
import ListProjects from '../components/projects/ListProjects'
import Content from '../components/content/Content'
import ContentCreate from '@/components/content/ContentCreate'
import ContentEdit from '@/components/content/ContentEdit'
import ContentShow from '@/components/content/ContentShow'
import Account from '../components/account/Account'
import AccountProfile from '../components/account/AccountProfile'
import AccountLookup from '../components/account/AccountLookup'
import AccountZonefile from '../components/account/AccountZonefile'
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
      path: '/projects',
      name: 'projects',
      meta: { requiresAuth: true },
      component: Projects,
      children: [
        {
          path: '/projects/create',
          component: CreateProject
        }, {
          path: '/projects/list',
          component: ListProjects
        }, {
          path: '/projects/:projectId',
          component: CreateProject
        }, {
          path: '/projects/confirmDelete/:projectId',
          component: ConfirmDeleteProject
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/account',
      name: 'account',
      meta: { requiresAuth: true },
      component: Account,
      children: [
        {
          path: '/account/profile',
          component: AccountProfile
        }, {
          path: '/account/lookup',
          component: AccountLookup
        }, {
          path: '/account/zonefile',
          component: AccountZonefile
        }
      ]
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
