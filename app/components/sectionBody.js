const SectionBody = ({ children }) => {
  return (
    <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gra-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
      {children}
    </dl>
  );
};

export default SectionBody;
