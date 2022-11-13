<template>
  <div class="content" style = "margin-top: 80px;">
    <div class="container-fluid">
      <div class="row align-items-stretch no-gutters contact-wrap">
        <div class="col-md-12">
          <div class="form h-100">
            <router-link to="/">
              <img src="../assets/fflogo.png" class="img mx auto" style="width: 30%;">
            </router-link>
              <h1 class="display-5 mb-3 section-titles">Log In</h1>
              <div class="form-floating mx-auto mb-3 col-6">
                <input type="email" th:field="*{username}" class="form-control" id="email" placeholder="name@example.com">
                <label for="email">Email address</label>
                <div id="emailHelpBlock" class="form-text text-danger" v-if="emailInvalid">
                    {{emailMsg}}
                </div>
              </div>
              <div class="form-floating mx-auto mb-3 col-6">
                <input type="password" th:field="*{password}" class="form-control" id="password" placeholder="Password" @keyup.enter="handlesignin()">
                <label for="password">Password</label>
                <div id="passwordHelpBlock" class="form-text text-danger" v-if="passwordInvalid">
                    {{passwordMsg}}
                </div>
              </div>
              
            
              <button class="btn btn-outline-success col-5 btn-login text-uppercase fw-bold signin-btn m-1" @click="handlesignin()">Sign in</button>
              <button class="btn col-1 btn-danger m-1 px-0 " @click="googlesignin()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                </svg>
              </button>
            
            <div class="d-grid" style="align-items: center;"> 
              <router-link to="/signupinit">
                <p style = "margin-top: 20px; text-decoration: underline; color: blue;">
                  Don't Have An Account? Sign Up
                </p>
              </router-link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { signin2, googlesignin } from '../utils'

export default{
  name: 'appLogin',
  data() {
    return {
      emailInvalid: false,
      passwordInvalid: false,
      useremail: '',
      userpass: '',
      emailMsg: "",
      passwordMsg: "",
    }
  },
  methods:{
    googlesignin,
    handlesignin() {
      signin2().then().catch((msgList) => {

        console.log("this is catch & msgList: ", msgList)
        if (msgList.length == 2){
          this.emailInvalid = true;
          this.passwordInvalid = true;
          this.emailMsg = msgList[0];
          this.passwordMsg = msgList[1];
        } else if (msgList.length == 1){
          if (msgList[0] == "Please enter an email address."){
            this.emailInvalid = true;
            this.passwordInvalid = false;
            this.emailMsg = msgList[0];
          } else if (msgList[0] == "Please enter a password."){
            this.emailInvalid = false;
            this.passwordInvalid = true;
            this.passwordMsg = msgList[0];
          } else if (msgList[0] == "Incorrect password!"){
            this.emailInvalid = false;
            this.passwordInvalid = true;
            this.passwordMsg = msgList[0];
          } else if (msgList[0] == "User not found! Please enter a valid email address"){
            this.emailInvalid = true;
            this.passwordInvalid = false;
            this.emailMsg = msgList[0];
          }
        }
        
      });
    }
  }
}
</script>