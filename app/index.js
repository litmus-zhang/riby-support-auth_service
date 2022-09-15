require("dotenv/config")
const express = require('express');
const app = express();
const sequelize = require('./utils/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) =>
{ 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/v1/qa', require('./routes/QA'));

const start = async () =>
{

    try
    {
        await sequelize.sync({
            alter: true
        });
        console.log("Database connected");
        app.listen(process.env.PORT, () =>
        {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }
    catch (err)
    {
        console.log(err);
    }
}

start();