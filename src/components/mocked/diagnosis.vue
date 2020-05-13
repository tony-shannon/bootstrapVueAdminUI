<template>
    <b-row>
        <b-col cols="12" sm="12">
            <h3>Data Collection</h3>
            <b-table
                    :items="diagnosis"
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
    import {map, result} from 'lodash';
    import {DIAGNOSIS} from "../../mocking/diagnosis";

    export default {
        name: "diagnosis",

        data(){
            let res = result(DIAGNOSIS, 'content.c0001');


            res = map(res, e => ({
                    id: e.id,
                    description: e.clin_descrip,
                    problem_name: e.problem_diagnosis_name.term,
                    severity: e.severity.rubric
                }));

            console.log(res);

            return {
                diagnosis: res,
                filterOn: [],
                fields: [
                    {
                        key: 'problem_name',
                        sortable: true,
                        label: "Problem Diagnosis Name"
                    },
                    {
                        key: 'description',
                        label: 'Clinical Description',
                    },
                    {
                        key: 'severity',
                        label: 'Severity'
                    },

                ]
            }
        }
    }
</script>

<style scoped>

</style>
