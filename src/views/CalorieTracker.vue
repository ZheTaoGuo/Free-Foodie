<script>
// import { RouterLink } from 'vue-router'
import { calculateCalories, getUser, updateCalories, getLoggedInUser, isLoggedIn } from '../utils'
import * as d3 from "d3";
import plot from "@/components/plotWithXandYaxis.vue";
// import calorieSearchModal from '../components/calorieSearchModal.vue';
// import * as axios from "axios";
import axios from 'axios'
import AutoComplete from 'primevue/autocomplete';
import Modal from "@/components/Modal.vue";
import { ref, toRaw } from "vue";
import NavBar from '../components/Navbar.vue'


export default {
    components: {
        plot,
        AutoComplete,
        Modal,
        NavBar
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
            userObj: {},
            userId: "",
            userName: "",
            height: "",
            weight: "",
            activityFrequency: "",
            calorieLimit: 0,
            gender: "",
            age: "",
            userCalorieDetails: "",
            userSearch: "",
            isCalorieSearchModalVisible: false,
            searchResults: [],
            dailyCalorieIntake: 0,
            userCaloriesData: [],
            xAxisVariable: "day",
            filteredData: [],
        }
    },
    methods: {
        isLoggedIn,
        getLoggedInUser,
        calculateCalories,
        calculateCaloriesAndUpdate(userId, height, weight, activityFrequency, dailyCalorieIntake) {
            this.calculateCalories(userId, height, weight, activityFrequency, dailyCalorieIntake).then(response => {
                this.calorieLimit = response
                this.renderGraph(this.xAxisVariable)
            })
        },
        getUser,
        getUserDetails(userId){
            this.getUser(userId).then((user) => {
                this.userObj = user
                this.height = user.height;
                this.weight = user.weight;
                this.activityFrequency = user.activityFrequency;
                // console.log("this is userc calroei deiasl", user.calorieDetails[Object.keys(user.calorieDetails)[Object.keys(user.calorieDetails).length-1]])
                if (user.calorieDetails != null){
                    this.calorieLimit = Number(user.calorieDetails[Object.keys(user.calorieDetails)[Object.keys(user.calorieDetails).length - 1]].calorieLimit).toFixed(2);
                    this.dailyCalorieIntake = user.calorieDetails[Object.keys(user.calorieDetails)[Object.keys(user.calorieDetails).length - 1]].dailyCalorieIntake;
                    this.userCaloriesData = [];
                    for (const property in user.calorieDetails) {
                        // console.log("this is new obj created", { date: user.calorieDetails[property].date, calories: user.calorieDetails[property].dailyCalorieIntake})
                        this.userCaloriesData.push({ date: user.calorieDetails[property].date, calories: user.calorieDetails[property].dailyCalorieIntake})
                    }
                    // console.log(this.userCaloriesData[0])
                    // console.log(this.userCaloriesData[0].date)
                    // console.log(this.userCaloriesData[0].calories)
                    console.log("this is userCaloriesData", this.userCaloriesData)
                    this.renderGraph(this.xAxisVariable)
                }
                this.gender = user.gender;
                this.age = user.age;
            })
        },
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
            await axios.request(options).then(response => {
                console.log("this is response data", response.data);
                let calorieDetails = response.data.hits[0].fields.nf_calories
                updateCalories(this.userId, calorieDetails, dailyCalorieIntake, calorieLimit).then(response => {
                    console.log("this is response", response)
                    // calling on the method getUserDetails 
                    this.dailyCalorieIntake = dailyCalorieIntake
                    this.getUserDetails(this.userId)
                })
                dailyCalorieIntake = calorieDetails + dailyCalorieIntake
            }).catch(function (error) {
                console.error(error);
            });
        },

        //mouseover event handler function
         onMouseOver (d, i) {
            console.log("this is d", d)
            
            var svg = d3.select("#dashboard"),
                margin = 170,
                width = svg.attr("width") - margin,
                height = svg.attr("height") - margin
            var xScale = d3.scaleBand().range([0, width]).padding(0.4),
                yScale = d3.scaleLinear().range([height, 0]);

            let scale = 1
            let variable = this.xAxisVariable
            if (variable == "week"){
                scale = 7
            } else if (variable == "month") {
                scale = 30
            }
            xScale.domain(this.filteredData.map(function (d) { return d.date }));
            let mult = Math.pow(10, 1 - Math.floor(Math.log(this.calorieLimit * scale) / Math.LN10) - 1);
            let maxY = Math.ceil(this.calorieLimit * scale * mult) / mult
            yScale.domain([0, maxY]);
            
            d3.select(d.path[0]).attr('style', 'fill: orange');
            d3.select(d.path[0])
            .transition()     // adds animation
            .duration(400)
            .attr('width', xScale.bandwidth() + 10)
            .attr("x", (a) => xScale(a.date) - 5)
            .attr("y", function(d) { return yScale(d.calories) - 10; })
            .attr("height", function(d) { return height - yScale(d.calories) + 10; });


            let g = d3.select("g")
            g.append("text")
            .attr('class', 'val') 
            .attr('x', function() {
                console.log("this shld be my d", d.path[0]["__data__"].date)
                return xScale(d.path[0]["__data__"].date) + ((xScale.bandwidth() + 10) / 4) - 5;
            })
            .attr('y', function() {
                console.log("this is my caloriees", d.path[0]["__data__"].calories)
                return yScale(d.path[0]["__data__"].calories) - 12;
            })
            .text(function() {
                return [Number(d.path[0]["__data__"].calories).toFixed(2)];  // Value of the text
            });
        },
        //mouseout event handler function
        onMouseOut(d, i) {
            // use the text label class to remove label on mouseout

            var svg = d3.select("#dashboard"),
                margin = 170,
                width = svg.attr("width") - margin,
                height = svg.attr("height") - margin
            var xScale = d3.scaleBand().range([0, width]).padding(0.4),
                yScale = d3.scaleLinear().range([height, 0]);

            let scale = 1
            let variable = this.xAxisVariable
            if (variable == "week"){
                scale = 7
            } else if (variable == "month") {
                scale = 30
            }
            xScale.domain(this.filteredData.map(function (d) { return d.date }));
            let mult = Math.pow(10, 1 - Math.floor(Math.log(this.calorieLimit * scale) / Math.LN10) - 1);
            let maxY = Math.ceil(this.calorieLimit * scale * mult) / mult
            yScale.domain([0, maxY]);

            d3.select(d.path[0]).attr('style', 'fill: steelblue');
            d3.select(d.path[0])
            .transition()     // adds animation
            .duration(400)
            .attr('width', xScale.bandwidth())
            .attr("x", function(d) { return xScale(d.date); })
            .attr("y", function(d) { return yScale(d.calories); })
            .attr("height", function(d) { return height - yScale(d.calories); });

            d3.selectAll('.val')
            .remove()
        },

        renderGraph(variable) {
            console.log('renderGraph() called')
            console.log("this is variable", variable)
            var svg = d3.select("#dashboard"),
                margin = 170,
                width = svg.attr("width") - margin,
                height = svg.attr("height") - margin

            // console.log("this is svg", svg)
            svg.append("text")
                .attr("transform", "translate(100,0)")
                .attr("x", 50)
                .attr("y", 50)
                .attr("style", "font-size:24px;")
                .attr("id", "dashboardTitle")
                .text("Calorie Tracker");

            var xScale = d3.scaleBand().range([0, width]).padding(0.4),
                yScale = d3.scaleLinear().range([height, 0]);

            // DOM manipulation to remove <g> tag if it already exists
            if (document.getElementsByTagName("g").length >= 1) {
                // console.log("this is getElementsByTagName", document.getElementsByTagName("g"))
                document.getElementsByTagName("g")[0].remove()
                document.getElementById("dashboardTitle").remove()
            }

            var g = svg.append("g")
                .attr("transform", "translate(" + 100 + "," + 100 + ")");

            // let data = [
            //     { date: "2022-10-22T15:54:45.173Z", calories: 2560 },
            //     { date: "2022-10-23T14:42:57.815Z", calories: 350 },
            //     { date: "2022-10-24T06:57:29.537Z", calories: 395 },
            // ]
                
            // let data = [] 
            // for (let obj of this.userCaloriesData) {
            //     console.log("this is my returned obj", obj)
            //     data.push({
            //         "date": obj.date,
            //         "calories": obj.calories
            //     })
            // }
            // console.log("this is converted data", data)
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

            let data = this.userCaloriesData
            console.log("thissss is data", data)
            let filteredData = [{date:"Sunday", calories: 0}, {date:"Monday", calories: 0}, {date:"Tuesday", calories: 0}, {date:"Wednesday", calories: 0}, {date:"Thursday", calories: 0}, {date:"Friday", calories: 0}, {date:"Saturday", calories: 0}]
            if (variable == "day") {
                for (let obj of data) {
                    // console.log("this is filtereddata day", days[new Date(obj.date).getDay()])
                    for (let obj2 of filteredData) {
                        if (days[new Date(obj.date).getDay()] == obj2.date) {
                            obj2.calories += obj.calories
                        }
                    }
                }
            } else if (variable == "week") {
                filteredData = [{date:"Week 1", calories: 0}, {date:"Week 2", calories: 0}, {date:"Week 3", calories: 0}, {date:"Week 4", calories: 0}, {date:"Week 5", calories: 0}]
                for (let obj of data) {
                    // console.log("this is filtereddata week", Math.ceil((new Date(obj.date).getDate() + 1) / 7))
                    for (let obj2 of filteredData) {
                        if (Math.ceil((new Date(obj.date).getDate() + 1) / 7) == obj2.date.slice(-1)) {
                            obj2.calories += obj.calories
                        }
                    }
                }
            } else {
                filteredData = [{date: "January", calories: 0}, {date: "February", calories: 0}, {date: "March", calories: 0}, {date: "April", calories: 0}, {date: "May", calories: 0}, {date: "June", calories: 0}, {date: "July", calories: 0}, {date: "August", calories: 0}, {date: "September", calories: 0}, {date: "October", calories: 0}, {date: "November", calories: 0}, {date: "December", calories: 0}]
                for (let obj of data) {
                    // console.log("this is filtereddata day", months[new Date(obj.date).getMonth()])
                    for (let obj2 of filteredData) {
                        if (months[new Date(obj.date).getMonth()] == obj2.date) {
                            obj2.calories += obj.calories
                        }
                    }
                }
            }
            console.log("this is filteredData", filteredData)
            this.filteredData = filteredData

            let scale = 1
            if (variable == "week"){
                scale = 7
            } else if (variable == "month") {
                scale = 30
            }

            console.log("this is height", height)
            xScale.domain(filteredData.map(function (d) { return d.date }));
            let mult = Math.pow(10, 1 - Math.floor(Math.log(this.calorieLimit * scale) / Math.LN10) - 1);
            let maxY = Math.ceil(this.calorieLimit * scale * mult) / mult
            yScale.domain([0, maxY]);

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
                .attr("y", 1)
                .attr("dy", "-5.1em")
                .attr("text-anchor", "middle")
                .attr("stroke", "black")
                .text("Calories Consumed");

            g.selectAll(".bar")
                .data(filteredData)
                .enter().append("rect")
                .attr("style", "fill: steelblue")
                .on("mouseover", this.onMouseOver) //Add listener for the mouseover event
                .on("mouseout", this.onMouseOut)   //Add listener for the mouseout event
                .attr("x", function (d) { return xScale(d.date); })
                .attr("y", function (d) { return yScale(d.calories); })
                .attr("width", xScale.bandwidth())
                .transition()
                .ease(d3.easeLinear)
                .duration(300)
                .delay(function (d, i) {
                    return i * 50;
                })
                .attr("height", function (d) { return height - yScale(d.calories); });

            g.append("line")
                .attr("x1", 0)
                .attr("x2", width)
                .attr("y1", yScale(this.calorieLimit * scale))
                .attr("y2", yScale(this.calorieLimit * scale))
                .attr("stroke", "black")

            g.append("text")
                .attr("x", width - 10)
                .attr("y", yScale(this.calorieLimit * scale) - 10)
                .attr("text-anchor", "end")
                .attr("style", "font-size: 15px; font-weight: bold")
                .text("Max Calorie Intake: " + Number(this.calorieLimit * scale).toFixed(2))
        }

    },
    mounted() {
        this.getLoggedInUser().then((user) => {
            this.userId = user.userId
            this.userName = user.userName 
            this.getUserDetails(this.userId)
        })
    }
}

