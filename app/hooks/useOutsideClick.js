"use client";

import { useRef, useEffect } from "react";

export function useOutsideClick(handler, capture = true) {
  const ref = useRef();

  useEffect(() => {
    function clickHandler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", clickHandler, capture);

    return () => {
      document.removeEventListener("click", clickHandler, capture);
    };
  }, [handler, capture]);

  return ref;
}
