import React, { useEffect, useRef, useState } from 'react'
import type { TableContextMenuItem } from './types'

interface TableContextMenuProps<T = any> {
  items: TableContextMenuItem<T>[]
  position: { x: number; y: number }
  onClose: () => void
  data: T[]
  className?: string
}

export function TableContextMenu<T = any>({
  items,
  position,
  onClose,
  data,
  className = ''
}: TableContextMenuProps<T>) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [adjustedPosition, setAdjustedPosition] = useState(position)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  useEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current
      const rect = menu.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let { x, y } = position

      // Adjust horizontal position if menu would overflow
      if (x + rect.width > viewportWidth) {
        x = viewportWidth - rect.width - 10
      }

      // Adjust vertical position if menu would overflow
      if (y + rect.height > viewportHeight) {
        y = viewportHeight - rect.height - 10
      }

      setAdjustedPosition({ x, y })
    }
  }, [position])

  const handleItemClick = (item: TableContextMenuItem<T>) => {
    if (typeof item.disabled === 'function' ? item.disabled(data) : item.disabled) {
      return
    }
    
    item.onClick(data)
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className={`datagrid-context-menu ${className}`}
      style={{
        position: 'fixed',
        left: adjustedPosition.x,
        top: adjustedPosition.y,
        zIndex: 9999,
      }}
    >
      {items.map((item, index) => {
        if (item.separator) {
          return <div key={index} className="datagrid-context-menu-separator" />
        }

        const isDisabled = typeof item.disabled === 'function' 
          ? item.disabled(data) 
          : item.disabled

        return (
          <div
            key={index}
            className={`datagrid-context-menu-item ${isDisabled ? 'disabled' : ''} ${item.className || ''}`}
            onClick={() => handleItemClick(item)}
          >
            {item.icon && (
              <span className="datagrid-context-menu-icon">
                {item.icon}
              </span>
            )}
            <span className="datagrid-context-menu-label">
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
