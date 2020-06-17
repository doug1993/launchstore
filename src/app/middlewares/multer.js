const multer = require('multer')

const storage = multer.diskStorage({
   //Este cb se refere a uma callback function
   destination:(req, file, cb)=>{
      cb(null,'./public/images')
   },
   filename: (req, file, cb)=>{
      cb(null, `${Date.now().toString()}-${file.originalname}`)
   }
 
})

const fileFilter = (req, file, cb) =>{
   const isAccepted = ['image/png','image/JPG','image/jpeg']
   .find(acceptedFormat => acceptedFormat == file.mimetype)
   
   if(isAccepted){
      return cb(null,true)
   }
   
   return cb(null,false)
}
  

module.exports = multer({
   storage,
   fileFilter
})
