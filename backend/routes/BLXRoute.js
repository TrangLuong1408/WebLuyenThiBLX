//routes/BLXRoute.js
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const db = require('../models');
const CauDiemLiet = db.CauDiemLiet;
const OnLuyenThi = db.OnLuyenThi;



// list all thong tin collection CauDiemLiet
    const ListOnCauLiet = async (req, res) => {
    try {
        const allData = await CauDiemLiet.find(); // Lấy tất cả dữ liệu trong collection
        res.status(200).json(allData); // Trả về dữ liệu ở dạng JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//list all thong tin collection OnLuyenThi
const ListOnLuyen = async (req, res) => {
    try {
        const allData = await OnLuyenThi.find(); // Lấy tất cả dữ liệu trong collection
        res.status(200).json(allData); // Trả về dữ liệu ở dạng JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Tạo router
const BLXRouter = express.Router();
BLXRouter.use(bodyParser.json());
BLXRouter.get("/OnCauLiet", ListOnCauLiet);
BLXRouter.get("/OnLuyenAll", ListOnLuyen);



// Export movieRouter
module.exports = BLXRouter;