const Department = require('../models/Department');
const Personnal = require('../models/Personnal');


// @URL         GET /api/departments/
// @access      public
// @desc        List all departments
exports.getDepartments = async(req, res)=>{
    res.status(200).json(res.results)
} 


// @URL         POST /api/departments
// @access      private
// @desc        Create a departments
exports.postDepartment = async(req, res)=>{
    const data = await Department.create(req.body)
    res.status(201).json({
        success:true, 
        data    
    })
}

// @URL         GET /api/departments/:deptId
// @access      public
// @desc        read a single department
exports.getDepartment = async(req, res)=>{
    const data = await Department.findById(req.params.deptId);
    res.status(200).json({
        success:true, 
        data
    })
} 

// @URL         PUT /api/departments/:deptId
// @access      private
// @desc        update a single department
exports.putDepartment = async(req, res)=>{
    //const data = await Department.updateOne({_id: req.params.deptId}, req.body);
    const data = await Department.findByIdAndUpdate(req.params.deptId, req.body, {new:true, runValidators:true});
    res.status(202).json({
        success:true, 
        data
    })
} 

// @URL         DELETE /api/departments/:deptId
// @access      private
// @desc        Delete a single department
exports.deleteDepartment = async(req, res)=>{
    //const data = await Department.deleteOne({_id: req.params.deptId});
    const data = await Department.findByIdAndDelete(req.params.deptId);
    res.status(204).json({
        success:true, 
        data
    })
} 

exports.getPersonnals = async(req, res)=>{
    const deptId = req.params.deptId;
    console.log(deptId);
    const data = await Personnal.find({departmentId: deptId})
    res.status(200).json({
        success: true, 
        data    
    })

}