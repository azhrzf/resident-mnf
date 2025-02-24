import { FiLoader } from "react-icons/fi";

const LoadingSpin = () => {
  return (
    <div className="flex items-center space-x-2">
      <p>Loading</p>
      <FiLoader className="animate-spin" />
    </div>
  );
};

export default LoadingSpin;
