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
            console.log('renderGraph() called')
            console.log("this is variable", variable)
            var svg = d3.select("#dashboard"),
                margin = 170,
                width = svg.attr("width") - margin,
                height = svg.attr("height") - margin

            console.log("this is svg", svg)
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

            console.log("appending g")
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

            // TODO: add a line for max calorie intake

            let scale = 1
            if (variable == "week"){
                scale = 7
            } else if (variable == "month") {
                scale = 30
            }

            console.log("this is height", height)
            xScale.domain(filteredData.map(function (d) { console.log("this is converted days", d.date); return d.date }));
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
                .attr("x", function (d) { return xScale(d.date); })
                .attr("y", function (d) { return yScale(d.calories); })
                .attr("width", xScale.bandwidth())
                .attr("height", function (d) { return height - yScale(d.calories); });


            let lineData = [{date: "Monday", calories: this.calorieLimit}, {date: "Tuesday", calories: this.calorieLimit}, {date: "Wednesday", calories: this.calorieLimit}, {date: "Thursday", calories: this.calorieLimit}, {date: "Friday", calories: this.calorieLimit}, {date: "Saturday", calories: this.calorieLimit}, {date: "Sunday", calories: this.calorieLimit}]
            if (variable == "week"){
                lineData = [{date: "Week 1", calories: this.calorieLimit}, {date: "Week 2", calories: this.calorieLimit}, {date: "Week 3", calories: this.calorieLimit}, {date: "Week 4", calories: this.calorieLimit}, {date: "Week 5", calories: this.calorieLimit}]
            }

            g.append("line")
                .attr("x1", 0)
                .attr("x2", width)
                .attr("y1", yScale(this.calorieLimit * scale))
                .attr("y2", yScale(this.calorieLimit * scale))
                .attr("stroke", "black")
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
                // console.log("this is new obj created", { date: user.calorieDetails[property].date, calories: user.calorieDetails[property].dailyCalorieIntake})
                this.userCaloriesData.push({ date: user.calorieDetails[property].date, calories: user.calorieDetails[property].dailyCalorieIntake})
            }

            // console.log("this is userCaloriesData", this.userCaloriesData)
            // console.log(this.userCaloriesData[0])
            // console.log(this.userCaloriesData[0].date)
            // console.log(this.userCaloriesData[0].calories)
            this.renderGraph(this.xAxisVariable)
        })
    }
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

            <svg width="950" height="600" id="dashboard"></svg>

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