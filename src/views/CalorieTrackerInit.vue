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
                this.$router.push('/CalorieTrackerMobile');
            }
            else {
                this.$router.push('/CalorieTracker');
            }
        }
    }
</script>
<style scoped>
</style>