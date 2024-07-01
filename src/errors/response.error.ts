interface ResponseError {
  status: number;
  message: string;
  name: string;
  stack?: string;
}

export const responseError = (status: number, message: string): ResponseError => {
  const error: ResponseError = {
    status,
    message,
    name: 'ResponseError',
    stack: (new Error()).stack
  }

  return error;
}