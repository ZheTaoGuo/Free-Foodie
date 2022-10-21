<script>
    import { RouterLink } from 'vue-router'
    import { createUser, getFamily, createFamily, addFamilyMember } from '../utils'

    const userId = "0"   // TODO: obtained from cookies
    const userName = "bob"   // TODO: obtained from cookies


    export default {
        components: {
            RouterLink
        },
        data() {
            return {
                userId: userId,
                userName: userName,
                familyList: {},
            }
        },
        methods: {
            createUser,
            getFamilyList(userId) {
                getFamily(userId).then((value)=>{
                    console.log('getFamilyList is called')
                    console.log("this is getFamilyList", value)
                    this.familyList = value
                }).catch((message)=> {console.log("this is message", message); this.familyList = null })
            },  
            createFamily,
            addFamilyMember,
        },
        mounted(){
            this.getFamilyList(userId)
        }
    }

</script>

<template>
    <div class="mainContent">
        <div class="row">
            <div class="col-lg-4 col-md-12">
                <div class="row familyMembers d-flex flex-column">
                    <div class="row">
                        <div class="col-8 h-1" style="margin-top: 17px;"><h5>My Family Members</h5></div>
                        <div class="col-4 h-1"><span class="addFamilyMember btn" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">+</span></div>
                    </div>
                    <div class="collapse" id="collapseExample">
                        <div class="card card-body" v-if=" familyList !== null">    
                            Your referral code is: <span>{{ familyList.referralCode }}</span>
                        </div>
                        <div class="card card-body" v-else>    
                            <span>You do not have a family yet</span>
                        </div>
                    </div>
                    
                    <!-- populate this row with data from data from user-->
                    <div class="row">
                        <div v-if="familyList == null">
                            <div class="col-8 h-1" style="margin-top: 10px; text-align: center; width:100%">
                                <p v-on:click="createFamily(userId, userName)" class="btn btn-secondary">Create Family</p>
                            </div>
                        </div> 
                        <div v-else>
                            <table id="familyMembers" style="width:100%">
                                <tr v-for="user of familyList.users" v-bind:key="user">
                                    <div v-if="user !== undefined" class="row" style="padding:10px">
                                        <td class="col-3"><img src="../assets/user.png" style="width:30px; height:30px"></td>
                                        <td class="col" style="text-align:start"> {{ user.userName }} </td>
                                    </div>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                </div>

                <router-link to="/favourite" style="text-decoration:none; color: black">
                    <div class="row favoriteRecipies">
                        <div class="col-1">
                            <a href="/"><img src="../assets/love.png" style="height:30px; width:30px;"></a>
                        </div>
                        <div class="col-9 pt-1">
                            <h5>Your Favorite Recipies</h5>
                        </div>
                    </div>
                </router-link>

                <router-link to="/past" style="text-decoration:none; color: black">
                    <div class="row pastRecipies">
                        <div class="col-1">
                            <a href="/"><img src="../assets/history.png" style="height:30px; width:30px;"></a>
                        </div>
                        <div class="col-9 pt-1">
                            <h5>Your Past Recipies</h5>
                        </div>
                    </div>
                </router-link>
            </div>

            <div class="col calorieTracker ">
            <router-link to="/CalorieTracker" style="text-decoration:none">
                <div class="d-flex justify-content-between">
                    <h5 style="text-align:start; color:black; padding-top:5px">My Dashboard</h5>
                    <div class="btn btn-secondary">Expand</div>
                </div>

                <div class="d-flex justify-content-center" style="padding:20px">
                    <img src="../assets/logo.png" style="height:300px; width:300px;">
                </div>
            </router-link>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
    .mainContent {
        height: 100vh;
        padding: 70px
    }

    .familyMembers {
        background-color: lightgrey;
        border-radius: 10px;
        height: 400px;
        width: 100%;
        padding: 20px 0 0 20px
    }

    .pastRecipies, .favoriteRecipies{
        background-color: lightgrey;
        margin-top: 10px;
        height: 60px;
        width: 100%;
        border-radius: 10px;
        /* text-align: start; */
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        gap:10px;
        margin-bottom: 20px;
    }

    .addFamilyMember {
        font-size: 30px;
        cursor: pointer;
    }

    .calorieTracker {
        background-color: lightgrey;
        border-radius: 10px;
        text-align: start;
        width: 100%;
        padding: 20px 10px 0 20px;
        height: 500px;
    }
</style>