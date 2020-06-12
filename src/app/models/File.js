const db = require('../../config/db')

module.exports= {
   create(data){
         const query=`
         INSERT INTO products (
            
            name,
            path,
            product_id
         
         ) VALUES ($1,$2,$3)
         RETURNING id
         `
   
         const values = [
               filename,
               path,
               product_id       
         ] 

         return db.query(query,values)

   },    
}