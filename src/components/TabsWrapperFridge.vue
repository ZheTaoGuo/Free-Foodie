<template>
  <div class="fridge-header p-2 mb-3">
    <h1 class="text-center">My Fridge</h1>
  </div>
  <div class="container-fluid tabs-wrapper d-flex flex-column w-100">


    <div class="row tabs-header">
      <!-- column content-->
      <div class="col individual-tab-style mx-4 text-center" v-for="title in tabTitlesSlot" :key="title"
        :class="{ selected: title == selectedTitle }" @click="selectedTitle = title">
        {{ title }}
      </div>
    </div>

    <!-- individual content-->
    <div class="content flex-grow-1">
      <!--Individual Tab Component-->
      <slot />
    </div>

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
                <input type="text" class="form-control" id="ItemName" placeholder="Enter Ingredient" v-model="itemName"
                  required />
              </div>

              <div class="form-group">
                <label for="Quantity">Quantity</label>
                <input type="text" class="form-control" id="Quantity" placeholder="Enter Quantity" v-model="quantity"
                  required />
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
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('closeMe')">Close</button>
              <button type="button" class="btn btn-primary"
                @click="saveIngredients(this, itemName, quantity, selectedValue)">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>




</template>

<script>
import { ref, provide } from "vue"
import { saveIngredients} from '../utils';
export default {
  data(){
    return{
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
  methods:{
    saveIngredients,
    callSaveIngredients(){
        
    }
  },
  mounted(){
    
  },
  setup(props, { slots }) {
    const tabTitlesSlot = ref(slots.default().map((tab) => tab.props.title))
    const selectedTitle = ref(tabTitlesSlot.value[0])

    provide("selectedTitle", selectedTitle)
    return {
      selectedTitle,
      tabTitlesSlot

    }
  },
}
</script>
<style scoped>
.tabs-wrapper {
  margin: auto;
  width: auto;
  height: auto;
  min-height: 100vh;
}

.individual-tab-style {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  border: 1px solid black;
  padding-bottom: 5px;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
}

.tabs-header {
  width: auto;
  margin-bottom: 10px;
  list-style: none;
}

.tabs-header li {
  height: 50px;
  width: 150px;
  text-align: center;
  /* padding: 10px 20px; */
  /* margin-top: 5px; */
  /* margin-right: 20px; */
  background-color: #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s all ease-out;
}

.tabs-header li.selected {
  background-color: green;
  color: white;
}

.content {
  width: 100%;
}

.fridge-header {
  background-image: linear-gradient(to bottom right, #7395AE, #379683) !important;
  /* border-radius: 20px; */
  color: #fff !important;
  box-shadow: 0 0 40px 0 rgba(94, 92, 154, .06);
  margin-bottom: 5px;
}
</style>
