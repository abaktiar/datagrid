import React, { useState, useEffect, useRef } from 'react';
import type { FloatingActionItem } from './types';

interface FloatingActionDockProps<T = any> {
  selectedData: T[];
  selectedRowIndices: number[];
  items: FloatingActionItem<T>[];
  className?: string;
  position?: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center';
  showCount?: boolean;
  hideDelay?: number;
  onClose?: () => void;
}

export const FloatingActionDock = <T,>({
  selectedData,
  selectedRowIndices,
  items,
  className = '',
  position = 'bottom-center',
  showCount = true,
  hideDelay = 0,
  onClose
}: FloatingActionDockProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const hasSelectionRef = useRef(false);

  useEffect(() => {
    if (selectedData.length > 0) {
      if (!hasSelectionRef.current) {
        hasSelectionRef.current = true;
        setIsVisible(true);
      }
      setIsLeaving(false);
    } else if (hasSelectionRef.current && !isLeaving) {
      // Only start leaving animation if we had selections before and aren't already leaving
      setIsLeaving(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsLeaving(false);
        hasSelectionRef.current = false;
        if (onClose) onClose();
      }, 220); // Slightly longer than CSS animation (200ms) to ensure smooth completion
      
      return () => clearTimeout(timer);
    }
  }, [selectedData.length, onClose, isLeaving]);

  // Don't render if never had selections or fully hidden
  if (!hasSelectionRef.current && !isVisible) return null;

  const getPositionClasses = () => {
    // Position is now handled by CSS, but we can still support different positions
    switch (position) {
      case 'bottom-left':
        return 'dock-position-bottom-left';
      case 'bottom-right':
        return 'dock-position-bottom-right';
      case 'bottom-center':
        return 'dock-position-bottom-center';
      case 'top-left':
        return 'dock-position-top-left';
      case 'top-right':
        return 'dock-position-top-right';
      case 'top-center':
        return 'dock-position-top-center';
      default:
        return 'dock-position-bottom-center';
    }
  };

  const handleItemClick = (item: FloatingActionItem<T>) => {
    if (item.disabled) {
      const isDisabled = typeof item.disabled === 'function' 
        ? item.disabled(selectedData, selectedRowIndices)
        : item.disabled;
      if (isDisabled) return;
    }
    
    item.onClick(selectedData, selectedRowIndices);
  };

  const getVariantClasses = (variant?: string) => {
    switch (variant) {
      case 'primary':
        return 'variant-primary';
      case 'danger':
        return 'variant-danger';
      case 'success':
        return 'variant-success';
      default:
        return 'variant-default';
    }
  };

  return (
    <div
      className={`datagrid-floating-dock ${getPositionClasses()} ${className}`}
      data-entering={selectedData.length > 0 && !hasSelectionRef.current ? 'true' : 'false'}
      data-leaving={isLeaving ? 'true' : 'false'}
    >
      <div className="datagrid-floating-dock-container">
        {/* Selection count badge */}
        {showCount && (
          <div className="datagrid-floating-dock-badge">
            <span>{selectedData.length} selected</span>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="datagrid-floating-dock-actions">
          {items.map((item, index) => {
            if (item.separator) {
              return (
                <div
                  key={`separator-${index}`}
                  className="datagrid-floating-dock-separator"
                />
              );
            }

            const isDisabled = item.disabled
              ? typeof item.disabled === 'function'
                ? item.disabled(selectedData, selectedRowIndices)
                : item.disabled
              : false;

            // Use custom button component if provided
            if (item.customButton) {
              const CustomButton = item.customButton;
              return (
                <CustomButton
                  key={index}
                  onClick={() => handleItemClick(item)}
                  disabled={isDisabled}
                  className={`datagrid-floating-dock-button ${item.className || ''}`}
                >
                  {item.icon && (
                    <span className="datagrid-floating-dock-button-icon">
                      {item.icon}
                    </span>
                  )}
                  <span className="datagrid-floating-dock-button-label">
                    {item.label}
                  </span>
                </CustomButton>
              );
            }

            // Default button
            return (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                disabled={isDisabled}
                className={`datagrid-floating-dock-button ${getVariantClasses(item.variant)} ${
                  item.className || ''
                } ${isDisabled ? 'datagrid-floating-dock-button-disabled' : ''}`}
                title={item.label}
              >
                {item.icon && (
                  <span className="datagrid-floating-dock-button-icon">
                    {item.icon}
                  </span>
                )}
                <span className="datagrid-floating-dock-button-label">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};