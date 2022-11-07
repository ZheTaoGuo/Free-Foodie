<script setup>
    // eslint-disable-next-line
    const props = defineProps({
        recipeId: {
            type: Number,
            default: 664087
        },
        image_url: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: "Test recipe Name",
            // required: true
        },
        duration: {
            type: Number,
            // required: true
            default: 1
        },
        desc: {
            type: String,
            // required: true
            default: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, qui!'
        },
        page: {
            type: String,
            default: 'none'
        }
    })
</script>

<template>

    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-3">
        <router-link :to="{path: '/recipe', query: {type: page, recipeId: recipeId} }" style="text-decoration:none; color:black">
            <div class="card h-100">
                <img :src="image_url" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title fs-4">{{name}}</h5>
                    <p class="card-text pt-2 fs-6" v-html="desc"></p>
                    <p class="card-text pt-2 fs-6 fw-light">Duration: {{duration}} Minutes</p>
                </div>
            </div>
        </router-link>
    </div>

</template>

<style>
.card{
    border-color: #343b49;
    color: #343b49;
}
.card:hover{
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3)!important;
    transition-duration: 0.35s;
}
</style>