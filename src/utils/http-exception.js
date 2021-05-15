class HttpException extends Error {
  constructor(errors, status = 400) {
    super('HTTP error occurred');
    this.body = errors;
    this.status = status;
  }
}

export default HttpException;
