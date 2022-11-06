<template>
    <div class="container-fluid tabs">
      <div class="row tabs-header gx-2 h-100">
        <!-- column content-->
        <div class="col tab-style mx-4 text-center" v-for="title in tabTitlesSlot"
          :key="title"
          :class="{ selected: title == selectedTitle }"
          @click="selectedTitle = title">
          {{title}}
        </div>
      </div>
    </div>
    <!-- individual content-->
    <div class="content flex-grow-1">
      <slot />
    </div>


</template>

<script>
import { ref, provide } from "vue"
export default {
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
.tabs{
  margin: auto;
  width: auto;
  height: auto;
}

.tab-style{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  border: 1px solid black;
  padding: 8px;
  text-align: center;
  margin-bottom: 30px;
}
.tabs-header{
  width: auto;
  margin-bottom: 10px;
  list-style: none;
  /* display: flex;
  justify-content: flex-start; */
}

/* @media only screen and (max-width: 1023px){

  .tabs{
    width: auto;
  }
  .tabs-header{
    width: auto;
  }
}

@media only screen and (max-width: 767px){

  .tabs{
    width: auto;
  }
  .tabs-header{
    width: auto;
  }
}

@media only screen and (max-width: 480px){

  .tabs{
    width: auto;
  }
  .tabs-header{
    width: auto;
  }
} */
.tabs-header li{
  height: 50px;
  width: 150px;
  text-align: center;
  padding: 10px 20px;
  margin-top: 5px;
  margin-right: 20px;
  background-color:#ddd;
  border-radius: 5px;
  cursor:pointer;
  transition: 0.4s all ease-out;
}

.tabs-header li.selected{
    background-color: green;
    color: white;
}

.content{
  padding-left: 30px;
  padding-right: 30px;
}
</style>
