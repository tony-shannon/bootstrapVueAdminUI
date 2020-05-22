var express = require('express');
const { exec } = require("child_process");
var bodyParser = require('body-parser');
var cors = require('cors');
const {curlQueryBuilder} = require('./lib/curlQueryBuilder');

var app = express();
// configure the app to use bodyParser()

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.post('/login', function (req, res) {
    var cookieLine = req.param('cookie');


    exec("curl 'https://tony-staging.openappregistry.com/api/signon/' \\\n" +
        "  -H 'Connection: keep-alive' \\\n" +
        "  -H 'Accept: application/json, text/plain, */*' \\\n" +
        "  -H 'X-CSRFTOKEN: zzkwUalEiJVYu31KmbwlRl8DutvpYGoTbC0E0I6R59E7KWZ6iEHsNS5ivgWaobxC' \\\n" +
        "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
        "  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
        "  -H 'Content-Type: application/json;charset=UTF-8' \\\n" +
        "  -H 'Origin: https://tony-staging.openappregistry.com' \\\n" +
        "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
        "  -H 'Sec-Fetch-Mode: cors' \\\n" +
        "  -H 'Sec-Fetch-Dest: empty' \\\n" +
        "  -H 'Referer: https://tony-staging.openappregistry.com/login/' \\\n" +
        "  -H 'Accept-Language: en-US,en;q=0.9' \\\n" +
        "  -H 'Cookie: pk_ses.1.dedb=*; csrftoken=2b31tGWUnBJenkM9zuIlYktK8eIDV2t0EeJ9zeH7a1snDdKvvXTsURqp919olxCJ; sessionid_saas=kbsx2ilalse8v4ubie94dq0ltjiwvejs; pk_id.1.dedb=549b827e438334cc.1588926653.11.1589465971.1589464049.' \\\n" +
        "  --data-binary $'{\"operationName\":\"SignIn\",\"query\":\"mutation SignIn {sign_in(username: \\\\\"tony\\\\\", password: \\\\\"Ireland1\u0021\u0021\u0021\\\\\", csrftoken: \\\\\"zzkwUalEiJVYu31KmbwlRl8DutvpYGoTbC0E0I6R59E7KWZ6iEHsNS5ivgWaobxC\\\\\"){ ok auth_ok message require_password_change require_otp require_bat } }\"}' \\\n" +
        "  --compressed"

        , (error, stdout, stderr) => {

        if (error) {
            console.log(`error: ${error.message}`);
            res.send(`${stderr}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        res.send(`${stdout}`);
    });
});

app.post('/patients', function (req, res) {


    var xcrtoken =  req.param('csfttoken');
    var cookieLine = req.param('cookieRequest');

    let curlcommand = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/graphql/' \\\n" +
        "  -H 'Connection: keep-alive' \\\n" +
        "  -H 'Accept: application/json, text/plain, */*' \\\n" +
        "  -H 'X-CSRFTOKEN: "+xcrtoken+"' \\\n" +
        "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
        "  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
        "  -H 'Content-Type: application/json;charset=UTF-8' \\\n" +
        "  -H 'Origin: https://tony-staging.openappregistry.com' \\\n" +
        "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
        "  -H 'Sec-Fetch-Mode: cors' \\\n" +
        "  -H 'Sec-Fetch-Dest: empty' \\\n" +
        "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
        "  -H 'Accept-Language: en-US,en;q=0.9' \\\n" +
        "  -H 'Cookie: "+cookieLine+"' \\\n" +
        "  --data-binary '{\"query\":\"\\n                    query q($study_id: UUID) {\\n                        all_enrolments(study_id: $study_id) {\\n                            created_date patient_id record\\n                                { first_name family_name date_of_birth gender id }\\n                        }\\n                    }\",\"variables\":{\"study_id\":\"67385377-9514-4104-b6c3-27d20a79132b\"}}' \\\n" +
        "  --compressed";
    console.log(curlcommand);
    exec(curlcommand
        ,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.send(`${stderr}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            res.send(`${stdout}`);
        }
    );

});

app.get('/diagnosis/list', function (req, res) {
    res.send(require('./constants/probs-json1'));
});

app.get('/severity/list', function (req, res) {
    res.send(require('./constants/severity'));
});

app.post('/diagnosis', function (req, res) {

    var xcrtoken =  req.param('csfttoken');
    var cookieLine = req.param('cookieRequest');

    let curlcommand = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/00ca6980-ec64-424f-b7a7-deb863ec738e/' \\\n" +
        "  -H 'Connection: keep-alive' \\\n" +
        "  -H 'Accept: application/json, text/plain, */*' \\\n" +
        "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
        "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
        "  -H 'X-CSRFTOKEN: "+xcrtoken+"' \\\n" +
        "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
        "  -H 'Sec-Fetch-Mode: cors' \\\n" +
        "  -H 'Sec-Fetch-Dest: empty' \\\n" +
        "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
        "  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \\\n" +
        "  -H 'Cookie: "+cookieLine+"' \\\n" +
        "  --compressed";
    console.log(curlcommand);
    exec(curlcommand
        ,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.send(`${stderr}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            res.send(`${stdout}`);
        }
    );
});

app.post('/diagnosis/store', function(req,res){
    var xcrtoken =  req.param('csfttoken');
    var cookieLine = req.param('cookieRequest');
    var dataToSave = req.param('dataToSave');

    let curlcommand = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/00ca6980-ec64-424f-b7a7-deb863ec738e/lock_acquire/' \\\n" +
        "  -H 'Connection: keep-alive' \\\n" +
        "  -H 'Accept: application/json, text/plain, */*' \\\n" +
        "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
        "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
        "  -H 'X-CSRFTOKEN: "+xcrtoken+"' \\\n" +
        "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
        "  -H 'Sec-Fetch-Mode: cors' \\\n" +
        "  -H 'Sec-Fetch-Dest: empty' \\\n" +
        "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
        "  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \\\n" +
        "  -H 'Cookie: "+cookieLine+"' \\\n" +
        "  --compressed";

    console.log(curlcommand);
    exec(curlcommand
        ,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.send(`${stderr}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }

            let curlcommand2 = dataToSave;
            curlcommand2 = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/00ca6980-ec64-424f-b7a7-deb863ec738e/' \\\n" +
                "  -X 'PUT' \\\n" +
                "  -H 'Connection: keep-alive' \\\n" +
                "  -H 'Accept: application/json, text/plain, */*' \\\n" +
                "  -H 'X-CSRFTOKEN: J5RwNBMFOocPVZwz8sZVXrLN8SsAjdsT4HfQPTqi34ZjTcV6xClI9QGdsrbf3SDP' \\\n" +
                "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
                "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
                "  -H 'Content-Type: application/json;charset=UTF-8' \\\n" +
                "  -H 'Origin: https://tony-staging.openappregistry.com' \\\n" +
                "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
                "  -H 'Sec-Fetch-Mode: cors' \\\n" +
                "  -H 'Sec-Fetch-Dest: empty' \\\n" +
                "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
                "  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \\\n" +
                "  -H 'Cookie: sessionid_saas=s0q0q9sm3xftnw3alcho7j05mkn1kisd; csrftoken=zL91LAd6dYW5lt5fbPpjNyYeylZOOxEQUnxlNSRJsEJzjGuMAZL6ZXTESUItycPM; _pk_ses.1.dedb=*; _pk_id.1.dedb=2c119dd535756fd3.1589450290.13.1590096592.1590095515.' \\\n" +
                "  --data-binary '{\"id\":\"00ca6980-ec64-424f-b7a7-deb863ec738e\",\"content\":{\"c0001\":"+dataToSave+"},\"age_hours\":246.39481672500003,\"age_days\":10,\"created_by_name\":\"Tony Shannon\",\"updated_by_name\":\"Tony Shannon\",\"edcevent_id\":\"d2eb6bf7-b3e7-4f28-86b3-e9138a17e8eb\",\"edcevent_type\":\"d6cde447-9726-4130-8b91-33f0538a2212\",\"data_verified\":false,\"data_verified_date\":null,\"data_verification\":null,\"data_verification_pct\":null,\"pathway\":\"1e1ce6f0-3504-43e7-8f4f-0374801323a9\",\"label\":\"Diagnosis_form4\",\"frozen\":false,\"locked\":false,\"sdv_enabled\":false,\"created_date\":\"2020-05-11T16:06:11.791269+01:00\",\"updated_date\":\"2020-05-21T17:58:21.852547+01:00\",\"event_date\":\"2020-05-11T12:00:00+01:00\",\"state\":1,\"etl_state\":0,\"external_id\":null,\"deleted\":false,\"track_changes\":false,\"rag\":\"G\",\"section_rag\":{\"Main\":\"G\"},\"concept_rag\":{\"c0001\":[\"G\",\"G\",\"G\",\"G\"]},\"variations\":\"\",\"ui_state\":{},\"record\":\"57962105-27e7-421a-9007-54f738f1d347\",\"template\":\"40ce24b6-1c28-44f3-bd1a-bd9a759a7d33\",\"created_by\":745543738,\"updated_by\":745543738,\"owned_by\":946648253,\"study\":\"67385377-9514-4104-b6c3-27d20a79132b\",\"wf_state\":\"Open\",\"transitions\":[[\"Frozen\",\"Freeze\",null]],\"actions\":[\"Edit\",\"View\"],\"changelog\":[{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.22640472142921975,\"reason\":null,\"comment\":null},{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.35903937208892867,\"reason\":null,\"comment\":null},{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.7190646948493462,\"reason\":null,\"comment\":null},{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.36703750021885373,\"reason\":null,\"comment\":null}]}' \\\n" +
                "  --compressed"
            exec(curlcommand2
                ,(error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        res.send(`${stderr}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                    }
                    res.send(`${stdout}`);
                }
            );
        }
    );
});


app.post('/adverse', function (req, res) {

    var xcrtoken =  req.param('csfttoken');
    var cookieLine = req.param('cookieRequest');

    let curlcommand = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/35623fcc-0449-4e6a-9e30-02680f43ca83/' \\\n" +
        "  -H 'Connection: keep-alive' \\\n" +
        "  -H 'Accept: application/json, text/plain, */*' \\\n" +
        "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
        "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
        "  -H 'X-CSRFTOKEN: "+xcrtoken+"' \\\n" +
        "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
        "  -H 'Sec-Fetch-Mode: cors' \\\n" +
        "  -H 'Sec-Fetch-Dest: empty' \\\n" +
        "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
        "  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \\\n" +
        "  -H 'Cookie: "+cookieLine+"' \\\n" +
        "  --compressed";
    console.log(curlcommand);
    exec(curlcommand
        ,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.send(`${stderr}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            res.send(`${stdout}`);
        }
    );
});

app.post('/adverse_reactions', function (req, res) {

    var xcrtoken =  req.param('csfttoken');
    var cookieLine = req.param('cookieRequest');

    let curlcommand = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/35623fcc-0449-4e6a-9e30-02680f43ca83/' \\\n" +
        "  -H 'Connection: keep-alive' \\\n" +
        "  -H 'Accept: application/json, text/plain, */*' \\\n" +
        "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
        "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
        "  -H 'X-CSRFTOKEN: "+xcrtoken+"' \\\n" +
        "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
        "  -H 'Sec-Fetch-Mode: cors' \\\n" +
        "  -H 'Sec-Fetch-Dest: empty' \\\n" +
        "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
        "  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \\\n" +
        "  -H 'Cookie: "+cookieLine+"' \\\n" +
        "  --compressed";
    console.log(curlcommand);
    exec(curlcommand
        ,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.send(`${stderr}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            res.send(`${stdout}`);
        }
    );
});

app.get('/adverse_reactions/list', function (req, res) {
    res.send(require('./constants/adv_reactions'));
});

app.post('/adverse_reactions/store', function(req,res){
    var xcrtoken =  req.param('csfttoken');
    var cookieLine = req.param('cookieRequest');
    var dataToSave = req.param('dataToSave');

    let curlcommand = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/35623fcc-0449-4e6a-9e30-02680f43ca83/lock_acquire/' \\\n" +
        "  -H 'Connection: keep-alive' \\\n" +
        "  -H 'Accept: application/json, text/plain, */*' \\\n" +
        "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
        "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
        "  -H 'X-CSRFTOKEN: "+xcrtoken+"' \\\n" +
        "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
        "  -H 'Sec-Fetch-Mode: cors' \\\n" +
        "  -H 'Sec-Fetch-Dest: empty' \\\n" +
        "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
        "  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \\\n" +
        "  -H 'Cookie: "+cookieLine+"' \\\n" +
        "  --compressed";

    console.log(curlcommand);
    exec(curlcommand
        ,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.send(`${stderr}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }

            let curlcommand2 = dataToSave;
            curlcommand2 = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/35623fcc-0449-4e6a-9e30-02680f43ca83/' \\\n" +
                "  -X 'PUT' \\\n" +
                "  -H 'Connection: keep-alive' \\\n" +
                "  -H 'Accept: application/json, text/plain, */*' \\\n" +
                "  -H 'X-CSRFTOKEN: "+xcrtoken+"' \\\n" +
                "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
                "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
                "  -H 'Content-Type: application/json;charset=UTF-8' \\\n" +
                "  -H 'Origin: https://tony-staging.openappregistry.com' \\\n" +
                "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
                "  -H 'Sec-Fetch-Mode: cors' \\\n" +
                "  -H 'Sec-Fetch-Dest: empty' \\\n" +
                "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
                "  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \\\n" +
                "  -H 'Cookie: "+cookieLine+"' \\\n" +
                "  --data-binary '{\"id\":\"35623fcc-0449-4e6a-9e30-02680f43ca83\",\"content\":{\"c0001\":"+dataToSave+"},\"age_hours\":93.92286478833333,\"age_days\":4,\"created_by_name\":\"Tony Shannon\",\"updated_by_name\":\"Tony Shannon\",\"edcevent_id\":\"4b9a2afb-bd94-499f-b894-9a7f56228ce3\",\"edcevent_type\":\"cd5addf6-c927-441f-8803-7e08914ad7e9\",\"data_verified\":false,\"data_verified_date\":null,\"data_verification\":null,\"data_verification_pct\":null,\"pathway\":\"1e1ce6f0-3504-43e7-8f4f-0374801323a9\",\"label\":\"Adverse_Events_v3\",\"frozen\":false,\"locked\":false,\"sdv_enabled\":false,\"created_date\":\"2020-05-18T12:45:27.371384+01:00\",\"updated_date\":\"2020-05-18T12:47:31.779771+01:00\",\"event_date\":\"2020-05-18T12:00:00+01:00\",\"state\":1,\"etl_state\":0,\"external_id\":null,\"deleted\":false,\"track_changes\":false,\"rag\":\"G\",\"section_rag\":{\"AdverseReactions_v3\":\"G\"},\"concept_rag\":{\"c0001\":[\"G\",\"G\"]},\"variations\":\"\",\"ui_state\":{},\"record\":\"57962105-27e7-421a-9007-54f738f1d347\",\"template\":\"ec16c7c2-da6a-4ad5-ace2-4d1ed2c67d06\",\"created_by\":745543738,\"updated_by\":745543738,\"owned_by\":946648253,\"study\":\"67385377-9514-4104-b6c3-27d20a79132b\",\"wf_state\":\"Open\",\"transitions\":[[\"Frozen\",\"Freeze\",null]],\"actions\":[\"Edit\",\"View\"],\"changelog\":[{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.3042427042007221,\"reason\":null,\"comment\":null},{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.26163898737798386,\"reason\":null,\"comment\":null}]}' \\\n" +
                "  --compressed"
            exec(curlcommand2
                ,(error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        res.send(`${stderr}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                    }
                    res.send(`${stdout}`);
                }
            );
        }
    );
});


app.post('/medication', function (req, res) {

    var xcrtoken =  req.param('csfttoken');
    var cookieLine = req.param('cookieRequest');

    let curlcommand = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/8a1f009d-1dda-4e5d-810a-7d61e8bad221/' \
  -H 'Connection: keep-alive' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \
  -H 'X-CSRFTOKEN: "+xcrtoken+"' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \
  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'Cookie: "+cookieLine+"' \
  --compressed";
    console.log(curlcommand);
    exec(curlcommand
        ,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.send(`${stderr}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            res.send(`${stdout}`);
        }
    );
});

app.get('/medication/list', function (req, res) {
    res.send(require('./constants/meds_json1'));
});

app.post('/medication/store', function(req,res){
    var xcrtoken =  req.param('csfttoken');
    var cookieLine = req.param('cookieRequest');
    var dataToSave = req.param('dataToSave');

    let curlcommand = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/35623fcc-0449-4e6a-9e30-02680f43ca83/lock_acquire/' \\\n" +
        "  -H 'Connection: keep-alive' \\\n" +
        "  -H 'Accept: application/json, text/plain, */*' \\\n" +
        "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
        "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
        "  -H 'X-CSRFTOKEN: "+xcrtoken+"' \\\n" +
        "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
        "  -H 'Sec-Fetch-Mode: cors' \\\n" +
        "  -H 'Sec-Fetch-Dest: empty' \\\n" +
        "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
        "  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \\\n" +
        "  -H 'Cookie: "+cookieLine+"' \\\n" +
        "  --compressed";

    console.log(curlcommand);
    exec(curlcommand
        ,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.send(`${stderr}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }

            let curlcommand2 = dataToSave;
            curlcommand2 = "curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/record/57962105-27e7-421a-9007-54f738f1d347/documentv2/8a1f009d-1dda-4e5d-810a-7d61e8bad221/' \\\n" +
                "  -X 'PUT' \\\n" +
                "  -H 'Connection: keep-alive' \\\n" +
                "  -H 'Accept: application/json, text/plain, */*' \\\n" +
                "  -H 'X-CSRFTOKEN: "+xcrtoken+"' \\\n" +
                "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
                "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
                "  -H 'Content-Type: application/json;charset=UTF-8' \\\n" +
                "  -H 'Origin: https://tony-staging.openappregistry.com' \\\n" +
                "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
                "  -H 'Sec-Fetch-Mode: cors' \\\n" +
                "  -H 'Sec-Fetch-Dest: empty' \\\n" +
                "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
                "  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' \\\n" +
                "  -H 'Cookie: "+cookieLine+"' \\\n" +
                "  --data-binary '{\"id\":\"8a1f009d-1dda-4e5d-810a-7d61e8bad221\",\"content\":{\"c0001\":"+dataToSave+"},\"age_hours\":95.68728469916667,\"age_days\":4,\"created_by_name\":\"Tony Shannon\",\"updated_by_name\":\"Tony Shannon\",\"edcevent_id\":\"721c0531-afdd-4cd5-92f6-6cd2682533b9\",\"edcevent_type\":\"0be82e9a-29e0-4c21-81b1-2494b27ffa3b\",\"data_verified\":false,\"data_verified_date\":null,\"data_verification\":null,\"data_verification_pct\":null,\"pathway\":\"1e1ce6f0-3504-43e7-8f4f-0374801323a9\",\"label\":\"Medication Model for Data InOut v3\",\"frozen\":false,\"locked\":false,\"sdv_enabled\":false,\"created_date\":\"2020-05-18T11:30:47.595243+01:00\",\"updated_date\":\"2020-05-18T11:43:52.415703+01:00\",\"event_date\":\"2020-05-18T12:00:00+01:00\",\"state\":1,\"etl_state\":0,\"external_id\":null,\"deleted\":false,\"track_changes\":false,\"rag\":\"G\",\"section_rag\":{\"Medications\":\"G\"},\"concept_rag\":{\"c0001\":[\"G\",\"G\"]},\"variations\":\"\",\"ui_state\":{},\"record\":\"57962105-27e7-421a-9007-54f738f1d347\",\"template\":\"6c73b127-f5b1-4828-a10f-e34ba0c2bbbc\",\"created_by\":745543738,\"updated_by\":745543738,\"owned_by\":946648253,\"study\":\"67385377-9514-4104-b6c3-27d20a79132b\",\"wf_state\":\"Open\",\"transitions\":[[\"Frozen\",\"Freeze\",null]],\"actions\":[\"Edit\",\"View\"],\"changelog\":[{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.4160324907072146,\"reason\":null,\"comment\":null},{\"path\":\"c0001\",\"id\":null,\"fake_id\":0.6095114718762997,\"reason\":null,\"comment\":null}]}' \\\n" +
                "  --compressed"
            exec(curlcommand2
                ,(error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        res.send(`${stderr}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                    }
                    res.send(`${stdout}`);
                }
            );
        }
    );
});




app.get('/', function (req, res) {
    res.send('If you see it then proxy is up');
});

app.listen(5000, function () {
    console.log('Express Proxy listening on port 5000!');
});
