<script setup>
// eslint-disable-next-line
const props = defineProps({
    name: {
        type: String,
        default: "Test recipe Name",
        // required: true
    },
    recipeId: {
        type: Number,
        default: 0
    },
    ingredients: {
        type: Array,
        default () {
            return []
        }
    },
    fridge: {
        type: Array,
        default () {
            return []
        }
    },
    missingIngredient: {
        type: Array,
        default () {
            return []
        }
    },
    userid: {
        type: String,
        default: '1'
    },
})

</script>

<script>

export default {
    data() {
        return {
            missingIngredient: []
        }
    },
    mounted() {
        this.$emit('missing', this.missingIngredient, this.recipeId)
    }
}
</script>

<template>
    <div class="text-dark">
        <table>
            <tr v-for="item of ingredients" style="text-align:left">
                <td class="ingredientavail"><span v-if="fridge.find(food => {
                    return food.itemName.toLowerCase() == item.name.toLowerCase()
                })">👍 </span>
                <span v-else-if="fridge.find(food => {
                    if (food.itemName.toLowerCase() != item.name.toLowerCase()) this.missingIngredient.push({name: item.name, image: item.image})
                    return true
                })">👎 </span></td>
                <td class="ingredientdesc"><span v-if="Number.isInteger(item.amount)">{{item.amount}}&nbsp</span> 
                    <span v-else>{{item.amount.toFixed(2)}}&nbsp</span>
                    <span v-if="item.unit">{{item.unit}} of </span> <span>{{item.name}}</span></td>
                </tr>
            </table>
        </div>
    </template>
    
    <style scoped>
    .ingredientavail{
        font-size: 1.2em;
        font-weight: 500;
        border-right: 2px solid black;
        margin-right: 1.2em;
        text-align: right;
        padding: 0.5em;
    }
    .ingredientdesc{
        font-size: 1.2em;
    }
    
    table{
        border-collapse: separate;
        border-spacing: 15px 15px;
    }
</style>