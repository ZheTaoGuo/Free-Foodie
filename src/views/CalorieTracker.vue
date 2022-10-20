<script>
    // import { RouterLink } from 'vue-router'
    import { calculateCalories, getUser } from '../utils'
    // import * as d3 from "d3";
    import plot from "@/components/plotWithXandYaxis.vue";

    const userId = "1"   // TODO: obtained from cookies
    const userName = "bob"   // TODO: obtained from cookies

    // TODO: get user data calories limit from database. if = 0, then user needs to set it
    let calorieLimit = 0;

    export default {
        components: {
            plot
        },
        data() {
            return {
                userId: userId,
                userName: userName,
                height: "",
                weight: "",
                activityFrequency: "",
                calorieLimit: calorieLimit
            }
        },
        methods: {
            calculateCalories,
            getUser
        },
        mounted() {
        //     const width = 800;
        //     const height = 500;
        //     const data = [
        //         { date: "24-Apr-07", amount: 93.24 },
        //         { date: "25-Apr-07", amount: 95.35 },
        //         { date: "26-Apr-07", amount: 98.84 },
        //         { date: "27-Apr-07", amount: 99.92 },
        //         { date: "30-Apr-07", amount: 99.8 },
        //         { date: "1-May-07", amount: 99.47 },
        //         { date: "2-May-07", amount: 100.39 },
        //         { date: "3-May-07", amount: 100.4 },
        //         { date: "4-May-07", amount: 100.81 },
        //         { date: "7-May-07", amount: 103.92 },
        //         { date: "8-May-07", amount: 105.06 },
        //         { date: "9-May-07", amount: 106.88 },
        //         { date: "10-May-07", amount: 107.34 }
        //     ];

        //     const svg = d3.select("svg").attr("width", width).attr("height", height);
        //     const g = svg.append("g");

        //     //2. Parse the dates
        //     const parseTime = d3.timeParse("%d-%b-%y");

        //     //3. Creating the Chart Axes
        //     const x = d3
        //     .scaleTime()
        //     .domain(
        //         d3.extent(data, function (d) {
        //         return parseTime(d.date);
        //         })
        //     )
        //     .rangeRound([0, width]);

        //     const y = d3
        //     .scaleLinear()
        //     .domain(
        //         d3.extent(data, function (d) {
        //         return d.amount;
        //         })
        //     )
        //     .rangeRound([height, 0]);

        //     //4. Creating a Line
        //     const line = d3
        //     .line()
        //     .x(function (d) {
        //         return x(parseTime(d.date));
        //     })
        //     .y(function (d) {
        //         return y(d.amount);
        //     });

        //     //5. Appending the Axes to the Chart
        //     g.append("g")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x));

        //     g.append("g")
        //     .call(d3.axisLeft(y))
        //     .append("text")
        //     .attr("fill", "#000")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 6)
        //     .attr("dy", "0.71em")
        //     .attr("text-anchor", "end")
        //     .text("Calorie Intake");    

        //     //6. Appending a path to the Chart
        //     g.append("path")
        //     .datum(data)
        //     .attr("fill", "none")
        //     .attr("stroke", "steelblue")
        //     .attr("stroke-width", 1.5)
        //     .attr("d", line);
        }
    }  

</script>

<template>
    <div class="mainContent">
        <!-- form -->
        <!-- TODO: connect to external API to get calories of external meals -->
        <form class="row g-3 d-flex justify-content-center">
            <div class="col-6">
                <input type="text" class="form-control textBox" id="inputPassword2" placeholder="Enter your meal details here to track your calories!" style="width:100%; padding-left: 90px;">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-secondary mb-3">Add</button>
            </div>
        </form>

        <div class="btn" v-on:click="getUser(userId)">getcaloriedetails</div>

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
            <div class="col-2">
                <input type="text" class="form-control form-control-sm" id="colFormLabelSm" v-model="height">
            </div>
            <label for="colFormLabelSm" class="col-1 col-form-label col-form-label-sm pt-0" style="line-height: 14px;">Weight <br> (in kg)</label>
            <div class="col-2">
                <input type="text" class="form-control form-control-sm" id="colFormLabelSm" v-model="weight">
            </div>
            <label for="colFormLabelSm" class="col-1 col-form-label col-form-label-sm pt-0" style="line-height: 14px;">Activity Frequency</label>
            <div class="col-2">
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
            <p><span style="font-weight: bold;">Your BMI:</span> (BMI)</p>
            <p><span style="font-weight: bold;">The healthy BMI range for a (gender) your (height), (weight), and (age) is:</span> (XX) to (XX)</p>
            <p><span style="font-weight: bold;">Your recommended daily calorie intake:</span> (XX)</p>
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