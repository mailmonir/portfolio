import SectionTitle from "./sectionTitle";
import SectionDescription from "./sectionDescription";

const SectionHeading = () => {
  return (
    <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
      <SectionTitle title="Projects I've worked on" />
      <SectionDescription
        description="Just started my career as a web developer. Here are few small project
          that I've worked on. Looking forwared to start bigger project."
      />
    </div>
  );
};

export default SectionHeading;
