class ClientError extends Error {
  statusCode: any;
  constructor(message: any, statusCode: any = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

export default ClientError;
