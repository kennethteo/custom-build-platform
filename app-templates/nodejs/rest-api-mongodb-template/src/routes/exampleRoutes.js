const express = require('express');
const { getExamples, createExample } = require('../controllers/exampleController');

const router = express.Router();

router.route('/').get(getExamples).post(createExample);

module.exports = router;
