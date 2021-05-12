const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
    birthdate: Joi.date().less('now').required(),
    job: Joi.string().min(2).required(),
    bio: Joi.string().min(2).max(255),
    photo: Joi.string().uri()
})

function validate(body) {

    return schema.validate({
        name: body.name,
        surname: body.surname,
        birthdate: body.birthdate,
        job: body.job,
        photo: body.photo
    }, { abortEarly: false })

    //abortEarly:false  Nos muestra todos los errores

}


module.exports = {

    validate,

}