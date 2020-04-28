
const { ApolloServer, gql } = require('apollo-server');
const GraphQLJSON = require('graphql-type-json');
const pgp = require("pg-promise")();


require('dotenv').config();

let client =  pgp(process.env.PG_SQLINIT);
//client.connect();
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar Data
  
  type Medication {
   id: ID!
   idN: Int!
   DoseMg: Int
   Indication: String!
   Name: String!
   Route: String!
  }
  
  type Query {
    medications: [Medication]
  }
  
  type Mutation {
    createMedication(data: Data): Medication
    deleteMedication(where: Data): Medication
    updateMedication(where: Data, data: Data): Medication
  }
`;


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    medications : () => {
      return client.many('SELECT * FROM "Medication"').then((res)=> res);
    },
  },
  Mutation: {
     createMedication(data, payload) {
      var prepareStatement = pgp.helpers.insert(payload.data,null,"Medication") + " RETURNING *";
      return client.one(prepareStatement).then((res) => res);

    },
    deleteMedication(data, payload) {
         var prepareStatement = pgp.as.format('DELETE FROM "Medication" WHERE id=${id} RETURNING *',payload.where);
         return client.one(prepareStatement).then((res)=> res);
    },
    updateMedication(data, payload) {

        const condition = pgp.as.format(' WHERE id = ${id}', payload.where.id);
        var prepareStatement = pgp.helpers.update(payload.data,null,"Medication") + condition + " RETURNING *";
        return client.one(prepareStatement).then((res) => res);
     }
  },
  Data: GraphQLJSON,
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
