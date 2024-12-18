import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { getEmployees } from '../services/api';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees  = await getEmployees();
        console.log({employees})
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', department: '' });

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.department) {
      setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
      setNewEmployee({ name: '', position: '', department: '' });
    }
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded outline-none"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          className="border p-2 rounded outline-none"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          className="border p-2 rounded outline-none"
          value={newEmployee.department}
          onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
        />
        <button
          onClick={addEmployee}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center  transition-all duration-300"
        >
          <Plus size={20} className="mr-2" />
          Add Employee
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Position</th>
            <th className="border p-2 text-left">Department</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.position}</td>
              <td className="border p-2">{employee.department}</td>
              <td className="border p-2">
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600  transition-all duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;

