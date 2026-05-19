import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jsPDF } from 'jspdf';

import { useTheme } from '../../context/ThemeContext';

import AddLoanForm from '../../components/forms/AddLoanForm';
import AddRepaymentForm from '../../components/forms/AddRepaymentForm';

const CustomerDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { isDark } = useTheme();

  const [customer, setCustomer] =
    useState(null);

  const [loans, setLoans] = useState(() => {
    const saved =
      localStorage.getItem(`loans-${id}`);

    return saved ? JSON.parse(saved) : [];
  });

  const [repayments, setRepayments] =
    useState(() => {
      const saved =
        localStorage.getItem(
          `repayments-${id}`
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  // Load customer
  useEffect(() => {
    const customers =
      JSON.parse(
        localStorage.getItem('customers')
      ) || [];

    const foundCustomer =
      customers.find(
        (c) => c.id === Number(id)
      );

    if (foundCustomer) {
      setCustomer(foundCustomer);
    }
  }, [id]);

  // Sync loans + dashboard
  useEffect(() => {
    localStorage.setItem(
      `loans-${id}`,
      JSON.stringify(loans)
    );

    const outstanding = loans.reduce(
      (total, loan) =>
        total +
        Number(loan.balance || 0),
      0
    );

    const latestDue =
      loans.length > 0
        ? loans[loans.length - 1].dueDate
        : null;

    const customers =
      JSON.parse(
        localStorage.getItem('customers')
      ) || [];

    const updatedCustomers = customers.map(
      (c) =>
        c.id === Number(id)
          ? {
              ...c,
              outstanding,
              nextDue: latestDue,
              status:
                outstanding > 0
                  ? 'Active'
                  : 'Cleared',
            }
          : c
    );

    localStorage.setItem(
      'customers',
      JSON.stringify(updatedCustomers)
    );

    const updatedCustomer =
      updatedCustomers.find(
        (c) => c.id === Number(id)
      );

    setCustomer(updatedCustomer);
  }, [loans, id]);

  // Save repayments
  useEffect(() => {
    localStorage.setItem(
      `repayments-${id}`,
      JSON.stringify(repayments)
    );
  }, [repayments, id]);

  // Add Loan
  const handleAddLoan = (newLoan) => {
    const loan = {
      ...newLoan,
      id: Date.now(),
      balance: Number(newLoan.amount),
    };

    setLoans((prev) => [...prev, loan]);

    toast.success(
      'Loan added successfully'
    );
  };

  // Add repayment
  const handleRepayment = (repayment) => {
    const amount = Number(
      repayment.amount
    );

    let remaining = amount;

    const updatedLoans = loans.map(
      (loan) => {
        if (remaining <= 0)
          return loan;

        const deduction = Math.min(
          loan.balance,
          remaining
        );

        remaining -= deduction;

        return {
          ...loan,
          balance:
            loan.balance - deduction,
        };
      }
    );

    setLoans(updatedLoans);

    setRepayments((prev) => [
      ...prev,
      {
        ...repayment,
        id: Date.now(),
      },
    ]);

    toast.success(
      'Repayment added successfully'
    );
  };

  // Total outstanding
  const totalOutstanding =
    loans.reduce(
      (total, loan) =>
        total + loan.balance,
      0
    );

  // PDF Download
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      'CrediKhaata Statement',
      20,
      20
    );

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
      `Phone: ${customer.phone}`,
      20,
      60
    );

    doc.text(
      `Outstanding: ₹${totalOutstanding}`,
      20,
      70
    );

    doc.text('Loans:', 20, 90);

    loans.forEach((loan, index) => {
      doc.text(
        `${index + 1}. ${
          loan.item
        } | ₹${loan.amount} | Balance ₹${
          loan.balance
        }`,
        20,
        105 + index * 10
      );
    });

    doc.save(
      `${customer.name}-statement.pdf`
    );

    toast.success('PDF Downloaded');
  };

  if (!customer) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 space-y-8 ${
        isDark
          ? 'bg-black text-white'
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <button
            onClick={() =>
              navigate('/')
            }
            className="text-teal-500 mb-3"
          >
            ← Back
          </button>

          <h1 className="text-5xl font-bold">
            {customer.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {customer.email} •{' '}
            {customer.phone}
          </p>
        </div>

        <button
          onClick={downloadPDF}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-2xl font-semibold"
        >
          Download PDF
        </button>
      </div>

      {/* Outstanding */}
      <div
        className={`rounded-3xl p-8 shadow ${
          isDark
            ? 'bg-gray-950 border border-gray-800'
            : 'bg-white border border-gray-200'
        }`}
      >
        <h2 className="text-2xl font-semibold mb-3">
          Total Outstanding
        </h2>

        <p className="text-6xl font-bold text-red-500">
          ₹{totalOutstanding}
        </p>
      </div>

      {/* Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Loan */}
        <div
          className={`rounded-3xl p-7 shadow ${
            isDark
              ? 'bg-gray-950 border border-gray-800'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h2 className="text-4xl font-bold mb-6">
            Add Loan
          </h2>

          <AddLoanForm
            onSave={handleAddLoan}
          />
        </div>

        {/* Repayment */}
        <div
          className={`rounded-3xl p-7 shadow ${
            isDark
              ? 'bg-gray-950 border border-gray-800'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h2 className="text-4xl font-bold mb-6">
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
        className={`rounded-3xl p-7 shadow ${
          isDark
            ? 'bg-gray-950 border border-gray-800'
            : 'bg-white border border-gray-200'
        }`}
      >
        <h2 className="text-3xl font-bold mb-6">
          Loan History
        </h2>

        <div className="space-y-4">
          {loans.length > 0 ? (
            loans.map((loan) => (
              <div
                key={loan.id}
                className={`rounded-2xl p-5 border ${
                  isDark
                    ? 'bg-black border-gray-800'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {loan.item}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Due:{' '}
                      {loan.dueDate}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold">
                      ₹{loan.amount}
                    </p>

                    <p className="text-red-500 mt-1">
                      Balance: ₹
                      {loan.balance}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No loans added yet.
            </p>
          )}
        </div>
      </div>

      {/* Repayment History */}
      <div
        className={`rounded-3xl p-7 shadow ${
          isDark
            ? 'bg-gray-950 border border-gray-800'
            : 'bg-white border border-gray-200'
        }`}
      >
        <h2 className="text-3xl font-bold mb-6">
          Repayment History
        </h2>

        <div className="space-y-3">
          {repayments.length > 0 ? (
            repayments.map(
              (repayment) => (
                <div
                  key={repayment.id}
                  className={`flex justify-between border-b pb-3 ${
                    isDark
                      ? 'border-gray-800'
                      : 'border-gray-200'
                  }`}
                >
                  <p className="font-semibold">
                    ₹
                    {
                      repayment.amount
                    }
                  </p>

                  <p className="text-gray-500">
                    {repayment.date}
                  </p>
                </div>
              )
            )
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