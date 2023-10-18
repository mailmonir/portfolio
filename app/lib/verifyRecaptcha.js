"use server";

export async function verifyCaptchaAction(token) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    { method: "POST", headers: { "content-Type": "application/json" } }
  );
  if (res.data.score > 0.5) {
    return true;
  } else {
    return false;
  }
}
