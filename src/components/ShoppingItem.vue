<script>
    export default {
        props: ['title', 'itemName', 'user', 'familyMembers', 'itemImage', 'mobile', "item"],
        emits: ['assignItem', "cancelItem", "cancelIngredientFromUnassigned", "IngredientBought"],
        data() {
            return{
                famMember: 'Assign to',
                testLink: 'https://engzongwei.github.io/assets/' + this.itemImage,
            }
        },
        methods: {
            assignToMember(){
                let memberId = this.famMember
                this.famMember = 'Assign to'
                this.$emit('assignItem', this.itemName, memberId, this.itemImage)
                this.famMember = 'Assign to'

            },
            cancelIngredient() {
                console.log("cancel item");
                this.$emit('cancelItem', {name: this.itemName, image: this.itemImage})
            },
            changeAssignment() {
                console.log("change assignment");
                this.$emit("changeAssignment", {name: this.itemName, image: this.itemImage}, this.famMember)
                this.famMember = 'Assign to'
            },
            cancelIngredientFromUnassigned() {
                console.log("cancelIngredientFromUnassigned");
                this.$emit('cancelIngredientFromUnassigned', {name: this.itemName, image: this.itemImage})
            },
            IngredientBought() {
                console.log("IngredientBought");
                this.$emit('IngredientBought', this.item)
            }
        },
    }
</script>

<template>
    <div>
        <div class="container-fluid" v-if="mobile == false">
            <div class="row justify-content-start">
                <div class="col-3" >
                    <img class="img-fluid rounded" height="150" width="150" :src="'https://engzongwei.github.io/assets/' + this.itemImage" />
                </div>
                <div class="col-9">
                    <div class="item-component">
                        <div class="item-information">
                            <div class="title">
                                <span v-if="title == 'Personal'">
                                    {{String(itemName).charAt(0).toUpperCase() + String(itemName).slice(1)}} 
                                    <span v-on:click="cancelIngredientFromUnassigned">&nbsp<i class="fa-solid fa-trash"></i></span>
                                </span>
                                <span v-else>
                                    {{String(itemName).charAt(0).toUpperCase() + String(itemName).slice(1)}} 
                                    <span v-on:click="cancelIngredient">&nbsp<i class="fa-solid fa-trash"></i></span>
                                </span>
                            </div>
                            <br>
                        </div>

                        <div class="status">
                            <div class="icon" v-if="title != 'Personal'">
                                <button class="btn btn-primary" v-on:click="IngredientBought">
                                    Ingredient Bought
                                </button>
                            </div>
                            
                            <div class="item-status">
                                <!-- assigning to someone. Unassigned Tab -->
                                <select v-if="title == 'Personal'" class="form-select" v-model="famMember" @change="assignToMember()">
                                    <option selected disabled>{{famMember}}</option>
                                    <option v-for="member of familyMembers" :value="member.userId">{{member.userName}}</option>
                                </select>
                                <!-- assigning from someone to another person. Assigned tab -->
                                <select v-else class="form-select" v-model="famMember" @change="changeAssignment()">
                                    <option selected disabled>{{famMember}}</option>
                                    <template v-for="member of familyMembers">
                                        <option v-if="member.userId != user" :value="member.userId">{{member.userName}}</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
        </div>
        <div v-else> <!-- mobile view-->
            <div class="row justify-content-start">
                <div class="col-3 m-0 p-0" >
                    <img class="img-fluid rounded" height="200" width="200" :src="'https://engzongwei.github.io/assets/' + this.itemImage" />
                </div>
                <div class="col-9">
                    <div class="container">
                        <div class="row">
                            <div class="title">
                                <span>
                                    {{String(itemName).charAt(0).toUpperCase() + String(itemName).slice(1)}} 
                                    <span v-on:click="cancelIngredient"><i class="fa-solid fa-trash"></i></span>
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" v-if="title != 'Personal'">  <!-- this is the assigned tab-->
                                <button class="btn btn-primary mt-3"  v-on:click="IngredientBought" style="font-size:10px">
                                    Ingredient Bought
                                </button>
                            </div>
                            <div v-else> <!-- This is the unassigned tab -->
                                <div class="row">
                                    <div class="col">
                                        <!-- assigning to someone. Unassigned Tab -->
                                        <select v-if="title == 'Personal'" class="form-select mt-3" v-model="famMember" @change="assignToMember()" style="font-size:10px">
                                            <option selected disabled>{{famMember}}</option>
                                            <option v-for="member of familyMembers" :value="member.userId">{{member.userName}}</option>
                                        </select>
                                        <!-- assigning from someone to another person. Assigned tab -->
                                        <select v-else class="form-select mt-3" v-model="famMember" @change="changeAssignment()">
                                            <option selected disabled>{{famMember}}</option>
                                            <template v-for="member of familyMembers">
                                                <option v-if="member.userId != user" :value="member.userId">{{member.userName}}</option>
                                            </template>
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
            <hr>
        </div>
    </div>
</template>


<style>
    .item-information {
        display: block;
        float: left;
        line-height: 15px;
        margin-top: 10px;
    }

    .icon {
        display: flex;
        justify-content: flex-end;
        margin-right: 0;
        float: right;
        width: 100px;

    }

    .status {
        margin-top: 10px;
        float: right;
    }

    .item-status {
        display: flex;
        justify-content: flex-end;
        margin-right: 0;
        float: right;
        width: 100%;
        margin-top: 10px;

    }

    span:hover, select:hover {
        cursor: pointer;
    }
</style>