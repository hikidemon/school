require('dotenv').config()
const sequelize= require('./db')
const express = require('express')
const app = express()
const start = async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT,()=>console.log('server started'))
    }catch(e){console.log(e)}
}
start()