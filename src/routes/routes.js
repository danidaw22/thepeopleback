const express = require("express")
const router = express.Router()
const personaController = require('../controllers/persona')
const userController = require('../controllers/user')
const passport = require('../auth/auth')

//Rutas persona
router.get('/personas', personaController.getPeople)
router.get("/persona/:id", personaController.detail)
router.put('/persona/:id', passport.auth, personaController.update)
router.delete('/persona/:id', passport.auth, personaController.delete)
router.post('/persona', passport.auth, personaController.create)

//Rutas user
router.post("/signup", userController.signup)
router.post("/login", userController.login)

module.exports = router