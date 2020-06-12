     express = require('express')
     nunjucks = require('nunjucks')
     const routes = require('./routes')
     methodOverride= require('method-override')

      
     
     server =express()
     //syntax do static esta diferente 
     server.use(express.urlencoded({extended: true}))
     server.use(methodOverride('_method'))
     server.use('/public',express.static('public'))
     //onde se configura a sobreescrita de method
     server.use(routes)
     

     server.set('view engine', 'njk')

     nunjucks.configure('src/app/views',{
        express: server,
        noCache: true,
        autoScape: false
     })

   
    server.listen(5006,function(){
        console.log('server is running')
    })
