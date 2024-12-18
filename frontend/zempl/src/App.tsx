import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Employees from './components/employees';
import Evaluation from './components/evaluation';
import Tasks from './components/tasks';




function App() {
  

  return (
    <>
    <div className='flex flex-col items-start relative '>
      <nav className='flex items-center justify-between text-white  w-full px-4 py-2'>
        <div className='flex items-center gap-2'>sad</div>
        <div className='flex items-center gap-3 text-white'>
          <div>Product</div>
          <div>Pricing</div>
          <div>Contacts</div>
        </div>
        <div className="flex items-center gap-2">
          <div className='px-3 py-2 border border-indigo-500'>Log in</div>
          <div className='px-3 py-2 bg-indigo-500'>Sign up</div>
        </div>
      </nav>
      <div></div>
      
    </div>
    
    </>
  )
}

export default App
