import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const AddRepaymentForm = ({
  loans,
  onSave
}) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    loanId: '',
    amount: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.loanId ||
      !formData.amount ||
      !formData.date
    ) {
      alert('All fields are required!');
      return;
    }

    onSave({
      loanId: parseInt(formData.loanId),
      amount: parseInt(formData.amount),
      date: formData.date
    });

    setFormData({
      loanId: '',
      amount: '',
      date: ''
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Loan Select */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Select Loan
        </label>

        <select
          name="loanId"
          value={formData.loanId}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-teal-500 ${
            isDark
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="">
            Select a loan
          </option>

          {loans.map((loan) => (
            <option
              key={loan.id}
              value={loan.id}
            >
              {loan.item} - ₹
              {loan.balance}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Amount (₹)
        </label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="1000"
          required
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-teal-500 ${
            isDark
              ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Date
        </label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={{
            colorScheme: isDark
              ? 'dark'
              : 'light'
          }}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-teal-500 ${
            isDark
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
      </div>

      {/* Button */}
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