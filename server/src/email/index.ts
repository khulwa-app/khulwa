import { Resend } from "resend";
import { env } from "../env.js";

const resend = env.email.apiKey ? new Resend(env.email.apiKey) : null;

export async function sendEmail(args: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY missing — logging email instead");
    console.log(`[email] To: ${args.to}\nSubject: ${args.subject}\n${args.text ?? args.html}`);
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
