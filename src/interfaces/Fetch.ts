export interface FetchResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  url: string;
  ok: boolean;
}

export type FetchParams = Record<string, string | number | undefined>;
export interface FetchRequestConfig extends RequestInit {
  params?: FetchParams;
  timeout?: number;
  baseURL?: string;
}
