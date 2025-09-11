export interface FetchResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  url: string;
  ok: boolean;
}

export interface FetchRequestConfig extends RequestInit {
  params?: Record<string, string>;
  timeout?: number;
  baseURL?: string;
}
