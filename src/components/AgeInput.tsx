import React from 'react';

interface AgeInputProps {
  age: number;
  setAge: (age: number) => void;
  maxAge: number;
}

function AgeInput({ age, setAge, maxAge }: AgeInputProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
      <div className="flex flex-col space-y-2">
        <label htmlFor="age" className="text-lg font-medium text-slate-300">
          Your Current Age
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            id="age"
            min="0"
            max={maxAge}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-48 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="clay-card px-4 py-2 rounded-lg min-w-[4rem] text-center">
            {age}
          </span>
        </div>
      </div>
      
      <div className="clay-stats flex space-x-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-400">
            {(age * 365).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">Days Lived</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-rose-400">
            {((maxAge - age) * 365).toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">Days Left</div>
        </div>
      </div>
    </div>
  );
}

export default AgeInput;