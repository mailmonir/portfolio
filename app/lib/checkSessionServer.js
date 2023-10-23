import supabase from "./supabase";
import { redirect } from "next/navigation";

export async function checkSessionServer(redir) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect(`/${redir}`);
  }
}

export async function getServerSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
