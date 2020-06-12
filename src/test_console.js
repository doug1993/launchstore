data = require('./data.json')
instructor = data.instructors.find(function(instructor){
  return instructor.id == 5
})

date = new Date( 708480000000)
day = date.getDate()
console.log(day)
console.log(date)



  /*day = numbering.getDate()
  if(day==31){day=1}
  else{ day=day+1}*/