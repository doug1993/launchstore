const User = require('../models/User')
const { builtinModules } = require('module')

async function post( req, res, next){
   //check if has all fields
   const keys = Object.keys(req.body)
   for(key of keys){
      if (req.body[key]==""){
         return res.send('Please, fill all fields')
      }
   }

//check if user exists [email,cpf,cnpj] is unique 
let {email, cpf_cnpj, password, passwordRepeat}= req.body

cpf_cnpj = cpf_cnpj.replace(/\D/g,"")
 
const user = await User.findOne({
        where: {email},
        or:{cpf_cnpj}
  })
  if ( user) return res.send('Users exists')

  if(password != passwordRepeat) return res.send('Password Mismatch')

  next()
}
module.exports = {post}