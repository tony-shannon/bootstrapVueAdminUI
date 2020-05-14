var express = require('express');
const { exec } = require("child_process");


var app = express();

app.post('/login', function (req, res) {
    var cookieLine = req.param('cookie');

    exec("curl 'https://tony-staging.openappregistry.com/login/' \n" +
        "-H 'Connection: keep-alive' \n" +
        "-H 'Cache-Control: max-age=0' \n" +
        "-H 'Upgrade-Insecure-Requests: 1' \n" +
        "-H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \n" +
        "-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9' \n" +
        "-H 'Sec-Fetch-Site: same-origin' \n" +
        "-H 'Sec-Fetch-Mode: navigate' \n" +
        "-H 'Sec-Fetch-User: ?1' \n" +
        "-H 'Sec-Fetch-Dest: document' \n" +
        "-H 'Referer: https://tony-staging.openappregistry.com/insight/' \n" +
        "-H 'Accept-Language: en-US,en;q=0.9' \n" +
        "-H '"+cookieLine+"' \\\n" +
        "--compressed", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.send(`${stderr}`);
            return;
        }
        if (stderr) {

            console.log(`stderr: ${stderr}`);
            res.send(`${stderr}`);

            return;
        }
        res.send(`${stdout}`);
    });
});

app.post('/patients', function (req, res) {

    var cookieLine = req.param('cookie');

    console.log(exec("curl 'https://tony-staging.openappregistry.com/api/insight/demo1-centre/graphql/' \\\n" +
        "  -H 'Connection: keep-alive' \\\n" +
        "  -H 'Accept: application/json, text/plain, */*' \\\n" +
        "  -H 'X-CSRFTOKEN: PEArUIMpvpiukyRPgQjFlJDCPG4KSLTY4P10HNRzotCKq1og1mozl6vrzh99D91p' \\\n" +
        "  -H 'X-Requested-With: XMLHttpRequest' \\\n" +
        "  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' \\\n" +
        "  -H 'Content-Type: application/json;charset=UTF-8' \\\n" +
        "  -H 'Origin: https://tony-staging.openappregistry.com' \\\n" +
        "  -H 'Sec-Fetch-Site: same-origin' \\\n" +
        "  -H 'Sec-Fetch-Mode: cors' \\\n" +
        "  -H 'Sec-Fetch-Dest: empty' \\\n" +
        "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' \\\n" +
        "  -H 'Accept-Language: en-US,en;q=0.9' \\\n" +
        "  -H '"+cookieLine+"' \\\n" +
        "  --data-binary '{\"query\":\"\\n                    query q($study_id: UUID) {\\n                        all_enrolments(study_id: $study_id) {\\n                            created_date patient_id record\\n                                { first_name family_name date_of_birth gender id }\\n                        }\\n                    }\",\"variables\":{\"study_id\":\"67385377-9514-4104-b6c3-27d20a79132b\"}}' \\\n" +
        "  --compressed",(error, stdout, stderr) => {
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
    ));
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
