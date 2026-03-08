import mongoose from "mongoose";
import leadgerModel from "../models/ledger.model.js"

let accountSchema = new mongoose.Schema({
  userinfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ["Active", "Frozen", "Deactive"],
    default: "Active",
  },
  currency: {
    type: String,
    default: "INR",
    required: true,
  },
});

accountSchema.index({ userinfo: 1, status: 1 });
accountSchema.methods.getBalance = async function () {
  const ledger = await leadgerModel.find({ account: this._id });

  let balance = 0;

  ledger.forEach((entry) => {
    if (entry.type === "Credit") {
      balance += entry.amount;
    } else if (entry.type === "Debit") {
      balance -= entry.amount;
    }
  });

  return balance;
};

let accountModel = mongoose.model("account", accountSchema);
export default accountModel;
