const Account = require('../models/account');

module.exports = {
    index,
    create,
    show,
}

async function index (req, res) {
    const accounts = await Account.find({user: req.user._id})
    res.render('accounts/index', {accounts});
}

function create (req, res) {
    const account = new Account();
    account.name = req.body.name;
    account.user = req.user._id
    req.body.amount === '' ? req.body.amount = 0 : req.body.amount = Number(req.body.amount);
    account.transactions.push({date: new Date(), amount: req.body.amount, category:'Deposit', description:'Initial Balance'})
    account.save();
    res.redirect('/accounts')
}

async function show(req, res){
    const account = await Account.findById(req.params.id)
    account.transactions.sort(function(tran1, tran2){
        if (tran1.date < tran2.date) return -1;
        if (tran1.date > tran2.date) return 1;
        return 0;
    })
    res.render('accounts/show', {account})
}