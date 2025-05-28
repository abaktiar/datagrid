import React from 'react';
import './LineBarLoader.css';

interface LineBarLoaderProps {
  className?: string;
  height?: number;
  duration?: number;
  color?: string;
}

export const LineBarLoader: React.FC<LineBarLoaderProps> = ({
  className = '',
  height = 3,
  duration = 1.5,
  color = '#3b82f6',
}) => {
  return (
    <div className={`line-bar-loader ${className}`}>
      <div
        className="line-bar-loader-progress"
        style={{
          height: `${height}px`,
          backgroundColor: color,
          animationDuration: `${duration}s`,
        }}
      />
    </div>
  );
};