</script>

<template>
    <!--Start of NavBar-->
    <NavBar @checkLogin="isLoggedIn()"></NavBar>
    <!--End of NavBar-->
    <div class="mainContent">

        <div class="row">
            <!-- form -->
            <div class="container" style="margin-bottom:20px">
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
        </div>
        <div class="row justify-content-around ">
            <div class="col-lg-3 col-md-12 mb-3">
                <div class="box pt-3 px-4">
                    <h2 style="text-align:start">Personal Details</h2>
                    <!-- letting user key in the fields of details of themselves -->
                    <div class="row d-flex justify-content-center mt-3  pt-2" style="text-align:start;">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Height (in cm)</label>
                            <input type="text" class="form-control" id="height" v-model="height" placeholder="Enter your height">
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center mt-3  pt-2" style="text-align:start;">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Weight (in kg)</label>
                            <input type="text" class="form-control" id="weight" v-model="weight" placeholder="Enter your weight">
                        </div>
                    </div>
    
                    <div class="row d-flex justify-content-center mt-3  pt-2" style="text-align:start;">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Activity Frequency</label>
                            <select class="form-control moreMinimal" style="text-align:center" v-model="activityFrequency">
                                    <option selected value="Little to no exercise   ">Little to no exercise</option>
                                    <option value="Exercise 1-3 days/week">Exercise 1-3 days/week</option>
                                    <option value="Exercise 3-5 days/week">Exercise 3-5 days/week</option>
                                    <option value="Exercise 6-7 days/week">Exercise 6-7 days/week</option>
                                    <option value="Hard exercise 6-7 days/week">Hard exercise 6-7 days/week</option>
                            </select>
                        </div>
                    </div>
    
    
                    <div class="row d-flex justify-content-center mt-3 p-3" style="text-align:start;">
                        <div class="btn" style="background-color:crimson; color:white;height:10%"
                            v-on:click="calculateCaloriesAndUpdate(userId, height, weight, activityFrequency, dailyCalorieIntake)">Calculate</div>
                    </div>
                </div>
                <div class="box pt-3 px-4 mt-3">
                    <!-- personal details -->
                    <div class="row" style="text-align:start;">
                        <div style="text-align:center;" class="mx-auto mt-4" v-if="calorieLimit != 0">
                            <p>
                                <span style="font-weight: bold;">The healthy BMI range for a {{ gender }} of height {{ height }}cm,
                                    {{ weight }}kg, and {{ age }} years old is:</span> 18.5 to 24.9
                            </p><br>
                            <p>
                                <span style="font-weight: bold;">Your recommended daily calorie intake:</span> {{ calorieLimit }} calories
                            </p>
                        </div>
                        <div v-else class="mt-4">
                            <p>Key in the fields to calculate the amount of calories you should intake.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- dashboard -->
            <div class="col-lg-9 col-md-12 box" style="position:relative">
                <div style="width:90%" class="p-3 mx-auto col-6">
                    <h2 style="text-align:left">Overview</h2>
                    <div style="border:1px solid black;" class="mb-3">
                        <!-- <plot :height="500" style="padding-left:50px" :data="userCaloriesData" /> -->
            
                        <svg width="950" height="600" id="dashboard"></svg>
                        
                        <div class="row d-flex justify-content-end m-4">
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
                </div>
                <!-- <h2 v-else style="position:absolute; top:30%; width:100%;">Enter your personal details to start tracking your calorie intake!</h2> -->
            </div>
        </div>
    </div>

</template>

<style scoped>
.mainContent {
    padding: 20px;
    z-index: -1;
    background-color: rgb(183, 221, 234);
    overflow-x: hidden;
    height: 100vh;
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

.box {
    background-color:white;
    border-radius: 10px;
}

.p-autocomplete-panel-custom {
    background-color: white;
}

</style>