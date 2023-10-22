// import { cookies } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { redirect } from "next/navigation";

// const cookieStore = cookies();
// const supabase = createServerComponentClient({ cookies: () => cookieStore });

// export async function checkSessionServer(redir) {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   if (session) {
//     redirect(`/${redir}`);
//   }
// }

// export async function getServerSession() {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   return session;
// }
