const { gql } = require('apollo-server');

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

module.exports = {
    typeDefs: typeDefs,
};
