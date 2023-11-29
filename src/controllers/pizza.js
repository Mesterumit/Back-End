
const pizza = require('../models/pizza')


module.exports={
    
    list:async(req,res)=>{

        const data = await res.getModelList(pizza, 'toppings')

        res.status(200).json({
            error:false,
            data,
            details :await res.getModelListDetails(pizza)
        })
    },
    create:async(req,res)=>{

        const data = await pizza.create(req.body)

        res.status(201).json({
            error:false,
            data
        })
    },
    read:async(req,res)=>{

        const data = await pizza.findOne({_id:req.params.id}, 'toppings')

        res.status(200).json({
            error:false,
            data
        })

    },

    update:async(req,res)=>{

        const data = await pizza.updateOne({_id:req.params.id},req.body,{new:true, runValidators:true})

        res.status(202).json({
            error:false,
            data,
            new: await pizza.findOne({_id:req.params.id})
        })
    },

    delete:async(req,res)=>{

        const data = await pizza.delete({_id:req.params.id})
        res.status(data.deleteCount ? 204 : 404).json({
            error : !data.deleteCount,
            data
        })
    },

    // Add topppings to Pizza.toppings
    
}