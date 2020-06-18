const User = require('../models/User')
const { compare } = require('bcryptjs')

function checAllFields(body){
   const keys = Object.keys(body)

   for(key of keys){
      if (body[key]==""){
         return {
            user: body,
            error: 'Please, fill all the fields'
         }
      }
   }
}

async function show(req, res, next){
   const {userId: id} = req.session

   const user = await User.findOne({ where: {id} })

      if(!user) return res.render("user/register", {
            error: 'Usuario nao encontrado'
      })
      req.user = user
                  next()
}

async function post( req, res, next){

   const fillAllFields = checAllFields(req.body)

   if(fillAllFields){
      return res.render("user/register", fillAllFields)
   }
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
  if ( user) return res.render('user/register',{
     user: req.body,   
     error: 'Usuario ja cadastrado'
  })

  if( password != passwordRepeat) return res.render('user/register',{
         user: req.body,
         error: 'Senha e repeticao sao diferentes'
   })
   

next()
}
async function update(req,res,next){
   const fillAllFields = checAllFields(req.body)
   
   if(fillAllfields){
      return res.render("user/index", fillAllFields)
   }
   const {id, password} = req.body

   if(!password) return res.render("user/index",{
      user: req.body,
      error: " coloque sua senha para atualizar"
   })
   const user = await User.findOne({where: {id}})
   const passed = await compare( password)
    if (!passed)return res.render("user/index",{
       user: req.body,
       error: " senha incorreta"
    })
    req.user = user

    next()

}



module.exports = {
   post,
   show,
   update
}