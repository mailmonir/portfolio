import { usePagination, DOTS } from "../hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = (e) => {
    e.preventDefault();
    onPageChange(currentPage + 1);
  };

  const onPrevious = (e) => {
    e.preventDefault();
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav className="flex items-center space-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <a
          style={{ pointerEvents: currentPage === 1 && "none" }}
          onClick={(e) => onPrevious(e)}
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="mr-3 w-5 h-5 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </a>
      </div>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <span
              key={index}
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
            >
              ...
            </span>
          );
        }

        return (
          <a
            onClick={(e) => {
              e.preventDefault();
              onPageChange(pageNumber);
            }}
            href="#"
            key={index}
            className={`-mt-0.5 inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 ${
              pageNumber === currentPage
                ? "border-sky-500"
                : "border-transparent"
            }`}
          >
            {pageNumber}
          </a>
        );
      })}

      <div className="-mt-px flex w-0 justify-end flex-1">
        <a
          style={{ pointerEvents: currentPage === lastPage && "none" }}
          onClick={(e) => onNext(e)}
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="ml-3 w-5 h-5 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default Pagination;
