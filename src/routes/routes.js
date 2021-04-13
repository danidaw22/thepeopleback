const express = require("express")
const router = express.Router()
const personaController = require('../controllers/persona')

//Rutas persona
router.get('/personas', personaController.getPeople)
router.get("/persona/:id", personaController.detail)
router.put('/persona/:id', personaController.update)
router.delete('/persona/:id', personaController.delete)
router.post('/persona', personaController.create)


module.exports = router