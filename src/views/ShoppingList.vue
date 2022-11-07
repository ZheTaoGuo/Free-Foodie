<script>
import IndividualTab from '../components/IndividualTab.vue';
import TabsWrapper from '../components/TabsWrapperShoppingList.vue'
import ShoppingItem from '../components/ShoppingItem.vue'
import {
    getUser,
    getUserIngredients,
    getAllMissing,
    getFamily,
    assignItem, getLoggedInUser, getAllAssignedIngredients
} from '../utils'
// import {sendMessage} from '../utils/send_sms'
export default {
    data() {
        return {
            selectedUser: 0,
            users: [],
            familyUsers: [],
            missingList: [],
            assignedList: [],
            familyMembers: []
        }
    },
    computed: {
            
        assignIngredients(){
            for (let obj of this.familyUsers) {
                console.log(obj);
                getAllAssignedIngredients(obj.userId).then((value) => {
                    obj.assignedList = value;
                })
            }
            console.log("START ASSIGNED family");
            console.log(this.familyUsers);
            console.log("END ASSIGNED family");
        }
    },
    components: {
        IndividualTab,
        TabsWrapper,
        ShoppingItem
    },
    async mounted() {
        this.callGetAllMissing();
        this.callGetFamily();

        const loggedInUser = await getLoggedInUser();
        const family = await getFamily(loggedInUser.userId);
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

        this.getAssignedIngredientPerUser();

    },
    methods: {
        moveItem(itemName, event) {
            // console.log(itemName, event.target.value);
            let member = event.target.value
            // console.log(member);
            assignItem(member, itemName)
            // sendMessage(itemName)
            // adding the bottom line will fix the issue with the selected refreshing... but will to force reload causing the screen flash
            // window.location.reload()
            this.callGetAllMissing()

            // this.familyMembers = getFamily(this.selectedUser)
            this.callGetFamily()

        },
        methods: {
            moveItem(itemName, memberId) {
                console.log(itemName, memberId);
                let member = memberId
                this.member = member
                // console.log(member);
                assignItem(member, itemName)
                this.sendMessage()
                // sendMessage(itemName)
                // adding the bottom line will fix the issue with the selected refreshing... but will to force reload causing the screen flash
                // window.location.reload()
                this.callGetAllMissing()
            },
            callGetAllMissing() {
                getAllMissing(this.selectedUser).then((value) => {
                    this.missingList = value
                })
            },
            callGetFamily() {
                getFamily(this.selectedUser).then((value) => {
                this.familyMembers = value.users
            })
            }
            console.log("START ASSIGNED family");
            console.log(this.familyUsers);
            console.log("END ASSIGNED family");
        },
        updateSelectedUser(user){
            this.selectedUser = user.userId
            console.log("hello");
        },
    }
}
</script>

<template>
    <TabsWrapper>

        <IndividualTab title="Personal" id="personal-style">
            <div v-for="item of missingList">
                <ShoppingItem :title="'Personal'" :itemName="item" :user="selectedUser" :familyMembers="familyMembers"
                    @assignItem="moveItem"></ShoppingItem>
            </div>

        </IndividualTab>
        <IndividualTab title="Family" id="family-style">

            <div class="container-fluid">
                <div class="row">
                    <div class="col-3">
                        <div class="nav nav-pills flex-column text-center" id="v-tab" aria-orientation="vertical">
                            <button v-for="user of familyUsers" class="nav-link border p-4 my-2" style="color: black;"
                                :class="{ active: user.userId == selectedUser}" id="v-settings-tab"
                                data-bs-toggle="pill" :data-bs-target="'#v-settings' + users.userId" type="button"
                                role="tab" aria-controls="v-settings" :aria-selected="users.userId == selectedUser"
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
                                :class="{ active: users.userId == selectedUser, show: users.userId == selectedUser }"
                                :id="'v-settings' + users.userId" :aria-labelledby="users.userId == selectedUser"
                                role="tabpanel" tabindex="0">
                                <div v-if="user.userId == selectedUser">
                                    <div v-if="user.assignedList == null || user.assignedList == undefined">
                                        <h3 class="text-center">No items assigned to you</h3>
                                    </div>
                                    <div v-else>
                                        <ShoppingItem v-for="item of user.assignedList" :title="'Family'"
                                            :itemName="item.itemName" :user="selectedUser" :familyMembers="familyUsers"
                                            @assignItem="moveItem">
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

</template>

<style>
.tabs-component {
    color: green;
}

</style>
