const nodemailer = require('nodemailer')

module.exports  = nodemailer.createTransport({
 host: "smtp.mailtrap.io",
 port: 2525,
 auth: {
   user: "eedefa75e4e53c",
   pass: "f94ac6adc1effc"
 }
})
