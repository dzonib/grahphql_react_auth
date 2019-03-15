const { ApolloServer } = require("apollo-server")

const sequelize = require("./db/sequelize")
const typeDefs = require("./typeDefs/typeDefs")
const resolvers = require("./resolvers/resolvers")

const server = new ApolloServer({
    typeDefs,
    resolvers
})

sequelize
    .sync()
    .then(() =>
        server
            .listen()
            .then(({ url }) => console.log(`Server running on ${url}`))
    )
