import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface EmployeePerformance {
  name: string;
  performance: number;
}

const Evaluation = () => {
  const [performanceData, setPerformanceData] = useState<EmployeePerformance[]>([
    { name: 'John Doe', performance: 85 },
    { name: 'Jane Smith', performance: 92 },
    { name: 'Mike Johnson', performance: 78 },
  ]);

  const [newEvaluation, setNewEvaluation] = useState({ name: '', performance: '' });

  const addEvaluation = () => {
    if (newEvaluation.name && newEvaluation.performance) {
      setPerformanceData([...performanceData, { name: newEvaluation.name, performance: parseInt(newEvaluation.performance) }]);
      setNewEvaluation({ name: '', performance: '' });
    }
  };

  const deleteEvaluation = (name: string) => {
    setPerformanceData(performanceData.filter(data => data.name !== name));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employee Evaluation</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Employee Name"
          className="border p-2 rounded"
          value={newEvaluation.name}
          onChange={(e) => setNewEvaluation({ ...newEvaluation, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Performance Score"
          className="border p-2 rounded"
          value={newEvaluation.performance}
          onChange={(e) => setNewEvaluation({ ...newEvaluation, performance: e.target.value })}
        />
        <button
          onClick={addEvaluation}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Evaluation
        </button>
      </div>
      <BarChart width={600} height={300} data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="performance" fill="#8884d8" />
      </BarChart>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Employee Evaluations</h3>
        <ul className="space-y-2">
          {performanceData.map((data) => (
            <li key={data.name} className="flex items-center justify-between bg-white p-2 rounded shadow">
              <span>{data.name}: {data.performance}</span>
              <button
                onClick={() => deleteEvaluation(data.name)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Evaluation;

