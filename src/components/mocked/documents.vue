<template>
    <b-row>
        <b-col cols="12" sm="12">
            <h3>Data Collection</h3>
            <b-table
                    :items="documents"
                    :fields="fields"
                    responsive="sm"
                    id="medicationsTable"
                    ref="medicationsTable"
            >

            </b-table>
        </b-col>
    </b-row>
</template>

<script>
    import {map, result, filter} from 'lodash';
    import {DOCUMENTS} from "../../mocking/documents";

    export default {
        name: "documents",

        data(){
            let res = result(DOCUMENTS[0], 'schedule');


            res = map(res, e => ({
                    id: e.id,
                    is_document: e.document_id ? true : false,
                    name: e.label,
                    date: e.event_date,
                    rag: e.rag,
                    status: e.wf_state,
                }));

            res = filter(res, {is_document: true})
            console.log(res);

            return {
                documents: res,
                filterOn: [],
                fields: [
                    {
                        key: 'name',
                        sortable: true,
                        label: "Event"
                    },
                    {
                        key: 'status',
                        label: 'Status',
                    },
                    {
                        key: 'date',
                        label: 'Date'
                    },
                    {
                        key: 'rag',
                        label: 'Rag',
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
