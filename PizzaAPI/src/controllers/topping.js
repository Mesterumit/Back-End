
const topping = require('../models/topping')

module.exports = {

    list:async (req,res)=>{
        /*
        #swagger.tags = ["Toppings"]
        #swagger.summary = "List Toppings"
        #swagger.description =`
          You can send query with endpoint fir search[], sort[], page and limit.
          <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
        
        
        
        `
        */

        const data = await res.getModelList(topping)

        res.status(200).json({
            details: await res.getModelListDetails(topping),
            error:false,
            data
        })

    },

  create:async(req,res)=>{
    
    const data = await topping.create(req.body)

    res.status(201).json({
        error:false,
        data
    })
  },
  
  update:async(req,res)=>{

    const data= await  topping.findOneAndUpdate({_id:req.params.id},req.body,{new:true, runValidators:true})
    res.status(202).json({
        error:false,
        data,
        new : await topping.findOne({_id:req.params.id})
    })
  },

  read:async(req,res)=>{

    const data = await topping.findOne({_id:req.params.id})

    res.status(200).json({
        error:false,
        data
    })
  },

  delete:async(req,res)=>{

    const data = await topping.delete({_id:req.params.id})

    res.status(data.deletedCount ? 204 : 404).json({
        error: !data.deletedCount,
        data

    })
  },
}