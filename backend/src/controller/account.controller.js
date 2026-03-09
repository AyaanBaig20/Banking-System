import accountModel from "../models/account.model.js";

// Create Account
async function createAccount(req, res) {
  let user = req.user;
  let newacc = await accountModel.create({
    userinfo: user._id,
  });
  res.json({ message: "account created" });
}

// check balance
async function CheckBalance(req, res) {
  try {
    let { accountid } = req.params;
    let account = await accountModel.findOne({
      _id: accountid,
      userinfo: req.user._id,
    });

    if (!account) {
      return res.json({ message: "Account not found" });
    }

    const balance = await account.getBalance();

    res.json({ balance });
  } catch (error) {
    res.status(500).json({ message: "Error getting balance", error });
  }
}

// Check Accounts
async function CheckAccount(req,res) {
  let userid = req.user._id;
  let multiplesAccounts = await accountModel.find({userinfo:userid})
  if(!multiplesAccounts || multiplesAccounts.length==0){
    return res.json({message:"You dont have any Account"})
  }
  return res.json(multiplesAccounts)
}

export default { createAccount, CheckBalance,CheckAccount };
