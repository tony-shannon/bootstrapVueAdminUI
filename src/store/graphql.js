import ApolloClient from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {CONFIG} from './config.js';
import {InMemoryCache} from "apollo-cache-inmemory";


const client = new ApolloClient({
    link: createHttpLink({uri: CONFIG.graphUrl}),
    cache: new InMemoryCache()
});

export const GRAPHQL = client;
