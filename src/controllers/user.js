
const User = require('../models/user')


module.exports ={

    List:async(req,res)=>{

        const data = await User.find()

        res.status(200).json({
            error:false,
            data
        })
    },

    create: async(req,res)=>{

        const data = await User.create(req.body)

        res.status(201).json({
            error:false,
            data
        })
    }

 

    

}