const express = require('express');
const {handleGenerateNewUrl, gandleGenerateByid, handleGetAnalytics} = require('../controllers/url')


const router = express.Router();

router.post('/', handleGenerateNewUrl);
router.get('/:id',gandleGenerateByid);
router.get('/anlytics/:id', handleGetAnalytics)


module.exports = router