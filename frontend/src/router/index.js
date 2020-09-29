import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import HelloWorld from '../components/HelloWorld.vue'
import ListSuveys from '../components/ListSurveys.vue'
import CreateSurvey from '../components/CreateSurvey.vue'
import CreateQuestion from '../components/CreateQuestion.vue'
import Vote from '../components/Vote.vue'
import Consult from '../components/Consult.vue'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import myProfile from '../components/myProfile.vue'
import ListQuestion from '../components/ListQuestion.vue'
import EditQuestion from '../components/EditQuestion.vue'
import AddQuestion from '../components/AddQuestion.vue'
import ListUsers from '../components/ListUsers.vue'
import EditMyProfile from '../components/EditMyProfile.vue'

Vue.use(VueRouter)

  const routes = [
  {
      path: '/',
      name: 'index',
      component: HelloWorld,
      meta: { 
        guest: true
      }
  },
  {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp,
      meta: { 
        guest: true
      }
  },
  {
      path: '/SignIn',
      name: 'SignIn',
      component: Login,
      meta: { 
        guest: true
      }
  },
  {
    path: '/myProfile',
    name: 'myProfile',
    component: myProfile,
    meta: { 
      requiresAuth: true
    }
  },
  {
      path: '/ListSuveys',
      name: 'ListSuveys',
      component: ListSuveys,
      meta: { 
        requiresAuth: true
      }
  },
  {
      path: '/CreateSurvey',
      name: 'CreateSurvey',
      component: CreateSurvey,
      meta: { 
        requiresAuth: true
      }
  },
  {
    path: '/EditSurvey/:idS',
    name: 'EditSurvey',
    component: ListQuestion,
    props: true,
    meta: { 
        requiresAuth: true
      }
  },
  {
      path: '/CreateQuestion/:category/:title',
      name: 'CreateQuestion',
      component: CreateQuestion,
      props: true,
      meta: { 
        requiresAuth: true
      }
  },
  {
    path: '/AddQuestion/:idS',
    name: 'AddQuestion',
    component: AddQuestion,
    props: true,
    meta: { 
        requiresAuth: true
      }
  },
  {
    path: '/EditQuestion/:idQ',
    name: 'EditQuestion',
    component: EditQuestion,
    props: true,
    meta: { 
        requiresAuth: true
      }
  },
  {
    path: '/ListUsers',
    name: 'ListUsers',
    component: ListUsers,
    meta: { 
      requiresAdmin: true
    }
},
{
  path: '/EditMyProfile/:idU',
  name: 'EditMyProfile',
  component: EditMyProfile,
  props: true,
  meta: { 
    requiresAuth: true
  }
},
  {
      path: '/Vote/:category/:title/:numberOfQuestion/:idS',
      name: 'Vote',
      component: Vote,
      props: true,
      meta: { 
        requiresAuth: true
      }
  },
  {
      path: '/Consult/:category/:title/:idS',
      name: 'Consult',
      component: Consult,
      props: true,
      meta: { 
        requiresAuth: true
      }
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
          next()
      }
      else {
            next({
              path: '/SignIn',
              params: { nextUrl: to.fullPath }
          })
        }

  } else if(to.matched.some(record => record.meta.requiresAdmin)) {
    if(store.getters.isLoggedIn && store.getters.isAmin){
      next()
    }
    else if (store.getters.isLoggedIn){
        next({ name: 'ListSuveys'})
    }
    else{
      next({
        path: '/SignIn',
        params: { nextUrl: to.fullPath }
    })
    }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(store.getters.isLoggedIn){
          next({ name: 'ListSuveys'})
      }
      else{
          next()
      }
  }else {
      next() 
  }
})

export default router
