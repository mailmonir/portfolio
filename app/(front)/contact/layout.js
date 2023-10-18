import RecaptchaProvider from "@/app/lib/captchaProvider";

const ContactLayout = ({ children }) => {
  return <RecaptchaProvider>{children}</RecaptchaProvider>;
};

export default ContactLayout;
