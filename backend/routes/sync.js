const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');

// When a GET request hits the root of this router, run initializeSync
router.get('/initialize', syncController.initializeSync);
router.get('/audit/changes', syncController.getAuditChanges);
router.post('/rows-by-ids', syncController.getRowsByIds);

module.exports = router;