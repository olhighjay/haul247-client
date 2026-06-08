import axios, { type AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/api";
import { ApiRequestError } from "@/types/api";
import { getApiBaseUrl } from "@/utils/api-config";

export { getApiBaseUrl };

const backendApi = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const appRouteApi = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const unwrapResponse = <Data>(
  response: AxiosResponse<ApiResponse<Data>>,
): Data => {
  const payload = response.data;

  if (!payload.status) {
    throw new ApiRequestError(
      payload.message,
      response.status,
      payload.errors,
    );
  }

  return payload.data;
};

export const throwApiError = (error: unknown): never => {
  if (axios.isAxiosError(error) && error.response) {
    const payload = error.response.data as ApiResponse<unknown>;

    throw new ApiRequestError(
      payload?.status === false ? payload.message : "Request failed",
      error.response.status,
      payload?.status === false ? payload.errors : undefined,
    );
  }

  throw error;
};

export const apiPost = async <Data>(
  path: string,
  body?: unknown,
  accessToken?: string,
): Promise<Data> => {
  try {
    const response = await backendApi.post<ApiResponse<Data>>(path, body, {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    });

    return unwrapResponse(response);
  } catch (error) {
    return throwApiError(error);
  }
};

export const apiGet = async <Data>(
  path: string,
  accessToken?: string,
): Promise<Data> => {
  try {
    const response = await backendApi.get<ApiResponse<Data>>(path, {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    });

    return unwrapResponse(response);
  } catch (error) {
    return throwApiError(error);
  }
};

export const postAppRoute = async <Data>(
  path: string,
  body?: unknown,
): Promise<ApiResponse<Data>> => {
  try {
    const response = await appRouteApi.post<ApiResponse<Data>>(path, body);
    return response.data;
  } catch (error) {
    return throwApiError(error);
  }
};
