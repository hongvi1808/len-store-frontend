import { authApis } from "@/base/apis/auth.api";
import { store } from "@/base/store";
import { setSession } from "@/base/store/slices/session.slice";
import { getUserSessionThunk } from "@/base/store/thunks/user.thunk";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/");
  }

  // Đổi code -> token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return NextResponse.redirect("/?error=google_auth_failed");
  }

  // Lấy thông tin user từ Google
  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const {name, emails, id} = await userRes.json();
   const user = {
            id,
            email: emails[0]?.value,
            fullName: `${name?.familyName} ${name.givenName}`,
        };
  console.log('user')
  const res = await authApis.googleCallback(tokenData.access_token)
  store.dispatch(setSession(res))
  store.dispatch(getUserSessionThunk(res.userId))

  // 👉 Ở đây bạn có thể set cookie/session
  // Ví dụ: set cookie chứa access_token
  const response = NextResponse.redirect("/");
  // response.cookies.set("google_user", JSON.stringify(user), {
  //   httpOnly: true,
  //   path: "/",
  // });

  return response;
}
