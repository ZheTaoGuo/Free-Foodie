import { createRouter, createWebHistory } from 'vue-router'
import profileLandingPage from '../views/profileLandingPage.vue'
import HomeView from '../views/HomeView.vue'
import FridgeView from '../views/FridgeView.vue'
import HomePage from '../views/HomePage.vue'
import Login from '../views/Login.vue'
import ShoppingList from '../views/ShoppingList.vue'
import Signup from '../views/Signup.vue'

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
        path: '/shoppinglist',
        name: 'ShoppingList',
        component: ShoppingList
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
    ,
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
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