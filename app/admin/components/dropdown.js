"use client";
import { createContext, useContext, useState } from "react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

const DropdownContext = createContext();

const Dropdown = ({ children }) => {
  const [showDropDownMenu, setShowDropdownMenu] = useState("");
  const ref = useOutsideClick(() => setShowDropdownMenu(""));

  return (
    <DropdownContext.Provider value={{ showDropDownMenu, setShowDropdownMenu }}>
      <div className="relative inline-block text-left" ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

function Toggler({ id, children, btnClass }) {
  const { showDropDownMenu, setShowDropdownMenu } = useContext(DropdownContext);

  function clickHandler() {
    showDropDownMenu === "" || showDropDownMenu !== id
      ? setShowDropdownMenu(id)
      : setShowDropdownMenu("");
  }
  return (
    <button
      type="button"
      className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-2 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 ${
        btnClass ? btnClass : ""
      }`}
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}

function List({ children, id }) {
  const { showDropDownMenu } = useContext(DropdownContext);

  return (
    <div
      className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
        showDropDownMenu === id
          ? "trasition ease-out duration-100 transform opacity-100 scale-100 z-10"
          : "trasition ease-in duration-75 transform opacity-0 scale-95 -z-10"
      }`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      <div className="py-3" role="none">
        {children}
      </div>
    </div>
  );
}

function Button({ children, icon, onClick }) {
  const { setShowDropdownMenu } = useContext(DropdownContext);
  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();
    setShowDropdownMenu("");
  };

  return (
    <a
      href="#"
      className="text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-gray-100"
      role="menuitem"
      tabIndex={-1}
      id="menu-item-1"
      onClick={handleClick}
    >
      {icon}
      {children}
    </a>
  );
}

Dropdown.Toggler = Toggler;
Dropdown.List = List;
Dropdown.Button = Button;

export default Dropdown;
