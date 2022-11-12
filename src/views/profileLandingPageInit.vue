<template>
</template>
<script>
    export default {
        name: 'ProfileInit',
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
                this.$router.push('/profilemobile');
            }
            else {
                this.$router.push('/profile');
            }
        }
    }
</script>
<style scoped>
</style>