enum StatusCode {
  success = 200,
  serverError = 500,
  unAuthorize = 401,
  badRequest = 400,
  forbidden = 403
}
class Response {
  statusCode: number;
  body: string;
}
class Result {
  private statusCode: number;
  private code: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, code: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString () {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class ResponseUtil {
  static success(data: object): Response {
    const result = new Result(StatusCode.success, StatusCode.success, 'success', data);
    return result.bodyToString();
  }

  static error(message: string, code: number = StatusCode.serverError) {
    const result = new Result(StatusCode.success, code, message);

    console.log(result.bodyToString());
    return result.bodyToString();
  }
}
