const { gql } = require("apollo-server")

const typeDefs = gql`
    type User {
        id: Int!
        email: String!
        password: String!
    }

    type Query {
        user: User!
    }

    type Mutation {
        createUser(email: String!, password: String!): User!
        loginUser(email: String!, password: String!): String!
    }
`

module.exports = typeDefs
