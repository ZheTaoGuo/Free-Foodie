<template>
  <div class="fridge-header p-2 mb-3">
    <h1 class="text-center">My Fridge</h1>
  </div>
  <div class="container-fluid tabs-wrapper d-flex flex-column w-100">


    <div class="row tabs-header">
      <!-- column content-->
      <div class="col individual-tab-style mx-4 text-center" v-for="title in tabTitlesSlot" :key="title"
          :class="{ selected: title == selectedTitle }" @click="onClickEffect($event)"
          :style="{ 'background-color': title == selectedTitle ? 'rgb(183, 221, 234)' : (hover == true && hoverTitle == title) ? 'lightgreen' : 'white' }"
          @mouseenter="onHoverEffect($event)" @mouseleave="outHoverEffect($event)">
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
      <div class="fab-container">
        <div class="button iconbutton addbutton">
          <span type="button" id="plus" data-bs-toggle="modal" data-bs-target="#itemModal">Add New Ingredient</span>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="itemModal" tabindex="-1" aria-labelledby="itemModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="itemModal">Add New Ingredient</h5>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="ItemName" class="d-flex justify-content-start p-2">ItemName</label>
                <input type="text" class="form-control" id="ItemName" placeholder="Enter Ingredient" v-model="itemName"
                  required />
              </div>

              <div class="form-group">
                <label for="Quantity" class="d-flex justify-content-start p-2">Quantity</label>
                <input type="number" class="form-control" id="Quantity" placeholder="Enter Quantity" v-model="quantity"
                  required />
              </div>

              <div class="form-group">
                <label for="Category" class="d-flex justify-content-start p-2">Category</label>
                <select class="form-select" v-model="selectedValue" required>
                  <option disabled selected></option>
                  <option value="Meat">Meat</option>
                  <option value="Carbohydrates">Carbohydrates</option>
                  <option value="Condiments">Condiments</option>
                  <option value="Sauces">Sauces</option>
                  <option value="Fresh Produce">Fresh Produce</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                @click="$emit('closeMe')">Close</button>
              <button type="button" class="btn btn-primary" @click="handleSaveClick()">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>



</template>

<script>
import { ref, provide } from "vue"
import { saveIngredients } from '../utils';
import Footer from '../components/Footer.vue'
import NavBar from '../components/Navbar.vue'
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
      freshProduce: [],
      hover: false,
      hoverTitle: ""
    }
  },
  components: {
    Footer,NavBar
  },
  methods: {
    handleSaveClick() {
      let alertMsg = ""
      if (this.itemName == "" && this.quantity == "" && this.selectedValue == "") {
        alertMsg += "Please fill out all fields";
      }
      else {
        var letters = /^[A-Za-z ]+$/
        if (!letters.test(this.itemName) && this.itemName !== "") {
          alertMsg += "Item Name must only contain letters" + "\n"
        }
        else if (this.itemName == "") {
          alertMsg += "Please fill in the Item Name field" + "\n"
        }

        if ((Number.isFinite(this.quantity) == false) && this.quantity !== "") {
          alertMsg += "Quantity must only contain numbers" + "\n"
        }
        else if (this.quantity == "") {
          alertMsg += "Please fill in the Quantity field" + "\n"
        }
        else if (Number.isFinite(this.quantity) == false) {
          alertMsg += "Quantity must only contain numbers" + "\n"
        }
        if (this.selectedValue == "" && this.selectedValue == null) {
          alertMsg += "Please select a category" + "\n"
        }
        else if (this.selectedValue == "") {
          alertMsg += "Please fill in the Category field" + "\n"
        }
      }
      if (alertMsg !== "") {
        alert(alertMsg);
      }
      else{
        alert("Your ingredient has been added to your fridge!");
      }
      saveIngredients(this, this.itemName, this.quantity, this.selectedValue)
    },
    onHoverEffect(event){
      console.log("this is event", event)
      this.hover = true
      this.hoverTitle = event.path[0].innerText
    },
    outHoverEffect(event){
      this.hover = false
      this.hoverTitle = ""
    },
    onClickEffect(event) {
      this.selectedTitle = event.path[0].innerText
      event.path[0].style.backgroundColor = "green"
    }
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
  background-color: rgb(183, 221, 234);
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
  background-color: rgb(183, 221, 234);
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

.fab-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}
.addbutton:hover{
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3) !important;
}

#plus {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0 auto;
}

.button {
  margin-right:10px;
  width: 160px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  background: lightblue;
  border: 1px solid black;
}

</style>
