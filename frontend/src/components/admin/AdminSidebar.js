import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        <Link 
          to="/admin" 
          className="block px-4 py-2 hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link 
          to="/admin/products/create" 
          className="block px-4 py-2 hover:bg-gray-700"
        >
          Create Product
        </Link>
        <Link 
          to="/admin/orders" 
          className="block px-4 py-2 hover:bg-gray-700"
        >
          Manage Orders
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;