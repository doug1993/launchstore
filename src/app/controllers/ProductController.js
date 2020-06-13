const {formatPrice} = require('../../../lib/utils')
const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')
module.exports={
   create(req,res){
      //assim eh como funciona promise, que eh uma substituicao de callback 
      Category.all()
      .then(function(results){
         const categories = results.rows
         return res.render('products/create.njk',{categories})
      }).catch(function(err){
         throw new Error(err)
      })
      
   },//assim eh a substituicao das promisses, por funcoes asincronas async await
   async post(req,res){
     const keys = Object.keys(req.body)
      for(key of keys){
         if (req.body[key]==""){
            return res.send('Please, fill all fields')
         }
      }

      if(req.files.length=="0"){
         return res.send('Please, sent at least one image')
      }
      let results = await Product.create(req.body)
     const productId = results.rows[0].id 
         //create cria um array de promessas
         const filesPromise =  req.files.map(file => File.create({...file, product_id: productId}))
         //agora ele(Promise.all) pode esperar esse array 
         await Promise.all(filesPromise)
      //forEach nao espera a funcao await estar pronta
      /*
         req.files.forEach(file=>{
         await File.create({...file, product_id: productId})
      })*/

      
     return res.redirect(`/products/${productId}/edit`)
   
   },
   async edit(req,res){
      
     let results = await Product.find(req.params.id)
     const product = results.rows[0]
     if(!product) return res.send('Product not exist')

      product.old_price = formatPrice(product.old_price)
      product.price = formatPrice(product.price)

     results = await Category.all()
     const categories = results.rows
      //get categories  
      results = await Product.files(product.id)
      let files = results.rows
      files = files.map(file => ({
         ...file,
         src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
         //deveria estar assim mais minha imagem apareceu com public
         //src: `${req.protocol}://${req.header.host}${file.path.replace("public","")}`
      }))


     
     return res.render('products/edit.njk', {product, files})
   },
   async put(req,res){
      const keys = Object.keys(req.body)
      for (key of keys){
         if(req.body[key]=="" && key !="removed_files"){
            return res.send('Please, fill all the fields')
         }
      }
      if(req.body.length!=0){
         
         const newFilesPromise = req.files.map(file=>
            File.create({...file, product_id: req.body.id }))

            await Promise.all(newFilesPromise)

      }
      if(req.body.removed_files){
         const removedFiles = req.body.removed_files.split(",")
         const lastIndex = removedFiles.length - 1
         removedFiles.splice(lastIndex, 1) 
         /*Este cria um array de itens deletados e espera vc deletar o maximo co promise*/
         const removedFilesPromise = removedFiles.map(id =>File.delete(id))
         /*Aqui ele espera terminar o deletar */
         await Promise.all(removedFilesPromise)
      }
 

      req.body.price = req.body.price.replace(/\D/g,"")
      if (req.body.old_price != req.body.price){
         const oldProduct = await Product.find(req.body.id)
         req.body.old_price = oldProduct.rows[0].price
      }
         await Product.update(req.body)
         return res.redirect(`/products/${req.body.id}/edit`)
   },
   async delete(req, res) {
      await Product.delete(req.body.id)

      return res.redirect('/products/create')
  }

} 