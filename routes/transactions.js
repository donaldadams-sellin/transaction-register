const express = require('express');
const router = express.Router();
const transactionsCtrl = require('../controllers/transactons')

//routes in this file are prefixed with only /

//POST route to /accounts/:id/transactions to create new transaction
router.post('/accounts/:id/transactions', transactionsCtrl.create);


module.exports = router;