const express = require('express');
const router = express.Router();
const accountsCtrl = require('../controllers/accounts')

//all routes in this file are prefixed with /accounts

//GET request for /accounts
router.get('/', accountsCtrl.index);

//POST request to create new account
router.post('/', accountsCtrl.create)

//GET request to view specific account
router.get('/:id', accountsCtrl.show)


module.exports = router;