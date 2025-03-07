import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectTo = new URL(request.nextUrl.origin + next);

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      // Append token_hash and type to the next URL
      redirectTo.searchParams.set("token_hash", token_hash);
      redirectTo.searchParams.set("type", type);

      return NextResponse.redirect(redirectTo);
    }
  }

  // Redirect to the error page if verification fails
  redirectTo.pathname = "admin/auth/auth-code-error";
  return NextResponse.redirect(redirectTo);
}
