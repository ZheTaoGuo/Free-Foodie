<script>
    // import { RouterLink } from 'vue-router'
    import { calculateCalories, getUser } from '../utils'
    // import * as d3 from "d3";
    import plot from "@/components/plotWithXandYaxis.vue";
    // import calorieSearchModal from '../components/calorieSearchModal.vue';
    // import * as axios from "axios";
    import axios from 'axios'

    const userId = "1"   // TODO: obtained from cookies
    const userName = "bob"   // TODO: obtained from cookies

    export default {
        components: {
            plot,
            calorieSearchModal
        },
        data() {
            return {
                userId: userId,
                userName: userName,
                height: "",
                weight: "",
                activityFrequency: "",
                calorieLimit: 0,
                gender : "",
                age: "",
                userSearch: "",
                isCalorieSearchModalVisible: false,
                searchResults: []
            }
        },
        methods: {
            calculateCalories,
            getUser,
            showModal() {
                this.isCalorieSearchModalVisible = true;
            },
            closeModal() {
                this.isCalorieSearchModalVisible = false;
            },
            async searchFood() {
                console.log("searchFood() called")
                let foodOrBrand = this.userSearch
                const options = {
                    method: 'GET',
                    url: `https://nutritionix-api.p.rapidapi.com/v1_1/search/${foodOrBrand}`,
                    params: {
                        fields: 'item_name,item_id,brand_name,nf_calories,nf_total_fat', 
                    },
                    headers: {
                        'X-RapidAPI-Key': '5028148f06msh1985fb5840879e5p14fd5bjsn06b1e3192403',
                        'X-RapidAPI-Host': 'nutritionix-api.p.rapidapi.com'
                    }
                };

                let searchResults = []
                await axios.request(options).then(function (response) {
                    console.log("this is response data",response.data);
                    for(let i = 0; i < response.data.hits.length; i++) {
                        console.log(response.data.hits[i].fields.item_name)
                        searchResults.push(response.data.hits[i].fields.item_name)
                    }
                    // console.log("this is searchResults", searchResults)
                }).catch(function (error) {
                    console.error(error);
                });
                this.searchResults = searchResults
                console.log("this isthis.results", this.searchResults)
            }

        },
        mounted() {
            this.getUser(userId).then((user) => {
                this.height = user.height;
                this.weight = user.weight;
                this.activityFrequency = user.activityFrequency;
                // console.log("this is userc calroei deiasl", user.calorieDetails[Object.keys(user.calorieDetails)[Object.keys(user.calorieDetails).length-1]])
                this.calorieLimit = user.calorieDetails[Object.keys(user.calorieDetails)[Object.keys(user.calorieDetails).length-1]].calorieLimit.toFixed(2);
                this.gender = user.gender;
                this.age = user.age;
            })
        }
    }  

</script>

<template>
    <div class="mainContent">
        <!-- form -->
        <!-- TODO: connect to external API to get calories of external meals -->
        <div class="container">
            <form class="row g-3 d-flex justify-content-center">
                <div class="col-6">
                    <input type="text" v-model="userSearch" @keydown="searchFood()" class="form-control textBox" id="inputPassword2" placeholder="Enter your meal details here to track your calories!" style="width:100%; padding-left: 90px;">
                </div>
                <div class="col-auto">
                    <div class="btn btn-secondary mb-3" v-on:click="searchFood()">Add</div>
                </div>
            </form>
            <div class="row d-flex justify-content-center" style="margin-right:50px">
                <div class="col-6">
                    <!-- <button
                        type="button"
                        class="btn"
                        @click="showModal"
                        >
                        Open Modal!
                    </button>
            
                    <calorieSearchModal
                        v-show="isCalorieSearchModalVisible"
                        @close="closeModal"
                    /> -->
                    {{searchResults}}
                </div>
            </div>
        </div>



        <!-- dashboard -->
        <div style="border:1px solid black; width:70%" class="p-3 mx-auto">
            <!-- TODO: make the data reflect actual user calories & insert the calorie line -->
            <!-- <svg></svg> -->
            <plot :height="500" style="padding-left:50px"/>
            <div class="row d-flex justify-content-end mt-4">
                <label for="colFormLabelSm" class="col-1 col-form-label col-form-label-sm" style="text-align: end">X-axis:</label>
                <div class="dropdown col-2">
                    <select class="form-control moreMinimal" style="text-align:center">
                        <option selected>Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- letting user key in the fields of details of themselves -->
        <div class="row d-flex justify-content-center mt-3  pt-3" style="text-align:end;">
            <label for="colFormLabelSm" class="col-1 col-form-label col-form-label-sm pt-0" style="line-height: 14px;">Height <br> (in cm)</label>
            <div class="col-1">
                <input type="text" class="form-control form-control-sm" id="colFormLabelSm" v-model="height">
            </div>
            <label for="colFormLabelSm" class="col-1 col-form-label col-form-label-sm pt-0" style="line-height: 14px;">Weight <br> (in kg)</label>
            <div class="col-1">
                <input type="text" class="form-control form-control-sm" id="colFormLabelSm" v-model="weight">
            </div>
            <label for="colFormLabelSm" class="col-1 col-form-label col-form-label-sm pt-0" style="line-height: 14px;">Activity Frequency</label>
            <div class="col-3">
                <select class="form-control moreMinimal" style="text-align:center" v-model="activityFrequency">
                        <option selected value="Little to no exercise   ">Little to no exercise</option>
                        <option value="Exercise 1-3 days/week">Exercise 1-3 days/week</option>
                        <option value="Exercise 3-5 days/week">Exercise 3-5 days/week</option>
                        <option value="Exercise 6-7 days/week">Exercise 6-7 days/week</option>
                        <option value="Hard exercise 6-7 days/week">Hard exercise 6-7 days/week</option>
                </select>
            </div>
            
            <div class="btn btn-secondary col-1" style="height:10%" v-on:click="calculateCalories(userId, height, weight, activityFrequency)">Calculate</div>
        </div>

        <!-- personal details -->
        <div style="text-align:center; line-height: 30%;" class="mx-auto mt-4" v-if="calorieLimit != 0">
            <p><span style="font-weight: bold;">The healthy BMI range for a {{gender}} of height {{height}}cm, {{weight}}kg, and {{age}} years old is:</span> (XX) to (XX)</p>
            <p><span style="font-weight: bold;">Your recommended daily calorie intake:</span> {{calorieLimit}} calories</p>
        </div>
        <div v-else class="mt-4">
            <p>Key in the fields to calculate the amount of calories you should intake.</p>
        </div>
    </div>

</template>

<style scoped>
.mainContent {
    padding: 10px
}

.textBox{  
    background-image:url('../assets/logo.png');   
    background-size: 30px;
    background-position:left;   
    background-repeat:no-repeat;   
    background-position: 30px;
}


select.moreMinimal {
    background-image:
      linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%);
    background-position:
      calc(100% - 20px), 
      calc(100% - 15px);
    background-size:
      5px 5px,
      5px 5px;
    background-repeat: no-repeat;
}
</style>