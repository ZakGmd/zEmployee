import { Plus, Search} from 'lucide-react';
import EmployeeCard from './employeeCard';

interface Employee {
  id: number;
  name: string;
  position: string;
  status: 'active' | 'offline';
  departement: string;
  salary: number ;
  tasks: number ;
  phone:string ;
  email: string ;
  avatar: string;
}
export type EmployeeCardProps = {
  employee: Employee;

}



export default function Employees() {
 

  const employees: Employee[] = [
    {
      id: 1, name: 'Marcos', position: 'UI/UX Designer', departement: "Design", status: 'active', avatar: 'avatar.svg',
      salary: 8220.22,
      tasks: 300,
      phone: "0623782122",
      email: 'weweqwe'
    },
    {
      id: 2, name: 'ZAK', position: 'Frontend Developer', departement: "Development", status: 'active', avatar: 'avatar.svg',
      salary: 0,
      tasks: 0,
      phone: "0623782122",
      email: ''
    },
    {
      id: 3, name: 'Aya', position: 'Product Manager', departement: "Development", status: 'offline', avatar: 'avatar.svg',
      salary: 0,
      tasks: 0,
      phone: "0623782122",
      email: ''
    },
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
        <div className='flex items-start gap-8  px-4'>
          <div className="flex flex-col gap-4">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
            
            />
            
          ))}

          </div>
  
        </div>

    </div>
  );
}







