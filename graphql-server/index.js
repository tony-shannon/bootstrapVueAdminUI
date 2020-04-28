
const { ApolloServer, gql } = require('apollo-server');
const {GraphQLJSONObject} = require('graphql-type-json');
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
  
  type Adverse_Event {
  
    id: ID!
    idN: Int!
    CodeD: String!
    Description: String!
    Type: String!
    Name: String!
    Days: String
   
  }
  type Problem {
  
     id: ID!
     idN: Int!
     CodeD: String!
     Name: String!
     Description: String!
     Days: String
  
  }
  
  type Query {
    medications: [Medication]
    adverse_Events: [Adverse_Event]
    problems: [Problem]
  }
  
  type Mutation {
    createMedication(data: Data): Medication
    deleteMedication(where: Data): Medication
    updateMedication(where: Data, data: Data): Medication
    
    createAdverse_Event(data: Data): Adverse_Event
    deleteAdverse_Event(where: Data): Adverse_Event
    updateAdverse_Event(where: Data, data: Data): Adverse_Event
    
    createProblem(data: Data): Problem
    deleteProblem(where: Data): Problem
    updateProblem(where: Data, data: Data): Problem
  }
`;


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
      medications: async (_) => {
          const result = await client.manyOrNone('SELECT * FROM "Medication"');
          return result.length? result : [];
      },
      adverse_Events: async (_) => {
          const result = await client.manyOrNone('SELECT * FROM "Adverse_Event"');
          return result.length ? result : [];
      },

      problems: async (_) => {
          const result = await client.manyOrNone('SELECT * FROM "Problem"');
          return result.length ? result : [];
      },
  },
  Mutation: {
     createMedication(data, payload) {
      var prepareStatement = pgp.helpers.insert(payload.data,null,"Medication") + " RETURNING *";
      return client.one(prepareStatement).then((res) => res);

    },
    deleteMedication: async (_, {where}) => {
         var prepareStatement = pgp.as.format('DELETE FROM "Medication" WHERE id=${id} RETURNING *',where);
         const result = await client.one(prepareStatement);
         return result;
    },
    updateMedication:  async (_, {where,data})=> {

        const condition = pgp.as.format(' WHERE id = ${id}', where);
        var prepareStatement = pgp.helpers.update(data,null,"Medication") + condition + " RETURNING *";
        const result = await client.one(prepareStatement);
        return result;
     },

      createAdverse_Event(data, payload) {
          var prepareStatement = pgp.helpers.insert(payload.data,null,"Adverse_Event") + " RETURNING *";
          return client.one(prepareStatement).then((res) => res);

      },
      deleteAdverse_Event: async (_, {where}) => {
          var prepareStatement = pgp.as.format('DELETE FROM "Adverse_Event" WHERE id=${id} RETURNING *',where);
          const result = await client.one(prepareStatement);
          return result;
      },
      
      updateAdverse_Event:  async (_, {where,data})=> {

          const condition = pgp.as.format(' WHERE id = ${id}', where);
          var prepareStatement = pgp.helpers.update(data,null,"Adverse_Event") + condition + " RETURNING *";
          const result = await client.one(prepareStatement);
          return result;
      },

      createProblem(data, payload) {
          var prepareStatement = pgp.helpers.insert(payload.data,null,"Problem") + " RETURNING *";
          return client.one(prepareStatement).then((res) => res);

      },
      deleteProblem: async (_, {where}) => {
          var prepareStatement = pgp.as.format('DELETE FROM "Problem" WHERE id=${id} RETURNING *',where);
          const result = await client.one(prepareStatement);
          return result;
      },
      updateProblem:  async (_, {where,data})=> {

          const condition = pgp.as.format(' WHERE id = ${id}', where);
          var prepareStatement = pgp.helpers.update(data,null,"Problem") + condition + " RETURNING *";
          const result = await client.one(prepareStatement);
          return result;
      },
  },
  Data: GraphQLJSONObject,
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
