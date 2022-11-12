<template>
    <NavBar @checkLogin="isLoggedIn()"></NavBar>
    <TabsWrapper @closeMe="loadIngredients">

        <IndividualTab title="All">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in items">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <a class="cross-icon" @click="deleteIngredients(item)">
                            <i class="fa-solid fa-circle-xmark fa-lg"></i>
                        </a>
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                        <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

        <IndividualTab title="Meat">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in meat">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <a class="cross-icon" @click="deleteIngredients(item)">
                            <i class="fa-solid fa-circle-xmark fa-lg"></i>
                        </a>
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                        <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

        <IndividualTab title="Carbohydrates">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in carbohydrates">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <a class="cross-icon" @click="deleteIngredients(item)">
                            <i class="fa-solid fa-circle-xmark fa-lg"></i>
                        </a>
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                        <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

        <IndividualTab title="Sauces">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in sauces">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <a class="cross-icon" @click="deleteIngredients(item)">
                            <i class="fa-solid fa-circle-xmark fa-lg"></i>
                        </a>
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                        <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

        <IndividualTab title="Condiments">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in condiments">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <a class="cross-icon" @click="deleteIngredients(item)">
                            <i class="fa-solid fa-circle-xmark fa-lg"></i>
                        </a>
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
                        <p class="card-text">
                        <p>Quantity:{{ item.itemQuantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
        </IndividualTab>

        <IndividualTab title="Fresh Produce">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2" v-for="item in freshProduce">
                <div class="card">
                    <div class="card-body text-center w-100">
                        <a class="cross-icon" @click="deleteIngredients(item)">
                            <i class="fa-solid fa-circle-xmark fa-lg"></i>
                        </a>
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
    deleteFromFridge,
    isLoggedIn
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
        isLoggedIn,
        saveIngredients,
        loadIngredients() {
            const retrievedIngredientsObject = retrieveIngredients();
            retrievedIngredientsObject.then((value) => {
                this.items = value
                console.log(this.items);
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
        deleteIngredients(item) {
            console.log(item);
            deleteFromFridge(item).then(value => {
                this.loadIngredients()
            }).catch(error => {
                this.loadIngredients()
            })
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
    text-align: left;
}

.card-body {
    position: relative;
}

.cross-icon {
    position: absolute;
    right: 0;
    top: 2%;
    margin-right: 5px;
    color: black;
}
</style>