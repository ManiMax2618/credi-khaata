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

  const [loans, setLoans] = useState(() => {
    const savedLoans =
      localStorage.getItem(`loans-${id}`);

    return savedLoans
      ? JSON.parse(savedLoans)
      : [];
  });

  const [repayments, setRepayments] = useState(() => {
    const savedRepayments =
      localStorage.getItem(`repayments-${id}`);

    return savedRepayments
      ? JSON.parse(savedRepayments)
      : [];
  });

  // Load customer
  useEffect(() => {
    const savedCustomers = JSON.parse(
      localStorage.getItem('customers')
    );

    const foundCustomer = savedCustomers?.find(
      (c) => c.id === parseInt(id)
    );

    if (foundCustomer) {
      setCustomer(foundCustomer);
    }
  }, [id]);

  // Save loans
  useEffect(() => {
    localStorage.setItem(
      `loans-${id}`,
      JSON.stringify(loans)
    );
  }, [loans, id]);

  // Save repayments
  useEffect(() => {
    localStorage.setItem(
      `repayments-${id}`,
      JSON.stringify(repayments)
    );
  }, [repayments, id]);

  const handleAddLoan = (newLoan) => {
    const loan = {
      ...newLoan,
      id: Date.now(),
      balance: Number(newLoan.amount),
    };

    setLoans([...loans, loan]);

    toast.success('Loan added successfully');
  };

  const handleRepayment = (repayment) => {
    const repaymentAmount = Number(
      repayment.amount
    );

    const updatedLoans = loans.map((loan, index) => {
      if (index === 0) {
        return {
          ...loan,
          balance: Math.max(
            0,
            loan.balance - repaymentAmount
          ),
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

  const totalOutstanding = loans.reduce(
    (total, loan) => total + loan.balance,
    0
  );

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text('CrediKhaata Statement', 20, 20);

    doc.setFontSize(12);

    doc.text(
      `Customer: ${customer.name}`,
      20,
      40
    );

    doc.text(
      `Email: ${customer.email}`,
      20,
      50
    );

    doc.text(
      `Outstanding: ₹${totalOutstanding}`,
      20,
      60
    );

    doc.text('Loans:', 20, 80);

    loans.forEach((loan, index) => {
      doc.text(
        `${index + 1}. ${loan.item} | Amount: ₹${
          loan.amount
        } | Balance: ₹${loan.balance}`,
        20,
        95 + index * 10
      );
    });

    doc.save(
      `${customer.name}-statement.pdf`
    );

    toast.success('PDF Downloaded');
  };

  if (!customer) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <button
            onClick={() => navigate('/')}
            className="text-teal-600 mb-3 hover:underline"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">
            {customer.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {customer.email} • {customer.phone}
          </p>
        </div>

        <button
          onClick={downloadPDF}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-medium"
        >
          Download PDF
        </button>
      </div>

      {/* Summary */}
      <div
        className={`p-6 rounded-3xl ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <h2 className="text-lg font-semibold mb-2">
          Total Outstanding
        </h2>

        <p className="text-4xl font-bold text-red-500">
          ₹{totalOutstanding}
        </p>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Loan */}
        <div
          className={`p-6 rounded-3xl ${
            isDark ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">
            Add Loan
          </h2>

          <AddLoanForm onSave={handleAddLoan} />
        </div>

        {/* Add Repayment */}
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
          {loans.map((loan) => {
            const isOverdue =
              new Date(loan.dueDate) <
                new Date() &&
              loan.balance > 0;

            return (
              <div
                key={loan.id}
                className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {loan.item}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Due: {loan.dueDate}
                    </p>

                    {isOverdue && (
                      <span className="inline-block mt-3 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                        Overdue
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xl">
                      ₹{loan.amount}
                    </p>

                    <p className="text-red-500 mt-1">
                      Balance: ₹{loan.balance}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
          {repayments.length > 0 ? (
            repayments.map((repayment) => (
              <div
                key={repayment.id}
                className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3"
              >
                <p className="font-medium">
                  ₹{repayment.amount}
                </p>

                <p className="text-gray-500">
                  {repayment.date}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No repayments yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;