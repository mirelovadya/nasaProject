const Admin = require('../models/Admin');
const User = require('../models/User');
const Weather = require('../models/Weather');
const jwt = require('jsonwebtoken');

// const newAdmin = async (req, res) => {
//     let myAdmin = new Admin(req.body)
//     let token = jwt.sign({ adminId: myAdmin._id }, 'secret')
//     console.log(token);

//     console.log(myAdmin);
//     try {
//         await myAdmin.save();
//         res.status(200).json({ myToken: token })
//     }
//     catch (error) {
//         res.send("cannot save new admin: ", error.message)
//     }

// }


const getAdmin = async (req, res) => {
    console.log("getById");
    let admin = await Admin.findOne({ name: req.params.adminName }).then((admin) => {
        res.status(200).json({ admin: admin })

    })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}
const getAllAdmin = async (req, res) => {
    let decoded = jwt.verify(req.headers['authorization'], 'secret')
    console.log(decoded);
    let admin1 = await Admin.findById(decoded)
    if (admin1) {

        console.log("getAllAdmin");
        let admin = await Admin.find().populate('users').then((admin) => {
            res.status(200).json({ admin: admin })

        })
            .catch((err) => {
                res.status(500).json({ error: err })
            })
    }
    else res.send(500)
}


// const deleteAdmin = async (req, res) => {
//     try {
//         let admin = await Admin.findOne({ _id: req.params.adminId })
//         let users = await User.find({ adminId: admin._id })

//          users.forEach(element => {
//             await Weather.deleteMany({ userId: element._id })
//         });

//         let users = await User.deleteMany({ adminId: admin._id })

//         users.save();

//         admin.remove();
//         admin.save()
//         res.status(200).send("weather is deleted");

//     }
//     catch (err) {
//         res.status(500).json({ "error": err.message });

//     }
// }



const updateAdmin = async (req, res) => {
    let decoded = jwt.verify(req.headers['authorization'], 'secret')
    console.log(decoded);
    let admin1 = await User.findByIdAndUpdate({ _id: decoded })
    if (admin1) {

        try {
            await Admin.findByIdAndUpdate(req.params.adminId, req.body)
            res.status(200).send("admin is updated");
        }
        catch (err) {
            res.status(500).json({ "error": err.message });

        }
    }
    else res.send(500)
}


const loginAdmin = async (req, res) => {

    try {
        let token = jwt.sign(req.params.adminId, 'secret')
        console.log(token);
        let admin = await Admin.findById(req.params.adminId)
        if (admin == null) {
            res.send('couldnt find admin')
        }
        else {
            res.status(200).json({ myToken: token })
        }
    }
    catch (error) {
        res.status(500).json({ myMessage: error.message })
    }
}

module.exports = { newAdmin, getAdmin, getAllAdmin, updateAdmin ,loginAdmin};