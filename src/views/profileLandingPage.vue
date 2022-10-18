<script>
    // import { RouterLink } from 'vue-router'
</script>

<template>
    <h1 class="button">Profile Landing Page</h1>
    <div class="mainContent">
        <div class="row">
            <div class="col-4">
                <div class="row familyMembers">
                    <div class="row">
                        <div class="col-8 h-1" style="margin-top: 10px;"><h5>My Family Members</h5></div>
                        <div class="col-4 h-1"><span class="addFamilyMember">+</span></div>
                    </div>
                    
                    <div class="row" id="referralCode"></div>
                    <!-- populate this row with data from data from user-->
                    <div class="row">
                        You currently have no members in your family
                        <table id="familyMembers">
                        </table>
                    </div>
                </div>

                <div class="row favoriteRecipies">
                    <div class="col-1">
                        <a href="/"><img src="../assets/logo.png" style="height:30px; width:30px;"></a>
                    </div>
                    <div class="col px-5">
                        <h5>Your Favorite Recipies</h5>
                    </div>
                </div>

                <div class="row pastRecipies">
                    <div class="col-1">
                        <a href="/"><img src="../assets/logo.png" style="height:30px; width:30px;"></a>
                    </div>
                    <div class="col px-5">
                        <h5>Your Past Recipies</h5>
                    </div>
                </div>
            </div>

            <div class="col calorieTracker">
                <h5>My Dashboard</h5>
                <div>

                </div>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
    .mainContent {
        border: 1px solid black;
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
        padding:18px 0 0 30px;
        text-align: start;
    }

    .addFamilyMember {
        font-size: 30px;
        cursor: pointer;
    }

    .calorieTracker {
        background-color: lightgrey;
        border-radius: 10px;
        text-align: start;
        padding:30px 0 0 30px;
    }
</style>