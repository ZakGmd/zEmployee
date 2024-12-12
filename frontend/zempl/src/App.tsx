import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Employees from './components/employees';
import Evaluation from './components/evaluation';
import Tasks from './components/tasks';




function App() {
  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Employees />} />
        <Route path="evaluation" element={<Evaluation />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  </Router>
  )
}

export default App
