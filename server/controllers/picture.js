const Picture = require("../models/Picture")
const User = require('../models/User')
const requestApi = require('../requestApi');

const newPicture = async (req, res) => {
    try {
        let user = await User.findOne({ name: req.params.userName, password: req.params.userPassword })
        console.log(user.name);

        const data = await requestApi.requestApi()
        let picture = JSON.parse(data);
        let myPicture = new Picture();
        myPicture.date = picture.date;
        myPicture.explanation = picture.explanation;
        myPicture.hdurl = picture.hdurl;
        myPicture.media_type = picture.media_type;
        myPicture.service_version = picture.service_version;
        myPicture.title = picture.title;
        myPicture.url = picture.url;

        myPicture.userId = user._id;
        await myPicture.save();
        user.pictures.push(myPicture)
        await user.save();
        res.status(200).json({ "newPicture": picture });
    }
    catch (err) {
        res.status(500).json({ "error": err.message });
    }
}


const getPictureById = (req, res) => {
    console.log("getPictureById");

    Picture.findById(req.params.pictureId).populate('userId').then((picture) => {
        res.status(200).json({ picture: picture })

    })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}


const getAllPicture = (req, res) => {

    Picture.find().populate('userId').then((pictures) => {
        res.status(200).json({ pictures: pictures })
    })
        .catch((err) => {
            res.status(500).json({ error: err })
        })

}
const getPictureByUserNameAndPassword = async(req, res) => {
    console.log(`history picture`);

    try {
        let user = await User.findOne({ name: req.params.userName, password: req.params.userPassword })
        console.log(user.name);
        console.log(user._id);

        let picturs =await Picture.find({ userId: user._id })
        
        console.log(` hi ${picturs.title}`);
        console.log(` hi ${picturs}`);

        res.status(200).json({ picturs: picturs })

    }
    catch (err) {
        res.status(500).json({ error: err })

    }

}


const deletePicture = async (req, res) => {
    try {
        let picture = await Picture.findOne({ _id: req.params.pictureId })

        picture.remove()
        picture.save();
        res.status(200).send("picture is deleted");

    }
    catch (err) {
        res.status(500).json({ "error": err.message });

    }
}


const uploadPicture = async (req, res) => {
    try {
        let user = await User.findOne({ name: req.params.userName, password: req.params.userPassword })
        console.log(user.name);
        console.log("hi");

        // const pictureDetailes = req.params.fileName;
        // const pictureDetailes = req.params.fileType;
        // const pictureDetailes = req.params.fileWebkitRelativePath;
        // const pictureDetailes = req.params.fileLastModifiedDate;


        let myPicture = new Picture();
        myPicture.date = req.params.fileLastModifiedDate;
        myPicture.media_type = "img";
        myPicture.title = req.params.fileName;
        myPicture.url = req.params.fileWebkitRelativePath;

        myPicture.userId = user._id;
        await myPicture.save();
        user.pictures.push(myPicture)
        await user.save();
        res.status(200).json({ "newPicture": myPicture });
    }
    catch (err) {
        res.status(500).json({ "error": err.message });
    }
}
module.exports = { newPicture, getPictureById, getAllPicture, getPictureByUserNameAndPassword, deletePicture, uploadPicture }