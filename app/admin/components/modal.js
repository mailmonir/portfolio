"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openModal, setOpenModal] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const close = () => {
    setOpenModal("");
  };
  return (
    <ModalContext.Provider value={{ openModal, close, setOpenModal, mounted }}>
      {children}
    </ModalContext.Provider>
  );
}

function Opener({ children, id }) {
  const { setOpenModal } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      setOpenModal(id);
    },
  });
}

function Window({ children, id }) {
  const { openModal, setOpenModal, mounted } = useContext(ModalContext);
  const ref = useOutsideClick(() => setOpenModal(""));

  return mounted
    ? createPortal(
        <div
          className={`relative z-50 transition-opacity ${
            openModal === id ? "showModal" : `hideModal hidden`
          }`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center transition-all sm:items-center sm:p-0">
              <div
                ref={ref}
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      type="button"
                      className="rounded-md bg-white axp bkx bmz bne bnq bog text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:outline-none"
                      onClick={() => setOpenModal("")}
                    >
                      <span className="sr-only">Close</span>
                      <HiXMark className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    {cloneElement(children, {
                      onCloseModal: () => setOpenModal(""),
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : "";
}

Modal.Opener = Opener;
Modal.Window = Window;

export default Modal;
