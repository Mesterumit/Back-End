require('express-async-errors')
const Category = require('../models/Category')

// HTTP - /categories
exports.getCategories = async(req,res)=>{
    const data = await Category.find()
    res.status(200).json({
        success :true,
        data:data,
        count: data.length
    })

}

// POST -/categories
exports.postCategory = async(req,res)=>{
    // zod for validation 
    // cehck if u can get a chance instead of "yup"

    const data = await Category.create(req.body)
    res.status(201).json({
        success:true,
        data:data
    })
}

// GET - /categories/:id
exports.getCategory = async (req,res)=>{// 


    // if u use "find" that will return object of an array
    // and in front end u need to use "response.data[0]"
    // find({_id:req.params.id})

    // if you use the "findById" that will return an object
    // in front-end , you can get it "response.data"
    // findById(req.params.id)

    const data = await Category.findById(req.params.id)
    if(!data) throw new Error('Category is not exist')

    res.send(200).json({
        success:true,
        data:data
    })
}

// PUT -/categories/:id
exports.putCategory = async(req,res)=>{

    // findByIdAndUpdate ==> is taking two paramaters
    // firts one to find it which is "id"
    // secondly replace the data 
    // and we should use the "new as true" to see updated values
    const data = await Category.findByIdAndUpdate(req.params.id, req.body,{new:true, runvalidators:true})
    res.status(200).json({
        success:true,
        data:data
    })
}

// DELETE -/categories/:id
exports.deleteCategory =async(req,res)=>{

    const dataBeforeDelete = await Category.findById(req.params.id)
     await Category.findByIdAndDelete(req.params.id)

    res.status(204).json({
        success:true,
        data:dataBeforeDelete
    })
}