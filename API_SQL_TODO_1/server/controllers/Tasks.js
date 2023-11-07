require('express-async-errors');
const Task = require('../models/Tasks');

exports.getTasks = async(req,res)=>{
    const tasks = await Task.findAndCountAll()
    res.status(200).json({
        error:false,
        result: tasks
    })
}

exports.postTask = async(req, res)=>{

    const data = await Task.create(req.body)
    res.status(201).json({
        error: false, 
        message:"Task created", 
        result: data
    })
}

exports.getTask = async(req,res)=>{
    const task = await Task.findByPk(req.params.id)
    res.status(200).json({
        error:false,
        result:task,
        message:`Task with id ${req.params.id} fetched`
    })
}

exports.putTask = async(req,res)=>{

    // there is not a function ins MONGO suc as "update"
    // there is "findmanyUpdate, findById"
    // "req.body" means that i want to update it with "req.body"
    // "req.body" is alreday given by user and we will update it with new inputs by user
    // and we give "where" it will update
    // in here, it qill update the "id" is given of object of data
    // in "isUpdated" , we are chceking if it is updated
    // update function is retunring an Array

    const isUpdated = await Task.update(req.body, {where:{id: req.params.id}})
    // then we find it , which one is updated
    // because, we want to return it
    const task = await Task.findByPk(req.params.id)
    res.status(200).json({
        error:false,
        message :`The task with the id ${req.params.id} is updated`,
        // because , update function is returning an array
        // we check the firts index of that arrar
        // because, it will be only one updated by id 
        // in this array, it will have an object and this mean that it is a true value
        isUpdated : Boolean(isUpdated[0]),
        // this one will give us the array of object just updated byId
        result :task
    })

}

exports.deleteTask = async(req,res)=>{
    // in Mongo , we have finByIdRemove or findByIdDelete, 
    // findManyDelete, this will return an array with MONGO

    // this "destroy" function will return an either "0" or "1"
    // if the retuns is "1" then it means it has deleted
    // if it is "0" then it hasn't deleted and will be false
    // if it is deleted it will be "true => 1"
    // we use that in result to show if it is "true or not" 
    // so we need to do typecasting as we did for update
    const isDeleted = await Task.destroy({where:req.params.id})
    if(!isDeleted) throw new Error('Task not found')

    res.status(204).json({
        error:false,
        message:`Task with id ${req.params.id} deleted`,
        // this "destroy" function will return an either "0" or "1"
    // if the retuns is "1" then it means it has deleted
    // if it is "0" then it hasn't deleted and will be false
    // if it is deleted it will be "true => 1"
    // we use that in result to show if it is "true or not"
        result: Boolean(isDeleted),
        
    })

}