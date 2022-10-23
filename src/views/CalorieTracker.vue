<script>
// import { RouterLink } from 'vue-router'
import { calculateCalories, getUser, updateCalories } from '../utils'
import * as d3 from "d3";
import plot from "@/components/plotWithXandYaxis.vue";
// import calorieSearchModal from '../components/calorieSearchModal.vue';
// import * as axios from "axios";
import axios from 'axios'
import AutoComplete from 'primevue/autocomplete';
import Modal from "@/components/addFoodModal.vue";
import { ref, toRaw } from "vue";

const userId = "1"   // TODO: obtained from cookies
const userName = "bob"   // TODO: obtained from cookies

export default {
    components: {
        plot,
        AutoComplete,
        Modal,
    },
    setup() {
        const modalActive = ref(false);
        const toggleModal = () => {
            modalActive.value = !modalActive.value;
        };
        return { modalActive, toggleModal };
    },
    data() {
        return {
            userId: userId,
            userName: userName,
            height: "",
            weight: "",
            activityFrequency: "",
            calorieLimit: 0,
            gender: "",
            age: "",
            userSearch: "",
            isCalorieSearchModalVisible: false,
            searchResults: [],
            dailyCalorieIntake: 0,
            userCaloriesData: [],
            xAxisVariable: "day",
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
                console.log("this is response data", response.data);
                for (let i = 0; i < response.data.hits.length; i++) {
                    console.log(response.data.hits[i].fields.item_name)
                    searchResults.push(
                        {
                            "label": `${response.data.hits[i].fields.brand_name}: ${response.data.hits[i].fields.item_name}`,
                            "item_id": response.data.hits[i].fields.item_id,
                            "calories": response.data.hits[i].fields.nf_calories,
                            "brand_name": response.data.hits[i].fields.brand_name,
                            "item_name": response.data.hits[i].fields.item_name,
                        })
                }
                // console.log("this is searchResults", searchResults)
            }).catch(function (error) {
                console.error(error);
            });
            this.searchResults = searchResults
            console.log("this isthis.results", this.searchResults)
        },
        async addFood(addFoodEvent) {
            console.log("addFoodEvent is called")
            let foodInfo = addFoodEvent.path[2][0].value
            console.log("this is foodInfo", foodInfo)
            const options = {
                method: 'GET',
                url: `https://nutritionix-api.p.rapidapi.com/v1_1/search/${foodInfo}`,
                params: {
                    fields: 'item_name,item_id,brand_name,nf_calories,nf_total_fat',
                },
                headers: {
                    'X-RapidAPI-Key': '5028148f06msh1985fb5840879e5p14fd5bjsn06b1e3192403',
                    'X-RapidAPI-Host': 'nutritionix-api.p.rapidapi.com'
                }
            };

            let dailyCalorieIntake = this.dailyCalorieIntake
            let calorieLimit = Number(this.calorieLimit)
            console.log("this is failyCalorieIntake", dailyCalorieIntake)
            await axios.request(options).then(function (response) {
                console.log("this is response data", response.data);
                let calorieDetails = response.data.hits[0].fields.nf_calories
                updateCalories(userId, calorieDetails, dailyCalorieIntake, calorieLimit)
                dailyCalorieIntake = calorieDetails + dailyCalorieIntake
            }).catch(function (error) {
                console.error(error);
            });
            this.dailyCalorieIntake = dailyCalorieIntake
        },
        renderGraph(variable) {
            var svg = d3.select("svg"),
                margin = 170,
                width = svg.attr("width") - margin,
                height = svg.attr("height") - margin

            svg.append("text")
                .attr("transform", "translate(100,0)")
                .attr("x", 50)
                .attr("y", 50)
                .attr("style", "font-size:24px;")
                .text("Calorie Tracker");

            var xScale = d3.scaleBand().range([0, width]).padding(0.4),
                yScale = d3.scaleLinear().range([height, 0]);

            var g = svg.append("g")
                .attr("transform", "translate(" + 100 + "," + 100 + ")");


            // let data = this.userCaloriesData 
            // console.log('this is my proxy', data)
            // // data = toRaw(data)
            // console.log("tis data type", typeof(data.__v_raw))  
            // console.log('this is data.date', data.__v_raw['date']) 
            // console.log('eeee') 
            // for(ele of data){
            //     console.log("eeee")
            //     console.log("this is ele", ele)
            // } 

            let data = [
                { date: "2022-10-22T15:54:45.173Z", calories: 2560 },
                { date: "2022-10-23T14:42:57.815Z", calories: 350 },
                { date: "2022-10-24T06:57:29.537Z", calories: 395 },
            ]

            let days = {
                0: "Sunday",
                1: "Monday",
                2: "Tuesday",
                3: "Wednesday",
                4: "Thursday",
                5: "Friday",
                6: "Saturday"
            }
            let months = {
                0: "January",
                1: "February",
                2: "March",
                3: "April",
                4: "May",
                5: "June",
                6: "July",
                7: "August",
                8: "September",
                9: "October",
                10: "November",
                11: "December"
            }

            // console.log("tbis is my vairbale", variable)
            // TODO: aggregate the values together when it is in the same month
            // TODO: only get the 7 lastest entries to show in the graph
            // TODO: After re-rendering the graph, make sure that the past bars get removed and that it doesnt just add on 
            // TODO: make sure that the data fed to the graph is dynamic (change the hardcoded portions)
            if (variable == "day") {
                xScale.domain(data.map(function (d) { console.log("this is converted days", days[new Date(d.date).getDay()]); return days[new Date(d.date).getDay()] }));
                yScale.domain([0, 4000]);
            } else {
                xScale.domain(data.map(function (d) { console.log("this is converted months", days[new Date(d.date).getMonth()]); return months[new Date(d.date).getMonth()] }));
                yScale.domain([0, 4000]);
            }

            g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale))
                .append("text")
                .attr("y", height - 250)
                .attr("x", width - 100)
                .attr("text-anchor", "end")
                .attr("stroke", "black")
                .text("Days");

            g.append("g")
                .call(d3.axisLeft(yScale)
                    .ticks(10))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "-5.1em")
                .attr("text-anchor", "middle")
                .attr("stroke", "black")
                .text("Calories Consumed");

            if (variable == "day") {
                g.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("style", "fill: steelblue")
                    .attr("x", function (d) { return xScale(days[new Date(d.date).getDay()]); })
                    .attr("y", function (d) { return yScale(d.calories); })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function (d) { return height - yScale(d.calories); });
            } else {
                g.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("style", "fill: steelblue")
                    .attr("x", function (d) { return xScale(months[new Date(d.date).getMonth()]); })
                    .attr("y", function (d) { return yScale(d.calories); })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function (d) { return height - yScale(d.calories); });
            }

        }

    },
    mounted() {
        this.getUser(userId).then((user) => {
            this.height = user.height;
            this.weight = user.weight;
            this.activityFrequency = user.activityFrequency;
            // console.log("this is userc calroei deiasl", user.calorieDetails[Object.keys(user.calorieDetails)[Object.keys(user.calorieDetails).length-1]])
            this.calorieLimit = Number(user.calorieDetails[Object.keys(user.calorieDetails)[Object.keys(user.calorieDetails).length - 1]].calorieLimit).toFixed(2);
            this.dailyCalorieIntake = user.calorieDetails[Object.keys(user.calorieDetails)[Object.keys(user.calorieDetails).length - 1]].dailyCalorieIntake;
            this.gender = user.gender;
            this.age = user.age;

            for (const property in user.calorieDetails) {
                console.log("this is new obj created", { date: user.calorieDetails[property].date, calories: user.calorieDetails[property].dailyCalorieIntake })
                this.userCaloriesData.push({ date: user.calorieDetails[property].date, calories: user.calorieDetails[property].dailyCalorieIntake })
            }
        }),
            this.renderGraph(this.xAxisVariable)
    },
}

