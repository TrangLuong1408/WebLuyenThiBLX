//routes/BLXRoute.js
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
// const Practice = require('./PracticeModel');


const db = require('../models');
const Practice = require("../models/PracticeModel");
const Account = require("../models/AccountModel");
// const Practice = db.practice;
// const Account = db.account;





//list all thong tin collection OnLuyenThi
const ListOnLuyen = async (req, res) => {
    try {
        const allData = await Practice.find(); // Lấy tất cả dữ liệu trong collection
        res.status(200).json(allData); // Trả về dữ liệu ở dạng JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const Register = async (req, res) => {
    Account.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
}

const Login = async (req,res) => {
    const {username, password} = req.body;
    Account.findOne({username: username})
    .then(user => {
        if (user) {
            if(user.password === password) {
                res.json({ message: "Login successful!" });
            } else {
                res.json({ message:"The password is incorrect" })
            }
        } else {
            res.json({ message:"The account is not existed" })
        }
    })
}







// Tạo router
const BLXRouter = express.Router();
BLXRouter.use(bodyParser.json());
// BLXRouter.get("/OnCauLiet", ListOnCauLiet);
BLXRouter.get("/practices", ListOnLuyen);
BLXRouter.post("/register", Register);
BLXRouter.post("/login", Login)



// Export movieRouter
module.exports = BLXRouter;