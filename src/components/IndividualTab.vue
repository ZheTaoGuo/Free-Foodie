<template>
    <div class="container-fluid individual-border h-100" style="background-color:green;">

            <div class="row h-100 tab-content" v-show="title == selectedTitle">
                <slot/>
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
        /* background-color: green; */
        top: 50%;
        left: 50%;
        margin: auto;
        /* width: 100%; */
        height: 100vh;
        border-radius: 5px;
        box-shadow: 0 3px 5px 5px rgba(0,0,0,0.05);
        
        
    }
    .individual-border{
        /* margin-left: 20px; */
        margin-right: 20px!important;
    }
</style>