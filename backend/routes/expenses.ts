import express from 'express';
import { Expense } from '../models/Expense';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Create expense
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { amount, category, description, transaction_date, receipt_url } = req.body;
    const expense = await Expense.create({
      userId: req.user!.id,
      amount,
      category,
      description,
      transaction_date,
      receipt_url,
    });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create expense' });
  }
});

// Get expenses
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user!.id }).sort({ transaction_date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
});

// Delete expense
router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    console.log(req.params.id)
    await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user!.id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// Stats example (aggregations)
router.get('/stats/summary', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const agg = await Expense.aggregate([
      { $match: { userId: req.user!.id } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);
    res.json(agg[0] || { total: 0, count: 0 });
  } catch (err) {
    res.status(500).json({ message: 'Stats failed' });
  }
});

export default router;
