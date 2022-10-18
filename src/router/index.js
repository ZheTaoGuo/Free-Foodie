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
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router