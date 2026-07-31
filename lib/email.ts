import { Resend } from "resend";
import { Logger } from "@/lib/logger";
import { env } from "@/lib/env";

const resend = env.email.apiKey ? new Resend(env.email.apiKey) : null;

export async function sendEmail(args: { to: string; subject: string; html: string; text?: string }) {
  if (!resend) {
    Logger.debug("[email] RESEND_API_KEY missing — logging email instead");
    Logger.debug(`[email] To: ${args.to} / ${args.subject}`);
    return;
  }
  const { error } = await resend.emails.send({
    from: env.email.from,
    to: args.to,
    subject: args.subject,
    html: args.html,
    text: args.text,
  });
  if (error) throw new Error(`Resend send failed: ${error.message}`);
}
