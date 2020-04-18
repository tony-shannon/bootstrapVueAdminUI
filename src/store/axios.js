import axios from 'axios';

//let URL2Go = 'http://localhost:3000/' // use in localenv
// get URL2Go from gp url 3000 in gitpod
let URL2Go= 'https://3000-ade12ef9-f9f8-46d9-adbf-9503cba33f23.ws-eu01.gitpod.io/';

export const HTTP = axios.create({
    baseURL: URL2Go,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }
});