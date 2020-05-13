const obj = [{
    "id": "1e1ce6f0-3504-43e7-8f4f-0374801323a9",
    "label": "default",
    "start_date": "2020-02-04",
    "summary": [],
    "schedule": [{
        "id": "ba6b71f9-1225-42d7-8441-1ac566fa9417",
        "label": "Diagnoses - add and view",
        "scheduled_event_date": null,
        "scheduled_event_mindate": null,
        "scheduled_event_maxdate": null,
        "event": "b638c046-8eae-4943-8146-8ee549e161c6",
        "event_date": "2020-05-11",
        "event_type": "83bddb43-0895-46f4-99e0-04d9047e76be",
        "document_id": "230dd0dd-8754-4d10-952b-323a7649301b",
        "rag": "G",
        "wf_state": "Open",
        "section_rag": {"Diagnosis_V2": "G"},
        "created_by": "user=1 in epr=197223984",
        "created_date": "2020-05-11T13:29:23.547635+01:00",
        "updated_by": "user=1 in epr=197223984",
        "updated_date": null,
        "data_verified": false,
        "data_verified_by": null,
        "data_verified_date": null,
        "data_verification_pct": null,
        "deleted": false
    }, {
        "id": "881be48e-41a6-40cd-af8a-1e2aa0a88c81",
        "label": "minEHR_EDC event_v1",
        "scheduled_event_date": null,
        "scheduled_event_mindate": null,
        "scheduled_event_maxdate": null,
        "event": "2e5cb346-dd1d-4da6-b76a-792b26f930f0",
        "event_date": "2020-03-06",
        "event_type": "74939be9-11a8-4a05-aa07-07642483e14b",
        "document_id": "962c5f15-4df5-4a47-9f63-6b2db2da758b",
        "rag": "G",
        "wf_state": "Open",
        "section_rag": {
            "Problem": null,
            "Referral": "G",
            "Procedure": "G",
            "Medication": "G",
            "Lab Requests": "G",
            "Observations": "G"
        },
        "created_by": "user=1 in epr=197223984",
        "created_date": "2020-03-06T10:20:47.818123Z",
        "updated_by": "user=1 in epr=197223984",
        "updated_date": null,
        "data_verified": false,
        "data_verified_by": null,
        "data_verified_date": null,
        "data_verification_pct": null,
        "deleted": false
    }, {
        "id": "1e28d4e7-05ad-4ca7-8ea3-80011194dbd6",
        "label": "Enrolment for demo1",
        "scheduled_event_date": null,
        "scheduled_event_mindate": null,
        "scheduled_event_maxdate": null,
        "event": "3ab6ea19-fe11-4220-8f4a-7709f3abecf3",
        "event_date": "2020-02-04",
        "event_type": "c21e6143-cec5-4d0f-9b0c-064b962ea3ef",
        "document_id": "08a8d157-0da1-43ea-a250-71b7f8bcd2e1",
        "rag": "G",
        "wf_state": "Open",
        "section_rag": {"Consent": "G", "Demographics": "G"},
        "created_by": "user=1 in epr=197223984",
        "created_date": "2020-03-03T15:10:39.682200Z",
        "updated_by": "user=2 in epr=197223984",
        "updated_date": "2020-03-04T18:02:08.725389Z",
        "data_verified": false,
        "data_verified_by": null,
        "data_verified_date": null,
        "data_verification_pct": null,
        "deleted": false
    }, {
        "id": "c597c9c8-4a4c-4788-b897-eb907a3a6e23",
        "label": "Baseline",
        "scheduled_event_date": "2020-02-04",
        "scheduled_event_mindate": "2020-02-04",
        "scheduled_event_maxdate": "2021-02-03",
        "event": null,
        "event_date": null,
        "event_type": "0c63e3a6-a1f9-436c-b9a4-63a1901618aa",
        "document_id": null,
        "rag": null,
        "wf_state": null,
        "section_rag": null,
        "created_by": null,
        "created_date": null,
        "updated_by": null,
        "updated_date": null,
        "data_verified": null,
        "data_verified_by": null,
        "data_verified_date": null,
        "deleted": false
    }],
    "adhoc_events": [{
        "label": "Encounter",
        "schedule": "Ad-hoc",
        "eventtype": "49f03b33-896d-4fe9-be83-32921915ccbb"
    }, {
        "label": "End of data collection",
        "schedule": "Ad-hoc",
        "eventtype": "10c99901-5ba8-472f-81c0-4d9af60043a3"
    }, {
        "label": "Test User Form",
        "schedule": "Ad-hoc",
        "eventtype": "13b8d8d2-076d-453e-9a61-2f0792b2ff3b"
    }, {"label": "Mini EHR form v1", "schedule": "Ad-hoc", "eventtype": "74939be9-11a8-4a05-aa07-07642483e14b"}],
    "signed": false,
    "signed_date": null,
    "signed_by_name": null,
    "can_sign": false
}]

export const DOCUMENTS = obj;
