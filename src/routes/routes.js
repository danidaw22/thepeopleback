const express = require("express")
const router = express.Router()
const peopleController = require('../controllers/persona')

router.get('/persona/:id', peopleController.detail)
router.put('/persona/:id', peopleController.update)
router.delete('/persona/:id', peopleController.delete)
router.post('/persona', peopleController.create)


module.exports = router