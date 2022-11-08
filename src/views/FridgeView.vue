<template>
    <NavBar></NavBar>
    <TabsWrapper @closeMe="loadIngredients">

        <IndividualTab title="All" id="all">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in this.items">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <button type="button" class="btn btn-primary" @click="this.deleteIngredients(item)">Delete</button>
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                            <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

        <IndividualTab title="Meat" id="all">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in this.meat">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                            <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

        <IndividualTab title="Carbohydrates" id="all">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in this.carbohydrates">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                            <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

        <IndividualTab title="Sauces" id="all">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in this.sauces">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                            <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

        <IndividualTab title="Condiments" id="all">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in this.condiments">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                            <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

        <IndividualTab title="Fresh Produce" id="all">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in this.freshProduce">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                            <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

    </TabsWrapper>


</template>

<script setup>
    import IndividualTab from '../components/IndividualTab.vue';
    import TabsWrapper from '../components/TabsWrapperFridge.vue';
</script>

<script>
    import {
        saveIngredients,
        retrieveIngredients,
        deleteFromFridge
    } from '../utils'
    import NavBar from '../components/Navbar.vue';


    export default {
        data() {
            return {
                itemName: "",
                quantity: "",
                selectedValue: "",
                items: [],
                meat: [],
                carbohydrates: [],
                condiments: [],
                sauces: [],
                freshProduce: []
            }
        },
        components: {
            NavBar
        },
        methods: {
            saveIngredients,
            loadIngredients() {
                console.log(retrieveIngredients());

                const retrievedIngredientsObject = retrieveIngredients();
                retrievedIngredientsObject.then(value => {
                    this.items = value

                    for (let item of this.items) {
                        if (item.itemType == "Meat") {
                            this.meat.push(item)
                        } else if (item.itemType == "Carbohydrates") {
                            this.carbohydrates.push(item)
                        } else if (item.itemType == "Sauces") {
                            this.sauces.push(item)
                        } else if (item.itemType == "Condiments") {
                            this.condiments.push(item)
                        } else if (item.itemType == "Fresh Produce") {
                            this.freshProduce.push(item)
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            callSaveIngedients(obj, itemName, quantity, selectedValue) {
                console.log('emitted');
                saveIngredients(obj, itemName, quantity, selectedValue)
                this.loadIngredients()
            },
            deleteIngredients(item){
                console.log(item);
                deleteFromFridge(item)
                this.loadIngredients()
            }
        },
        mounted() {
            this.loadIngredients()
        },

    }
</script>

<style>
    .container {
        margin: 5px;
    }

    .bottom {
        margin-top: 10px;
    }


    .card {
        /* margin-left: 10px;
  margin-top: 10px; */
        text-align: left;

    }
</style>