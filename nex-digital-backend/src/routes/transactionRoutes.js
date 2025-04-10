const express = require('express');
const multer = require('multer');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const { uploadSpreadsheet, getTransactions, getWallet } = require('../controllers/transactionController');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', authMiddleware, adminMiddleware, upload.single('file'), uploadSpreadsheet);
router.get('/', authMiddleware, getTransactions);
router.get('/wallet', authMiddleware, getWallet);

module.exports = router;