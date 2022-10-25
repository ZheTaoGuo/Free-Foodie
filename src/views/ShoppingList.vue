<template>

<TabsWrapper>

<IndividualTab title="Personal">
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="nav nav-tabs flex-column me-3" id="tab" aria-orientation="vertical">
          
        </div>
        <i class="fa-light fa-user"></i>
      
      </div>

      <div class="col-9">
        <div class="row">
          hello
        </div>
      </div>
    </div>
  </div>
</IndividualTab>
<IndividualTab title="Family">
  Family
</IndividualTab>


</TabsWrapper>

</template>

<script>
import IndividualTab from '../components/IndividualTab.vue';
import TabsWrapper from '../components/TabsWrapperShoppingList.vue'
export default{
  data(){
    return{
      queryType: "",
      selectedUser: 0,
      users:['User1', 'User2', 'User3']
    }
  },
  methods: {
    
  },
  components:{
    IndividualTab,
    TabsWrapper
  }
}
</script>

<script setup>

</script>

<style>

.tabs-component{
  color: red;
}
</style>
