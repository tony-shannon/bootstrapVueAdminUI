<template>
    <b-row class="mobile-divider">
        <b-col>
            <b-icon :icon="icon" /> {{title}}
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: "mobile-divider",
        props:{
            icon:{
                type: String
            },
            title: {
                type: String,
            }
        }
    }
</script>

<style scoped>
    .mobile-divider{
        background: #007bff;
        color: white;
        font-size: 16px;
        padding: 10px;
    }
</style>
