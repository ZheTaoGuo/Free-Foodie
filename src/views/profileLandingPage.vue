<script>
    import { RouterLink } from 'vue-router'
    import { getFamily, createFamily, addFamilyMember, getUser, getLoggedInUser, isLoggedIn } from '../utils'
    import * as d3 from "d3";
    // import plot from "@/components/plotWithXandYaxis.vue";
    import NavBar from '../components/Navbar.vue'

    // const userId = "1"   // TODO: obtained from cookies
    // const userName = "bob"   // TODO: obtained from cookies

    export default {
        components: {
            RouterLink,
            NavBar
        },
        data() {
            return {
                userId: "",
                userName: "",
                familyList: {},
                userCaloriesData: [],
                filteredData: [],
                calorieLimit: 0,
                userObj: {},
                referralCode: null,
            }
        },
        methods: {
            isLoggedIn,
            getLoggedInUser,
            // createUser,
            getUser,
            getFamilyList(userId) {
                getFamily(userId).then((value)=>{
                    console.log('getFamilyList is called')
                    console.log("this is getFamilyList", value)
                    this.referralCode = value.referralCode
                    let final = []
                    for (let obj of Object.keys(value.users)){
                        if (obj != userId){
                            final.push(value.users[obj])
                        }
                    }
                    this.familyList = final
                    console.log('familyyyyyyyyyyy', this.familyList);
                }).catch((message)=> {console.log("this is message", message); this.familyList = null })
            },  
            createFamily,
            addFamilyMember,
            renderGraph() {
                console.log("renderGraph is called")
                var svg = d3.select("#dashboard"),
                    margin = 170,
                    width = svg.attr("width") - margin,
                    height = svg.attr("height") - margin
                
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

                let days = {
                    0: "Sunday",
                    1: "Monday",
                    2: "Tuesday",
                    3: "Wednesday",
                    4: "Thursday",
                    5: "Friday",
                    6: "Saturday"
                }
                let data = this.userCaloriesData
                let filteredData = [{date:"Sunday", calories: 0}, {date:"Monday", calories: 0}, {date:"Tuesday", calories: 0}, {date:"Wednesday", calories: 0}, {date:"Thursday", calories: 0}, {date:"Friday", calories: 0}, {date:"Saturday", calories: 0}]
                for (let obj of data) {
                    // console.log("this is filtereddata day", days[new Date(obj.date).getDay()])
                    for (let obj2 of filteredData) {
                        if (days[new Date(obj.date).getDay()] == obj2.date) {
                            obj2.calories += obj.calories
                        }
                    }
                }
                console.log("this is filteredData", filteredData)
                this.filteredData = filteredData

                xScale.domain(filteredData.map(function (d) { return d.date }));
                let mult = Math.pow(10, 1 - Math.floor(Math.log(this.calorieLimit) / Math.LN10) - 1);
                let maxY = Math.ceil(this.calorieLimit * mult) / mult
                yScale.domain([0, maxY]);

                g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale))
                .append("text")
                .attr("y", height - 250)
                .attr("x", width - 100)
                .attr("text-anchor", "end")
                .attr("stroke", "black")

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
            }
        },
        mounted(){
            this.getLoggedInUser().then((user)=> {
                this.userId = user.userId
                this.userName = user.userName 
                
                this.getFamilyList(this.userId)
                this.getUser(this.userId).then((user) => {
                    // console.log("this is userObj", user)
                    this.userObj = user
                    // console.log("tjs is this.userObj", this.userObj)
                    if (user.calorieDetails != null) {
                        this.calorieLimit = Number(user.calorieDetails[Object.keys(user.calorieDetails)[Object.keys(user.calorieDetails).length - 1]].calorieLimit).toFixed(2);
                        for (const property in user.calorieDetails) {
                            // console.log("this is new obj created", { date: user.calorieDetails[property].date, calories: user.calorieDetails[property].dailyCalorieIntake})
                            this.userCaloriesData.push({ date: user.calorieDetails[property].date, calories: user.calorieDetails[property].dailyCalorieIntake})
                        }
                        console.log("thisss is this.userCaloriesData", this.userCaloriesData)
                        this.renderGraph()
                    }
                })
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
            <div class="col-lg-4">
                <div class="row familyMembers d-flex flex-column">
                    <div class="row">
                        <div class="col-8 h-1" style="margin-top: 17px;"><h5>My Family Members</h5></div>
                        <div class="col-4 h-1"><span class="addFamilyMember btn" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">+</span></div>
                    </div>
                    <div class="collapse" id="collapseExample">
                        <div class="card card-body" v-if=" referralCode !== null">    
                            Your referral code is: <span>{{ referralCode }}</span>
                        </div>
                        <div class="card card-body" v-else>    
                            <span>You do not have a family yet</span>
                        </div>
                    </div>
                    
                    <!-- populate this row with family members from data from user-->
                    <div class="row">
                        <div v-if="familyList == null">
                            <div class="col-8 h-1" style="margin-top: 10px; text-align: center; width:100%">
                                <p v-on:click="createFamily(userId, userName)" class="btn btn-secondary">Create Family</p>
                            </div>
                        </div> 
                        <div v-else>
                            <table id="familyMembers" style="width:100%">
                                <tr v-for="user of familyList" v-bind:key="user">
                                    <div v-if="user !== undefined" class="row" style="padding:10px">
                                        <td class="col-3"><img src="../assets/user.png" style="width:30px; height:30px"></td>
                                        <td class="col" style="text-align:start"> {{ user.userName }} </td>
                                    </div>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                </div>

                <!-- favorite & past recipies -->
                <router-link to="/favourite" style="text-decoration:none; color: black">
                    <div class="row favoriteRecipies">
                        <div class="col-1">
                            <a href="/"><img src="../assets/love.png" style="height:30px; width:30px;"></a>
                        </div>
                        <div class="link col-9 pt-1">
                            <h5>Your Favorite Recipies</h5>
                        </div>
                    </div>
                </router-link>

                <router-link to="/past" style="text-decoration:none; color: black">
                    <div class="row pastRecipies">
                        <div class="col-1">
                            <a href="/"><img src="../assets/history.png" style="height:30px; width:30px;"></a>
                        </div>
                        <div class="link col-9 pt-1">
                            <h5>Your Past Recipies</h5>
                        </div>
                    </div>
                </router-link>
            </div>

            <!-- mini dashboard -->
            <div class="col-lg-8 calorieTracker ">
            <router-link to="/CalorieTracker" style="text-decoration:none">
                <div class="d-flex justify-content-between">
                    <h5 style="text-align:start; color:black; padding-top:5px">My Dashboard</h5>
                    <div class="btn btn-secondary">Expand</div>
                </div>

                <div class="d-flex justify-content-center" style="padding:20px">
                    <svg width="800" height="400" id="dashboard"></svg>
                </div>
                
            </router-link>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
    .mainContent {
        height: 100vh;
        padding: 20px 70px;
        background-color: rgb(183, 221, 234);
    }

    .familyMembers {
        background-color: white;
        border-radius: 10px;
        height: 400px;
        width: 100%;
        padding: 20px 0 0 20px
    }

    .pastRecipies, .favoriteRecipies{
        background-color: white;
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
        background-color: white;
        border-radius: 10px;
        text-align: start;
        /* width: 100%; */
        padding: 20px 10px 0 20px;
        height: 500px;
    }

    a {
        text-decoration: none;
        color: black
    }

    a:hover {
        text-decoration: none;
        color: black
    }

    .link:hover{
        text-decoration: underline;
    }
</style>