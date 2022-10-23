<template>
  <!-- <appLogin/> -->
  <appSignup/>
</template>

<script>
import appSignup from "./components/Signup.vue";
import appLogin from "./views/Login.vue";
export default {
  name: 'App',
  components: {
    // appLogin,
    appSignup
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
