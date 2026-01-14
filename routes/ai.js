const express = require('express');
const router = express.Router();
const { generateSummary, suggestPriority, autoCompleteDescription } = require('../controllers/aiController');

router.post('/summary', generateSummary);
router.post('/suggest-priority', suggestPriority);
router.post('/autocomplete', autoCompleteDescription);

module.exports = router;
