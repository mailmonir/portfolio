const AlertSuccess = ({ type, message, clickCloseBtn }) => {
  return (
    <div
      className={`rounded-md ${
        type === "error" ? "bg-red-50" : "bg-green-50"
      } p-4`}
    >
      <div className="flex">
        <div className="shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className={`w-5 h-5  ${
              type === "error" ? "text-red-500" : "text-green-500"
            } `}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p
            className={`text-sm font-medium ${
              type === "error" ? "text-red-800" : "text-green-800"
            } `}
          >
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={clickCloseBtn}
              type="button"
              className={`inline-flex rounded-md  ${
                type === "error" ? "bg-red-50" : "bg-green-50"
              } p-1.5  ${
                type === "error" ? "text-red-500" : "text-green-500"
              }   ${
                type === "error" ? "hover:bg-red-100" : "hover:bg-green-100"
              }  focus:outline-offset-2 focus:ring  ${
                type === "error" ? "focus:ring-red-600" : "focus:ring-green-600"
              }  focus:ring-2  ${
                type === "error"
                  ? "focus:ring-offset-red-50"
                  : "focus:ring-offset-green-50"
              } `}
            >
              <span className="sr-only">Dismiss</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSuccess;
