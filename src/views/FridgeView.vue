<template>
  <TabsWrapper>

  <IndividualTab title="All">
    Carbohydrates Info
  </IndividualTab>
  <IndividualTab title="Meat">
    Meat Info
  </IndividualTab>
  <IndividualTab title="Carbohydrates">
    Protein Info
  </IndividualTab>
  <IndividualTab title="Sauces">
    Fat Info
  </IndividualTab>

</TabsWrapper>

  <div class="bottom"></div>
</template>

<script setup>

import IndividualTab from '../components/IndividualTab.vue';
import TabsWrapper from '../components/TabsWrapperFridge.vue';
</script>

<style scoped>

</style>
