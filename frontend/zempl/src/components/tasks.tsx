import { useState } from 'react';
import { Plus, Check, X, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  description: string;
  assignee: string;
  completed: boolean;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, description: 'Complete project proposal', assignee: 'John Doe', completed: false },
    { id: 2, description: 'Review design mockups', assignee: 'Jane Smith', completed: true },
    { id: 3, description: 'Implement new feature', assignee: 'Mike Johnson', completed: false },
  ]);

  const [newTask, setNewTask] = useState({ description: '', assignee: '' });

  const addTask = () => {
    if (newTask.description && newTask.assignee) {
      setTasks([...tasks, { id: tasks.length + 1, ...newTask, completed: false }]);
      setNewTask({ description: '', assignee: '' });
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Task Description"
          className="border p-2 rounded flex-grow"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Assignee"
          className="border p-2 rounded"
          value={newTask.assignee}
          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
        />
        <button
          onClick={addTask}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Task
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
            <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.description} - Assigned to: {task.assignee}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`p-2 rounded ${
                  task.completed ? 'bg-gray-300 hover:bg-gray-400' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {task.completed ? <X size={20} /> : <Check size={20} />}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

