<template>
    <transition name="modal-animation">
        <div class="modal" v-show="modalActive">
            <transition name="modal-animation-inner">
                <div v-show="modalActive" class="modal-inner">
                    <img src="../assets/close.png" style="width: 50px; height: 50px;">
                    <!-- modal content -->
                    <slot />
                    <button>Close</button>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    export default{
        props: ['modalActive'],
    }
</script>

<style>
</style>