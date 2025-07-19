const express = require('express');
const { getExamples, createExample, exampleSchema } = require('../controllers/exampleController');

const router = express.Router();

// Middleware for validation
const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        console.error('Validation error:', error.details); // Log validation errors
        console.error('Request body:', req.body); // Log request body for debugging
        return res.status(400).json({ message: 'Validation error', details: error.details });
    }
    next();
};

// Define routes
router
    .route('/')
    .get(getExamples)
    .post(validateRequest(exampleSchema), createExample);

module.exports = router;
