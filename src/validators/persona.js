const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
    date_of_birthday: Joi.date().required(),
    date_of_death: Joi.date(),
    job: Joi.string().min(2).required(),
    bio: Joi.string().min(2).max(255),
    photo: Joi.string().uri()
})

function validate(body) {

    return schema.validate({
        name: body.name,
        surname: body.surname,
        date_of_birthday: body.date_of_birthday,
        date_of_death: body.date_of_death,
        job: body.job,
        photo: body.photo
    }, { abortEarly: false })

    //abortEarly:false  Nos muestra todos los errores

}


module.exports = {

    validate,

}