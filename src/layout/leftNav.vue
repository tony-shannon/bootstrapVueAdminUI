<template>
    <div>
        Nav Bar
        <b-list-group>
            <b-list-group-item href="/demographics">Demog</b-list-group-item>
            <router-link
                    class="list-group-item list-group-item-action"
                    :to="{ name: 'problems' }"
            >
                Problems
            </router-link>
<!--            <b-list-group-item href="/problems" active>Problems</b-list-group-item>-->
            <b-list-group-item href="medications">Meds</b-list-group-item>
            <b-list-group-item href="adverseEv">AdvEvents</b-list-group-item>
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

</style>