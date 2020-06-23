const {Pool} = require('pg')


module.exports= new Pool( {
    user  :'dougfortes',
    password:'@AUWkhf1419',
    host:'localhost',
    port:5432,
    database:'launchstoredb'

})