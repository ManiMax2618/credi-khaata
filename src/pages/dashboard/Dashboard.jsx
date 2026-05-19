import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { mockCustomers } from '../../data/mockData';

import AddCustomerForm from '../../components/forms/AddCustomerForm';

import CustomerCard from '../../components/ui/CustomerCard';

import { useTheme } from '../../context/ThemeContext';

const Dashboard = () => {
  const { isDark } = useTheme();

  const [customers, setCustomers] = useState(() => {
    const savedCustomers =
      localStorage.getItem('customers');

    return savedCustomers
      ? JSON.parse(savedCustomers)
      : mockCustomers;
  });

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState('');

  const navigate = useNavigate();

  // Save customers
  useEffect(() => {
    localStorage.setItem(
      'customers',
      JSON.stringify(customers)
    );
  }, [customers]);

  // Filter customers
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Add customer
  const handleAddCustomer = (newCustomer) => {
    const customer = {
      ...newCustomer,
      id: Date.now(),
      outstanding: 0,
      nextDue: null,
    };

    setCustomers([...customers, customer]);

    setShowAddForm(false);

    toast.success(
      'Customer added successfully!'
    );
  };

  // Delete customer
  const handleDeleteCustomer = (
    customerId,
    customerName
  ) => {
    const confirmDelete = window.confirm(
      `Delete ${customerName}?`
    );

    if (!confirmDelete) return;

    const updatedCustomers = customers.filter(
      (customer) => customer.id !== customerId
    );

    setCustomers(updatedCustomers);

    // Remove related storage
    localStorage.removeItem(
      `loans-${customerId}`
    );

    localStorage.removeItem(
      `repayments-${customerId}`
    );

    toast.success(
      'Customer deleted successfully!'
    );
  };

  // Open detail page
  const handleCustomerClick = (id) => {
    navigate(`/customer/${id}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1
            className={`text-5xl font-bold ${
              isDark
                ? 'text-white'
                : 'text-gray-900'
            }`}
          >
            Dashboard
          </h1>

          <p className="text-gray-500 mt-3 text-xl">
            Manage customer credit and
            repayments.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-2xl font-semibold text-xl transition-all"
        >
          + Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className={`w-full px-6 py-5 rounded-3xl border text-xl focus:outline-none transition-all ${
            isDark
              ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-teal-500'
          }`}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Total Customers */}
        <div
          className={`rounded-3xl p-8 border shadow-sm ${
            isDark
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <p className="text-gray-500 text-lg">
            Total Customers
          </p>

          <h2
            className={`text-6xl font-bold mt-5 ${
              isDark
                ? 'text-white'
                : 'text-gray-900'
            }`}
          >
            {customers.length}
          </h2>
        </div>

        {/* Active Customers */}
        <div
          className={`rounded-3xl p-8 border shadow-sm ${
            isDark
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <p className="text-gray-500 text-lg">
            Active Customers
          </p>

          <h2 className="text-6xl font-bold mt-5 text-teal-500">
            {
              customers.filter(
                (customer) =>
                  customer.outstanding > 0
              ).length
            }
          </h2>
        </div>

        {/* Outstanding */}
        <div
          className={`rounded-3xl p-8 border shadow-sm ${
            isDark
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <p className="text-gray-500 text-lg">
            Total Outstanding
          </p>

          <h2 className="text-6xl font-bold mt-5 text-red-500">
            ₹
            {customers.reduce(
              (total, customer) =>
                total + customer.outstanding,
              0
            )}
          </h2>
        </div>
      </div>

      {/* Modal */}
      {showAddForm && (
        <AddCustomerForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddCustomer}
        />
      )}

      {/* Customer Cards */}
      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onClick={handleCustomerClick}
              onDelete={handleDeleteCustomer}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-2xl">
            No customers found.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;