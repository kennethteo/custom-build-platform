const Joi = require('joi');
const Example = require('../models/exampleModel');

// Validation schema
const exampleSchema = Joi.object({
    name: Joi.string().min(1).required(), // Ensure name is not empty
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
            console.error('Validation error details:', error.details); // Log validation error details
            return res.status(400).json({ message: 'Validation error', details: error.details });
        }

        // Check for duplicate entries
        const existingExample = await Example.findOne({ name: req.body.name });
        if (existingExample) {
            return res.status(400).json({ message: 'Duplicate entry', details: 'An example with the same name already exists.' });
        }

        const example = await Example.create(req.body);

        // Map _id to id in the response
        const response = {
            id: example._id,
            name: example.name,
            description: example.description,
            createdAt: example.createdAt,
            updatedAt: example.updatedAt
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Error in createExample:', error.message); // Log unexpected errors
        res.status(400).json({ message: 'Failed to create example', error: error.message });
    }
};

module.exports = {
    getExamples,
    createExample,
    exampleSchema
};
