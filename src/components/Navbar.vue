<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light" >
    <div class="container-fluid" style="background-color: #187bcd;">
      <a class="navbar-brand" href="/">
        <img src="../assets/fflogo.png" height="70px">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item mx-2">
            <a class="nav-link active" aria-current="page" href="/search" style="color:white">Recipes</a>
          </li>
          <li class="nav-item mx-2">
            <a class="nav-link active" href="/fridge" style="color:white">My Fridge</a>
          </li>
          <li class="nav-item mx-2">
            <a href="/shoppinglist" class="nav-link active" style="color:white">
              Shopping List
            </a>
          </li>
          <li class="nav-item mx-2">
            <a href="/profile" class="btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
// import { getLoggedInUser } from "/utils";
// export default {
//   data() {
    
//     return {
//       userName:""
//     }
//   },
//   methods: {
//     promptLogin() {
//       this.$router.push({
//         name: "Login",
//       });
//     },
//     getLoggedInUser,
//   },
//   mounted(){
//     this.getLoggedInUser().then((user)=> {
//       this.userName = user.userName 
//     })
//   }
// };
</script>

<style scoped>
nav {
  margin: 0;
  padding: 0;
}
.nav-item{
  font-size: larger;
  font-weight: 500;
}

.nav-link:hover{
  text-decoration: underline;
}
.bi:hover{
  box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
}



</style>