interface ISuccessResponse<D = unknown, M = unknown> {
  statusCode: number;
  message: string;
  data?: D;
  meta?: M;
}
