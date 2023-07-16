const express = require('express');
const { searchPatentHandler, downloadDocumentHandler } = require('../controllers/patentController');

const router = express.Router();

router.get('/search', searchPatentHandler);
router.get('/download', downloadDocumentHandler);

module.exports = router;
