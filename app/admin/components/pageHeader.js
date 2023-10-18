const PageHeader = ({ title, description, children }) => {
  return (
    <div className="sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div>
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
