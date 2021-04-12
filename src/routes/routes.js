const express = require("express")
const router = express.Router()
const peopleController = require('../controllers/people')

router.get('/people/:id', peopleController.detail)
router.put('/people/:id', peopleController.update)
router.delete('/people/:id', peopleController.delete)
router.post('/people', peopleController.create)


module.exports = router