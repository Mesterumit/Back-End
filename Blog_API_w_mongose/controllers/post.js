require('express-async-errors')
const Post = require('../models/Post')

exports.getPosts = async(req,res)=>{
    // if you dont populate "post will look lke"
    // const Post ={
    //     category : Object Object, => like that basicely, you wont be able to read data
    //     title:"hey",
    //     content:'my content',
    //     published:tru

    // }
    
    // so when u use category "first parameter" will be the name of the 
    // key word in this eaxm , in post module "category"
    // the second parameter is the "name " which we have in category module
    // // we can have more than one paramater in "category" model
    //so if you only give the name property then you will only fecth
   // the name property noy entier property or object
   // it is like a "JOIN" u just want to get some property not all
    const data = await Post.find().populate('category', 'name')
    res.status(200).json({
        succes:true,
        data:data,
        count :data.length
    })
}

exports.postPosts = async(req,res)=>{
    const data = await Post.create(req.body)
    res.status(201).json({
        succes:true,
        data:data
    })

}

exports.getPost = async(req,res)=>{
    // we should populete again 
    // beacuse it is readind data and we have an "foreing" key
    const data = await Post.find({_id:req.params.id}).populate('category','name')
    res.status(200).json({
        succes: true,
        data :data
    })
}

exports.putPost = async(req,res)=>{
    // it is not passive data like "getting"
    // it is an active to update the data that's why we dont 
    // need to do populate in here
    const data = await Post.findByIdAndUpdate(req.params.id, req.body,{new:true, runvalidators:true})
    res.status(200).json({
        succes:true,
        data:data
    })
}

exports.deletePost = async (req,res)=>{
    const data = await Post.findByIdAndDelete(req.params.id)
    res.status(204).json({
        succes:true,
        data:{}
    })
}

// GET  /categories/:catId/posts
// This function is likely part of a scenario where
//  you want to get all posts within a certain category,
//   and it uses the populate method to include details of
//    the category associated with each post in the result.
exports.getCategoryPosts = async(req,res)=>{
    const data = await Post.find({category: req.params.catId}).populate('category','name')
    res.status(200).json({
        success: true,
        data:date,
        count: data.length
    })
}