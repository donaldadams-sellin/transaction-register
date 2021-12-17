const express = require('express');
const router = express.Router();
const transactionsCtrl = require('../controllers/transactions')

//routes in this file are prefixed with only /

//POST route to /accounts/:id/transactions to create new transaction
router.post('/accounts/:id/transactions', transactionsCtrl.create);

//DELETE route to /transactions/:id to remove transaction
router.delete('/transactions/:id', transactionsCtrl.delete)

//PUT route to update transaction for editing
router.put('/transactions/:id', transactionsCtrl.update)

module.exports = router;