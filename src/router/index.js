import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import store from '../store'

const routes = [
    {
      path: "/",
      redirect: '/contador',
      component: () => import('../layout/index.vue'),
      children: [{ path: "/contador", component: () => import('../views/Contador.vue'), }],
    },
    {
      path: "/conversor-temperatura",
      component: () => import('../layout/index.vue'),
      children: [{ path: "", component: () => import("../views/ConversorTemperatura.vue") }],
    },
    {
      path: "/reserva-voo",
      component: () => import('../layout/index.vue'),
      children: [{ path: "", component: () => import("../views/ReservaVoo.vue") }],
    },
    {
      path: "/cronometro",
      component: () => import('../layout/index.vue'),
      children: [{ path: "", component: () => import("../views/Cronometro.vue") }],
    },
    {
      path: "/crud-acoes",
      component: () => import('../layout/index.vue'),
      children: [{ path: "", component: () => import("../views/CrudAcoes.vue") }],
    },
    {
      path: "/marcar-circulo",
      component: () => import('../layout/index.vue'),
      children: [{ path: "", component: () => import("../views/MarcarCirculo.vue") }],
    },
    {
      path: "/tabela",
      component: () => import('../layout/index.vue'),
      children: [{ path: "", component: () => import("../views/Tabela.vue") }],
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound
    },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 }
  },
  routes,
})

router.afterEach(() => {
  if (window.innerWidth <= 1200) {
    const sidenav = store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen
    store.commit('largeSidebar/toggleSidebarProperties')
  }
})

export default router
