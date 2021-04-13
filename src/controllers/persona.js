const personaController = {}
const Persona = require('../models/persona.js')
const personaValidator = require('../validators/persona')

personaController.create = async(req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const bio = req.body.bio
    const job = req.body.job
    const photo = req.body.photo
    const date_of_birthday = req.body.date_of_birthday
    const date_of_death = req.body.date_of_death

    /*if (!name || !surname || !job || !date_of_birthday) {
        res.status(400).send()
        return
    }*/

    const validation = personaValidator.validate(req.body)

    if (validation.error) {
        const errors = validation.error.details.map(error => error.message)

        res.status(400).send(errors)

        return
    }

    //Comprobacion fecha de fallecimiento es mayor que fecha nacimiento
    if (date_of_death) {
        if (date_of_death < date_of_birthday) {
            res.status(400).send('La fecha de fallecimiento es incorrecta')
            return
        }
    }


    try {
        const persona = new Persona({ name: name, surname: surname, bio: bio, job: job, photo: photo, date_of_birthday: date_of_birthday, date_of_death: date_of_death })
        await persona.save()
        res.status(204).send("Agregado correctamente")
        return
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
}

personaController.detail = async(req, res) => {
    const id = req.params.id
    try {
        const persona = await Persona.findById(id)
        res.json(persona)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

personaController.update = async(req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const bio = req.body.bio
    const job = req.body.job
    const photo = req.body.photo
    const date_of_birthday = req.body.date_of_birthday
    const date_of_death = req.body.date_of_death

    const validation = personaValidator.validate(req.body)

    if (validation.error) {
        const errors = validation.error.details.map(error => error.message)

        res.status(400).send(errors)

        return
    }

    //Comprobacion fecha de fallecimiento es mayor que fecha nacimiento
    if (date_of_death) {
        if (date_of_death < date_of_birthday) {
            res.status(400).send('La fecha de fallecimiento es incorrecta')
            return
        }
    }

    try {
        await Persona.findByIdAndUpdate(req.params.id, { name: name, surname: surname, bio: bio, job: job, photo: photo, date_of_birthday: date_of_birthday, date_of_death: date_of_death, updatedAt: Date.now() })
        res.status(204).send()

    } catch (err) {
        res.status(500).send(err)
    }

}

personaController.delete = async(req, res) => {
    let id = req.params.id
    try {
        await Persona.findByIdAndDelete(id)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

personaController.getPeople = async(req, res) => {
    const filter = req.query.filter
    const filter2 = req.query.filter2
    try {

        const query = {
            $or: [{
                    name: new RegExp(filter, 'i')
                },
                {
                    surname: new RegExp(filter, 'i')
                },
                {
                    date_of_birthday: {
                        $gte: filter,
                        $lt: filter2
                    }
                }
            ]
        }

        const personas = await Persona.find(query)
        res.json(personas)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}




module.exports = personaController