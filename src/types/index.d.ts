type TApiError = {
  statusCode: number
  data: null
  error: {
    name: string
    message: string
  }
  success: false
  isOperationalError: boolean
  errors: TApiError['error'][]
}

type TApiResponse = {
  statusCode: number
  data: object
  message: string
  success: boolean
}
