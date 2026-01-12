import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

const ProgressChart = ({ score = 62 }) => {
    const data = [
        { name: 'Week 1', score: Math.max(20, score - 30) },
        { name: 'Week 2', score: Math.max(35, score - 15) },
        { name: 'Week 3', score: Math.max(45, score - 5) },
        { name: 'Current', score: score },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-panel p-3 border border-[var(--glass-border)] !bg-[#0f172a]/90">
                    <p className="text-sm font-bold text-white mb-1">{label}</p>
                    <p className="text-xs text-[var(--accent-teal)]">
                        Readiness: {payload[0].value}%
                    </p>
                </div>
            );
        }
        return null;
    };

    // Component definition is already started above with the prop destructuring
    // const ProgressChart = () => {  <-- Removing this old line
    return (
        <div className="w-full h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--accent-teal)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--accent-teal)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke="var(--accent-teal)"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorScore)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressChart;
