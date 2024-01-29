const express = require('express')
const router = express.Router()

const { list, changeRole, userActive, update, remove } = require('../Controllers/user')
const { auth, adminCheck } = require('../Middleware/auth')


// http://localhost:5000/api/user
router.get('/manage-user', auth, adminCheck, list)
router.post('/change-role', auth, adminCheck, changeRole)
router.post('/user-active', auth, adminCheck, userActive)
router.put('/user-update/:id', auth, adminCheck, update)
router.delete('/user-delete/:id', remove)



module.exports = router