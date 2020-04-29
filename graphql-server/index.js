
const { ApolloServer, gql } = require('apollo-server');
const {GraphQLJSONObject} = require('graphql-type-json');
const pgp = require("pg-promise")();


require('dotenv').config();
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


const unisersalResolver = {
    index: async (_, {tableName}, {dataSources}) => {

        let client = dataSources.db.client;
        const result = await client.manyOrNone('SELECT * FROM "' + tableName + '"');
        return result.length ? result : [];
    },
    update: async (_, {where, data, tableName}, {dataSources}) => {

        let lib = dataSources.db.lib;
        let helpers = dataSources.db.helpers;
        let client = dataSources.db.client;

        const condition = lib.as.format(' WHERE id = ${id}', where);
        var prepareStatement = helpers.update(data, null, tableName) + condition + " RETURNING *";
        const result = await client.one(prepareStatement);
        return result;
    },
    create: async (_, {data, tableName}, {dataSources}) => {

        let helpers = dataSources.db.helpers;
        let client = dataSources.db.client;

        var prepareStatement = helpers.insert(data,null,tableName) + " RETURNING *";
        return client.one(prepareStatement).then((res) => res);

    },
    delete: async (_, {where, tableName},{dataSources}) => {

        let lib = dataSources.db.lib;
        let client = dataSources.db.client;

        var prepareStatement = lib.as.format('DELETE FROM "'+tableName+'" WHERE id=${id} RETURNING *',where);
        const result = await client.one(prepareStatement);
        return result;
    },
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
      medications: async (_, params, {dataSources}) =>
          await unisersalResolver.index(_,
              {
                  tableName: 'Medication'
              }, {
                  dataSources: dataSources
              }
          ),
      adverse_Events: async (_, params, {dataSources}) =>
          await unisersalResolver.index(_,
              {
                  tableName: 'Adverse_Event'
              }, {
                  dataSources: dataSources
              }
          ),

      problems: async (_, params, {dataSources}) =>
          await unisersalResolver.index(_,
              {
                  tableName: 'Problem'
              }, {
                  dataSources: dataSources
              }
          ),
  },
  Mutation: {

      createMedication: async (_, {data}, {dataSources}) => await unisersalResolver.create(_,
          {
              data: data,
              tableName: 'Medication'
          },
          {
              dataSources: dataSources
          }
      ),

    deleteMedication: async (_, {where},{dataSources}) =>
        await unisersalResolver.delete(_,
            {
                where: where,
                tableName: 'Medication'
            },
            {
                dataSources: dataSources
            }
        ),
    updateMedication:  async (_, {where,data},{dataSources}) =>
        await  unisersalResolver.update(_,
            {
                where: where,
                data: data,
                tableName: 'Medication'
            },
            {
                dataSources: dataSources
            }),

      createAdverse_Event: async (_, {data}, {dataSources}) =>
          await unisersalResolver.create(_,
          {
              data: data,
              tableName: 'Medication'
          },
          {
              dataSources: dataSources
          }
      ),

      deleteAdverse_Event: async (_, {where},{dataSources}) =>
          await unisersalResolver.delete(_,
              {
                  where: where,
                  tableName: 'Adverse_Event'
              },
              {
                  dataSources: dataSources
              }
          ),

      updateAdverse_Event: async (_, {where, data}, {dataSources}) =>
          await unisersalResolver.update(_,
              {
                  where: where,
                  data: data,
                  tableName: 'Adverse_Event'
              },
              {
                  dataSources: dataSources
              }),


      createProblem: async (_, {data}, {dataSources}) =>
          await unisersalResolver.create(_,
              {
                  data: data,
                  tableName: 'Problem'
              },
              {
                  dataSources: dataSources
              }
          ),

      deleteProblem: async (_, {where}, {dataSources}) =>
          await unisersalResolver.delete(_,
              {
                  where: where,
                  tableName: 'Problem'
              },
              {
                  dataSources: dataSources
              }
          ),

      updateProblem: async (_, {where, data}, {dataSources}) =>
          await unisersalResolver.update(_,
              {
                  where: where,
                  data: data,
                  tableName: 'Problem'
              },
              {
                  dataSources: dataSources
              }),

  },
  Data: GraphQLJSONObject,
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
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
