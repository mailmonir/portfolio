const Table = ({ children }) => {
  return (
    <div className="flow-root mt-8">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full pt-8 pb-40 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            {children}
          </table>
        </div>
      </div>
    </div>
  );
};

function Head({ children }) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}

function Body({ children }) {
  return <tbody className="divide-y acg bg-white">{children}</tbody>;
}

function Footer({ children }) {
  return <tfoot>{children}</tfoot>;
}

Table.Head = Head;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
