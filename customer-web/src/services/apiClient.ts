const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = {
  params?: Record<string, string | undefined>;
  signal?: AbortSignal;
};

function buildUrl(path: string, params?: Record<string, string | undefined>): string {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, value);
      }
    }
  }
  return `${url.pathname}${url.search}`;
}

export async function apiGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = buildUrl(path, options.params);
  let response: Response;
  try {
    response = await fetch(url, { signal: options.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new ApiError("ネットワークに接続できませんでした", 0);
  }

  if (!response.ok) {
    throw new ApiError(`APIエラーが発生しました (${response.status})`, response.status);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError("APIの応答を解析できませんでした", response.status);
  }
}
