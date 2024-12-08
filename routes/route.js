const express = require('express')
const userController = require('../controller/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const bookingController = require('../controller/bookingController')
const multerMiddleware = require('../middleware/multerMiddleware')
const serviceController = require('../controller/serviceController')

const Router = new express.Router()

// Register
Router.post('/register',userController.registerController)

// login
Router.post('/login',userController.loginController)

// booking
Router.post('/booking',jwtMiddleware,bookingController.bookingController)

// user bookings
Router.get('/user-booking',jwtMiddleware,bookingController.userBookingsController)

// edit bookings
Router.put('/edit/:id/booking',jwtMiddleware,bookingController.editBookingController)

// delete booking
Router.delete('/delete/:id/booking',jwtMiddleware,bookingController.removeBookingController)

// profile update
Router.put('/profile-update',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editUserController)

// all user
Router.get('/all-user',userController.allUserController)

// all bookings
Router.get('/all-bookings',bookingController.allBookingController)

// add services
Router.post('/add-services',multerMiddleware.single('serviceImg'),serviceController.addServicesController)

// home services
Router.get('/home-services',serviceController.homeServiceController)

// all services
Router.get('/all-services',serviceController.allServicesController)

// edit services
Router.put('/edit/:id/services',multerMiddleware.single('serviceImg'),serviceController.editServicesController)

// delete Service
Router.delete('/delete/:id/services',serviceController.removeServicesCOntroler)

// status approval
Router.put('/approve/:id/status',bookingController.approveStatusController)

module.exports = Router