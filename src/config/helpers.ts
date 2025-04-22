export class BaseController {
  public sendData(
    data: any,
    statusCode: number,
    message: string,
    status: boolean
  ) {
    return { data, message, statusCode, status: status };
  }
}
