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
      className={`rounded-3xl p-6 border relative overflow-hidden transition-all ${
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
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-xl shadow-lg z-20"
      >
        ×
      </button>

      {/* Card Click Area */}
      <div
        onClick={() => onClick(customer.id)}
        className="cursor-pointer"
      >
        {/* Status Badge */}
        <div className="mb-6">
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
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

        {/* Customer Info */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold">
            {customer.name}
          </h2>

          <p className="text-gray-500 mt-3 text-xl">
            {customer.email}
          </p>
        </div>

        {/* Outstanding */}
        <div className="mt-10">
          <p className="text-gray-500 text-xl">
            Outstanding
          </p>

          <h3
            className={`text-6xl font-bold mt-4 ${
              customer.outstanding > 0
                ? 'text-red-500'
                : 'text-white'
            }`}
          >
            ₹{customer.outstanding}
          </h3>
        </div>

        {/* Due Date */}
        {customer.nextDue && (
          <div className="mt-10">
            <p className="text-gray-500 text-xl">
              Due Date
            </p>

            <p className="text-3xl font-semibold mt-3">
              {customer.nextDue}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12">
          <p className="text-teal-500 font-semibold text-2xl">
            View Details →
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;