<script setup>
    // eslint-disable-next-line
    const props = defineProps({
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
            default: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, qui!'
        },
        desc: {
            type: String,
            // required: true
            default: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, qui!'
        }
    })
    
</script>

<template>
    <div class="col col-sm-12 col-md-6 col-lg-4 mb-3" >
        <a href="/recipe" style="text-decoration:none; color:black">
            <div class="card h-100" >
                <img :src="image_url" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title fs-4">{{name}}</h5>
                    <p class="card-text pt-2 fs-6" v-html="desc"></p>
                    <p class="card-text pt-2 fs-6 fw-light">Duration: {{duration}}</p>
                </div>
            </div>
        </a>
    </div>
</template>

<style>

</style>