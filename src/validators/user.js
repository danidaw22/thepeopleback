const Joi = require('joi')

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(9).required(),
})

function validate(body) {

    return schema.validate({
        email: body.email,
        password: body.password,
    }, { abortEarly: false })

    //abortEarly:false  Nos muestra todos los errores

}


module.exports = {

    validate,

}