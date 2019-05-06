import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Dashboard from '@/components/Dashboard'
import AddContact from '@/components/AddContact'
import EditContact from '@/components/EditContact'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '*',
      redirect: '/signin'
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-contact',
      name: 'AddContact',
      component: AddContact,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-contact/:contactId',
      name: 'EditContact',
      component: EditContact,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Check required authentication
router.beforeEach((to, from, next) => {
  var currentUser = firebase.auth().currentUser;
  var requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next('/signin');
  } else if (!requiresAuth && currentUser) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router