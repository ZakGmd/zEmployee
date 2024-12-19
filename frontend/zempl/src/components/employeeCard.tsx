import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { EmployeeCardProps } from "./employees";

export default function EmployeeCard({ employee} : EmployeeCardProps){
    const [hovered, setHover] = useState<boolean>();
    const handleMouseEnter = () => {
      setHover(true);
    };
  
    const handleMouseLeave = () => {
      setHover(false);
    };
  
    return (
      <div className='flex items-start gap-8  px-4'>
      <div
        className={`emplyeCard bg-[#ffffff06] hover:bg-[#ffffff08] transition-all duration-300 cursor-pointer backdrop-blur-[400px] shadow-md rounded-lg p-4 pb-7 w-[310px] items-center justify-between `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
        <div className="flex item-center justify-between">
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
          <div className="text-center">
            <h3 className="font-medium text-white">{employee.name}</h3>
            <p className="text-sm text-gray-400">{employee.position}</p>
          </div>
        </div>
      </div>
      {hovered && (
        <div className=' emplyeInfo   bg-[#ffffff06] hover:bg-[#ffffff08] transition-all duration-300 py-10 px-5 backdrop-blur-[400px] rounded-lg flex gap-8  w-[424px]  shadow-md  '>
      <div className="relative flex justify-center ">
            <img
              src={"avatar.svg"}
              alt={"ASDASD"}
              className="h-[160px] w-[160px] rounded-full  border border-purple-500/40"
            />
      </div> 
      <div className='flex flex-col items-baseline gap-1 '>
         <div className='font-medium text-[18px]  text-slate-50'>{employee?.name}</div>
         <div className='text-purple-500'>{employee?.position}</div>
         <div className='text-purple-500/80 font-light'><span className=' font-medium text-purple-500'>{employee?.tasks}</span> tasks</div>
         <div className='text-purple-500/60'>{employee?.phone}</div>
         <div className='text-purple-500/60'>{employee?.email}</div>
         <div className="text-purple-500 font-medium  ">${employee?.salary}</div>
      </div>
      </div>
      )}
      
      </div>
    );
  };