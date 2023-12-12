import cx from 'classnames'
import React from 'react'

interface IndexCellProps {
  index: number
  className?: string
}

// the number is updated dynamically inside the client-side code on the bridges page
// see renderNumbers() inside /packages/frontend/src/scripts/configureCanonicalBridgesFilter.ts
export function IndexCell({ index, className }: IndexCellProps) {
  const displayIndex = index < 9 ? `0${index + 1}` : index + 1
  return (
    <span
      className={cx(
        'text-xs font-medium tabular-nums text-gray-50 dark:font-normal dark:text-gray-600',
        className,
      )}
      data-role="index-cell"
    >
      {displayIndex}
    </span>
  )
}
