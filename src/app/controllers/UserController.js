const User = require('../models/User')
const { findOne } = require('../models/User')

module.exports = {
      registerForm(req,res){
            return res.render("user/register")
      },
      show(req,res){
            return res.send('ok , cadastrado!')
      },
      async post(req,res){
          
            const userId = await User.create(req.body)

            req.session.userId = userId

            return res.redirect('/users')

          //check if password match
      }
} 