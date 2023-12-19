const Category = require('../models/Category')
const Post = require('../models/Post')

exports.getPosts = async(req,res)=>{
    let categories = await Category.find()
    let posts = await Post.find()
    const recentPosts = await Post.find().sort({createdAt:'desc'}).limit(3)
    res.render('pages/Home', {categories,posts,recentPosts, docTitle:'Home page'})
}

exports.getAddForm = async(req,res)=>{
    let categories = await Category.find()
    res.render('pages/addForm',{docTitle:'Create Post', categories})
}