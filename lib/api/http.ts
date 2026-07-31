import { NextResponse } from "next/server";
import { Logger } from "@/lib/logger";

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


/** Wrap a route handler so thrown HttpErrors become responses and the rest become 500s. */
export function route<A extends unknown[]>(handler: (req: Request, ...args: A) => Promise<Response>) {
  return async (req: Request, ...args: A): Promise<Response> => {
    try {
      return await handler(req, ...args);
    } catch (err) {
      if (err instanceof HttpError) return NextResponse.json(err.body, { status: err.status });
      Logger.error(err, { scope: "route" });
      return NextResponse.json({ error: "internal_server_error" }, { status: 500 });
    }
  };
}
