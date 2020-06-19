const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./db')

module.exports = session({
   store: new pgSession({
      //onde importa o banco de dados -->pool<--
      pool:db
   }),
   secret:'tomahawk',
   //para nao salvar a todo  instante a sessao somente quando licar no botao
   resave: false,
   //so salva uando houver dados
   saveUninitialized: false,
   //esta sessao fica ativa no banco de dados em mili    
   cookie:{
      maxAge: 30*24*60*60*1000
   }
})