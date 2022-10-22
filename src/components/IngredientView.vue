<script setup>
    // eslint-disable-next-line
    const props = defineProps({
        name: {
            type: String,
            default: "Test recipe Name",
            // required: true
        },
        index: {
            type: Number,
            default: 0
        },
        
        ingredients: {
            type: Array,
            default () {
                return []
            }
        }
    })

</script>

<template>
    <!-- <div class="container-fluid">
        <div v-for="item of ingredients" style="background-color: white;">
           {{item.amount}} <span v-show="item.unit !== ''">{{item.unit}} of</span> {{item.originalName}}
        </div>
    </div> -->
    <ul class="list-group text-start">
        <li class="list-group-item" v-for="item of ingredients">
            {{item.amount}} <span v-show="item.unit !== ''">{{item.unit}} of</span> {{item.originalName}}
        </li>
    </ul>
</template>

<style>
    
</style>