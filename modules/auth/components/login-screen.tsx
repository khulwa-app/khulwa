import { Logo } from "@/components/ui/logo";
import { LoginForm } from "./login-form";

export function LoginScreen() {
  return (
    <div className="bg-environment relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      <div className="relative z-1 flex w-full max-w-[420px] flex-col items-center gap-8">
        <Logo href={null} className="text-lg" />
        <div className="w-full rounded-xl border border-hairline bg-surface p-6 shadow-panel">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
