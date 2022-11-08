<template>
    <div class="footer d-flex justify-content-center" style="background-color:rgb(183, 221, 234)">
        <div class="container">
            <div class="row">

                <div class="col-lg-4 col-md-12" id="copyright">
                    <p class="fw-bold">
                        Directory
                    </p>
                    <p>
                        <a href="/CalorieTracker">Calorie Tracker</a>
                    </p>
                    <p><a href="/favourite">Favourite Recipes</a></p>
                    <p><a href="/past">Past Recipes</a></p>
                    <p><a href="/profile">Profile</a></p>
                    <p><a href="/search">Recipes</a></p>
                    <p><a href="/shoppingList">Shopping List</a></p>
                </div>
                <div class="col-lg-4 col-md-12">
                    <img src="../assets/fflogo.png" width="200px">
                    <div class="social-icons">
                        <ul>
                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12" id="copyright">
                    <p>
                        <span v-if="userName != ''">You are now logged in as: {{userName}}</span>
                        
                    </p>
                    <a style="text-decoration: underline;"
                        @click="CallSignout()" v-if="userName != ''">Click here to sign out</a>
                    <a style="text-decoration: underline;" v-else>
                        <router-link to="/login">Click here to sign in</router-link>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import {
        getLoggedInUser,
        signout
    } from "@/utils";
    export default {
        data() {
            return {
                userName: ""
            }
        },
        methods: {
            promptLogin() {
                this.$router.push({
                    name: "Login",
                });
            },
            getLoggedInUser,
            CallSignout() {
                this.$emit('signOut')
                this.userName = ''
                signout()
            }
        },
        mounted() {
            this.getLoggedInUser().then((user) => {
                this.userName = user.userName
            })
        }
    };
</script>
<style>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .footer {
        margin-top: 20px;
    }

    .social-icons ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .social-icons ul li {
        display: inline-block;
    }

    .social-icons ul li a {
        font-size: 16px;
        color: black;
        opacity: 0.7;
        padding: 16px 10px;
        display: block;
    }

    #copyright {
        padding: 16px;
        text-align: center;
        margin: 0 auto;
    }
</style>