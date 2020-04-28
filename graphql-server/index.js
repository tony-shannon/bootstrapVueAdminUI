const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType, Kind } = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const {MedicationMutation, MedicationQuery} = require('./dataSchema/Medication');
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
    updateMedication(data: Data): Medication
  }
`;


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    ...MedicationQuery
  },
  Mutation: {
    ...MedicationMutation
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
