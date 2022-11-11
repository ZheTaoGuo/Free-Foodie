<script>
    import IndividualTab from '../components/IndividualTab.vue';
    import TabsWrapper from '../components/TabsWrapperShoppingList.vue'
    import ShoppingItem from '../components/ShoppingItem.vue'
    import NavBar from '../components/Navbar.vue'
    import Footer from '../components/Footer.vue'
    import {
        getUser,
        getUserIngredients,
        getAllMissing,
        getFamily,
        assignItem,
        getLoggedInUser,
        getAllAssignedIngredients,
        isLoggedIn,
        unassignItem,
        changeAssignment,
        removeItem
    } from '../utils'
    import axios from 'axios'

    export default {
        data() {
            return {
                loggedInUser: 0,
                users: [],
                familyUsers: [],
                missingList: [],
                assignedList: [],
                familyMembers: [],
                member: '',
                familyId: "",
                user: {},
            }
        },
        components: {
            IndividualTab,
            TabsWrapper,
            ShoppingItem,
            NavBar,
            Footer
        },
        async mounted() {

            const currentUser = await getLoggedInUser();
            this.loggedInUser = currentUser.userId
            console.log('Current UserId: ', this.loggedInUser);
            const family = await getFamily(currentUser.userId);
            console.log(family);

            for (let user of Object.values(family.users)) {
                this.familyUsers.push({
                    userId: user.userId,
                    userName: user.userName,
                    assignedList: []
                })
            }
            // this.familyUsers = Object.values(family.users);

            console.log(this.familyUsers);
            this.callGetAllMissing();
            this.callGetFamily();
            this.getAssignedIngredientPerUser();

        },
        methods: {
            isLoggedIn,
            moveItem(itemName, memberId, itemImage) {
                console.log(itemName, memberId);
                let member = memberId
                // console.log(member);
                assignItem(member, itemName, itemImage) // removing the item from the unassigned list 
                // mmoving item to the person 
                this.sendMessage()
                this.callGetAllMissing()
                this.getAssignedIngredientPerUser();
            },
            callGetAllMissing() {
                getAllMissing(this.loggedInUser).then((value) => {
                    this.missingList = value
                })
            },
            callGetFamily() {
                getFamily(this.loggedInUser).then((value) => {
                    this.familyId = value.familyId
                    this.familyMembers = value.users
                })
            },
            getAssignedIngredientPerUser() {
                console.log('START same family userID');
                console.log(this.familyUsers)
                console.log('END same family userID');
                
                for (let obj of this.familyUsers) {
                    console.log(obj);
                    getAllAssignedIngredients(obj.userId).then((value) => {
                        obj.assignedList = value;
                    })
                }
                console.log("START ASSIGNED family");
                console.log(this.familyUsers);
                console.log("END ASSIGNED family");
            },
            updateSelectedUser(user) {
                this.loggedInUser = user.userId
                console.log("this is now this.loggedInUser: ", this.loggedInUser);
                console.log("hello");
            },
            sendMessage() {
                axios.get('https://vue-sms-9655.twil.io/sms')
                    .then(res => {
                        console.log(res);
                    })
            },
            unassignItem,
            cancelItem(item) {
                console.log("this is emitted item", item)
                this.unassignItem(this.loggedInUser, item.name).then(response => {
                    console.log(response)
                    this.getAssignedIngredientPerUser()
                })
            },
            changeAssignmentOfItem(item, member){
                console.log("this is emitted item", item)
                console.log("this is member", member)
                changeAssignment(this.loggedInUser, item, member).then(response => {
                    console.log("inside changeAssignmentOfItem", response)
                    this.callGetAllMissing()
                    this.getAssignedIngredientPerUser();
                })
            },
            cancelIngredientFromUnassigned(item){
                console.log("cancelIngredientFromUnassigned is called")
                console.log("this is emitted item from cancelIngredient", item)
                removeItem(this.loggedInUser, item.name).then(response => {
                    console.log(response)
                    this.callGetAllMissing()
                })
            }
        }
    }
</script>

<template>
    <NavBar @checkLogin="isLoggedIn()"></NavBar>
    <TabsWrapper>

        <IndividualTab title="Unassigned Items" id="personal-style">
            <div v-for="item of missingList">
                <ShoppingItem :title="'Personal'" :itemName="item.name" :user="loggedInUser"
                    :familyMembers="familyMembers" @assignItem="moveItem" :itemImage="item.image"
                    @cancelIngredientFromUnassigned="cancelIngredientFromUnassigned"></ShoppingItem>
            </div>

        </IndividualTab>
        <IndividualTab title="Assigned Items" id="family-style">

            <div class="container-fluid">
                <div class="row">
                    <div class="col-3">
                        <div class="nav nav-pills flex-column text-center" id="v-tab" aria-orientation="vertical">
                            <button v-for="user of familyUsers" class="nav-link border p-4 my-2" style="color: black;"
                                :class="{ active: user.userId == loggedInUser }" id="v-settings-tab"
                                data-bs-toggle="pill" :data-bs-target="'#v-settings' + users.userId" type="button"
                                role="tab" aria-controls="v-settings" :aria-selected="users.userId == loggedInUser"
                                @click="updateSelectedUser(user)">
                                <!-- requery database-->
                                <i class="fas fa-solid fa-user"></i>
                                <br>{{ user.userName }}
                            </button>
                        </div>
                    </div>

                    <div class="col-9">
                        <div class="tab-content" id="v-pills-tabContent">
                            <div v-for="user of familyUsers" class="tab-pane-fade"
                                :class="{ active: users.userId == loggedInUser, show: users.userId == loggedInUser }"
                                :id="'v-settings' + users.userId" :aria-labelledby="users.userId == loggedInUser"
                                role="tabpanel" tabindex="0">
                                <div v-if="user.userId == loggedInUser">
                                    <div v-if="user.assignedList == null || user.assignedList == undefined">
                                        <h3 class="text-center">No items assigned to you</h3>
                                    </div>
                                    <div v-else>
                                        <ShoppingItem v-for="item of user.assignedList" :title="'Family'"
                                            :itemName="item.itemName" :user="loggedInUser" 
                                            :familyMembers="familyUsers" :itemImage="item.image"
                                            @assignItem="moveItem" @cancelItem="cancelItem" @changeAssignment="changeAssignmentOfItem">
                                        </ShoppingItem>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </IndividualTab>


    </TabsWrapper>
    <Footer></Footer>

</template>

<style>
    .tabs-component {
        color: rgb(183, 221, 234);
    }
</style>