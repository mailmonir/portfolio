const SelectBox = ({ onchangeFunc, options }) => {
  return (
    <div className="mt-4 sm:mt-0">
      <label htmlFor="sort" className="sr-only">
        Filter by
      </label>
      <select
        onChange={(e) => onchangeFunc(e.target.value, e)}
        name="filter"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 bbt ring-1 ring-inset ring-gray-300 bne bnr sm:text-sm sm:leading-6"
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
