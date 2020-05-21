const fetch = require('node-fetch');

fetch("https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/00ca6980-ec64-424f-b7a7-deb863ec738e/", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/json;charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrftoken": "9TKnEuESXAEJtxeuZrJbXTjjO9utoGl5xGHNFic4ufeVxOhgaDDYOGQzIPUKVjsn",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "_pk_ses.1.dedb=*; csrftoken=FpWhPSnyuyWIqL4FMVsvCRC8cwTZ3jda3cTHQGVK1dwUu27rX7mitE9o6cjgAWks; sessionid_saas=s0q0q9sm3xftnw3alcho7j05mkn1kisd; _pk_id.1.dedb=2c119dd535756fd3.1589450290.8.1590036948.1590036942."
    },
    "referrer": "https://tony-staging.openappregistry.com/insight/demo1-centre/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "{\"id\":\"00ca6980-ec64-424f-b7a7-deb863ec738e\",\"content\":{\"c0001\":[{\"_id_\":\"f88f2e5c-61b5-44b9-a581-8a2d55d2ebb4\",\"_fake_id\":0.22640472142921975,\"severity\":{\"term\":\"severity/mild\",\"rubric\":\"Mild\"},\"clin_descrip\":\"pain in knee joints\",\"problem_diagnosis_name\":{\"term\":\"problem_diagnosis_names/Arthritis\",\"rubric\":\"Arthritis \"}},{\"_id_\":\"f33354b5-b937-4fed-ae7e-dd5a4e3dd2f9\",\"_fake_id\":0.35903937208892867,\"severity\":{\"term\":\"severity/mod\",\"rubric\":\"Moderate\"},\"clin_descrip\":\"weak hair roots\",\"problem_diagnosis_name\":{\"term\":\"problem_diagnosis_names/alopecia areata\",\"rubric\":\"Alopecia areata\"}},{\"_id_\":\"e9a08fbf-5b4d-45ad-9af2-5b6607a8f45a\",\"_fake_id\":0.7190646948493462,\"severity\":{\"term\":\"severity/severe\",\"rubric\":\"Severe\"},\"clin_descrip\":\"brittle diabetes with very unstable blood sugars\",\"problem_diagnosis_name\":{\"term\":\"problem_diagnosis_names/diabetes\",\"rubric\":\"Diabetes\"}},{\"_id_\":\"78656c9a-598b-4bc1-9a70-b674a4787af1\",\"clin_descrip\":\"asd\",\"problem_diagnosis_name\":{\"rubric\":\"Androgenic Alopecia\",\"term\":\"problem_diagnosis_names/androgenic alopecia\"},\"severity\":{\"rubric\":\"Moderate\",\"term\":\"severity/mod\"},\"_fake_id\":0.36703750021885373}]},\"age_hours\":229.83057259333333,\"age_days\":10,\"created_by_name\":\"Tony Shannon\",\"updated_by_name\":\"Tony Shannon\",\"edcevent_id\":\"d2eb6bf7-b3e7-4f28-86b3-e9138a17e8eb\",\"edcevent_type\":\"d6cde447-9726-4130-8b91-33f0538a2212\",\"data_verified\":false,\"data_verified_date\":null,\"data_verification\":null,\"data_verification_pct\":null,\"pathway\":\"1e1ce6f0-3504-43e7-8f4f-0374801323a9\",\"label\":\"Diagnosis_form4\",\"frozen\":false,\"locked\":false,\"sdv_enabled\":false,\"created_date\":\"2020-05-11T16:06:11.791269+01:00\",\"updated_date\":\"2020-05-14T18:02:24.059580+01:00\",\"event_date\":\"2020-05-11T12:00:00+01:00\",\"state\":1,\"etl_state\":0,\"external_id\":null,\"deleted\":false,\"track_changes\":false,\"rag\":\"G\",\"section_rag\":{\"Main\":\"G\"},\"concept_rag\":{\"c0001\":[\"G\",\"G\",\"G\"]},\"variations\":\"\",\"ui_state\":{},\"record\":\"57962105-27e7-421a-9007-54f738f1d347\",\"template\":\"40ce24b6-1c28-44f3-bd1a-bd9a759a7d33\",\"created_by\":745543738,\"updated_by\":745543738,\"owned_by\":946648253,\"study\":\"67385377-9514-4104-b6c3-27d20a79132b\",\"wf_state\":\"Open\",\"transitions\":[[\"Frozen\",\"Freeze\",null]],\"actions\":[\"Edit\",\"View\"],\"changelog\":[{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.22640472142921975,\"reason\":null,\"comment\":null},{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.35903937208892867,\"reason\":null,\"comment\":null},{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.7190646948493462,\"reason\":null,\"comment\":null},{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.36703750021885373,\"reason\":null,\"comment\":null}]}",
    "method": "PUT",
    "mode": "cors"
}).then((res)=>{
    console.log(res);
}).catch((res)=>{
    console.error(res);
});
