export interface ApiResponse {
  statusCode: number;
  status: "Success" | "ok" | null;
  message: string | null;
  data: object | null;
}

export interface ApiErrorResponse {
  status: "Failed" | "NotFound";
  message: string;
}
