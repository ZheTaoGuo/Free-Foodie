<script>
import { calculateCalories, getUser, updateCalories, getLoggedInUser, isLoggedIn } from '../utils'
import * as d3 from "d3";
import plot from "@/components/plotWithXandYaxis.vue";
import axios from 'axios'
import { ref, toRaw } from "vue";
import NavBar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'


export default {
    components: {
        plot,
        NavBar,
        Footer
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
            searchResults: [],
            dailyCalorieIntake: 0,
            userCaloriesData: [],
            xAxisVariable: "day",
            filteredData: [],
            modalStatus: false,
        }
    },
    methods: {
        isLoggedIn,
        getLoggedInUser,
        calculateCalories,
        calculateCaloriesAndUpdate(userId, height, weight, activityFrequency, dailyCalorieIntake) {
            this.calculateCalories(userId, height, weight, activityFrequency, dailyCalorieIntake).then(response => {
                this.calorieLimit = response
                console.log("this is the new calorieLimit", this.calorieLimit);
                this.renderGraph(this.xAxisVariable)
            })
        },
        getUser,
        getUserDetails(userId){
            console.log("getuserDetails is called")
            this.getUser(userId).then((user) => {
                this.userObj = user
                this.height = user.height;
                this.weight = user.weight;
                this.activityFrequency = user.activityFrequency;
                if (user.calorieDetails != null){
                    if (this.calorieLimit == 0) {
                        console.log("this is the this.calories to set",Object.keys(user.calorieDetails))
                        // getting the max date from the array 
                        const maxDate = new Date(
                            Math.max(
                                ...Object.values(user.calorieDetails).map(element => {
                                return new Date(element.date);
                                }),
                            ),
                        );
                        // formatting to get the index of the max date
                        let currDate = maxDate.getDate() + " " + maxDate.getMonth() + " " + maxDate.getFullYear()
                        this.calorieLimit = Number(user.calorieDetails[currDate].calorieLimit).toFixed(2);
                    }
                    // converting the data to the format in firebase
                    let date = new Date()
                    let todayDateFormatted = date.getDate() + " " + date.getMonth() + " " + date.getFullYear()
                    if (user.calorieDetails[todayDateFormatted] == null) {  // checking if there has already been a entry for today
                        this.dailyCalorieIntake = 0
                    } else {
                        this.dailyCalorieIntake = user.calorieDetails[todayDateFormatted].dailyCalorieIntake
                    }
                    this.userCaloriesData = [];
                    for (const property in user.calorieDetails) {
                        this.userCaloriesData.push({ date: user.calorieDetails[property].date, calories: user.calorieDetails[property].dailyCalorieIntake})
                    }
                    console.log("this is userCaloriesData", this.userCaloriesData)
                    this.renderGraph(this.xAxisVariable)
                }
                this.gender = user.gender;
                this.age = user.age;
            })
        },
        async searchFood() {
            console.log("searchFood() called")
            console.log("this is usersearch", this.userSearch)
            let foodOrBrand = this.userSearch
            const options = {
                method: 'GET',
                url: `https://nutritionix-api.p.rapidapi.com/v1_1/search/${foodOrBrand}`,
                params: {
                    fields: 'item_name,item_id,brand_name,nf_calories,nf_total_fat',
                },
                headers: {
                    'X-RapidAPI-Key': process.env.VUE_APP_X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': process.env.VUE_APP_X_RAPIDAPI_HOST
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
            }).catch(function (error) {
                console.error(error);
            });
            this.searchResults = searchResults
            console.log("this isthis.results", this.searchResults)
        },
        async addFood() {
            console.log("addFoodEvent is called")
            const options = {
                method: 'GET',
                url: `https://nutritionix-api.p.rapidapi.com/v1_1/search/${this.userSearch}`,
                params: {
                    fields: 'item_name,item_id,brand_name,nf_calories,nf_total_fat',
                },
                headers: {
                    'X-RapidAPI-Key': process.env.VUE_APP_X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': process.env.VUE_APP_X_RAPIDAPI_HOST
                }
            };

            let dailyCalorieIntake = this.dailyCalorieIntake
            let calorieLimit = Number(this.calorieLimit)
            console.log("this is calorieLimit in addfood", calorieLimit)
            console.log("this is failyCalorieIntake", dailyCalorieIntake)
            await axios.request(options).then(response => {
                console.log("this is response data", response.data);
                let calorieDetails = response.data.hits[3].fields.nf_calories
                console.log("this is the calorie intake of new item", calorieDetails)
                updateCalories(this.userId, calorieDetails, dailyCalorieIntake, calorieLimit).then(response => {
                    console.log("this is response", response)
                    // calling on the method getUserDetails 
                    this.dailyCalorieIntake = dailyCalorieIntake
                    this.getUserDetails(this.userId)
                })
                console.log("this is the amount i hvae eaten", dailyCalorieIntake)
                dailyCalorieIntake = calorieDetails + dailyCalorieIntake
                this.userSearch = ""
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

            svg.append("text")
                .attr("transform", "translate(70,0)")
                .attr("x", 50)
                .attr("y", 50)
                .attr("style", "font-size:24px;")
                .attr("id", "dashboardTitle")
                .text("Calorie Tracker");

            var xScale = d3.scaleBand().range([0, width]).padding(0.4),
                yScale = d3.scaleLinear().range([height, 0]);

            // DOM manipulation to remove <g> tag if it already exists
            if (document.getElementsByTagName("g").length >= 1) {
                document.getElementsByTagName("g")[0].remove()
                document.getElementById("dashboardTitle").remove()
            }

            var g = svg.append("g")
                .attr("transform", "translate(" + 70 + "," + 100 + ")");

            let days = {
                0: "Sun",
                1: "Mon",
                2: "Tue",
                3: "Wed",
                4: "Thu",
                5: "Fri",
                6: "Sat"
            }
            let months = {
                0: "Jan",
                1: "Feb",
                2: "Mar",
                3: "Apr",
                4: "May",
                5: "Jun",
                6: "Jul",
                7: "Aug",
                8: "Sep",
                9: "Oct",
                10: "Nov",
                11: "Dec"
            }

            let data = this.userCaloriesData
            console.log("thissss is data", data)
            let filteredData = [{date:"Sun", calories: 0}, {date:"Mon", calories: 0}, {date:"Tue", calories: 0}, {date:"Wed", calories: 0}, {date:"Thu", calories: 0}, {date:"Fri", calories: 0}, {date:"Sat", calories: 0}]
            if (variable == "day") {
                for (let obj of data) {
                    for (let obj2 of filteredData) {
                        if (days[new Date(obj.date).getDay()] == obj2.date) {
                            obj2.calories += obj.calories
                        }
                    }
                }
            } else if (variable == "week") {
                filteredData = [{date:"Wk 1", calories: 0}, {date:"Wk 2", calories: 0}, {date:"Wk 3", calories: 0}, {date:"Wk 4", calories: 0}, {date:"Wk 5", calories: 0}]
                for (let obj of data) {
                    for (let obj2 of filteredData) {
                        if (Math.ceil((new Date(obj.date).getDate() + 1) / 7) == obj2.date.slice(-1)) {
                            obj2.calories += obj.calories
                        }
                    }
                }
            } else {
                filteredData = [{date: "Jan", calories: 0}, {date: "Feb", calories: 0}, {date: "Mar", calories: 0}, {date: "Apr", calories: 0}, {date: "May", calories: 0}, {date: "Jun", calories: 0}, {date: "Jul", calories: 0}, {date: "Aug", calories: 0}, {date: "Sep", calories: 0}, {date: "Oct", calories: 0}, {date: "Nov", calories: 0}, {date: "Dec", calories: 0}]
                for (let obj of data) {
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

            console.log("this is calorieLimit", this.calorieLimit)
            console.log("this is height", height)
            xScale.domain(filteredData.map(function (d) { return d.date }));
            let mult = Math.pow(10, 1 - Math.floor(Math.log(this.calorieLimit * scale) / Math.LN10) - 1);
            let maxY = Math.ceil(this.calorieLimit * scale * mult) / mult
            yScale.domain([0, maxY]);

            g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale))
                .append("text")
                .attr("y", height - 240)
                .attr("x", width - 130)
                .attr("text-anchor", "end")
                .attr("stroke", "black")
                .text(variable.charAt(0).toUpperCase() + variable.slice(1));

            g.append("g")
                .call(d3.axisLeft(yScale)
                    .ticks(10))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 4)
                .attr("dy", "-3.1em")
                .attr("text-anchor", "middle")
                .attr("stroke", "black")
                .attr("style", "font-size: 15px; font-family: Avenir")
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
        },
        checkStatus() {
            this.modalStatus = true 
        }

    },
    mounted() {
        this.getLoggedInUser().then((user) => {
            this.userId = user.userId
            this.userName = user.userName 
            this.getUserDetails(this.userId)
        }).catch((message)=> {console.log("this is message from getLoggedInUser", message); this.userObj = null })
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
                <form class="row g-1 d-flex justify-content-start">
                    <div class="col-10 mt-2">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="search" placeholder="Enter your meal details to track your calories!" v-model="userSearch" @input="searchFood">
                        </div>

                    </div>
                    <div class="col-1 mt-2">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="checkStatus">
                            Add
                        </button>

                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">New Food Entry</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div v-if="modalStatus == true">
                                    <h2 style="font-weight:bold; text-align:start">You have chosen:</h2>
                                    <br>
                                    <p style="font-size:20px"> <span
                                            style="font-weight:bold">{{ searchResults[3].item_name }}</span> from <span
                                            style="font-weight:bold">{{ searchResults[3].brand_name }}</span></p>
                                    <p style="font-size:20px">
                                        It has {{ searchResults[3].calories }} calories. <br>
                                        You will have <span style="font-weight:bold">{{ Number(calorieLimit -
                                                dailyCalorieIntake).toFixed(2)
                                        }} calories left</span> for today.
                                    </p>
                                </div>
                                <div v-else>
                                    <h2 style="font-weight:bold">Please select a food entry first.</h2>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-outline-primary" v-on:click="addFood($event)" data-bs-dismiss="modal">Add</button>
                            </div>
                            </div>
                        </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
        <div class="row justify-content-around ">
            <div class="col-lg-3 col-md-12">
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
                                    <option selected value="Little to no exercise">Little to no exercise</option>
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
                <div class="box pt-4 px-4 mt-3" style="padding:96px">
                    <!-- personal details -->
                    <div class="row" style="text-align:start;">
                        <div style="text-align:center;" class="mx-auto mt-4" v-if="calorieLimit != 0">
                            <p>
                                <span style="font-weight: bold;">The healthy BMI range for a {{ gender }} of height {{ height }}cm,
                                    {{ weight }}kg, and {{ age }} years old is:</span> 18.5 to 24.9
                            </p><br>
                            <p>
                                <span style="font-weight: bold;">Your recommended daily calorie intake:</span> {{ Number(calorieLimit).toFixed(2) }} calories
                            </p>
                        </div>
                        <div v-else class="mt-4">
                            <p>Key in the fields to calculate the amount of calories you should intake.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- dashboard -->
            <div v-if="userObj.calorieDetails == undefined" class="alert alert-primary mt-4 mb-1" role="alert">
                Start entering your daily calorie intake to see your dashboard!
            </div>
            <div class="col-lg-9 col-md-12 dashboard mt-3" style="position:relative">
                <div style="width:100%" class="box p-3 mx-auto col-6">
                    <h2 style="text-align:left">Overview</h2>
                    <div style="border:1px solid black;" class="mb-3">
                        <!-- <plot :height="500" style="padding-left:50px" :data="userCaloriesData" /> -->
            
                        <svg width="450" height="450" id="dashboard"></svg>
                        
                        <div class="row d-flex justify-content-end m-4">
                            <label for="colFormLabelSm" class="col-auto col-form-label col-form-label-sm"
                                style="text-align: end">X-axis:</label>
                            <div class="dropdown col-5">
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
    <Footer @signOut="callSignOut()" style="margin-top:0px; padding-top:80px"></Footer>
</template>

<style scoped>
.mainContent {
    padding: 10px;
    z-index: -1;
    background-color: rgb(183, 221, 234);
    overflow-x: hidden;
}

@media (max-width: 991px) {
        .dashboard {
            margin-top: 10px;
        }
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