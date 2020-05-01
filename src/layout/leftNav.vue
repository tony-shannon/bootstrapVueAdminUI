<template>
    <div>
        <b-list-group class="left-nav">
            <b-list-group-item  class="no-border-top" href="/demographics">Demog</b-list-group-item>
            <router-link
                    class="list-group-item list-group-item-action"
                    :to="{ name: 'problems' }"
            >
                Problems
            </router-link>
            <router-link
                    class="list-group-item list-group-item-action"
                    :to="{ name: 'patients' }"
            >
                Patients
            </router-link>
            <router-link
                    class="list-group-item list-group-item-action"
                    :to="{ name: 'medications' }"
            >
                Meds
            </router-link>
            <router-link
                    class="list-group-item list-group-item-action"
                    :to="{ name: 'adverse_events' }"
            >
                AdvEvents
            </router-link>
            <b-list-group-item href="adverseEvB">AdvEventB</b-list-group-item>
            <b-list-group-item href="Procedures">Procedures</b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    export default {
        name: "leftNav"
    }
</script>

<style scoped>
    .left-nav,
    .left-nav .list-group-item{
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
        background-color: rgba(0,0,0,.075) !important;
        border-color: #d6d6d6;
    }
</style>
