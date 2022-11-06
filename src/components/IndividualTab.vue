<template>
    <div class="container-fluid">
            <!-- individual tab content-->
            <div class="tab-content p-4" v-show="title == selectedTitle">
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
        /* top: 50%;
        left: 50%; */
        margin: auto;
        min-height: 100vh;
        border-radius: 5px;
        /* box-shadow: 5px 10px black; */
        background-color: green;
        
        
    }
</style>