<template>
    <div class="d-none d-md-block">
        <b-list-group class="left-nav">
            <template v-if="isAuth">

                <router-link v-for="(link, index ) in sidebarLinks" :key="index"
                        class="list-group-item list-group-item-action"
                        :to="link.to"
                >
                    {{link.title}}
                </router-link>
            </template>
        </b-list-group>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "leftNav",

        computed: {
            ...mapGetters({
                'isAuth': 'auth/isAuth',
                'sidebarLinks': 'website/getSidebarLinks',
            }),
        }
    }
</script>

<style scoped>
    .left-nav,
    .left-nav .list-group-item {
        background-color: #f4f4f4;
    }

    .left-nav .list-group-item:first-child {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }

    .left-nav .list-group-item:last-child {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .left-nav .list-group-item.active {
        color: #495057;
        background-color: rgba(0, 0, 0, .075) !important;
        border-color: #d6d6d6;
    }
</style>
