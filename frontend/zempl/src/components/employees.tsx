import { Plus, MoreVertical, Search, Bell, Settings, User } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  position: string;
  status: 'active' | 'offline';
  departement: string;
  avatar: string;
}

export default function Employees() {
  const employees: Employee[] = [
    { id: 1, name: 'Marcos', position: 'UI/UX Designer', departement: "Design", status: 'active', avatar: 'avatar.svg' },
    { id: 2, name: 'ZAK', position: 'Frontend Developer',departement: "Development", status: 'active', avatar: 'avatar.svg' },
    { id: 3, name: 'Aya', position: 'Product Manager',departement: "Development", status: 'offline', avatar: 'avatar.svg' },
  ];

  return (
    <div className="space-y-6">
       
        <div className=" bg-[#ffffff00] backdrop-blur-[400px]   rounded-lg ">
            <div className="relative flex items-center ">
              <Search className="absolute left-3 top-[13px] h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search people, projects or tasks"
                className="w-full bg-[#ffffff06] backdrop-blur-[400px] text-white rounded-lg pl-10 pr-4 py-3 outline-none shadow-lg transition-all duration-300 focus:outline-purple-500/40"
              />
            </div>
        </div>
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-200">Employees</h2>
        <button className="bg-purple-600 hover:bg-purple-700 text-slate-200 px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Employee</span>
        </button>
        </div>
        <div className="grid gap-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-[#ffffff06] hover:bg-[#ffffff08] transition-all duration-300 cursor-pointer backdrop-blur-[400px] shadow-md   rounded-lg p-4 pb-7 max-w-[310px]   items-center justify-between"
          >
            <div className='flex item-center justify-between'>
              <span className="px-2 py-1 text-xs rounded-full bg-purple-900 text-purple-300">
                {employee.departement}
              </span>
              <button className="text-gray-400 hover:text-slate-200 flex justify-end w-full">
              <MoreVertical className="h-5 w-5" />
            </button>
            </div>
             
            <div className="flex flex-col items-center h-full mt-4 gap-4 space-x-4">
              <div className="relative ">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="h-[100px] w-[100px] rounded-full border border-purple-500/40"
                />
                <span
                  className={`absolute bottom-[12px] right-[8px] h-3 w-3 rounded-full border-2 border-[#1A1B21] ${
                    employee.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
              </div>
              <div className='text-center'>
                <h3 className="font-medium text-white">{employee.name}</h3>
                <p className="text-sm text-gray-400">{employee.position}</p>
              </div>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}

