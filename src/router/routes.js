
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ],
    beforeEnter: function(to, from, next) {
      if(localStorage.token) {
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
      if(localStorage.token) {
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
      { path: '/login', component: () => import('pages/Login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
