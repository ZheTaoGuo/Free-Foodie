<template>
  <div class="container-fluid">
    <div class="row">
            <!--Start of NavBar-->
            <NavBar></NavBar>
            <!--End of NavBar-->
        </div>
    <div class="row" id="carouselStyle">
      <div id="foodcarousel" class="carousel slide" data-bs-ride="carousel" style="height:90%">
        <div class="carousel-inner text-center">
          <div class="carousel-item active h-100" data-bs-interval="3000">
            <img src="../assets/backgroundpicture1.jpg" class="d-block w-100">
          </div>
          <div class="carousel-item h-100" data-bs-interval="3000">
            <img src="../assets/backgroundpicture2.jpg" class="d-block w-100">
          </div>
          <div class="carousel-item h-100" data-bs-interval="3000">
            <img src="../assets/backgroundpicture3.jpg" class="d-block w-100">
          </div>
        </div>
        <div id="titledetails">
          <h1 class="title">Recreate the finest food around the world</h1>
          <button type="button" class="btn btn-primary btnstyle">
            Explore Menu
          </button>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="section-header text-center mx-auto mb-5">
        <h1 class="display-5 mb-3" id="sectiontitle">How It Works</h1>
      </div>
    </div>

    <div class="row g-4" id="works">
      <div class="col-lg-4 col-md-6">
        <div class="text-center p-2 p-xl-5">
          <div class="circle-number">1</div>
          <img class="img-fluid mb-4 circleimg" src="../assets/foodbowl.jpg" />
          <h2 class="text-white individualtitle">Choose your favourite meals</h2>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="text-center p-2 p-xl-5">
          <div class="circle-number">2</div>
          <img class="img-fluid mb-4 circleimg " src="../assets/foodbowl.jpg" />
          <h2 class="text-white individualtitle">We deliver fresh Ingredients</h2>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="text-center p-2 p-xl-5">
          <div class="circle-number">3</div>
          <img class="img-fluid mb-4 circleimg " src="../assets/foodbowl.jpg" />
          <h2 class="text-white individualtitle">Prepare and enjoy!</h2>
        </div>
      </div>

      <div class="container h-100 d-flex align-items-center justify-content-center">
        <div class="row justify-content-center">
          <button type="button" class="btn btn-primary" @click="promptLogin">
            Order Now
          </button>
        </div>
      </div>
    </div>

    <div class="footer d-flex justify-content-center">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-12" id="copyright">
            <p>Copyrights &copy; 2022 - <a href="">FreeFoodie</a>, All Rights Reserved.<br>
            </p>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="social-icons">
              <ul>
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#"><i class="fa fa-instagram"></i></a></li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login.vue";
import NavBar from '../components/Navbar.vue'
export default {
  components: {
            NavBar
        },
  data() {
    
    return {
      
    }
  },
  methods: {
    promptLogin() {
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: Playfair;
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
  color: black;
  background: rgba(255, 255, 255, 0.75);
  padding: 20px;
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
  background-color: lightblue;
}

.order-btn {
  text-align: center;
  color: blue;
}

.individualtitle {
  margin: 0 auto;
  background-color: green;
  border-radius: 10px;
  width: 450px;
  height: 80px;
  padding: 20px;

}

.circleimg {
  height: 250px;
  width: 250px;
  object-fit: cover;
  border-radius: 50%;
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
.footer{
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

#copyright{
  padding: 16px;
  text-align: center;
  margin: 0 auto;
}
</style>
