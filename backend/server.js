const express = require('express');
const mongoose = require('mongoose');
const server = express();
server.use(express.json());
const  db  = require('./models');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpError = require("http-errors");
const cors = require("cors");


server.use(cors());

//import router
const { BLXRouter } = require('./routes');


require('dotenv').config();


server.use(morgan("dev"));
server.use(bodyParser.json());

//de y de bai muon route ntn
server.use("/", BLXRouter);

server.use(async (req, res, next) => {
    next(httpError.NotFound());
});
server.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: {
            status: error.status || 500,
            message: error.message,
        },
    });
});










server.listen(process.env.PORT, "localhost", () => {
    console.log("Server is running at " + process.env.PORT);
    db.ConnectDB();
});
