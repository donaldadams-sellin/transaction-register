const Account = require('../models/account');

module.exports = {
    index,
    create,
}

async function index (req, res) {
    const accounts = await Account.find({user: req.user._id})
    res.render('accounts/index', {accounts});
}

function create (req, res) {
    console.log(req.body);
    const account = new Account();
    account.name = req.body.name;
    account.user = req.user._id
    req.body.amount === '' ? req.body.amount = 0 : req.body.amount = Number(req.body.amount);
    account.transactions.push({date: new Date(), amount: req.body.amount, category:'Deposit', description:'Initial Balance'})
    account.save();
    res.redirect('/accounts')
}