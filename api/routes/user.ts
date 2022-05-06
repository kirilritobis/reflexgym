const express = require('express')

const router = express.Router()
const multer = require('multer')

// Controller
const UserCtrl = require('../controllers/user.controller')()
const ImageSchema = require('../schemas/image.schema')

// Middlewares
import { verifyToken } from '../middlewares/auth.middleware'

router.route('/getAll')
    .get(verifyToken, UserCtrl.getAll)

router.route('/:userUid')
    .get(verifyToken, UserCtrl.getUserByUid)

router.route('/bahur/uploadPhotoTest')
  .post(UserCtrl.uploadFacePhoto)
module.exports = router