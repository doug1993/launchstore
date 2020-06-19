const express = require('express')
const routes= express.Router()


const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')

const Validator = require('../app/validators/user')

//LOGIN E LOGOUT
//routes.post('/login', SessionController.login)  
//routes.post('/logout', SessionController.logout) 
//routes.get('/login', SessionController.loginform)
//RESET PASSWORD / FORGOT 
//routes.get('/forgot-password', SessionController.forgotForm)
//routes.get('/password-reset', SessionController.resetForm)
//routes.post('/forgot-password', SessionController.forgot)
//routes.post('/password-reset', SessionController.reset)

//USER REGISTER

routes.get('/register', UserController.registerForm)
routes.post('/register', Validator.post, UserController.post)
 
routes.get('/',Validator.show, UserController.show)
routes.put('/',Validator.update, UserController.update)

module.exports = routes
 

