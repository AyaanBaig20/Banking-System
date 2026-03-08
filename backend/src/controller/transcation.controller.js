import accountModel from "../models/account.model.js";
import transcationModel from "../models/transcation.model.js";
import leadgerModel from "../models/ledger.model.js";
import mongoose from "mongoose";

async function createTranscation(req, res) {
  try {
    let { fromAcc, toAcc, amount, idempotencyKey } = req.body;

    if (!fromAcc || !toAcc || !amount || !idempotencyKey) {
      return res.status(400).json({ message: "Everything is required" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // 1. Check accounts exist
    const fromuserAcc = await accountModel.findById(fromAcc);
    const touserAcc = await accountModel.findById(toAcc);

    if (!fromuserAcc || !touserAcc) {
      return res.status(400).json({ message: "Account does not exist" });
    }

    // 2. Idempotency check
    const exsistingtranscation = await transcationModel.findOne({
      idempotencyKey,
    });

    if (exsistingtranscation) {
      return res.status(200).json({
        message: "Transaction already processed",
        transaction: exsistingtranscation,
      });
    }

    // 3. Check status
    if (fromuserAcc.status !== "Active" || touserAcc.status !== "Active") {
      return res.status(400).json({ message: "Account is not active" });
    }

    // 5. Create transaction
    let newtranscation = await transcationModel.create([
      {
        toAcc,
        fromAcc,
        amount,
        status: "Pending",
        idempotencyKey,
      },
    ]);

    newtranscation = newtranscation[0];

    // 6. Debit
    await leadgerModel.create([
      {
        account: fromAcc,
        amount,
        transcation: newtranscation._id,
        type: "Debit",
      },
    ]);

    // 7. Credit
    await leadgerModel.create([
      {
        account: toAcc,
        amount,
        transcation: newtranscation._id,
        type: "Credit",
      },
    ]);

    // 8. Update status
    newtranscation.status = "Complete";
    await newtranscation.save();
    return res.json({ message: "Transaction completed" });
    
  } catch (error) {
    return res.status(500).json({ message: "Transaction failed", error });
  }
}

async function SystemFunds(req, res) {
  try {
    let { toAcc, amount, idempotencyKey } = req.body;

    if (!toAcc || !amount || !idempotencyKey) {
      return res.status(400).json({ message: "Everything is required" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // 1. Check accounts exist
    const touserAcc = await accountModel.findById(toAcc);

    if (!touserAcc) {
      return res.status(400).json({ message: "Account does not exist" });
    }

    let fromAcc = "69ac085c468a7c5bfe254c07"

    // 2. Idempotency check
    const exsistingtranscation = await transcationModel.findOne({
      idempotencyKey,
    });

    if (exsistingtranscation) {
      return res.status(200).json({
        message: "Transaction already processed",
        transaction: exsistingtranscation,
      });
    }

    // 3. Check status
    if (touserAcc.status !== "Active") {
      return res.status(400).json({ message: "Account is not active" });
    }

    // 5. Create transaction
    let newtranscation = await transcationModel.create([
      {
        toAcc,
        fromAcc,
        amount,
        status: "Pending",
        idempotencyKey,
      },
    ]);

    newtranscation = newtranscation[0];

    // 6. Debit
    await leadgerModel.create([
      {
        account: fromAcc,
        amount,
        transcation: newtranscation._id,
        type: "Debit",
      },
    ]);

    // 7. Credit
    await leadgerModel.create([
      {
        account: toAcc,
        amount,
        transcation: newtranscation._id,
        type: "Credit",
      },
    ]);

    // 8. Update status
    newtranscation.status = "Complete";
    await newtranscation.save();

    return res.json({ message: "Transaction completed" });
  } catch (error) {
    return res.status(500).json({ message: "Transaction failed", error });
  }
}

export default { createTranscation, SystemFunds };
