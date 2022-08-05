export const getAfterForPagination = (page: number, itemsPerPage: number) => {
  return btoa(`cursor:${(page) * itemsPerPage}`)
}