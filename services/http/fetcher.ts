export type ApiIssue = { path?: (string | number)[]; message: string };

export class ApiError extends Error {
  status: number;
  /** The server's snake_case code; doubles as the `apiErrors.*` translation key. */
  code: string;
  /** Field-level problems from zod, when the route reported any. */
  issues?: ApiIssue[];

  constructor(status: number, code: string, issues?: ApiIssue[]) {
    super(code);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.issues = issues;
  }
}

type ErrorBody = {
  /** Route handlers under lib/api/http.ts. */
  error?: string;
  issues?: ApiIssue[];
  /** Better Auth answers with its own shape, which nothing else in the app emits. */
  code?: string;
  message?: string;
};

function toApiError(status: number, statusText: string, body: ErrorBody | null): ApiError {
  const code = body?.error ?? body?.code ?? statusText ?? "unknown_error";
  return new ApiError(status, code, body?.issues);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    credentials: "include",
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    let body: ErrorBody | null = null;
    try {
      body = (await res.json()) as ErrorBody;
    } catch {
      // A non-JSON error body is still an error; fall back to the status text.
    }
    throw toApiError(res.status, res.statusText, body);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body === undefined ? undefined : JSON.stringify(body) }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body === undefined ? undefined : JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
