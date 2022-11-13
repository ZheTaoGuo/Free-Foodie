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
        removeItem,
        addingIngredientToFridge
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
                mobile: true,
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
            },
            IngredientBought(item) {
                console.log("IngredientBought is called")
                console.log("this is item", item)
                // function to push the ingredient to fridge
                addingIngredientToFridge(item, this.loggedInUser).then(response => {
                    console.log(response)
                    this.callGetAllMissing()
                    this.getAssignedIngredientPerUser();
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
                    :familyMembers="familyMembers" @assignItem="moveItem" :itemImage="item.image" :item="item"
                    @cancelIngredientFromUnassigned="cancelIngredientFromUnassigned" :mobile="mobile"></ShoppingItem>
            </div>

        </IndividualTab>
        <IndividualTab title="Assigned Items" id="family-style">

            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <!-- using CSS & HTML -->
                    <div class="scrollmenu container">
                        <template v-for="user of familyUsers">
                            <span v-if="user.userId == loggedInUser" class="btn" style="background-color:darkblue" 
                                @click="updateSelectedUser(user)">
                                <i class="fas fa-solid fa-user" ></i> &nbsp;&nbsp;{{ user.userName }}
                            </span>
                            <span v-else class="btn btn-primary" 
                                @click="updateSelectedUser(user)">
                                <i class="fas fa-solid fa-user" ></i> &nbsp;&nbsp;{{ user.userName }}
                            </span>
                        </template>
                        
                    </div>


                </div>

                <div class="row mt-3">
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
                                        :familyMembers="familyUsers" :itemImage="item.image" :item="item"
                                        @assignItem="moveItem" @cancelItem="cancelItem" @changeAssignment="changeAssignmentOfItem" 
                                        :mobile="mobile" @IngredientBought="IngredientBought">
                                    </ShoppingItem>
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

    div.scrollmenu {
        color: rgb(183, 221, 234);
        overflow: auto;
        white-space: nowrap;
    }

    div.scrollmenu span {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px;
    text-decoration: none;
    margin-right:5px;
    margin-left: 5px;
    }

    div.scrollmenu::-webkit-scrollbar {
        display: none;
    }

    div.scrollmenu span:hover {
        cursor: pointer
    }

</style>