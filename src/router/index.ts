import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PuzzleView from '../views/PuzzleView.vue'
import PuzzleSolution from '../components/PuzzleSolution.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/puzzle',
      name: 'puzzle',
      component: PuzzleView,
      children: [
        {
          path: ':id',
          name: 'puzzle-solution',
          component: PuzzleSolution,
        }
      ]
    },
  ],
})

export default router
