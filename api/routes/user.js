const express = require('express')

const router = express.Router()

// Controller
const UserCtrl = require('../controllers/user.controller')()

router.route('/getAll')
    .get(/*isAuth, apiPermissions, TrimRequest.body, createUserValidation,*/ UserCtrl.getAll)

module.exports = router