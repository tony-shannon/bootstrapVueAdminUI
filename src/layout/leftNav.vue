<template>
    <div>
        <b-list-group class="left-nav">
            <template v-if="isAuth">
                <router-link
                        class="list-group-item list-group-item-action"
                        :to="{ name: 'patients' }"
                >
                    Patients
                </router-link>
                <router-link
                        class="list-group-item list-group-item-action"
                        :to="{ name: 'documents', params: {id: '57962105-27e7-421a-9007-54f738f1d347' }}"
                >
                    Data Collection
                </router-link>
                <router-link
                        class="list-group-item list-group-item-action"
                        :to="{ name: 'diagnosis', params: {document_id: '00ca6980-ec64-424f-b7a7-deb863ec738e', id: '57962105-27e7-421a-9007-54f738f1d347'} }"
                >
                    Diagnosis
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
                'sidebarLinks': 'website/links',
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
