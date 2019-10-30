import graphqlHTTP from 'express-graphql'
import express from "express";
import mongoose from "mongoose"
import bodyParser from 'body-parser'
import schema from "./schema/schema";
import session from 'express-session'
import passport from 'passport'
import passportConfig from './services/auth'
const MongoStore = require('connect-mongo')(session)

const MONGO_URL = 'mongodb+srv://zeus:zeus9@cluster0-toy3l.mongodb.net/test?retryWrites=true&w=majority';
const PORT = 5000;

if (!MONGO_URL) {
    throw new Error('MongoLab URL is required')
}


const startServer = async () => {
    const app = express();
    // bodyParser is needed just for POST
    app.use(bodyParser.json());

    app.use(session({
        name: 'session-id',
        secret: 'admin',
        saveUninitialized: false,
        resave: true,
        store: new MongoStore({
            url: MONGO_URL,
            autoReconnect: true
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/graphql',
        graphqlHTTP({
            schema,
            graphiql: true
        })
    );

    await mongoose.connect(MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (error) => {
            if (error) {
                console.log('Error connecting to MongoLab', error)
            }
            else {
                console.log("Connected to MongoLab instance.")
            }
        });



    app.listen({ port: PORT }, () => {
        console.log(`server is listening ${PORT}`);
    });
};

startServer();