import Layout from '@/layout/Index.vue'

export default [
  {
    path: '/',
    name: '',
    redirect: '/app'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登陆'
    },
    component: () => import('@/view/login')
  },
  {
    path: '/app',
    component: Layout,
    redirect: 'app/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: 'home'
        },
        component: () => import('@/view/home')
      }
    ]
  }
]
