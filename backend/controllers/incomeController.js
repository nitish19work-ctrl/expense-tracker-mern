const xlsx = require('xlsx');
const Income = require("../models/IncomeModel");
console.log("Income model check:", Income);

// Add Income Source 
exports.addIncome = async (req, res) => {
  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const income = await Income.create({
      userId: req.user.id,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    res.status(201).json({
      message: "Income added successfully",
      income,
    });

  } catch (error) {
    console.error("ADD INCOME ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// Get All Income Source
exports.getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id });
    res.status(200).json(incomes);
  } catch (error) {
    console.error("GET INCOME ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    const deleted = await Income.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });

  } catch (error) {
    console.error("DELETE INCOME ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// ✅ Download Excel (Save + Download Both)
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // ✅ 1. VS Code me file save karega (backend folder me)
    xlsx.writeFile(wb, "income_details.xlsx");

    // ✅ 2. Postman ko download bhejega
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
      "attachment; filename=income_details.xlsx"
    );

    res.send(buffer);

  } catch (error) {
    console.error("DOWNLOAD EXCEL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};