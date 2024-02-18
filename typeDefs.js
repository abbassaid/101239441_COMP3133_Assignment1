const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type User {
        id: ID
        username: String
        email: String
    }

    type Employee {
        id: ID
        first_name: String
        last_name: String
        email: String
        gender: String
        salary: Int
    }
    
    input AddEmployeeInput {
        first_name: String
        last_name: String
        email: String
        gender: String
        salary: Int
    }

    input UpdateEmployeeInput {
        first_name: String
        last_name: String
        email: String
        gender: String
        salary: Int
    }

    type Query {
        login(email: String!, password: String!): String
        getAllEmployees: [Employee]
        searchEmployeeById(id: ID!): Employee
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User
        addEmployee(employee: AddEmployeeInput!): Employee
        updateEmployeeById(id: ID!, employee: UpdateEmployeeInput!): Employee
        deleteEmployeeById(id: ID!): String
    }
`;

module.exports = typeDefs;
