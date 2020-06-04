<template>
    <div class="mobile-menu d-flex d-md-none">
        <router-link v-for="(link, index ) in sidebarLinks" :key="index"
                     class="mobile-menu-router-link"
                     :to="link.to"
        >
        <div class="mobile-menu-entity">
            <div>
                <b-icon :icon="link.icon"/>
            </div>
            <div>
                {{link.title}}
            </div>
        </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "mobile-menu",
        data(){
            return {
                sidebarLinks: [
                    {
                        title: 'Overview',
                        icon: 'briefcase-fill',
                        to: {name: 'patients'},
                    },
                    {
                        title: 'Diagnosis',
                        icon: 'display-fill',

                        to: {
                            name: 'diagnosis',
                            params: {document_id: '00ca6980-ec64-424f-b7a7-deb863ec738e', id: '57962105-27e7-421a-9007-54f738f1d347'}
                        }
                    },
                    {
                        title: 'Medications',
                        icon: 'exclamation-octagon',
                        to: {
                            name: 'medications',
                            params: {document_id: '00ca6980-ec64-424f-b7a7-deb863ec738e', id: '57962105-27e7-421a-9007-54f738f1d347'}
                        }
                    },
                    {
                        title: 'Allergies',
                        icon: 'display-fill',
                        to: {
                            icon: 'exclamation-octagon',
                            name: 'advreaction',
                            params: {document_id: '00ca6980-ec64-424f-b7a7-deb863ec738e', id: '57962105-27e7-421a-9007-54f738f1d347'}
                        }
                    }
                ]
            }
        }
    }
</script>

<style >
    .mobile-menu{
        width: 100%;
        background: #4e555b;
        color: white;
        position: fixed;
        bottom: 0;
        flex-direction: row;
        font-size: 14px;
        font-weight: 500;
        justify-content: space-around;

    }
    .mobile-menu-entity{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .mobile-menu-router-link, .mobile-menu-router-link:hover{
        color: white;
        text-decoration: none;
    }
</style>
