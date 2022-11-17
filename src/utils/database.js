require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');

const config = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialectOptions: { ssl: {required: true, rejectUnauthorized: false}}
}

const db = new Sequelize(config);

module.exports = {db, DataTypes};