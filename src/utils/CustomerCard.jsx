import { useTheme } from '../../context/ThemeContext';

const CustomerCard = ({ customer, onClick }) => {
  const { isDark } = useTheme();
  
  const isOverdue = customer.outstanding > 0 && 
    customer.nextDue && 
    new Date(customer.nextDue) < new Date();

  return (
    <div 
      onClick={() => onClick(customer.id)}
      className={`card rounded-2xl p-6 cursor-pointer border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} hover:border-teal-500 transition-all`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-xl">{customer.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</p>
        </div>
        
        {customer.outstanding > 0 && (
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            isOverdue 
              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' 
              : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
          }`}>
            {isOverdue ? 'Overdue' : 'Pending'}
          </span>
        )}
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-baseline">
          <p className="text-sm text-gray-500 dark:text-gray-400">Outstanding</p>
          <p className={`text-3xl font-bold ${customer.outstanding > 0 ? 'text-red-600' : 'text-teal-600'}`}>
            ₹{customer.outstanding.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {customer.nextDue && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Next Due</p>
          <p className="font-medium">{new Date(customer.nextDue).toLocaleDateString('en-IN')}</p>
        </div>
      )}

      <div className="mt-6 text-xs text-teal-600 font-medium flex items-center gap-1">
        View Ledger →
      </div>
    </div>
  );
};

export default CustomerCard;