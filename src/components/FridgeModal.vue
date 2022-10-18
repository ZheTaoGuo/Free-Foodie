<template>
  <transition name="modal-animation" appear>
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <i class="far fa-times-circle"></i>
          <!-- Modal Content-->
          <slot />
        </div>
        <button class="button" @click="showModal = false">Submit</button>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["modalActive"],
  
};
</script>
<style></style>
