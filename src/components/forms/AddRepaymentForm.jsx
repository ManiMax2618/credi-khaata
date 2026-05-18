import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const AddRepaymentForm = ({ loans, onSave }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    loanId: loans.length > 0 ? loans[0].id : '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || parseInt(formData.amount) <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    onSave({
      loanId: formData.loanId,
      amount: parseInt(formData.amount),
      date: formData.date
    });

    // Reset amount
    setFormData({
      ...formData,
      amount: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Select Loan</label>
        <select
          name="loanId"
          value={formData.loanId}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-teal-500"
        >
          {loans.map(loan => (
            <option key={loan.id} value={loan.id}>
              {loan.item} — Balance ₹{loan.balance}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-teal-500"
          placeholder="1000"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-teal-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl font-medium mt-2"
      >
        Save Repayment
      </button>
    </form>
  );
};

export default AddRepaymentForm;