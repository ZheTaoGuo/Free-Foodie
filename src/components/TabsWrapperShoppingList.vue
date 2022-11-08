<template>
  <div class="shopping-list-header">
    <h1 class="text-center">Shopping List</h1>
  </div>
  <div class="container-fluid tabs-wrapper d-flex flex-column w-100">
    <div class="row tabs-header">
      <div class="col individual-tab-style mx-4 text-center" v-for="title in tabTitlesSlot" :key="title"
        :class="{ selected: title == selectedTitle, active:hover }"
        :style="{ 'background-color': title == selectedTitle ? 'rgb(183, 221, 234)' : 'white' }" @click="selectedTitle = title"
        @mouseover="hover = true">
        {{ title }}
      </div>
    </div>

    <div class="content flex-grow-1">
      <slot />
    </div>
  </div>
</template>

<script>
import { ref, provide } from "vue"
export default {
  data(){
    return{
      // hover: false
    }
  },
  computed: {
    styleObject: function (title) {
      return {
        'background-color': this.title == this.selectedTitle ? 'green' : 'white',
        'focus': black
      }
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
  background-color: green;
  border: 1px solid black;
  padding-bottom: 5px;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
}

.individual-tab-style:hover {
  background-color: red;
}

.active {
  background-color: blue;
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

.shopping-list-header {
  background-image: linear-gradient(to bottom right, #7395AE, #379683) !important;
  /* border-radius: 20px; */
  color: #fff !important;
  box-shadow: 0 0 40px 0 rgba(94, 92, 154, .06);
  margin-bottom: 5px;
}
</style>
