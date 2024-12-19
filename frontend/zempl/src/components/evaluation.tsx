import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

const data = [
  { name: 'Bobby Nolan', score: 85, improvement: 5 },
  { name: 'Adison Kennedy', score: 92, improvement: -2 },
  { name: 'Charles Dorwart', score: 78, improvement: 8 },
];

export default function Evaluation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Performance Evaluation</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="bg-[#1A1B21] border border-gray-800 rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{item.name}</h3>
              <span
                className={`flex items-center ${
                  item.improvement > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {item.improvement > 0 ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                {Math.abs(item.improvement)}%
              </span>
            </div>
            <div className="text-3xl font-bold">{item.score}%</div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-purple-600 rounded-full h-2"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1A1B21] border border-gray-800 rounded-lg p-4 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D2D3A" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1B21',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
              }}
            />
            <Bar dataKey="score" fill="#7C3AED" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

