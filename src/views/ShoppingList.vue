<script>
    import IndividualTab from '../components/IndividualTab.vue';
    import TabsWrapper from '../components/TabsWrapperShoppingList.vue'
    import ShoppingItem from '../components/ShoppingItem.vue'
    import {
        getUser,
        getUserIngredients,
        getAllMissing,
        getFamily,
        assignItem
    } from '../utils'

    // import {sendMessage} from '../utils/send_sms'



    export default {
        data() {
            return {
                selectedUser: 1,
                users: [],
                username: "",
                retrievedUsers: [],
                missingList: [],
                familyMembers: []
            }
        },
        computed: {
            result() {
                for (let user of this.users) {
                    return user.username
                }
            },

        },
        components: {
            IndividualTab,
            TabsWrapper,
            ShoppingItem
        },
        mounted() {
            getUser(1).then((value) => {
                this.users.push(value)
            })
            console.log("hello");
            // console.log("this is the output of users" + this.users);
            // console.log("start ingredients");
            // let retrievedUserIngredients = getUserIngredients(this.selectedUser);
            // console.log(retrievedUserIngredients);

            // console.log("end ingredients");

            this.callGetAllMissing()

            // this.familyMembers = getFamily(this.selectedUser)
            this.callGetFamily()
            
        },
        methods: {
            moveItem(itemName, event) {
                console.log(itemName, event.target.value);
                let member = event.target.value
                // console.log(member);
                assignItem(member, itemName)
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
            callGetFamily(){
                getFamily(this.selectedUser).then((value) => {
                this.familyMembers = value.users
            })
            }
        }

    }
</script>

<template>
    <div>
        hello
        <!-- {{users}} -->
        {{result}}
    </div>
    <TabsWrapper>

        <IndividualTab title="Personal">
            <div v-for="item of missingList">
                <ShoppingItem :title="'Personal'" :itemName="item" :user="selectedUser" :familyMembers="familyMembers"
                    @assignItem="moveItem"></ShoppingItem>
            </div>

        </IndividualTab>
        <IndividualTab title="Family">

            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <div class="nav nav-pills flex-column" id="v-tab" aria-orientation="vertical">
                            <span><i class="fa-light fa-user"></i> {{users[0]}}</span>
                            <button v-for="user of users" class="nav-link border p-4 my-2"
                                :class="{ active: users[0] == selectedUser }" id="v-settings-tab" data-bs-toggle="pill"
                                :data-bs-target="'#v-settings' + users[0].userId" type="button" role="tab"
                                aria-controls="v-settings" :aria-selected="users[0] == selectedUser">
                            </button>
                        </div>
                    </div>

                    <div class="col-9">
                        <div class="tab-content" id="v-pills-tabContent">
                            <div v-for="user of users" class="tab-pane fade"
                                :class="{active: users[0] == selectedUser, show: users[0] == selectedUser}"
                                :id="'v-settings' + users[0].userId" role="tabpanel"
                                :aria-labelledby="'shopping' + users[0]" tabindex="0">
                                <ShoppingItem></ShoppingItem>
                                <ShoppingItem></ShoppingItem>
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
        color: red;
    }
</style>
