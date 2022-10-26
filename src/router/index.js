import { createRouter, createWebHistory } from 'vue-router'
import profileLandingPage from '../views/profileLandingPage.vue'
import HomeView from '../views/HomeView.vue'
import FridgeView from '../components/FridgeView.vue'
import HomePage from '../views/HomePage.vue'
import Login from '../views/Login.vue'


const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/fridge',
        name: 'Fridge',
        component: FridgeView
    },
    {
        path: '/profile',
        name: 'Profile',
        component: profileLandingPage
    },
    {
        path: '/CalorieTracker',
        name: 'CalorieTracker',
        component: () => import('../views/CalorieTracker.vue')
    },
    {
        path: '/homeview',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/past',
        name: 'Past',
        component: () => import('../views/PastRecipe.vue')
    },
    {
        path: '/favourite',
        name: 'Favourite',
        component: () => import('../views/FavouriteRecipe.vue')
    },
    {
        path: '/recipe',
        name: 'Recipe',
        component: () => import('../views/RecipeView.vue'),
        query: true
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/search',
        name: 'SearchRecipe',
        component: () => import('../views/SearchRecipe.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
      },
})

export default router