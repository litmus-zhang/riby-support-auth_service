const Sequelize = require('sequelize');
const {DB_HOST, DB_NAME, DB_PASSWORD, DB_USER} = require('../config/database');

const sequelize = new Sequelize( 
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        dialect: 'postgres',
        host: DB_HOST,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
        }
    }
)
module.exports=sequelize;