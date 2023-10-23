import { Poppins } from "next/font/google";
import "./globals.css";
// import AuthProvider from "@/app/auth/authProvider";
// import supabaseServer from "./components/supabaseServer";
import Toaster from "@/app/components/toaster";
import GContext from "./contexts/globalContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Portfolio - MIslam",
  description: "Portfolio of Monirul Islam (Freelancer Upwork)",
};

export default function RootLayout({ children }) {
  // const {
  //   data: { session },
  // } = await supabaseServer().auth.getSession();

  // const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      {/* <AuthProvider accessToken={accessToken}> */}
      <GContext>
        <body className={poppins.className}>
          <Toaster />
          {children}
        </body>
      </GContext>
      {/* </AuthProvider> */}
    </html>
  );
}
