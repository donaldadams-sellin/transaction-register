const Account = require('../models/account');

module.exports = {
    index,
    create,
    show,
    delete: deleteAccount,
    update,
    filter
}

async function index(req, res) {
    const accounts = await Account.find({ user: req.user._id })
    res.render('accounts/index', { accounts });
}

function create(req, res, next) {
    const account = new Account();
    account.name = req.body.name;
    account.user = req.user._id
    req.body.amount === '' ? req.body.amount = 0 : req.body.amount = Number(req.body.amount);
    account.transactions.push({ date: new Date(), amount: req.body.amount, category: 'Deposit', description: 'Initial Balance' })
    account.save()
    .then(function(){
        res.redirect('/accounts')
    }).catch(function(err){
        return next(err);
    });
}

async function show(req, res) {
    const account = await Account.findById(req.params.id);
    //prevent anyone other than the proper user from accessing the page
    if (!req.user._id.equals(account.user)) return res.redirect('/accounts');
    //sort transactions for display from most recent to oldest
    account.transactions.sort(function (tran1, tran2) {
        if (tran1.date < tran2.date) return 1;
        if (tran1.date > tran2.date) return -1;
        return 0;
    })
    res.render('accounts/show', { account })
}

function deleteAccount(req, res) {
    Account.findOneAndDelete({ _id: req.params.id, user: req.user._id }, function (err) {
        res.redirect('/accounts');
    });
}

async function update(req, res, next) {
    const account = await Account.findById(req.params.id);
    console.log(account)
    //prevent modifying of name by anyone other than proper user
    if(!account.user.equals(req.user._id)) return redirect('/accounts');
    account.name = req.body.name;
    account.save()
    .then(function(){
        res.redirect('/accounts')
    }).catch(function(err){
        return next(err);
    });
}

//function to filter displayed transactions by category
async function filter(req, res){
    const account = await Account.findById(req.params.id);
    //just display regular page if filter selection is All
    if(req.body.category === 'All') return res.redirect(`/accounts/${account._id}`);
    //create array of all transactions so balance is still displayed properly on filters page
    account.allTransactions = account.transactions
    //filter the array and sort it properly
    account.transactions = account.transactions.filter(transaction => transaction.category === req.body.category);
    account.transactions.sort(function (tran1, tran2) {
        if (tran1.date < tran2.date) return 1;
        if (tran1.date > tran2.date) return -1;
        return 0;
    })
    res.render('accounts/filter', { account, category: req.body.category })
}