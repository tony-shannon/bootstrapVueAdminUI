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
   patientId: Int
  }
  
  type Adverse_Event {
  
    id: ID!
    idN: Int!
    CodeD: String!
    Description: String!
    Type: String!
    Name: String!
    Days: String
    patientId: Int

  }
  
  
  type Problem {
  
     id: ID!
     idN: Int!
     CodeD: String!
     Name: String!
     Description: String!
     Days: String
     patientId: Int
  }
  
  type Patient {
    id: ID! 
    idN: Int!
    FirstName: String!
    LastName: String!
    Sex: String!
    Age: Int!
    Address: String!
  }
  
 
  type Token {
  
      token: String!
  }
  
  type Term {
    id: ID! 
    idN: Int
    Term: String
    Subset: String
    Code: String
}

  type Query {
    medications: [Medication]
    adverse_Events: [Adverse_Event]
    problems: [Problem]
    patients: [Patient]
    terms: [Term]
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
    
    createPatient(data: Data): Patient
    deletePatient(where: Data): Patient
    updatePatient(where: Data, data: Data): Patient
    
   
    obtainToken(data: Data) : Token
  }
`;

module.exports = {
    typeDefs: typeDefs,
};
