 const Mask= {
    apply(input,func){
      setTimeout(function(){
         input.value = Mask[func](input.value)
      },1)
    },

    formatBRL(value){
      value = value.replace(/\D/g,"")
      return new Intl.NumberFormat('pt-BR',{  
         style:'currency',
         currency:'BRL'
      }).format(value/100)
    },
    cpfCnpj(value){
      value = value.replace(/\D/g,"")

      if(value.length > 11){

         //11223344556677
         value = value.replace(/(\d{2})(\d)/, "$1.$2")
         //11.223344556677
         value =value.replace(/(\d{3})(\d)/, "$1.$2")
         //'11.223.344556677'
         value =value.replace(/(\d{3})(\d)/, "$1/$2")
         //'11.223.344/556677'
         value =value.replace(/(\d{4})(\d)/, "$1-$2")
         //'11.223.344/5566-77'
      }else{
         value =value.replace(/(\d{3})(\d)/, "$1.$2")
         value =value.replace(/(\d{3})(\d)/, "$1.$2")
         value =value.replace(/(\d{3})(\d)/, "$1-$2")

      }

      return value
    },
    cep(value){
       if (value.length>5){
          value =value.replace(/(\d{5})(\d)/, "$1-$2")
         }
         return value
    }
    
 }
 
 
 const PhotosUpload ={
    input:"",
    preview:document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files:[],
   handleFileInput(event) {
         const{files : fileList}= event.target
         PhotosUpload.input = event.target

         if(PhotosUpload.hasLimit(event)) return
         
         Array.from(fileList).forEach(file=>{

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = ()=>{
               const image = new Image()
               image.src = String(reader.result)

               const div = PhotosUpload.getContainer(image)
               PhotosUpload.preview.appendChild(div)

            } 
            reader.readAsDataURL(file)
         
         })
         PhotosUpload.input.files = PhotosUpload.getAllFiles()

   },
   hasLimit(event){
      const {uploadLimit, input , preview}= PhotosUpload
      const {files: fileList} = input
      
         if (fileList.length > uploadLimit){
            alert(`Envie no maximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
         }
         const photosDiv=[]
         preview.childNodes.forEach(item =>{
            if(item.classList && item.classList.value == "photo")
            photosDiv.push(item)

         }) 
         const totalPhotos =fileList.length + photosDiv.length
         if(totalPhotos>uploadLimit){
            alert('Atingiu o maximo de fotos')
            event.preventDefault()
            return true
         }

         return false
   },
   getAllFiles(){
      const dataTransfer =new ClipboardEvent("").clipboardData || new DataTransfer()

      PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

      return dataTransfer.files
   },
   getContainer(image){
      const div = document.createElement('div')

         div.classList.add('photo')

         div.onclick =  PhotosUpload.removePhoto

         div.appendChild(image)

         div.appendChild(PhotosUpload.getRemoveButton())
         return div
   },
   getRemoveButton(){
      const button = document.createElement('i')
      button.classList.add('material-icons')
      button.innerHTML ="close"
      return button

   },
   removePhoto(event){
      const photoDiv = event.target.parentNode//<div class="photo">
      const photosArray = Array.from(PhotosUpload.preview.children)
      const index = photosArray.indexOf(photoDiv)

      PhotosUpload.files.splice(index, 1)
      PhotosUpload.input.files =PhotosUpload.getAllFiles()

      photoDiv.remove()

   },
   removeOldPhoto(){
      const photoDiv = event.target.parentNode

      if(photoDiv.id){
         const removedFiles = document.querySelector('input[name="removed_files"')
         if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
         }

   }
   photoDiv.remove()

 }
}