</script>

<template>
    <div class="mainContent">
        <!-- form -->
        <div class="container" style="margin-bottom:10px">
            <form class="row g-1 d-flex justify-content-center">
                <div class="col-6">
                    <AutoComplete v-model="userSearch" @complete="searchFood()"
                        placeholder="Enter your meal details here to track your calories!"
                        style="width:100%; padding-left: 90px;" :suggestions="searchResults" input-class="form-control"
                        panel-class="bg-white pt-1" :empty-selection-message="''" empty-search-message=""
                        search-message="" selection-message="" optionLabel="label">
                    </AutoComplete>
                </div>
                <div class="col-1">
                    <Modal @close="toggleModal" :modalActive="modalActive">
                        <div class="modal-content" style="border:none">
                            <div v-if="userSearch != ''">
                                <h2 style="font-weight:bold; text-align:start">You have eaten:</h2>
                                <br>
                                <p style="font-size:20px"> <span
                                        style="font-weight:bold">{{ userSearch.item_name }}</span> from <span
                                        style="font-weight:bold">{{ userSearch.brand_name }}</span></p>
                                <p style="font-size:20px">
                                    It had {{ userSearch.calories }} calories. <br>
                                    You have <span style="font-weight:bold">{{ Number(calorieLimit -
                                            dailyCalorieIntake).toFixed(2)
                                    }} calories left</span> for today.
                                </p>
                            </div>
                            <div v-else>
                                <h2 style="font-weight:bold">Please select a food entry first.</h2>
                            </div>
                        </div>
                    </Modal>
                    <div class="btn btn-secondary mb-3" v-on:click="addFood($event)" @click="toggleModal">Add</div>
                </div>
            </form>
        </div>

        <!-- dashboard -->
        <div style="border:1px solid black; width:70%" class="p-3 mx-auto">
            <!-- <plot :height="500" style="padding-left:50px" :data="userCaloriesData" /> -->

            <svg width="800" height="600"></svg>

            <div class="row d-flex justify-content-end mt-4">
                <label for="colFormLabelSm" class="col-1 col-form-label col-form-label-sm"
                    style="text-align: end">X-axis:</label>
                <div class="dropdown col-2">
                    <select class="form-control moreMinimal" style="text-align:center" v-model="xAxisVariable"
                        v-on:change="renderGraph(xAxisVariable)">
                        <option value="day" selected>Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- letting user key in the fields of details of themselves -->
        <div class="row d-flex justify-content-center mt-3  pt-3" style="text-align:end; ">
            <label for="colFormLabelSm" class="col-1 col-form-label col-form-label-sm pt-0"
                style="line-height: 14px;">Height <br> (in cm)</label>
            <div class="col-1">
                <input type="text" class="form-control form-control-sm" id="colFormLabelSm" v-model="height">
            </div>
            <label for="colFormLabelSm" class="col-1 col-form-label col-form-label-sm pt-0"
                style="line-height: 14px;">Weight <br> (in kg)</label>
            <div class="col-1">
                <input type="text" class="form-control form-control-sm" id="colFormLabelSm" v-model="weight">
            </div>
            <label for="colFormLabelSm" class="col-1 col-form-label col-form-label-sm pt-0"
                style="line-height: 14px;">Activity Frequency</label>
            <div class="col-3">
                <select class="form-control moreMinimal" style="text-align:center" v-model="activityFrequency">
                    <option selected value="Little to no exercise   ">Little to no exercise</option>
                    <option value="Exercise 1-3 days/week">Exercise 1-3 days/week</option>
                    <option value="Exercise 3-5 days/week">Exercise 3-5 days/week</option>
                    <option value="Exercise 6-7 days/week">Exercise 6-7 days/week</option>
                    <option value="Hard exercise 6-7 days/week">Hard exercise 6-7 days/week</option>
                </select>
            </div>

            <div class="btn btn-secondary col-1" style="height:10%"
                v-on:click="calculateCalories(userId, height, weight, activityFrequency)">Calculate</div>
        </div>

        <!-- personal details -->
        <div style="text-align:center; line-height: 30%;" class="mx-auto mt-4" v-if="calorieLimit != 0">
            <p><span style="font-weight: bold;">The healthy BMI range for a {{ gender }} of height {{ height }}cm,
                    {{ weight }}kg, and {{ age }} years old is:</span> (XX) to (XX)</p>
            <p><span style="font-weight: bold;">Your recommended daily calorie intake:</span> {{ calorieLimit }} calories
            </p>
        </div>
        <div v-else class="mt-4">
            <p>Key in the fields to calculate the amount of calories you should intake.</p>
        </div>
    </div>

</template>

<style scoped>
.mainContent {
    padding: 10px;
    z-index: -1;
}

.textBox {
    background-image: url('../assets/logo.png');
    background-size: 30px;
    background-position: left;
    background-repeat: no-repeat;
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

.p-autocomplete-panel-custom {
    background-color: white;
}
</style>