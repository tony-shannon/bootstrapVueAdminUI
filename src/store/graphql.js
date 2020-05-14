import {ApolloClient } from "apollo-client";

import {CONFIG} from './config.js';
import {InMemoryCache} from "apollo-cache-inmemory";
import { RestLink } from 'apollo-link-rest';

const client = new ApolloClient({
    link: new RestLink({uri: CONFIG.graphUrl}),
    cache: new InMemoryCache({
      addTypename: false
    }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    }
});

export const GRAPHQL = client;
