//routes/BLXRoute.js
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
// const Practice = require('./PracticeModel');


const db = require('../models');
const Practice = require("../models/PracticeModel");
const Account = require("../models/AccountModel");
const Result = require("../models/ResultModel");


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
                res.json({ message: "Login successful!",user });
            } else {
                res.json({ message:"The password is incorrect" })
            }
        } else {
            res.json({ message:"The account is not existed" })
        }
    })
}


// Create a new practice
const createPractice = async (req, res) => {
    try {
        const newPractice = new Practice(req.body);
        const savedPractice = await newPractice.save();
        res.status(201).json(savedPractice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read all practices
const getAllPractices = async (req, res) => {
    try {
        const allPractices = await Practice.find({});
        res.status(200).json(allPractices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a single practice by ID
const getPracticeById = async (req, res) => {
    try {
        const practice = await Practice.findById(req.params.id);
        if (!practice) {
            return res.status(404).json({ message: "Practice not found" });
        }
        res.status(200).json(practice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a practice by ID
const updatePracticeById = async (req, res) => {
    try {
        const updatedPractice = await Practice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPractice) {
            return res.status(404).json({ message: "Practice not found" });
        }
        res.status(200).json(updatedPractice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a practice by ID
const deletePracticeById = async (req, res) => {
    try {
        const deletedPractice = await Practice.findByIdAndDelete(req.params.id);
        if (!deletedPractice) {
            return res.status(404).json({ message: "Practice not found" });
        }
        res.status(200).json({ message: "Practice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRandomPractices = async (req, res) => {
    try {
        const nonRequiredPractices = await Practice.aggregate([
            { $match: { RequireQuestion: false } },
            { $sample: { size: 22 } }
        ]);
        const requiredPractices = await Practice.aggregate([
            { $match: { RequireQuestion: true } },
            { $sample: { size: 3 } }
        ]);
        const randomPractices = [...nonRequiredPractices, ...requiredPractices];
        res.status(200).json(randomPractices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to calculate the score of a result
const calculateScore = async (answers) => {
    let score = 0;
    for (const answer of answers) {
        const practice = await Practice.findById(answer.practice);
        if (practice) {
            // Find the correct answer based on isCorrect flag
            const correctAnswer = practice.answers.find(a => a.isCorrect);
            
            // Check if selectedAnswer includes or equals the correct answer text
            if (correctAnswer && (answer.selectedAnswer === correctAnswer.text || answer.selectedAnswer.includes(correctAnswer.text))) {
                answer.isCorrect = true; // Mark as correct
                score += 1;
            } else {
                answer.isCorrect = false; // Mark as incorrect if it doesn't match
            }
        }
    }
    return score;
};


// Create a new result and calculate the score
const createResult = async (req, res) => {
    try {
        const { user, answers } = req.body;
        
        // Verify user exists
        const userExists = await Account.findById(user);
       

        // Validate each answer and calculate the score
        const score = await calculateScore(answers);

        // Save the result
        const newResult = new Result({
            user,
            answers,
            score
        });

        const savedResult = await newResult.save();
        res.status(201).json(savedResult);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// Read all results
const getAllResults = async (req, res) => {
    try {
        const allResults = await Result.find({});
        res.status(200).json(allResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a single result by ID
const getResultById = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id).populate("user").populate("answers.practice");
        if (!result) {
            return res.status(404).json({ message: "Result not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a result by ID
const updateResultById = async (req, res) => {
    try {
        const updatedResult = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResult) {
            return res.status(404).json({ message: "Result not found" });
        }
        res.status(200).json(updatedResult);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a result by ID
const deleteResultById = async (req, res) => {
    try {
        const deletedResult = await Result.findByIdAndDelete(req.params.id);
        if (!deletedResult) {
            return res.status(404).json({ message: "Result not found" });
        }
        res.status(200).json({ message: "Result deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getResultsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const results = await Result.find({ user: userId }).populate("user").populate("answers.practice");
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No results found for this user" });
        }
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const BLXRouter = express.Router();
BLXRouter.use(bodyParser.json());

BLXRouter.get("/practices", getAllPractices);
BLXRouter.get("/practices/:id", getPracticeById);
BLXRouter.get("/results", getAllResults);
BLXRouter.get("/results/:id", getResultById);
BLXRouter.get("/results/user/:userId", getResultsByUserId); 
BLXRouter.get("/random-practices", getRandomPractices);

BLXRouter.post("/results", createResult);
BLXRouter.post("/practices", createPractice);
BLXRouter.post("/register", Register);
BLXRouter.post("/login", Login)

BLXRouter.put("/practices/:id", updatePracticeById);
BLXRouter.put("/results/:id", updateResultById);

BLXRouter.delete("/results/:id", deleteResultById);
BLXRouter.delete("/practices/:id", deletePracticeById);

// Export movieRouter
module.exports = BLXRouter;