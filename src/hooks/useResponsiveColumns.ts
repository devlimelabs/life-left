import { useState, useEffect } from 'react';

export function useResponsiveColumns(containerRef: React.RefObject<HTMLElement>, boxSize: number, gap: number) {
  const [columns, setColumns] = useState(7);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth - (gap * 2); // Account for container padding
      const columnsCount = Math.floor(containerWidth / (boxSize + gap));
      setColumns(Math.max(3, columnsCount)); // Minimum 3 columns
    };

    const resizeObserver = new ResizeObserver(updateColumns);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [containerRef, boxSize, gap]);

  return columns;
}