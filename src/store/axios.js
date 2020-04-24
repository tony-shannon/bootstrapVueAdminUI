import axios from 'axios';
import {CONFIG} from './config.js';

export const HTTP = axios.create({
    baseURL: CONFIG.URL2Go,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }
});