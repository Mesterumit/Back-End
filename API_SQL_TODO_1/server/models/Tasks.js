const {sequelize} = require('../db')

const {DataTypes} = require('sequelize')

// it is a function that let us define our tables , schemas
const Tasks = sequelize.define('tasks',{
    title:{
        // "STRING" is it coming from 
        // sequlize packeg so all uppercase
        type : DataTypes.STRING(64), // VARCHAR(64)
        // we dont allow this "title" to null
        // in mongoDb => required:true
        allowNull :false

    },
    description: DataTypes.TEXT,
    priorty:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    // we use that in front end to toggle between 
    // states , show the checkBox if it checked or not
    isDone:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        // initial value should be "false"
        // because when u add to TODO-LIST
        // it hasn't done yet, so we can toggle it to true 
        defaultValue: false
    }
})

module.exports = Tasks