import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomerCard from '../../components/ui/CustomerCard';
import AddCustomerForm from '../../components/forms/AddCustomerForm';

import { useTheme } from '../../context/ThemeContext';

const Dashboard = () => {
  const navigate = useNavigate();

  const { isDark, toggleTheme } = useTheme();

  const [customers, setCustomers] = useState(() => {
    const savedCustomers =
      localStorage.getItem('customers');

    return savedCustomers
      ? JSON.parse(savedCustomers)
      : [];
  });

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [search, setSearch] = useState('');

  // Save customers
  useEffect(() => {
    localStorage.setItem(
      'customers',
      JSON.stringify(customers)
    );
  }, [customers]);

  // Add customer
  const handleAddCustomer = (newCustomer) => {
    const customer = {
      ...newCustomer,
      id: Date.now(),
      outstanding: 0,
      nextDue: null,
    };

    setCustomers((prev) => [
      ...prev,
      customer,
    ]);

    setShowAddForm(false);
  };

  // Delete customer
  const handleDeleteCustomer = (id) => {
    const updatedCustomers = customers.filter(
      (customer) => customer.id !== id
    );

    setCustomers(updatedCustomers);

    localStorage.removeItem(`loans-${id}`);
    localStorage.removeItem(
      `repayments-${id}`
    );
  };

  // Open customer detail
  const handleCustomerClick = (id) => {
    navigate(`/customer/${id}`);
  };

  // Search filter
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // Total outstanding
  const totalOutstanding = customers.reduce(
    (sum, customer) =>
      sum + (customer.outstanding || 0),
    0
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-100 ${
        isDark
          ? 'bg-black text-white'
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center px-5 py-4 border-b ${
          isDark
            ? 'bg-gray-950 border-gray-800'
            : 'bg-white border-gray-200'
        }`}
      >
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold text-teal-500">
            CrediKhaata
          </h1>

          <p className="text-sm text-gray-500">
            Credit Ledger
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-2xl"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href =
                '/login';
            }}
            className="text-red-500 font-semibold"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-5 py-5">
        {/* Top */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-4xl font-bold">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-1">
              Manage customer credit and
              repayments.
            </p>
          </div>

          <button
            onClick={() =>
              setShowAddForm(true)
            }
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-2xl font-semibold"
          >
            + Add Customer
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className={`w-full px-5 py-3 rounded-2xl border mb-6 outline-none ${
            isDark
              ? 'bg-gray-950 border-gray-800 text-white'
              : 'bg-white border-gray-300 text-black'
          }`}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Customers */}
          <div
            className={`rounded-3xl p-5 shadow ${
              isDark
                ? 'bg-gray-950 border border-gray-800'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p className="text-gray-500 mb-2">
              Total Customers
            </p>

            <h3 className="text-4xl font-bold">
              {customers.length}
            </h3>
          </div>

          {/* Active */}
          <div
            className={`rounded-3xl p-5 shadow ${
              isDark
                ? 'bg-gray-950 border border-gray-800'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p className="text-gray-500 mb-2">
              Active Customers
            </p>

            <h3 className="text-4xl font-bold text-teal-500">
              {
                customers.filter(
                  (c) =>
                    c.outstanding > 0
                ).length
              }
            </h3>
          </div>

          {/* Outstanding */}
          <div
            className={`rounded-3xl p-5 shadow ${
              isDark
                ? 'bg-gray-950 border border-gray-800'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p className="text-gray-500 mb-2">
              Total Outstanding
            </p>

            <h3 className="text-4xl font-bold text-red-500">
              ₹{totalOutstanding}
            </h3>
          </div>
        </div>

        {/* Customer Cards */}
        {filteredCustomers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCustomers.map(
              (customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  onClick={
                    handleCustomerClick
                  }
                  onDelete={
                    handleDeleteCustomer
                  }
                />
              )
            )}
          </div>
        ) : (
          <div
            className={`rounded-3xl p-10 text-center ${
              isDark
                ? 'bg-gray-950 border border-gray-800'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p className="text-gray-500">
              No customers found.
            </p>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {showAddForm && (
        <AddCustomerForm
          onClose={() =>
            setShowAddForm(false)
          }
          onSave={handleAddCustomer}
        />
      )}
    </div>
  );
};

export default Dashboard;