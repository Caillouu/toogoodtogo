import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { loadFile } from "graphql-import-files"
import { Query } from './graphql/resolvers/Query.js'
import { User } from './graphql/resolvers/User.js'
import { Organizer } from './graphql/resolvers/Organizer.js'
import { Mutation } from './graphql/resolvers/Mutation.js'
import { Event } from './graphql/resolvers/Event.js'
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { mongoose } from 'mongoose';
import cookieParser from 'cookie-parser';
import {authRoutes} from './routes/authRoutes.js' 

const app = express();


// database connexion
const uri = `mongodb+srv://${process.env.REACT_APP_MONGO_USER}:${process.env.REACT_APP_MONGO_PASSWORD}@cluster0.ccy4dil.mongodb.net/${process.env.REACT_APP_MONGO_DB}?retryWrites=true&w=majority`
mongoose
.connect(uri, {})
.then(() => {
    console.log(`🚀 DATABASE CONNECTED`);
})
.catch(err => {
    console.log(err.message);
});


// Création AppolloServer
const typeDefs = loadFile("./graphql/schema/schema.graphql")
const resolvers = {
    Query,
    User,
    Organizer,
    Event,
    Mutation
};

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {listen: { port: 4000 } })
console.log(`🚀 AppolloServer ready at ${url}`)

// middleware
app.use(cors());
app.use(express.json())
// JWT Json Web Token
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// app.use('/', require('./routes/authRoutes'))
app.use('/', authRoutes)

const port = 8000
app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})