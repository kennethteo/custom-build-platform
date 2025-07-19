const Joi = require('joi');
const Example = require('../models/exampleModel');

// Validation schema
const exampleSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
});

// Get all examples
const getExamples = async (req, res) => {
    try {
        const examples = await Example.find();
        res.status(200).json(examples);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch examples', error: error.message });
    }
};

// Create a new example
const createExample = async (req, res) => {
    try {
        const { error } = exampleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validation error', details: error.details });
        }

        const example = await Example.create(req.body);
        res.status(201).json(example);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create example', error: error.message });
    }
};

module.exports = {
    getExamples,
    createExample,
    exampleSchema
};
