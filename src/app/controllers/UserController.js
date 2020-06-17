const User = require('../models/User')
const { findOne } = require('../models/User')

module.exports = {
      registerForm(req,res){
            return res.render("user/register")
      },
      async post(req,res){
          

            return res.send('passed!')

          //check if password match
      }
} 