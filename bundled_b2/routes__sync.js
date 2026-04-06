const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');
const syncPushController = require('../controllers/syncPushController');

router.get('/initialize', syncController.initializeSync);
router.get('/audit/changes', syncController.getAuditChanges);
router.post('/rows-by-ids', syncController.getRowsByIds);
router.post('/push', syncPushController.pushChanges);

module.exports = router;