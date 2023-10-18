const ProjectCard = ({ projectItem }) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <dt className="font-medium text-gray-900">{projectItem.title}</dt>
      <dd className="mt-2 text-sm text-gray-500">{projectItem.description}</dd>
      <a
        href={projectItem.link}
        className="text-xs mt-4 inline-flex text-gray-500 hover:text-gray-900"
      >
        Visit
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
};

export default ProjectCard;
