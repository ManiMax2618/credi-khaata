import { useTheme } from '../../context/ThemeContext';

const CustomerCard = ({
  customer,
  onClick,
  onDelete,
}) => {
  const { isDark } = useTheme();

  const isOverdue =
    customer.outstanding > 0 &&
    customer.nextDue &&
    new Date(customer.nextDue) < new Date();

  return (
    <div
      className={`rounded-2xl p-5 border relative transition-all hover:shadow-lg ${
        isDark
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();

          onDelete(
            customer.id,
            customer.name
          );
        }}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-xl shadow-md"
      >
        ×
      </button>

      {/* Click Area */}
      <div
        onClick={() => onClick(customer.id)}
        className="cursor-pointer"
      >
        {/* Status */}
        <div className="mb-5">
          <span
            className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold ${
              isOverdue
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-600'
            }`}
          >
            {isOverdue
              ? 'Overdue'
              : 'Active'}
          </span>
        </div>

        {/* Name */}
        <div className="mb-6">
          <h2
            className={`text-3xl font-bold leading-tight ${
              isDark
                ? 'text-white'
                : 'text-gray-900'
            }`}
          >
            {customer.name}
          </h2>

          <p
            className={`mt-2 text-lg ${
              isDark
                ? 'text-gray-400'
                : 'text-gray-500'
            }`}
          >
            {customer.email}
          </p>
        </div>

        {/* Outstanding */}
        <div className="mb-6">
          <p
            className={`text-base ${
              isDark
                ? 'text-gray-400'
                : 'text-gray-500'
            }`}
          >
            Outstanding
          </p>

          <h3
            className={`text-5xl font-bold mt-2 ${
              customer.outstanding > 0
                ? 'text-red-500'
                : isDark
                ? 'text-white'
                : 'text-gray-900'
            }`}
          >
            ₹{customer.outstanding}
          </h3>
        </div>

        {/* Due Date */}
        {customer.nextDue && (
          <div className="mb-6">
            <p
              className={`text-base ${
                isDark
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }`}
            >
              Due Date
            </p>

            <p
              className={`text-xl font-semibold mt-1 ${
                isDark
                  ? 'text-white'
                  : 'text-gray-900'
              }`}
            >
              {customer.nextDue}
            </p>
          </div>
        )}

        {/* Footer */}
        <div>
          <p className="text-teal-500 font-semibold text-lg">
            View Details →
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;