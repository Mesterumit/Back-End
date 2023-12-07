


const User = require('../module/user')


module.exports ={

    list:async(req,res)=>{

        const data = await res.getModelList(User)

        res.send({
            eror:false,
            data,
            detail : await res.getModelListDetails(User)
        })
    },

    read:async(req,res)=>{

        const data = await User.findOne({_id: req.params.id})

        res.send({
            error:false,
            data
        })
    },

    create:async(req,res)=>{
        const data = await User.create(req.body)

        res.send({
            error:false,
            data
        })

    },

    update:async(req,res)=>{
         const data = await User.updateOne({_id:req.paramas.id}, req.body, {new:true, runValidators:true})

         res.send({
            error:false,
            data,
            new : await User.findOne({_id:req.paramas.id})
         })
    },
    delete:async(req,res)=>{

        const data = await User.deleteOne({_id:req.paramas.id})

        res.send({
            error:false,
            data
        })
    }

}