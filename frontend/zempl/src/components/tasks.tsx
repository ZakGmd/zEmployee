import { Plus, CheckCircle2, Circle, MoreVertical } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  assignee: string;
  avatar: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

export default function Tasks() {
  const tasks: Task[] = [
    { id: 1, title: 'Add shared sections to the main menu', assignee: 'Adison Kennedy', avatar: '/placeholder.svg?height=40&width=40', status: 'review' },
    { id: 2, title: 'Import and export contact feature', assignee: 'Charles Dorwart', avatar: '/placeholder.svg?height=40&width=40', status: 'in-progress' },
    { id: 3, title: 'Cloud backup feature for premium users', assignee: 'Bobby Nolan', avatar: '/placeholder.svg?height=40&width=40', status: 'todo' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Create Task</span>
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#1A1B21] border border-gray-800 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-purple-500">
                {task.status === 'done' ? (
                  <CheckCircle2 className="h-5 w-5 text-purple-500" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <img
                    src={task.avatar}
                    alt={task.assignee}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="text-sm text-gray-400">{task.assignee}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`
                px-2 py-1 text-xs rounded-full
                ${task.status === 'todo' ? 'bg-gray-800 text-gray-300' : ''}
                ${task.status === 'in-progress' ? 'bg-blue-900 text-blue-300' : ''}
                ${task.status === 'review' ? 'bg-purple-900 text-purple-300' : ''}
                ${task.status === 'done' ? 'bg-green-900 text-green-300' : ''}
              `}>
                {task.status.replace('-', ' ')}
              </span>
              <button className="text-gray-400 hover:text-white">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

