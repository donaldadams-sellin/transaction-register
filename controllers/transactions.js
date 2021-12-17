const Account = require('../models/account');

module.exports= {
    create,
    delete: deleteTransaction,
    update,
}

async function create (req, res){
    if(req.body.category !== 'Deposit') req.body.amount = req.body.amount*(-1);
    const account = await Account.findById(req.params.id);
    if(!req.user._id.equals(account.user)) return res.redirect('/accounts');
    account.transactions.push(req.body);
    account.save()
    .then(res.redirect(`/accounts/${account._id}`));
    
}

async function deleteTransaction(req, res){
    const account = await Account.findOne({'transactions._id': req.params.id});
    if(!account.user.equals(req.user._id)) return redirect('/accounts');
    account.transactions.id(req.params.id).remove();
    account.save().then(res.redirect(`/accounts/${account._id}`));

}

async function update(req, res){
    const account = await Account.findOne({'transactions._id': req.params.id});
    if(!account.user.equals(req.user._id)) return redirect('/accounts');
    console.log(req.body);
    if(req.body.category !== 'Deposit') req.body.amount = req.body.amount*(-1);
    account.transactions.id(req.params.id).set(req.body);
    account.save().then(res.redirect(`/accounts/${account._id}`));
}