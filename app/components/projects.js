import SectionHeading from "./sectionHeading";
import ProjectCard from "./projectCard";
import SectionBody from "./sectionBody";

const projectItems = [
  {
    id: 1,
    title: "Victor Bags Limited",
    description:
      "Nextjs on the front end and wordpress in the back end. Optimized site for gtmatrix and google pageinsight.",
    link: "https://victorbagsbd.com/",
  },
  {
    id: 2,
    title: "Loopdot Fashion Limited",
    description:
      "Full wordpress project with Elementor page builder. Optimized site for gtmatrix and google pageinsight.",
    link: "https://loopdotfashion.com/",
  },
  {
    id: 3,
    title: "Rider Leather Bags & Luggage Factory Limited",
    description: "Customers design implemented on Wordpress project.",
    link: "https://riderbagsbd.com/",
  },
  {
    id: 4,
    title: "Loopdot Bags Limited",
    description: "Customers design implemented on Wordpress project.",
    link: "https://loopdotbag.com/",
  },
  {
    id: 5,
    title: "My Portfolio Site",
    description:
      "This is my portfolio site built with nextjs and supabase. Complete blog and user authenticated system implemented here.",
    link: "https://portfolio-mislam.vercel.app/",
  },
  {
    id: 6,
    title: "Ecommerce Project",
    description:
      "Nextjs and woocommerce project build to show on my portfolio.",
    link: "https://ecommerce.varcel.app/",
  },
];

const Projects = () => {
  return (
    <section className="ab mx-auto is max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <SectionHeading />
      <SectionBody>
        {projectItems.map((projectItem) => (
          <ProjectCard projectItem={projectItem} key={projectItem.id} />
        ))}
      </SectionBody>
    </section>
  );
};

export default Projects;
