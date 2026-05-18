import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import AddLoanForm from '../../components/forms/AddLoanForm';
import AddRepaymentForm from '../../components/forms/AddRepaymentForm';
import { jsPDF } from 'jspdf';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [customer, setCustomer] = useState(null);
  const [loans, setLoans] = useState([]);
  const [repayments, setRepayments] = useState([]);

  useEffect(() => {
    setCustomer({
      id: parseInt(id),
      name: 'Ledger Customer',
      email: 'ledger@example.com',
      phone: '555-0199',
    });

    setLoans([
      {
        id: 101,
        item: 'Rice Bag',
        amount: 5000,
        dueDate: '2026-05-12',
        balance: 4000,
        date: '2026-05-01',
      },
    ]);

    setRepayments([
      {
        id: 201,
        amount: 1000,
        date: '2026-05-12',
      },
    ]);
  }, [id]);

  const handleAddLoan = (newLoan) => {
    setLoans([
      ...loans,
      {
        ...newLoan,
        id: Date.now(),
        balance: newLoan.amount,
      },
    ]);

    toast.success('Loan added successfully');
  };

  const handleRepayment = (repayment) => {
    const updatedLoans = loans.map((loan, index) => {
      if (index === 0) {
        return {
          ...loan,
          balance: Math.max(0, loan.balance - repayment.amount),
        };
      }
      return loan;
    });

    setLoans(updatedLoans);

    setRepayments([
      ...repayments,
      {
        ...repayment,
        id: Date.now(),
      },
    ]);

    toast.success('Repayment added');
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text('CrediKhaata Statement', 20, 20);
    doc.text(`Customer: ${customer.name}`, 20, 40);

    loans.forEach((loan, index) => {
      doc.text(
        `${index + 1}. ${loan.item} - ₹${loan.amount}`,
        20,
        60 + index * 10
      );
    });

    doc.save('statement.pdf');

    toast.success('PDF Downloaded');
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <button
            onClick={() => navigate('/')}
            className="text-teal-600 mb-3"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">{customer.name}</h1>

          <p className="text-gray-500">
            {customer.email} • {customer.phone}
          </p>
        </div>

        <button
          onClick={downloadPDF}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl"
        >
          Download PDF
        </button>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`p-6 rounded-3xl ${
            isDark ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Add Loan</h2>

          <AddLoanForm onSave={handleAddLoan} />
        </div>

        <div
          className={`p-6 rounded-3xl ${
            isDark ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">
            Add Repayment
          </h2>

          <AddRepaymentForm
            loans={loans}
            onSave={handleRepayment}
          />
        </div>
      </div>

      {/* Loan History */}
      <div
        className={`p-6 rounded-3xl ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <h2 className="text-xl font-semibold mb-5">
          Loan History
        </h2>

        <div className="space-y-4">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{loan.item}</h3>

                  <p className="text-sm text-gray-500">
                    Due: {loan.dueDate}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    ₹{loan.amount}
                  </p>

                  <p className="text-red-500">
                    Balance: ₹{loan.balance}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Repayment History */}
      <div
        className={`p-6 rounded-3xl ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <h2 className="text-xl font-semibold mb-5">
          Repayment History
        </h2>

        <div className="space-y-3">
          {repayments.map((repayment) => (
            <div
              key={repayment.id}
              className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3"
            >
              <p>₹{repayment.amount}</p>

              <p className="text-gray-500">
                {repayment.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;