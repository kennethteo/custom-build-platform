const Example = require('../models/exampleModel');

// Get all examples
const getExamples = async (req, res) => {
    try {
        const examples = await Example.find();
        res.status(200).json(examples);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new example
const createExample = async (req, res) => {
    try {
        const example = await Example.create(req.body);
        res.status(201).json(example);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getExamples, createExample };
