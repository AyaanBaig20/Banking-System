import accountModel from "../models/account.model.js";
import userModel from "../models/user.models.js";

// Create Account
async function createAccount(req, res) {
  let user = req.user;
  let newacc = await accountModel.create({
    userinfo: user._id,
  });
  res.json({ message: "account created" });
}

// check balance
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

export default { createAccount, CheckBalance };
