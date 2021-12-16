const Account = require('../models/account');

module.exports= {
    create,
}

async function create (req, res){
    if(req.body.category !== 'Deposit') req.body.amount = req.body.amount*(-1)
    const account = await Account.findById(req.params.id);
    account.transactions.push(req.body);
    account.save();
    res.redirect(`/accounts/${account._id}`)
    
}