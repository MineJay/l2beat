import cx from 'classnames'

export function getTableRowClassNames(entry: {
  isVerified?: boolean
  isUpcoming?: boolean
  showProjectUnderReview?: boolean
}): string {
  if (entry.isVerified === false) {
    return cx(
      'bg-red-100 hover:bg-red-100',
      'dark:bg-red-900 dark:hover:bg-red-900',
    )
  }
  if (entry.showProjectUnderReview === true) {
    return '!bg-yellow-200/10 hover:!bg-yellow-200/20'
  }
  if (entry.isUpcoming === true) {
    return 'bg-purple-300/80 hover:bg-purple-300 dark:bg-purple-500/40 dark:hover:bg-purple-500/60'
  }
  return ''
}

export function getStickyTableCellClassNames(entry: {
  isVerified?: boolean
  isUpcoming?: boolean
  showProjectUnderReview?: boolean
}): string {
  if (entry.isVerified === false) {
    return 'bg-gradient-to-r from-red-100 via-red-100 !via-[90%] dark:from-red-900 dark:via-red-900'
  }
  if (entry.showProjectUnderReview === true) {
    return 'bg-gradient-to-r from-[#FBF5E2] via-[#FBF5E2] dark:from-[#2B2414] dark:via-[#2B2414] !via-[90%] group-hover/table-row:from-[#FBEFC9] group-hover/table-row:via-[#FBEFC9] dark:group-hover/table-row:from-[#423512] dark:group-hover/table-row:via-[#423512]'
  }
  if (entry.isUpcoming === true) {
    return 'bg-gradient-to-r from-[#F3DDFE] via-[#F3DDFE] !via-[90%] dark:from-[#350B46] dark:via-[#350B46] group-hover/table-row:from-[#F1D6FF] group-hover/table-row:via-[#F1D6FF] dark:group-hover/table-row:from-[#48075D] dark:group-hover/table-row:via-[#48075D]'
  }
  return 'bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 from-white via-white !via-[90%] group-hover/table-row:from-[#E4E4E4] group-hover/table-row:via-[#E4E4E4] dark:group-hover/table-row:from-[#2A292C] dark:group-hover/table-row:via-[#2A292C]'
}
