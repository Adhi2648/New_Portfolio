
import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { subject: 'Backend', A: 100, fullMark: 100 },
  { subject: 'AI/ML', A: 90, fullMark: 100 },
  { subject: 'Cloud/DevOps', A: 85, fullMark: 100 },
  { subject: 'Frontend', A: 80, fullMark: 100 },
  { subject: 'Data Science', A: 75, fullMark: 100 },
  { subject: 'Security', A: 85, fullMark: 100 },
];

const SkillRadar: React.FC = () => {
  return (
    <div className="w-full h-80 opacity-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;
