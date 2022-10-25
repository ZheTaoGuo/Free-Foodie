<template>
  <div class="container">
    <div class="row">
      <div class="col" style="left:0">
        <div class="tab d-flex flex-row">
          <button class="tablinks">
            All
          </button>
          <button class="tablinks">
            Meat
          </button>
          <button class="tablinks">
            Carbohydrates
          </button>
          <button class="tablinks">
            Condiments
          </button>
          <button class="tablinks">
            Fresh Produce
          </button>
        </div>
      </div>
    </div>
  </div>


  <div class="bottom">
    <!-- <FridgeModal @close="toggleModal" :modalActive="modalActive"/> -->
    <FridgeModal @close="toggleModal" :modalActive="modalActive">
      <div>hello world</div>
      <div class="modal-content">
              <div class="form-group">
                <label for="ItemName">ItemName</label>
                <input type="text" class="form-control" id="ItemName" placeholder="Enter Ingredient" />
              </div>

              <div class="form-group">
                <label for="ItemWeight">Item Weight</label>
                <input type="text" class="form-control" id="ItemWeight" placeholder="Enter Weight" />
              </div>

              <div class="form-group">
                <label for="Quantity">Quantity</label>
                <input type="text" class="form-control" id="Quantity" placeholder="Enter Quantity" />
              </div>

              <div class="form-group">
                <label for="Category">Category</label>
                <select>
                  <option disabled value="Please select one"></option>
                  <option value="Meat">Meat</option>
                  <option value="Carbohydrates">Carbohydrates</option>
                  <option value="Condiments">Condiments</option>
                  <option value="Sauces">Sauces</option>
                  <option value="Fresh Produce">Fresh Produce</option>
                </select>
              </div>
            
      </div>
    </FridgeModal>

    
    <button @click="toggleModal" type="button"> Open Modal</button>
  </div>
</template>

<script>
import FridgeModal from "./FridgeModal.vue";
import { ref } from "vue";

export default {
  name: "Fridge",
  props: {

  },
  methods: {
    
  },
  components: {
    FridgeModal,

  },
  setup() {
    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value
    }
    return { modalActive, toggleModal }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .tab {}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
} */

.bottom {
  background-color: rgba(0, 176, 234, 0.5);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
}
</style>