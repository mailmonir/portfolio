import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/auth/authProvider";
import supabaseServer from "./components/supabaseServer";
import RecaptchaProvider from "@/app/lib/captchaProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <AuthProvider accessToken={accessToken}>
        <RecaptchaProvider>
          <body className={poppins.className}>{children}</body>
        </RecaptchaProvider>
      </AuthProvider>
    </html>
  );
}
