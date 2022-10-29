<template>
  <TabsWrapper>

    <IndividualTab title="All" id="all">
      <div class="container">
        <div class="row">
          <div class="col-2 col-sm-4 card" v-for="item in this.items">
            <div class="card-body">
              <h5 class="card-title">{{ item.itemName }}</h5>
              <h6 class="card-subtitle text-muted">{{ item.itemType }}</h6>
              <p class="card-text">
              <p>Quantity:{{ item.itemQuantity }}</p>
              </p>
            </div>
          </div>
        </div>
      </div>


    </IndividualTab>
    <IndividualTab title="Meat" id="all">
      <div class="row">
          <div class="col-2" v-for="item in this.meat">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ item.itemName }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ item.itemType }}</h6>
              <p class="card-text">
              <p>Quantity:{{ item.itemQuantity }}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </IndividualTab>
    <IndividualTab title="Carbohydrates" id="all">
      <div class="row">
          <div class="col-2" v-for="item in this.carbohydrates">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ item.itemName }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ item.itemType }}</h6>
              <p class="card-text">
              <p>Quantity:{{ item.itemQuantity }}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </IndividualTab>

    <IndividualTab title="Sauces" id="all">
      <div class="row">
          <div class="col-2" v-for="item in this.sauces">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ item.itemName }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ item.itemType }}</h6>
              <p class="card-text">
              <p>Quantity:{{ item.itemQuantity }}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </IndividualTab>

    <IndividualTab title="Condiments" id="all">
      <div class="row">
          <div class="col-2" v-for="item in this.condiments">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ item.itemName }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ item.itemType }}</h6>
              <p class="card-text">
              <p>Quantity:{{ item.itemQuantity }}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </IndividualTab>

    <IndividualTab title="Fresh Produce" id="all">
      <div class="row">
          <div class="col-2" v-for="item in this.freshProduce">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ item.itemName }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ item.itemType }}</h6>
              <p class="card-text">
              <p>Quantity:{{ item.itemQuantity }}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </IndividualTab>

  </TabsWrapper>

  <div class="bottom">

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#itemModal">
      Add New Ingredient
    </button>

    <!-- Modal -->
    <div class="modal fade" id="itemModal" tabindex="-1" aria-labelledby="itemModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="itemModal">Add New Ingredient</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="ItemName">ItemName</label>
              <input type="text" class="form-control" id="ItemName" placeholder="Enter Ingredient" v-model="itemName" required />
            </div>

            <div class="form-group">
              <label for="Quantity">Quantity</label>
              <input type="text" class="form-control" id="Quantity" placeholder="Enter Quantity" v-model="quantity" required/>
            </div>

            <div class="form-group">
              <label for="Category">Category</label>
              <select class="form-select" v-model="selectedValue" required>
                <option disabled value="Please select one"></option>
                <option value="Meat">Meat</option>
                <option value="Carbohydrates">Carbohydrates</option>
                <option value="Condiments">Condiments</option>
                <option value="Sauces">Sauces</option>
                <option value="Fresh Produce">Fresh Produce</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"
              @click="saveIngredients(this,itemName, quantity, selectedValue)">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import IndividualTab from '../components/IndividualTab.vue';
import TabsWrapper from '../components/TabsWrapperFridge.vue';


</script>

<script>
import { saveIngredients, retrieveIngredients } from '../utils'



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
  methods: {
    saveIngredients
  },
  mounted() {

    console.log(retrieveIngredients());

    const retrievedIngredientsObject = retrieveIngredients();
    retrievedIngredientsObject.then(value => {
      this.items = value

      for (let item of this.items) {
        if (item.itemType == "Meat") {
          this.meat.push(item)
        }
        else if (item.itemType == "Carbohydrates") {
          this.carbohydrates.push(item)
        }
        else if (item.itemType == "Sauces") {
          this.sauces.push(item)
        }
        else if (item.itemType == "Condiments"){
          this.condiments.push(item)
        }
        else {
          this.freshProduce.push(item)
        }
      }
    }).catch(error => {
      console.log(error);
    });


  },

}

</script>

<style scoped>

.container{
  margin: 5px;
}

.bottom{
  margin-top: 10px;
}
#all {
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
}
.card {
  margin-left: 10px;
  margin-top: 10px;
  width: 200px;
  text-align: left;
}
</style>
