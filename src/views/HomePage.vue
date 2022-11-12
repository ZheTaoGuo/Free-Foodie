<template>
    <div class="container-fluid">
        <div class="row">
            <!--Start of NavBar-->
            <NavBar @checkLogin="isLoggedIn()"></NavBar>
            <!--End of NavBar-->
        </div>
        <div class="row " id="carouselStyle ">
            <div id="foodcarousel" class="carousel slide px-0" data-bs-ride="carousel" style="height:90%">
                <div class="carousel-inner text-center">
                    <div class="carousel-item active" data-bs-interval="3000">
                        <img src="../assets/backgroundpicture1.jpg" class="d-block w-100">
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="../assets/backgroundpicture2.jpg" class="d-block w-100">
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="../assets/backgroundpicture3.jpg" class="d-block w-100">
                    </div>
                </div>
                <div id="titledetails">
                    <h1 class="title" style="font-size: 5vw;" v-if="userName != ''">Welcome, {{userName}}! <br> Cook at home sustainably with us
                        today</h1>
                    <h1 class="title" style="font-size: 5vw;" v-else>Welcome! <br> Cook at home sustainably with us today</h1>
                    <button type="button" style="font-size: 3vw;" class="btn btn-primary btnstyle" @click="$router.push('/search')">
                        Explore Menu
                    </button>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="section-header text-center mx-auto mb-1">
                <h1 class="display-4 mb-3" id="sectiontitle">How It Works</h1>
            </div>
        </div>

        <div class="row g-4" id="works">
            <div class="col-lg-4 col-md-12">
                <div class="text-center p-2 p-xl-5">
                    <img class="img-fluid mb-5 circleimg" src="../assets/roundimage1.jpeg" />
                    <h2 class="text-white individualtitle">Manage your existing ingredients on the go</h2>
                </div>
            </div>
            <div class="col-lg-4 col-md-12">
                <div class="text-center p-2 p-xl-5">
                    <img class="img-fluid mb-5 circleimg " src="../assets/roundimage2.jpg" />
                    <h2 class="text-white individualtitle">We show the best recipes for what you have on hand</h2>
                </div>
            </div>
            <div class="col-lg-4 col-md-12">
                <div class="text-center p-2 p-xl-5">
                    <img class="img-fluid mb-5 circleimg " src="../assets/roundimage3.jpg" />
                    <h2 class="text-white individualtitle">Buy missing ingredients, select a recipe and enjoy!</h2>
                </div>
            </div>
        </div>
        <Footer @signOut="callSignOut()"></Footer>
    </div>
</template>

<script>
    import NavBar from '../components/Navbar.vue'
    import Footer from '../components/Footer.vue'
    import {
        getLoggedInUser,
        signout,
        isLoggedIn
    } from "@/utils";
    export default {
        components: {
            NavBar,
            Footer
        },
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
            signout,
            callSignOut() {
                this.userName = ''
            },
            isLoggedIn
        },
        mounted() {
            this.getLoggedInUser().then((user) => {
                this.userName = user.userName
            })
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
        /* font-family: Arial; */
        margin: 0;
        padding: 0;

    }

    .btnstyle {
        margin-top: 5px;
        width: 10em;
        display: flex;
        justify-content: center;
        margin: auto;
    }



    .title {
        font-weight: bold;
        text-shadow: 2px 2.5px 2px rgba(0, 0, 0, 0.8);
        color: rgb(255, 255, 255);
        /* background: rgba(255, 255, 255, 0.5); */
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
    }

    #foodcarousel {
        position: relative;
    }


    #titledetails {
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 35%;
    }

    .section-header {
        padding-top: 30px;
        /* padding-bottom: 25px; */
    }

    .container-fluid {
        background-color: rgb(183, 221, 234);
    }

    .individualtitle {
        font-size: 1.5rem;
        margin: 0 auto;
        background-color: #187ccde3;
        border-radius: 10px;
        width: 90%;
        /* height: 80px; */
        padding: 20px;

    }

    .circleimg {
        height: 250px;
        width: 250px;
        object-fit: cover;
        border-radius: 50%;
    }

    .circleimg:hover {
        box-shadow: 3px 7px 10px rgba(0, 0, 0, 0.7) !important;
        transition-duration: 0.35s;
    }

    .circle-number {
        position: absolute;
        background-color: green;
        color: #222;
        font-weight: 700;
        font-size: 20px;
        padding-right: 20px;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 50%;
        margin-left: 200px;
    }

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

    .carousel-item {
        filter: blur(2px);
        -webkit-filter: blur(2px);

    }
</style>