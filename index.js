const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

// Setting up the Apollo server
async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    mongoose.set('strictQuery', true);
    await mongoose.connect("mongodb+srv://abbassaid:GeorgeBrown123@cluster0.e8qefyb.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority");
    console.log('Database connected...');

    const port = process.env.PORT || 3000;
    app.listen(port, () =>
        console.log(`Server is running on http://localhost:${port}/graphql`)
    );
}

// Starting the server
startServer();
