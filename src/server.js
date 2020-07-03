     express = require('express')
     nunjucks = require('nunjucks')
     const routes = require('./routes')
     methodOverride= require('method-override')
     const session= require('./config/session')
     
     const server = express()
     //syntax do static esta diferente 
     server.use(session)
     server.use((req,res,next)=>{
         res.locals.session = req.session
        next()
        })

     server.use(express.urlencoded({extended: true}))
     server.use('/public',express.static('public'))
     server.use(methodOverride('_method'))
    
     //onde se configura a sobreescrita de method
     server.use(routes)
     

     server.set('view engine', 'njk')

     nunjucks.configure('src/app/views',{
        express: server,
        noCache: true,
        autoScape: false
     })

   
    server.listen(5000,function(){
        console.log('server is running')
    })
