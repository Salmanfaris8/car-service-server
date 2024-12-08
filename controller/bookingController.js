const bookings = require('../models/bookingModel')

// booking
exports.bookingController = async(req,res)=>{
    console.log("Inside bookingController");
    const userId = req.userId
    console.log(userId);
    const {model,servicename,date,time,status} = req.body
    console.log(model,servicename,date,time);
    try{
        const newBooking = new bookings({
            model,servicename,date,time,status,userId
        })
        await newBooking.save()
        res.status(200).json(newBooking)
    }
    catch(err){
        res.status(301).json(err)
    }
}

// user booking
exports.userBookingsController = async(req,res)=>{
    console.log("Inside userBookingsController");
    const userId = req.userId
    try{
        const allUserBookings = await bookings.find({userId})
        res.status(200).json(allUserBookings)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// edit booking
exports.editBookingController = async(req,res)=>{
    console.log("Inside editBookingController");
    const id = req.params.id
    const userId = req.userId
    const {model,servicename,date,time,status} = req.body
    try{
        const updateBooking = await bookings.findByIdAndUpdate({_id:id},{
            model,servicename,date,time,status,userId
        },{new:true})
        await updateBooking.save()
        res.status(200).json(updateBooking)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// delete booking
exports.removeBookingController = async(req,res)=>{
    console.log("Indside removeBookingController");
    const {id} = req.params
    try{
        const deleteBooking = await bookings.findByIdAndDelete({_id:id})
        res.status(200).json(deleteBooking)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// all booking
exports.allBookingController = async(req,res)=>{
    console.log("Inside allBookingController");
    try{
        const allBookings = await bookings.find()
        res.status(200).json(allBookings)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// status approval
exports.approveStatusController = async(req,res)=>{
    console.log("Inisde approveStatusController");
    const {id} = req.params
    // const userId = req.userId
    const {status} = req.body
    console.log(id,status);
    
    try{
        const updatedStatus = await bookings.findByIdAndUpdate({_id:id},{
            status,
        },{new:true})
        await updatedStatus.save()
        res.status(200).json(updatedStatus)
    }
    catch(err){
        res.status(401).json(err)
    }
}