const Account = require('../models/account');

module.exports= {
    create,
    delete: deleteTransaction,
    update,
}

async function create (req, res, next){
    if(req.body.category !== 'Deposit') req.body.amount = req.body.amount*(-1);
    const account = await Account.findById(req.params.id);
    //ensure user creating transaction is accounts owner
    if(!req.user._id.equals(account.user)) return res.redirect('/accounts');
   //append a time to date to make it display properly, was displaying as previous date without this
    req.body.date = new Date(req.body.date+'T01:00');
    account.transactions.push(req.body);
    account.save()
    .then(function(){
        res.redirect(`/accounts/${account._id}`)
        //handle any errors
    }).catch(function(err){
        return next(err);
    });
    
}

async function deleteTransaction(req, res, next){
    const account = await Account.findOne({'transactions._id': req.params.id});
    if(!account.user.equals(req.user._id)) return redirect('/accounts');
    account.transactions.id(req.params.id).remove();
    account.save()
    .then(function(){
        res.redirect(`/accounts/${account._id}`)
    }).catch(function(err){
        return next(err);
    });

}

async function update(req, res, next){
    const account = await Account.findOne({'transactions._id': req.params.id});
    if(!account.user.equals(req.user._id)) return redirect('/accounts');
    console.log(req.body);
    if(req.body.category !== 'Deposit') req.body.amount = req.body.amount*(-1);
    account.transactions.id(req.params.id).set(req.body);
    account.save()
    .then(function(){
        res.redirect(`/accounts/${account._id}`)
    }).catch(function(err){
        return next(err);
    });
}