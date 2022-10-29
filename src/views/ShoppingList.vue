<template>
  <div> 
    hello
    <!-- {{users}} -->
    {{result}}
  </div>
  <TabsWrapper>

    <IndividualTab title="Personal">
      <ShoppingItem></ShoppingItem>
      <ShoppingItem></ShoppingItem>

    </IndividualTab>
    <IndividualTab title="Family">
    
      <div class="container">
        <div class="row">
          <div class="col-3">
            <div class="nav nav-pills flex-column" id="v-tab" aria-orientation="vertical">
              <i class="fa-light fa-user"></i>
              <button v-for="user of users" class="nav-link border p-4 my-2"
                :class="{ active: users[0] == selectedUser }" id="v-settings-tab" data-bs-toggle="pill"
                :data-bs-target="'#v-settings' + users[0].userId" type="button" role="tab" aria-controls="v-settings"
                :aria-selected="users[0] == selectedUser">
              </button>
            </div>
          </div>

          <div class="col-9">
            <div class="tab-content" id="v-pills-tabContent">
              <div v-for="user of users" class="tab-pane fade"
                :class="{active: users[0] == selectedUser, show: users[0] == selectedUser}"
                :id="'v-settings' + users[0].userId" role="tabpanel" :aria-labelledby="'shopping' + users[0]" tabindex="0">
                <ShoppingItem></ShoppingItem>
                <ShoppingItem></ShoppingItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IndividualTab>


  </TabsWrapper>

</template>

<script>
import IndividualTab from '../components/IndividualTab.vue';
import TabsWrapper from '../components/TabsWrapperShoppingList.vue'
import ShoppingItem from '../components/ShoppingItem.vue'
import { getUser, getUserIngredients } from '../utils'



export default {
  data() {
    return {
      selectedUser: 1,
      users: [],
      username: "",
      retrievedUsers: []
    }
  },
  computed: {
    result(){
      for (let user of this.users){
        return user.username
      }
    }

    
  },
  components: {
    IndividualTab,
    TabsWrapper,
    ShoppingItem
  },
  mounted() {
      getUser(1).then((value) => {
      this.users.push(value)
    })
    console.log("this is the output of users" + this.users);
  console.log("start ingredients");
  let retrievedUserIngredients = getUserIngredients(this.selectedUser);
  console.log(retrievedUserIngredients);

  console.log("end ingredients");

  }

}

</script>

<script setup>

</script>

<style>
.tabs-component {
  color: red;
}
</style>
