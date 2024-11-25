import React, { useState, useCallback } from 'react';
import { Calendar, ZoomIn, ZoomOut } from 'lucide-react';
import LifeGrid from './components/LifeGrid';
import AgeInput from './components/AgeInput';

function App() {
  const [age, setAge] = useState<number>(25);
  const [zoom, setZoom] = useState<number>(1);
  const lifeExpectancy = 80;

  const handleZoom = useCallback((direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev + 0.2 : prev - 0.2;
      return Math.min(Math.max(newZoom, 0.5), 2);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Calendar className="w-8 h-8 text-emerald-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
              LifeLeft
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Visualize your journey through time. Each box represents a day of your life,
            colored to show the precious moments you've lived and those yet to come.
          </p>
        </header>

        <div className="clay-card p-6 rounded-2xl">
          <AgeInput age={age} setAge={setAge} maxAge={lifeExpectancy} />
          
          <div className="flex justify-end space-x-2 mb-4">
            <button
              onClick={() => handleZoom('out')}
              className="clay-button p-2 rounded-lg"
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleZoom('in')}
              className="clay-button p-2 rounded-lg"
              disabled={zoom >= 2}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          <LifeGrid
            age={age}
            lifeExpectancy={lifeExpectancy}
            zoom={zoom}
          />
        </div>
      </div>
    </div>
  );
}

export default App;