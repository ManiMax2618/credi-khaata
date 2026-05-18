import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mockCustomers } from '../../data/mockData';
import AddCustomerForm from '../../components/forms/AddCustomerForm';
import CustomerCard from '../../components/ui/CustomerCard';

const Dashboard = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const handleAddCustomer = (newCustomer) => {
    const customer = {
      ...newCustomer,
      id: Date.now(),
      outstanding: 0,
      nextDue: null,
    };
    setCustomers([...customers, customer]);
    setShowAddForm(false);
    toast.success('Customer added successfully!');
  };

  const handleCustomerClick = (id) => {
    navigate(`/customer/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Outstanding balances and next due dates.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
        >
          + Add Customer
        </button>
      </div>

      {/* Add Customer Form Modal */}
      {showAddForm && (
        <AddCustomerForm 
          onClose={() => setShowAddForm(false)} 
          onSave={handleAddCustomer} 
        />
      )}

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <CustomerCard 
            key={customer.id} 
            customer={customer} 
            onClick={handleCustomerClick}
          />
        ))}
      </div>

      {customers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">No customers yet. Add your first customer!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;