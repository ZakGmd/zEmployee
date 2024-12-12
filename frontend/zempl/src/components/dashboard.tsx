import { Link, Outlet } from 'react-router-dom';
import { Users, ClipboardCheck, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
     
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-800">Employee Dashboard</h1>
        </div>
        <nav className="mt-4">
          <Link to="/" className="flex items-center px-4 py-2 text-gray-700  transition-all duration-500  hover:bg-gray-200">
            <Users className="mr-2" size={20} />
            Employees
          </Link>
          <Link to="/evaluation" className="flex items-center px-4 py-2 text-gray-700  transition-all duration-500 hover:bg-gray-200">
            <BarChart2 className="mr-2" size={20} />
            Evaluation
          </Link>
          <Link to="/tasks" className="flex items-center px-4 py-2 text-gray-700  transition-all duration-500 hover:bg-gray-200">
            <ClipboardCheck className="mr-2" size={20} />
            Tasks
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

