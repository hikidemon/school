const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING},
    surname:{type:DataTypes.STRING},
    patronymic:{type:DataTypes.STRING},
    password:{type:DataTypes.STRING},
    idRole:{type:DataTypes.INTEGER},
    number:{type:DataTypes.NUMBER},
    image:{type:DataTypes.STRING}
})
const Marks= sequelize.define('marks',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    number:{type:DataTypes.INTEGER},
    idUser:{type:DataTypes.INTEGER},
    patronymic:{type:DataTypes.STRING},
    password:{type:DataTypes.STRING},
    idRole:{type:DataTypes.INTEGER},
    number:{type:DataTypes.NUMBER}
})
