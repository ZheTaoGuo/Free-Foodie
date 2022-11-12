<script>
    import {
        register,
        googlesignup
    } from '../utils'
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            delay: {
                'show': 0,
                'hide': 0
            }
        }, )
    });

    export default {
        name: 'appSignup',
        data() {
            return {
                emailInvalid: false,
                passwordInvalid: false,
                nameInvalid: false,
                ageInvalid: false,
                genderInvalid: false,
                useremail: '',
                userpass: '',
                name: '',
                age: '',
                gender: 'Gender',
            }
        },
        methods: {
            register,
            googlesignup,
            checkFields() {

                if (this.name.length == 0){
                    this.nameInvalid = true
                }

                if (this.age.length == 0){
                    this.ageInvalid = true
                }

                if (this.gender == 'Gender'){
                    this.genderInvalid = true
                }

                if (!this.genderInvalid && !this.ageInvalid && !this.nameInvalid && !this.emailInvalid && !this.passwordInvalid){
                    this.register()
                }
            },
        },
        computed: {
            checkEmail() {
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.useremail)) {
                    this.emailInvalid = true
                } else{
                    this.emailInvalid = false
                }
            },

            checkPassword() {
                if (this.userpass.length < 8) {
                    this.passwordInvalid = true
                } else if (!/[A-Z]/.test(this.userpass) || !/[a-z]/.test(this.userpass)) {
                    this.passwordInvalid = true
                } else if (!/[^0-9a-zA-Z]/.test(this.userpass)) {
                    this.passwordInvalid = true
                } else if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.userpass)) {
                    this.passwordInvalid = true
                } else {
                    this.passwordInvalid = false
                }
            }
        }
    }
</script>

<template>
    <div class="content" style="margin-top: 80px;">
        <div class="container-fluid">
            <div class="row align-items-stretch no-gutters contact-wrap">
                <div class="col-md-12">
                    <div class="h-100">
                        <img src="../assets/fflogo.png" class="img mx auto" style="width: 30%;">
                        <p class="h4 mb-3">
                            First, tell us about yourself:
                        </p>
                        <!-- !!! -->

                        <div class="form-floating mx-auto mb-3 col-6">
                            <input class="form-control" id="name" placeholder="Name" v-model="name">
                            <label for="name">Name</label>
                            <div id="nameHelpBlock" class="form-text text-danger" v-if="nameInvalid">
                                Name field cannot be left empty
                            </div>
                        </div>
                        <div class="form-floating mx-auto mb-3 col-6">
                            <input type="number" class="form-control" id="age" placeholder="Input your age" min="1"
                                max="99" v-model="age">
                            <label for="age">Age</label>
                            <div id="ageHelpBlock" class="form-text text-danger" v-if="ageInvalid">
                                Age field cannot be left empty
                            </div>
                        </div>

                        <div class="form-floating mx-auto mb-3 col-6">
                            <select class="form-select" id="gender" v-model="gender">
                                <option selected disabled>Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                            <div id="genderHelpBlock" class="form-text text-danger" v-if="genderInvalid">
                                Gender field cannot be left empty
                            </div>
                        </div>

                        <div class="form-floating mx-auto mb-3 col-6">
                            <input class="form-control" id="familyId" placeholder="Input your family ID (optional)" />
                            <label for="familyId">Family ID (optional)</label>
                            <img src="/info-svgrepo-com.svg" alt="info" class="icon-image" data-bs-delay="0"
                                data-bs-trigger="hover focus" data-bs-toggle="tooltip" data-bs-placement="top"
                                title="If you are a new user, please leave this field blank. You can retrieve your family referral code on your profile">
                        </div>

                        <!-- <hr> -->
                        <div class="mt-5">
                            <p class="h4 mb-3">
                                Then, register using email or Google:
                            </p>

                            <!-- <p class="h5 mb-3 section-titles">Or create account with email</p> -->
                            <div class="form-floating mx-auto mb-3 col-6">
                                <input type="email" th:field class="form-control" id="email"
                                    placeholder="name@example.com" :onkeypress="checkEmail" v-model="useremail">
                                <label for="email">Email address</label>
                                <div id="emailHelpBlock" class="form-text text-danger" v-if="emailInvalid">
                                    Email address is invalid! Please enter a valid email address
                                </div>
                            </div>
                            <div class="form-floating mx-auto mb-3 col-6">
                                <input type="password" th:field="*{password}" class="form-control" id="password"
                                    placeholder="Password" :onkeypress="checkPassword" v-model="userpass">
                                <label for="password">Password</label>
                                <div id="passwordHelpBlock" class="form-text text-danger" v-if="passwordInvalid">
                                    Your password must be 8 characters or longer, contain letters and numbers, and must
                                    not contain spaces, special characters, or emoji.
                                </div>
                            </div>
                            <button
                                class="btn btn-outline-success btn-login text-uppercase fw-bold signin-btn m-1 col-6"
                                @click="checkFields()">Sign up</button>

                            <div class="my-3">
                                <button class="btn btn-danger m-1 col-6" id="googleSignIn" @click="googlesignup()">
                                    Sign up with Google
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-google" viewBox="0 0 16 16">
                                        <path
                                            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="d-grid" style="align-items: center;">
                            <router-link to="/login">
                                <p style="margin-top: 20px; text-decoration: underline; color: blue;">
                                    Have an account? Log in here!
                                </p>
                            </router-link>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<style scoped>
    familyId {
        position: relative;
    }

    .icon-image {
        position: absolute;
        top: 32%;
        margin-right: 5px;
        right: 0;
        width: 20px;
        height: 20px;


    }

    /* .tooltip{
  position:relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext{
  position:absolute;
  top: 0;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 20px;
  background-color: black;
  visibility: hidden;
  width: 120px;
  padding: 5px 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 1s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
} */
</style>