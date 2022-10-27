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
    <ul class="list-group text-start">
        <li class="list-group-item" v-for="item of ingredients">
            <span v-if="Number.isInteger(item.amount)">{{item.amount}}&nbsp</span> 
            <span v-else>{{item.amount.toFixed(2)}}&nbsp</span>
            <span v-if="item.unit">{{item.unit}} of </span>{{item.originalName}}
        </li>
    </ul>
</template>

<style>
    
</style>