const today = new Date()
module.exports = {
 
    date: function(time){
        const date = new Date(time)
        const birthDate = new Date(time)

        year = birthDate.getUTCFullYear()
        month = `0${birthDate.getUTCMonth()+1}`.slice(-2)
        day = `0${birthDate.getUTCDate()}`.slice(-2)
        
        return `${year}-${month}-${day}`
       
    },
    formatPrice(value){
        return new Intl.NumberFormat('pt-BR',{ 
            style:'currency', 
            currency:'BRL'
         }).format(value/100)
    }
}

 
/*
    */