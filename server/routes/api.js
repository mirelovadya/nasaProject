const router = require('express').Router();
const user = require('../controllers/user')
const picture = require('../controllers/picture')
const token=require('../Middelware/token')

router.post('/newUser', user.newUser)
router.get('/login/:userName/:userPassword', user.login)

router.get('/getAllUsers',token, user.getAll)
router.get('/getUserById/:userId', user.getById)
router.patch('/updateUser/:userId',token, user.updateUser)

router.post('/newPicture/:userName/:userPassword',token, picture.newPicture)
router.post('/uploadPicture/:userName/:userPassword/:fileName/:fileType/:fileWebkitRelativePath/:fileLastModifiedDate',token, picture.uploadPicture)
router.get('/getPictureById/:pictureId', picture.getPictureById)
router.get('/getAllPicture',token, picture.getAllPicture)
router.get('/getPictureByUserNameAndPassword/:userName/:userPassword',token, picture.getPictureByUserNameAndPassword)
// router.delete('/deletePicture/:pictureId', picture.deletePicture)
module.exports = router

// router.patch('/updateBlogTitle/:blogId',picture.updateBlog)

// router.patch('/updateUser/:name', user.updateUser)

// router.delete('/deleteUser/:name', user.deleteUser);

