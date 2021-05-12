const userController = {}

const User = require('../models/user.js')
const userValidator = require('../validators/user')
const authJWT = require("../auth/jwt")

userController.signup = async(req, res) => {
    const email = req.body.email
    const password = req.body.password


    const validation = userValidator.validate(req.body)

    if (validation.error) {
        const errors = validation.error.details.map(error => error.message)

        res.status(400).send(errors)

        return
    }

    try {
        const user = new User({ email: email, password: password })
        await user.save()
        const data = await User.findOne({ email: email })
        res.send({ status: "ok", data: data })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

userController.login = async(req, res) => {

    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        res.status(401).send("Credenciales incorrectas")
        return
    }

    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(401).send("Credenciales incorrectas")
            return
        }
        const validate = await user.isValidPassword(password)
        if (!validate) {
            res.status(401).send("Credenciales incorrectas")
            return
        }

        const dataToken = authJWT.createToken(user)

        return res.send({
            access_token: dataToken[0],
            expires_in: dataToken[1],
            email: email
        })
    } catch (err) {
        console.log(err)
        res.status(401).send("Credenciales incorrectas")
        return
    }

}

module.exports = userController