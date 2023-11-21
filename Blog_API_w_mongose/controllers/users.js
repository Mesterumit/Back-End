const User = require('../models/User')

// @URL      GET/api/users
// @desc     List all users
// @access   Admin
exports.list = async(req,res)=>{
    // const data = await User.find()
    console.log('here')
    res.status(200).json(res.results)
}


// @URL      GET /api/user/:id
// @desc     get a user details
// @access   private-owner/Admin 
exports.read = async (req,res)=>{

    // so i have dcided to call as "userId" in user route to red
    const data = await User.findById(req.params.id)
    console.log(data)
    res.status(200).json({
        succes:true,
        data:data
    })

}


// @URL     POST /api/users
// @desc    cresate a user 
// @access  Admin 
exports.create = async (req,res)=>{

    const user = await User.create(req.body)

    res.status(201).json({
        succes: true,
        data : user
    })

}

// @URL  PUT /api/users/:id
// @desc  update a user information 
// @access    private-owner/Admin
exports.update = async (req,res)=>{

    const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators: true} )

    res.status(200).json({
        succes:true,
        data:user
    })
    
}

// @URL  DELETE /api/users/:id
// @desc  Delete a user  
// @access    Admin
exports.delete = async (req,res)=>{

    const {isDeleted} = await User.deleteOne({_id:req.params.id})
    res.status(isDeleted ? 200 : 404).json({
        succes: isDeleted ? true : false,
        data :{}
    })
}
