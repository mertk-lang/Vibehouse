function isLoggedThenPosts(to, from, next) {
  if(localStorage.token) {
    next('/');
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') }
    ],
    beforeEnter: function(to, from, next) {
      if(!localStorage.token) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/vibe', component: () => import('pages/Vibe.vue') }
    ],
    beforeEnter: function(to, from, next) {
      if(!localStorage.token) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/register', component: () => import('pages/Register.vue') }
    ],
    beforeEnter: isLoggedThenPosts,
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/Login.vue') }
    ],
    beforeEnter: isLoggedThenPosts,
  },

]

export default routes
