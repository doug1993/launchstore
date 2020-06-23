 const db = require('../../config/db')
 
 const fs = require('fs')

//extracao do hash do bcrypt para senhas
const {hash}= require('bcryptjs')


 module.exports={
   async findOne(filters){
       let query ="SELECT * FROM users"

       Object.keys(filters).map(key =>{

         query = `${query}
         ${key}
         `
            Object.keys(filters[key]).map(field => {
               query =`${query} ${field} = '${ filters [key] [field] }'`
            })
         })

       const results = await db.query(query)

       return results.rows[0]

       
    },
   async create(data){
      try{
               const query=`
               INSERT INTO users (
                  name,
                  email,
                  password,
                  cpf_cnpj,
                  cep,
                  address
               ) VALUES ($1,$2,$3,$4,$5,$6)
               RETURNING id
            `
             //utilizando o hash do bcrypt criptografia
            const passwordHash = await hash(data.password, 8)
               const values=[
                     data.name,
                     data.email,
                     //prestar atencao nessa digitacao de criptografia
                     passwordHash,
                     data.cpf_cnpj.replace(/\D/g, ""),
                     data.cep.replace(/\D/g, ""),
                     data.address
               ]
         
               const results = await db.query(query, values)
               return results.rows[0].id
         
            }catch(err){
               console.error(err)
            }
   },
   async  update(id,fields){
      let query = 'UPDATE users SET'
      /*Esta linha refere-se a casda campo no array fields na pagina de update da aplicacao 
         esta passando cada um deles para um query 
         ex:
        
         UPDATE products SET
               name=($1),
               email=($1),
               cpf_cnpj=($1),
               cep=($1),
               address=($1)`
         WHERE id =$9 

         reparando como nao tem  virgula no ultimo que eh a logica utilizada a baixo
      */
      Object.keys(fields).map((key, index, array)=>{
         if((index + 1)<array.length){
            query = `${query}
               ${key}= ' ${fields[key]}',
            `
         }else{
            query = `${query}
            ${key}= ' ${fields[key]}
            WHERE id = ${id}
            `
         }
      })

      await db.query(query)
      return
   },async delete(id) {
      //pegar todos os produtos
      let results = await db.query("SELECT * FROM products WHERE user_id = $1", [id])
      const products = results.rows

      // dos produtos, pegar todas as imagens
      const allFilesPromise = products.map(product => 
          Product.files(product.id))

      let promiseResults = await Promise.all(allFilesPromise)

      // rodar a remoção do usuário
      await db.query('DELETE FROM users WHERE id = $1', [id])

      // remover as imagens da pasta public
      promiseResults.map(results => {
          results.rows.map(file => {
              try {
                  fs.unlinkSync(file.path)
              } catch(err) {
                  console.error(err)
              }

          })
      })
  }
         

 }