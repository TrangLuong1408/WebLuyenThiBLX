//models/index.js
const mongoose = require('mongoose');

const Practice = require('./PracticeModel');

mongoose.Promise = global.Promise;
//Khai bao 1 doi tuong chua thong tin ve database
const db = {};
db.practice = Practice;

db.ConnectDB= () => mongoose
.connect(process.env.URL,{dbName: process.env.DBNAME})
    .then(console.log("Connected to MongoDB:"+process.env.DBNAME))
    .catch(error=> {
        console.log("Connect fail:" + error);
    });



module.exports = db;