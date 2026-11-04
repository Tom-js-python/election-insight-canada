export const getVisiblePageNumbers = (
  currentPage: number,
  totalPages: number,
  maximumVisiblePages = 5,
): number[] => {
  if (totalPages <= maximumVisiblePages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pagesOnEachSide = Math.floor(maximumVisiblePages / 2)

  let firstPage = Math.max(1, currentPage - pagesOnEachSide)

  let lastPage = firstPage + maximumVisiblePages - 1

  if (lastPage > totalPages) {
    lastPage = totalPages
    firstPage = lastPage - maximumVisiblePages + 1
  }

  return Array.from({ length: maximumVisiblePages }, (_, index) => firstPage + index)
}
