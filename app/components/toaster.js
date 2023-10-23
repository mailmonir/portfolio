"use client";

import { Toaster, resolveValue } from "react-hot-toast";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";

const toaster = () => {
  return (
    <Toaster>
      {(t) => {
        return (
          <div
            className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-0 ring-black ring-opacity-50 ${
              t.visible ? "animation-enter" : "animation-leave"
            }`}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {t.type === "success" && (
                    <HiOutlineCheckCircle className="w-6 h-6 text-green-400" />
                  )}
                  {t.type === "error" && (
                    <HiOutlineExclamationCircle className="w-6 h-6 text-red-400" />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 p-0.5">
                  <p className="font-medium text-gray-900 text-sm">
                    {t.type === "success" && "Success"}
                    {t.type === "error" && "Error"}
                  </p>
                  <p className={`mt-1 text-sm text-gray-500`}>
                    {resolveValue(t.message, t)}
                  </p>
                </div>
                <div className="flex flex-shrink-0 ml-4">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-opacity-100 focus:ring-offset-2 focus:outline-2"
                  >
                    <span className="sr-only">Close</span>
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
      }}
    </Toaster>
  );
};

export default toaster;
