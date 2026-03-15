const express = require("express");

const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// add expense
router.post("/add", protect, addExpense);

// get all expenses
router.get("/get", protect, getAllExpense);

// download excel
router.get("/downloadexcel", protect, downloadExpenseExcel);

// delete expense
router.delete("/:id", protect, deleteExpense);

module.exports = router;