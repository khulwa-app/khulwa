import { NextResponse } from "next/server";
import type { ZodType } from "zod";

export class HttpError extends Error {
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(typeof body === "string" ? body : "http_error");
  }
}

export function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export const noContent = () => new NextResponse(null, { status: 204 });

/** Parse + validate a JSON body, throwing HttpError(400) on failure. */
export async function parseJson<T>(req: Request, schema: ZodType<T>): Promise<T> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw new HttpError(400, { error: "invalid_body" });
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new HttpError(400, { error: "invalid_body", issues: result.error.issues });
  }
  return result.data;
}

/** Wrap a route handler so thrown HttpErrors become responses and the rest become 500s. */
export function route<A extends unknown[]>(handler: (req: Request, ...args: A) => Promise<Response>) {
  return async (req: Request, ...args: A): Promise<Response> => {
    try {
      return await handler(req, ...args);
    } catch (err) {
      if (err instanceof HttpError) return NextResponse.json(err.body, { status: err.status });
      console.error(err);
      return NextResponse.json({ error: "internal_server_error" }, { status: 500 });
    }
  };
}
