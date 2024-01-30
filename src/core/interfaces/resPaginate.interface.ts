export interface PaginateData<T> {
  total: number
  totalPages: number
  currentPage: number
  data: T[]
}

export const initialPaginateData: PaginateData<any> = {
  total: 0,
  totalPages: 0,
  currentPage: 0,
  data: [],
}
