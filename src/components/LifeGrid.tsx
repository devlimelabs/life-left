import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useResponsiveColumns } from '../hooks/useResponsiveColumns';

interface LifeGridProps {
  age: number;
  lifeExpectancy: number;
  zoom: number;
}

function LifeGrid({ age, lifeExpectancy, zoom }: LifeGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const totalDays = lifeExpectancy * 365;
  const daysLived = age * 365;
  const baseBoxSize = 48; // Doubled from 24
  const boxSize = baseBoxSize * zoom;
  const gap = 8 * zoom;

  const columnsCount = useResponsiveColumns(parentRef, boxSize, gap);
  const rowsCount = Math.ceil(totalDays / columnsCount);

  const virtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => boxSize + gap,
    overscan: 5,
  });

  const getBoxColor = (index: number) => {
    if (index < daysLived) {
      return 'bg-gradient-to-br from-emerald-400/90 to-emerald-600/90';
    }
    return 'bg-gradient-to-br from-rose-400/40 to-rose-600/40';
  };

  return (
    <div 
      ref={parentRef}
      className="w-full h-[70vh] overflow-auto rounded-xl clay-scroll-container"
      style={{
        padding: `${gap}px`,
        willChange: 'transform',
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: `${(boxSize + gap) * columnsCount - gap}px`,
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: boxSize,
                transform: `translateY(${virtualRow.start}px)`,
                display: 'grid',
                gridTemplateColumns: `repeat(${columnsCount}, ${boxSize}px)`,
                gap: `${gap}px`,
                willChange: 'transform',
              }}
            >
              {Array.from({ length: columnsCount }).map((_, colIndex) => {
                const dayIndex = virtualRow.index * columnsCount + colIndex;
                if (dayIndex >= totalDays) return null;
                
                return (
                  <div
                    key={colIndex}
                    className={`
                      aspect-square rounded-lg clay-box
                      ${getBoxColor(dayIndex)}
                      transition-colors duration-300
                      hover:scale-105 transform
                      cursor-pointer
                    `}
                    style={{
                      width: boxSize,
                      height: boxSize,
                      willChange: 'transform, opacity',
                    }}
                    title={`Day ${dayIndex + 1}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LifeGrid;