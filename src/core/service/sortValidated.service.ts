import { HttpStatus } from '../interfaces/httpStatus.interface'
import { ErrorExt } from '../utils/http.response.util'

const SetOrder = ["asc", "desc"]

interface Sort {
  sortField: string
  sortOrder: typeof SetOrder[number]
}

export default function ValidateSort(sort: string): Sort {
  const sortValid = sort.split('.')
  if (sortValid.length !== 2)
    throw new ErrorExt('SORT_INVALID', HttpStatus.BAD_REQUEST)

  const [sortField, sortOrder] = sortValid

  if (!SetOrder.includes(sortOrder))
    throw new ErrorExt('SORT_INVALID', HttpStatus.BAD_REQUEST)

  return {
    sortField,
    sortOrder,
  }
}
