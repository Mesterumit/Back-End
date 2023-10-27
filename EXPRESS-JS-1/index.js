require('colors');
require('dotenv').config();

// it generate random id for us 
const {v4:uuid} = require('uuid')
const express = require('express');

// create a server
const app = express()

const MODE = process.env.MODE || 8080;
const HOST =process.env.HOST  || "127.0.0.1";
const PORT = process.env.PORT || "production";

// add middleware
// JSON parse, parse json data inside the incoming request
// this help the code understand that the one coming data is "JSON" data
// after doing that we can see the data user created(posted) in terminal
app.use(express.json()) 

//CRUD functions for a Blog API
const blogs = [
    {
        id: '04c9d7bc-c164-43d1-88b3-c11445870a31',
        title: 'Blog Title 1',
        content: 'Content 1',
      },
      {
        id: '75d7cec1-5735-46d1-bdae-be2e26de3c8b',
        title: 'Blog Title 2',
        content: 'Content 2',
      },
      {
        id: '842a57a3-f80b-491b-8917-d842b8bc356c',
        title: 'Blog Title 3',
        content: 'Content 3',
      },
];


// this will bring the all of the blogs
// GET /api/posts
app.get('/api/posts',(req,res)=>{
res.status(200).send({success : true, data:blogs, count:blogs.length})
});

// POST /api/posts
app.post('/api/posts',(req,res)=>{
    console.log(req.body)
    // we create the data in that way 
    // if we have an validation
    // const newPost = {
    //     id : uuid(),
    //     title : req.body,
    //     content : req.body.content,

    // };

    // in that way we still create the data
    // but we can't do validation
    const newPost ={
        ...body,
        id : uuid(),
    }
    blogs.push(newPost)
    // 201 means it is created 
    res.status(201).send({massage : `post is added succesfully`, post: newPost});
})

// getting singele data
// GET  /api/post/:id
app.get("/api/posts/:id",(req,res)=>{
    const id = req.params.id
    const post = blogs.find(item => item.id === id)
    if(post){
        res.status(200).send({success :true, data: post});
    }else{
        res.status(404).send({success:false, massage: `${id} not found` })
    }

})

// PUT /api/posts/:id
app.put("/api/posts/:id",(req,res)=>{
    const id = req.params.id
    const postIndex = blogs.findIndex(item => item.id === id)
    if(postIndex === -1) 
    return res.status(404).send({success:false, massage:`{id} not found`})

    blogs[postIndex].title = req.body.title
    blogs[postIndex].content = req.body.content

    res.status(202).send({succes:true, data: blogs[postIndex]})
  

})

// DELETE /api/post/:id
app.delete("/api/posts/:id",(req,res)=>{
    const id = req.params.id
    const postIndex = blogs.findIndex(item => item.id === id)
    if(postIndex === -1) 
    return res.status(404).send({success:false, massage:`{id} not found`})

    blogs.splice(postIndex,1)

    res.status(202).send({succes:true, data:[]})
  

})


// start the server
app.listen(PORT,()=>{
    console.log(
        `Server is running in ${MODE} mode on`.yellow,
        `http://${HOST}:${PORT}`.blue.underline
    )
});