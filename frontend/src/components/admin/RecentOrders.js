import { Link } from 'react-router-dom';

const RecentOrders = () => {
  // In a real app, you would fetch these from your API
  const orders = [
    { id: 1, customer: 'John Doe', amount: 120.50, status: 'paid' },
    { id: 2, customer: 'Jane Smith', amount: 89.99, status: 'shipped' },
    { id: 3, customer: 'Bob Johnson', amount: 45.00, status: 'pending' }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link to={`/admin/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900">
                  #{order.id}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${order.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${order.status === 'paid' ? 'bg-blue-100 text-blue-800' : ''}
                  ${order.status === 'shipped' ? 'bg-green-100 text-green-800' : ''}
                `}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;