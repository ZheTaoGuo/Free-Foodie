<template>
  <div class="container-fluid">
    <div class="row" id="recreate">
      <h1>Recreate finest food around the world</h1>
      <button type="button" class="btn btn-primary btnstyle">
        Explore Menu
      </button>
    </div>
    <div class="section-header text-center mx-auto mb-5">
      <h1 class="display-5 mb-3">How It Works</h1>
    </div>
    <div class="row g-4" id="works">
      <div class="col-lg-4 col-md-6">
        <div class="text-center h-100 p-4 p-xl-5">
          <div class="circle-number">1</div>
          <img class="img-fluid mb-4 circleimg" src="../assets/foodbowl.jpg" />
          <h2 class="text-white mb-3">Choose your favourite meals</h2>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="text-center h-100 p-4 p-xl-5">
          <div class="circle-number">2</div>
          <img class="img-fluid mb-4 circleimg" src="../assets/foodbowl.jpg" />
          <h2 class="text-white mb-3">We deliver fresh Ingredients</h2>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="text-center h-100 p-4 p-xl-5">
          <div class="circle-number">3</div>
          <img class="img-fluid mb-4 circleimg" src="../assets/foodbowl.jpg" />
          <h2 class="text-white mb-3">Prepare and enjoy!</h2>
        </div>
      </div>

      <div
        class="container h-100 d-flex align-items-center justify-content-center"
      >
        <div class="row justify-content-center">
          <button type="button" class="btn btn-primary" @click="promptLogin">
            Order Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login.vue";
export default {
  data() {},
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

#recreate {
  background-image: url("../assets/foodbackground.jpg");
  background-size: cover;

  padding-top: 250px;
  padding-bottom: 250px;
  color: white;
}

#works {
  animation: animate 10s ease-in-out infinite;
  background-size: cover;
}

@keyframes animate {
  0%,
  100% {
    background-image: url("../assets/foodbowl.jpg");
  }
  25% {
    background-image: url("../assets/backgroundpicture1.jpg");
  }
  50% {
    background-image: url("../assets/backgroundpicture2.jpg");
  }
  75% {
    background-image: url("../assets/backgroundpicture3.jpg");
  }
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

/*add img fluid styling */
.circleimg {
  height: 250px;
  width: 250px;
  object-fit: contain;
}

.circle-number {
  position: absolute;
  background-color: #f4b8aa;
  color: #222;
  font-weight: 700;
  font-size: 20px;
  padding-right: 23px;
  padding-left: 23px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 40px;
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
</style>
