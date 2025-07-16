import { FetchRequestConfig } from "./interface";
import { Option } from "./interface";

interface CreateFetchDefaultsProps {
  baseUrl: string;
  option?: Option;
}

interface FetchDefaults {
  baseURL: string;
  headers: HeadersInit;
  credentials: RequestCredentials;
}

const createFetchDefaults = ({
  baseUrl = "/api",
  option,
}: Partial<CreateFetchDefaultsProps>): FetchDefaults => {
  const {
    version,
    contentType = "application/json",
    charset,
    accept,
    withCredentials = true, // 기본값 true (axios와 동일)
  } = option ?? {};
  
  return {
    baseURL:
      typeof version !== "undefined" ? [baseUrl, version].join("/") : baseUrl,
    headers: {
      "Content-Type": [contentType, charset && `; charset=${charset}`].join(""),
      Accept: accept,
    } as HeadersInit,
    credentials: withCredentials ? "include" : "omit" as RequestCredentials,
  };
};

const fetchRequestConfig: FetchRequestConfig = {
  credentials: "include", // 기본값
};

export { createFetchDefaults, fetchRequestConfig };
