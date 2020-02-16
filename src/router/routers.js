import Layout from '@/layout/Index.vue'

export default [
  {
    path: '/',
    name: '/',
    redirect: '/app'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/index.vue')
  },
  {
    path: '/app',
    component: Layout,
    redirect: '/app/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: 'home'
        },
        component: () => import('@/view/home/index.vue')
      }
    ]
  }
]
