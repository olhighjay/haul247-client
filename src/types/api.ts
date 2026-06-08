export interface ApiSuccessResponse<Data = unknown> {
  status: true;
  message: string;
  data: Data;
}

export interface ApiErrorResponse {
  status: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiResponse<Data = unknown> =
  | ApiSuccessResponse<Data>
  | ApiErrorResponse;

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}
