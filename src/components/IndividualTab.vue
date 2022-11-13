<template>
    <div class="container-fluid">
            <!-- individual tab content-->
            <div class="tab-content p-4" v-if="title == selectedTitle">
                <!-- content to be passed in -->
                    <div class="row">
                        <slot></slot>
                    </div>
            </div>
    </div>
</template>

<script>
import { inject } from 'vue'
export default {
    props: ['title'],
    emit: [],
    setup(){
        const selectedTitle = inject("selectedTitle");
        return { 
            selectedTitle,
        }
    }
    
}
</script>

<style scoped>
    .tab-content{
        margin: auto;
        min-height: 100vh;
        border-radius: 5px;
        background-color: rgb(183, 221, 234);
    }
</style>