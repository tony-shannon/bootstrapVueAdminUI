var express = require('express');
const { exec } = require("child_process");
var bodyParser = require('body-parser');



var app = express();
// configure the app to use bodyParser()
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
    var cookieLine = req.param('cookie');

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
app.post('/documents', function (req, res) {
    res.send('POST request to the homepage');
});

app.get('/', function (req, res) {
    res.send('If you see it then proxy is up');
});

app.listen(5000, function () {
    console.log('Express Proxy listening on port 5000!');
});
