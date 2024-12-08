const services = require('../models/serviceModel')

// add services
exports.addServicesController = async(req,res)=>{
    console.log("Inside addServicesController");
    const {title,description} = req.body
    const serviceImg = req.file.filename
    console.log(title,description,serviceImg);
    try{
        const existingService = await services.findOne({title})
        if(existingService){
            res.status(406).json("Service already exist in our collection... please upload another!!")
        }
        else{
            const newService = new services({
                title,description,serviceImg
            })
            await newService.save()
            res.status(200).json(newService)
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

// all services
exports.allServicesController = async(req,res)=>{
    console.log("Inside allServicesController");
    const serachKey = req.query.search
    console.log(serachKey);
    const query = {
        title:{
            $regex:serachKey,$options:'i'
        }
    }
    try{
        const allServices = await services.find(query)
        res.status(200).json(allServices)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// get home services
exports.homeServiceController = async(req,res)=>{
    console.log("Inside homeServiceController");
    try{
        const allHomeServices = await services.find().limit(3)
        res.status(200).json(allHomeServices)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// edit services
exports.editServicesController = async(req,res)=>{
    console.log("Inside editServicesController");
    const {id} = req.params
    const {title,description,serviceImg} = req.body
    const reUploadServiceImg = req.file?req.file.filename:serviceImg
    try{
        const updateService = await services.findByIdAndUpdate({_id:id},{
            title,description,serviceImg:reUploadServiceImg
        },{new:true})
        await updateService.save()
        res.status(200).json(updateService)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// delete services
exports.removeServicesCOntroler = async(req,res)=>{
    console.log("Inside removeServicesCOntroler");
    const {id} = req.params
    try{
        const deletedService = await services.findByIdAndDelete({_id:id})
        res.status(200).json(deletedService)
    }
    catch(err){
        res.status(401).json(err)
    }
}