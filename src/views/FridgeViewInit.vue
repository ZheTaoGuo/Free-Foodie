<template>
</template>
<script>
    export default {
        name: 'FridgeViewInit',
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
                this.$router.push('/fridgeviewmobile');
            }
            else {
                this.$router.push('/fridgeview');
            }
        }
    }
</script>
<style scoped>
</style>