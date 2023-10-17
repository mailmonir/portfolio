import { ImSpinner2 } from "react-icons/im";

const Spinner = ({ sizeClasses, textColorClass }) => {
  return (
    <div className="animate-spin flex justify-center items-center">
      <ImSpinner2
        className={`${sizeClasses ? sizeClasses : "w-32 h-32"} ${
          textColorClass ? textColorClass : "text-white"
        }`}
      />
    </div>
  );
};

export default Spinner;
