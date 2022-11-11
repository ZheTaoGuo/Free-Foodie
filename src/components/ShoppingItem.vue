<script>
    export default {
        props: ['title', 'itemName', 'user', 'familyMembers', 'itemImage'],
        emits: ['assignItem', "cancelItem"],
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
            }
        },
    }
</script>

<template>
    <div class="container-fluid">
        <div class="row justify-content-start">
            <div class="col-3" >
                <img class="img-fluid rounded" height="150" width="150" :src="'https://engzongwei.github.io/assets/' + this.itemImage" />
            </div>
            <div class="col-9">
                <div class="item-component">
                    <div class="item-information">
                        <div class="title">{{String(itemName).charAt(0).toUpperCase() + String(itemName).slice(1)}}</div>
                        <br>
                    </div>

                    <div class="status">
                        <div class="icon" v-if="title != 'Personal'">
                            <button class="btn btn-primary mx-2" v-on:click="cancelIngredient">
                               Delete Ingredient
                            </button>
                            <button class="btn btn-primary" v-on:click="cancelIngredient">
                                Ingredient Bought
                            </button>
                        </div>
                        <div v-else>
                            <button class="btn btn-primary mx-2" v-on:click="cancelIngredient">
                               Delete Ingredient
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