import React, { useState, useEffect } from 'react';

export interface GlobalFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showIcon?: boolean;
  debounceMs?: number;
}

export function GlobalFilter({
  value,
  onChange,
  placeholder = 'Search all columns...',
  className = '',
  showIcon = true,
  debounceMs = 300,
}: GlobalFilterProps) {
  const [localValue, setLocalValue] = useState(value);

  // Debounce the onChange call
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, onChange, debounceMs]);

  // Update local value when external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className={`datagrid-global-filter ${className}`}>
      <div className='datagrid-search-container'>
        {showIcon && (
          <span className='datagrid-search-icon'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.35-4.35'></path>
            </svg>
          </span>
        )}
        <input
          type='text'
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className='datagrid-search-input'
          style={{ paddingLeft: showIcon ? '36px' : '12px' }}
        />
      </div>
    </div>
  );
}
