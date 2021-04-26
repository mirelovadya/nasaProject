const User = require('../models/User')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const newUser = async (req, res) => {
    let myUser = new User(req.body)
    console.log(myUser);

    try {
        await myUser.save();
        let token = jwt.sign({ name: req.body.name, email: req.body.email, password: req.body.password }, process.env.ACSSES_TOKEN_SECRET)

        res.status(200).json({ newUser: myUser, token })
    }
    catch (error) {
        res.send("cannot save new user: ", error.message)
    }
}

const getAll = (req, res) => {
    console.log("get all users");

    User.find((err, users) => {
        console.log("getAll");
        if (err) {
            res.status(500).json({ error: err })
        }
        else
            res.status(200).json({ users: users })
    }
    ).populate({
        path: 'images',
        // match: {  }
    })


}


const getById = (req, res) => {
    console.log("getById");

    User.findById(req.params.userId).populate('images').then((user) => {
        res.status(200).json({ user: user })

    })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}

const login = (req, res) => {
    console.log("getByName");
    const user = User.findOne({ "name": req.params.userName, "password": req.params.userPassword }).then((user) => {
        if (user) {
            let token = jwt.sign({ name: req.params.userName, password: req.params.userPassword }, process.env.ACSSES_TOKEN_SECRET)
            res.status(200).json({ user: user, token })
        }
        else
            res.send("The user is not defined, Please register");

    })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}

const updateUser = async (req, res) => {
    let user
    try {
        user = await User.findByIdAndUpdate(req.params.userId, req.body)
        await user.save();
        res.status(200).send("the user is updated")
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}


// const deleteUser = async (req, res) => {
//     let user
//     try {
//         // user = await User.findByIdAndDelete(req.params.userId, req.body)
//         user = await User.findOneAndDelete({ "name": req.params.name }, req.body)
//         //user = await User.update({ name: req.params.name }, { $set: { password: req.body.password } })

//         res.status(200).send("the user is deleted")
//     }
//     catch (err) {
//         res.status(500).json({ error: err })
//     }
// }


module.exports = { newUser, getAll, getById, login, updateUser };