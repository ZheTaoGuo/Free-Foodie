<template>
</template>
<script>
    export default {
        name: 'SignupInit',
        methods: {
            isMobile() {
                if( screen.width <= 760 ) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        created() {
            if (this.isMobile()) {
                this.$router.push('/signupmobile');
            }
            else {
                this.$router.push('/signup');
            }
        }
    }
</script>
<style scoped>
</style>