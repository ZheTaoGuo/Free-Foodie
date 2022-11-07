<script>
    export default {
        props: ['title', 'itemName', 'user', 'familyMembers'],
        emits: ['assignItem'],
        data() {
            return{
                famMember: 'Assign to'
            }
        },
        methods: {
            assignToMember(){
                let memberId = this.famMember
                this.famMember = 'Assign to'
                this.$emit('assignItem', this.itemName, memberId)

            }
        }
    }
</script>

<template>
    <div class="container-fluid">
        <div class="row justify-content-start">
            <div class="col-3">
                <img src="../assets/logo.png" style="width: 500; height: 500;" />
            </div>
            <div class="col-9">
                <div class="item-component">
                    <div class="item-information">
                        <div class="title">{{itemName}}</div>
                        <br>
                        <!-- <div class="quantity">Quantity</div>
                        <br>
                        <div class="weight">Weight</div>
                        <br> -->
                    </div>

                    <div class="status">
                        <div class="icon" v-if="title != 'Personal'">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div class="item-status">
                            <select class="form-select" v-model="famMember" @change="assignToMember()">
                                <option selected>{{famMember}}</option>
                                <option v-for="member of familyMembers" :value="member.userId">{{member.userName}}</option>
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
</style>