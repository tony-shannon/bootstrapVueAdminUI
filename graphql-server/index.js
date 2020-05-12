
const { ApolloServer, AuthenticationError} = require('apollo-server');
const pgp = require("pg-promise")();
const {sign, verify} = require('jsonwebtoken');

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
            jwt: {
                sign: sign,
                verify: verify,
            }
        }),
        context: ({ req }) => {

            const token = req.headers.authorization || '';
            let user = null;
            if(token.length){
                verify(token, 'secret',(err, decoded)=>{
                    if(err){
                        throw new AuthenticationError('you must be logged in');
                    }else{
                        user = decoded;
                    }
                })
            }

            return {
                user: user,
                db : {
                    lib: pgp,
                    helpers: pgp.helpers,
                    client: dbClient,
                },
            };
        },

    });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
