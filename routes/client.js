const express = require('express');

const router = express.Router();
const clientController = require('../controllers/client_controller');

router.get('/details', clientController.client);
router.post('/image',clientController.upload);

module.exports = router;