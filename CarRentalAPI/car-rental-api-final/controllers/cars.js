const Car = require('../models/Car');
const Reservation = require('../models/Reservation');

// @url     GET /cars/
// @desc    List all card 
// @access  public
exports.list = async(req, res)=>{

    let filters = {}
    // Only show published card, except for admin can see unpublished cars
    if(!req?.user?.isAdmin) filters.isPublished = true;
    const data = await Car.find(filters)
    res.status(200).json({
        error: false, 
        count: data.length, 
        data
    })

}

// @url     POST /cars/
// @desc    add a car 
// @access  private / Admin
exports.create = async(req, res)=>{
    if(req?.user){
        req.body.createdId  =req.user._id;
        req.body.updatedId  =req.user._id;
    }
    if(req.files){
        const imgArr = []
        for(let file of req?.files){
            imgArr.push('/img/'+file.originalname)
        }
        req.body.images = imgArr;
    
    }
    
    const data = await Car.create(req.body)
    res.status(201).json({
        error: false, 
        data
    })


}

// @url     GET /cars/:carId
// @desc    read car details
// @access  public
exports.read = async(req, res)=>{
    const data = await Car.findOne({_id: req.params.id})
    res.status(200).json({
        error: false, 
        data
    })

}
// @url     PUT /cars/:carId
// @desc    update a car
// @access  private /Admin
exports.update = async(req, res)=>{
    req.body.images = req.body?.images || []
    
    if(req.files){
        for(let file of req?.files){
            req.body.images.push('/img/'+file.originalname)
        }
    
    }

    if(req?.user){
        req.body.updatedId = req.user._id
    }
    const data = await Car.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.status(202).json({
        error: false, 
        data
    })

}
// @url     DELETE /cars/:carId
// @desc    delete a car using id
// @access  Private /Admin
exports.delete = async(req, res)=>{
    const data = await Car.deleteOne({_id: req.params.id})
    res.status(data.deletedCount? 204: 404).json({
        error: !data.deletedCount,
        data
    })
}

