const Reservation = require('../models/Reservation');

// @url     GET /reservations/
// @desc    List all reservations 
// @access  private
exports.list = async(req, res)=>{
    let filters = {}
    // Only show reserved cars for logged in user, except for admin can see all reservations
    if(!req?.user?.isAdmin) filters.userId = req.user._id;
    res.status(200).json(res.results)

}

// @url     POST /reservations/
// @desc    Create a new reservation
// @access  private 
exports.create = async(req, res)=>{
  
    req.body.userId = req?.user?._id

    // Check new reservations date in exists reservations 
    const userReervationInDates = await Reservation.findOne({
        userId: req.body.userId, 
        $nor:[
            {startDate: {$gt: req.body.endDate}}, 
            {endDate:{$lt: req.body.startDate}}
        ]
    })

    if(userReervationInDates){
        res.errorStatusCoder = 402;
        throw new Error('It cannot be added because there is another reservation with the same date')
    }else{
        const data = await Reservation.create(req.body)
        res.status(201).json({
            error: false, 
            data
        })
    }



}

// @url     GET /reservations/:id
// @desc    read a reservation
// @access  private
exports.read = async(req, res)=>{
    // user read his own reservations, admin can read all reservations 
    let filters = {}
    if(!req.user?.isAdmin) filters.userId = req.user._id
    const data = await Reservation.findOne({_id: req.params.id, ...filters}).populate(['userId', 'carId'])
    res.status(200).json({
        error: false, 
        data
    })
}
// @url     PUT /reservation/:id
// @desc    update a reservation
// @access  private /Admin
exports.update = async(req, res)=>{
    const data = await Reservation.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    res.status(202).json({
        error: false, 
        data
    })

}
// @url     DELETE /reservation/:id
// @desc    delete a reservation
// @access  Private /Admin
exports.delete = async(req, res)=>{
    const data = await Reservation.deleteOne({_id: req.params.id})
    res.status(data.deletedCount? 204: 404).json({
        error: !data.deletedCount,
        data
    })
}

