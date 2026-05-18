import { useTheme } from '../../context/ThemeContext';

const CustomerCard = ({ customer, onClick }) => {
  const { isDark } = useTheme();

  const isOverdue =
    customer.outstanding > 0 &&
    customer.nextDue &&
    new Date(customer.nextDue) < new Date();

  return (
    <div
      onClick={() => onClick(customer.id)}
      className={`card rounded-2xl p-6 cursor-pointer border ${
        isDark
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">
            {customer.name}
          </h2>

          <p className="text-sm text-gray-500">
            {customer.email}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isOverdue
              ? 'bg-red-100 text-red-600'
              : 'bg-green-100 text-green-600'
          }`}
        >
          {isOverdue ? 'Overdue' : 'Active'}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-gray-500 text-sm">
          Outstanding
        </p>

        <h3 className="text-3xl font-bold mt-1">
          ₹{customer.outstanding}
        </h3>
      </div>

      {customer.nextDue && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Due Date
          </p>

          <p>{customer.nextDue}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerCard;