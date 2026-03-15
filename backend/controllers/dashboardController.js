const Income = require("../models/IncomeModel");
const Expense = require("../models/ExpenseModel");
const { Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {

    // 🔥 DEBUG
    console.log("USER FROM TOKEN:", req.user);

    const userId = req.user.id;
    console.log("USER ID:", userId);

    const userObjectId = new Types.ObjectId(userId);

    // TOTAL INCOME
    const totalIncomeData = await Income.find({ userId: userObjectId });
    console.log("INCOME FOUND:", totalIncomeData.length);

    const totalIncome = totalIncomeData.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    // TOTAL EXPENSE
    const totalExpenseData = await Expense.find({ userId: userObjectId });
    console.log("EXPENSE FOUND:", totalExpenseData.length);

    const totalExpense = totalExpenseData.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    // LAST 60 DAYS INCOME
    const last60DaysIncomeTransactions = await Income.find({
  userId: userObjectId
}).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0
    );

    // LAST 30 DAYS EXPENSE
    const last30daysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    const expenseLast30days = last30daysExpenseTransactions.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0
    );

    // RECENT TRANSACTIONS
    const recentIncome = await Income.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);

    const recentExpense = await Expense.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);

    const lastTransactions = [
      ...recentIncome.map((txn) => ({
        ...txn.toObject(),
        type: "income",
      })),
      ...recentExpense.map((txn) => ({
        ...txn.toObject(),
        type: "expense",
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,

      last30daysExpense: {
        total: expenseLast30days,
        transactions: last30daysExpenseTransactions,
      },

      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },

      recentTransactions: lastTransactions,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};