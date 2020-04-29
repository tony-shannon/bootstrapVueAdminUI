
const { ApolloServer} = require('apollo-server');
const pgp = require("pg-promise")();
const {resolvers} = require('./resolvers');
const {typeDefs} = require('./typedefs');

require('dotenv').config();

const dbClient =  pgp(process.env.PG_SQLINIT);

const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        dataSources: () => ({
            db : {
                lib: pgp,
                helpers: pgp.helpers,
                client: dbClient,
            },
        })
    }
    );

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
