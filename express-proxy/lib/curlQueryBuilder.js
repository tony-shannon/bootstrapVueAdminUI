const curlQueryBuilder = function({host, cookie, crfs, dataBinary}){

 let val =    "curl '"+host+"' " +
    "  -H 'Connection: keep-alive' " +
    "  -H 'Accept: application/json, text/plain, */*' " +
    "  -H 'X-Requested-With: XMLHttpRequest' " +
    "  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36' " +
    "  -H 'X-CSRFTOKEN: "+crfs+"' " +
    "  -H 'Sec-Fetch-Site: same-origin' " +
    "  -H 'Sec-Fetch-Mode: cors' " +
    "  -H 'Sec-Fetch-Dest: empty' " +
    "  -H 'Referer: https://tony-staging.openappregistry.com/insight/demo1-centre/' " +
    "  -H 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' " +
    "  -H 'Cookie: "+cookie+"' " + dataBinary
console.log(val);
return val;
};

module.exports = {
    curlQueryBuilder: curlQueryBuilder
};
