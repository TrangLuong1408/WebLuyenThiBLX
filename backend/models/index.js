//models/index.js
const mongoose = require('mongoose');

const Practice = require('./PracticeModel');
const Account = require('./AccountModel');
const Result = require('./ResultModel');
mongoose.Promise = global.Promise;
//Khai bao 1 doi tuong chua thong tin ve database
const db = {};
db.practice = Practice;
db.account = Account;
db.result = Result;
//Ket noi voi database
db.ConnectDB= () => mongoose
.connect(process.env.URL,{dbName: process.env.DBNAME})
    .then(console.log("Connected to MongoDB:"+process.env.DBNAME))
    .catch(error=> {
        console.log("Connect fail:" + error);
    });



module.exports = db;