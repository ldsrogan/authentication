import dotenv from 'dotenv';
import gpPromise from 'pg-promise';
import pgPromise from 'pg-promise';

dotenv.config();

const pgo = pgPromise({}); //if additional cnofig required, fill the blank {}

const config = {
    host: process.env.POSTGRES__HOST,
    port: process.env.POSTGRES__PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
};

const db = pgp(config);

exports.db = db;
