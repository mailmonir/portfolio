import Page from "@/app/components/page";
import ContactForm from "@/app/(front)/contact/contactForm";
import SectionTitle from "@/app/components/sectionTitle";
import SectionDescription from "@/app/components/sectionDescription";

const Contact = () => {
  return (
    <Page>
      <div className="mx-auto max-w-2xl text-center">
        <SectionTitle title="Send message" />
        <SectionDescription description="Fill in the form and we'll get back to you within 24 hours" />
      </div>
      <ContactForm />
    </Page>
  );
};

export default Contact;
