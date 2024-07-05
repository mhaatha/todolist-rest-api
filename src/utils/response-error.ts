export class ResponseError extends Error {
  constructor(public status: number, public error: string, public message: string) {
    super(message);
  }
}