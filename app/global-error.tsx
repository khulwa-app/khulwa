"use client";

import { useEffect } from "react";
import { Logger } from "@/lib/logger";

/**
 * Replaces the root layout when it is the layout itself that threw, so it renders its own
 * html/body and cannot rely on providers, fonts, or translations being mounted. Copy stays
 * hardcoded English here for that reason.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Logger.error(error, { digest: error.digest, scope: "global" });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100dvh",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#080b0a",
          color: "#edf1ee",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>Something went wrong</h1>
        <p style={{ margin: 0, color: "#8e9993", fontSize: "0.875rem" }}>
          Khulwa hit an unexpected error and could not start.
        </p>
        {/* A full reload rather than a link: the router this sits above may itself be the thing
            that failed, so client navigation is not safe to rely on here. */}
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            marginTop: "0.5rem",
            padding: "0.625rem 1.25rem",
            border: "none",
            borderRadius: "9999px",
            background: "#7fa08d",
            color: "#080b0a",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}
