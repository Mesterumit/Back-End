const Token = require('../models/Token')

exports.list = async(req, res)=>{
    const data = await Token.find()
    res.status(200).json({
        error: false, 
        count: data.length,
        data
    }) 
}

exports.create = async(req, res)=>{
    const data = await Token.create(req.body)
    res.status(201).json({
        error: false, 
        data
    }) 
}
exports.read = async(req, res)=>{
    const data = await Token.findById(req.params.id)
    res.status(200).json({
        error: false, 
        data
    }) 
}

exports.update = async(req, res)=>{
    const data = await Token.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.status(202).json({
        error: false, 
        data
    }) 
}

exports.delete = async(req, res)=>{
    const data = await Token.deleteOne({_id:req.params.id})
    res.status(data.deletedCount?204: 404).json({
        error: !data.deletedCount, 
        data
    }) 
}

