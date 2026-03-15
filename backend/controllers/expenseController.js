const xlsx = require("xlsx");
const Expense = require("../models/ExpenseModel");
console.log("Expense model check:", Expense);

// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = await Expense.create({
      userId: req.user.id,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });

  } catch (error) {
    console.error("ADD EXPENSE ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// Get All Expense
exports.getAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("GET EXPENSE ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });

  } catch (error) {
    console.error("DELETE EXPENSE ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// ✅ Download Expense Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // Save in backend folder
    xlsx.writeFile(wb, "expense_details.xlsx");

    // Send to Postman
    const buffer = xlsx.write(wb, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense_details.xlsx"
    );

    res.send(buffer);

  } catch (error) {
    console.error("DOWNLOAD EXPENSE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};