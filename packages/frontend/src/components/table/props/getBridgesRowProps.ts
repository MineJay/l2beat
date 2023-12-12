import classNames from 'classnames'

import { getTableRowClassNames } from './getTableRowClassNames'

interface BridgeTableEntry {
  type: 'layer2' | 'bridge'
  slug: string
  isArchived?: boolean
  isVerified?: boolean
  showProjectUnderReview?: boolean
}

export function getBridgesRowProps(entry: BridgeTableEntry) {
  const href =
    entry.type === 'layer2'
      ? `/scaling/projects/${entry.slug}`
      : `/bridges/projects/${entry.slug}`

  return {
    className: classNames(
      getTableRowClassNames(entry),
      entry.type === 'layer2' && 'hidden',
    ),
    'data-slug': entry.slug,
    href,
  }
}
