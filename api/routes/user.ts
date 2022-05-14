const express = require('express')

const router = express.Router()
const multer = require('multer')

// Controller
const UserCtrl = require('../controllers/user.controller')()
const ImageSchema = require('../schemas/image.schema')

// Middlewares
import { verifyToken } from '../middlewares/auth.middleware'
import { upload } from '../middlewares/file-uploader';

router.route('/getAll')
    .get(/*verifyToken,*/ UserCtrl.getAll)

router.route('/:userUid')
    .get(verifyToken, UserCtrl.getUserByUid)

router.route('/uploadPhoto')
  .post(upload('users').single('image'), UserCtrl.uploadFacePhoto)

// router.route('/hhh/getImages').get(UserCtrl.getImages)

module.exports = router