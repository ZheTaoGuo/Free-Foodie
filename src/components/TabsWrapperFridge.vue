<template>
  <div class="container tabs">
    <div class="row">
      <ul class="tabs-header">
      <li
        v-for="title in tabTitlesSlot"
        :key="title"
        :class="{ selected: title == selectedTitle }"
        @click="selectedTitle = title"
      >
        {{title}}
      </li>
      </ul>
    </div>

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
  margin-left: 20px;
  margin-right: 20px;
  width: auto;
}

.tabs-header{
  width: auto;
}
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
</style>
