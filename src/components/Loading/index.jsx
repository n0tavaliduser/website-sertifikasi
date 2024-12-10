import { PuffLoader } from "react-spinners";

const IconLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <PuffLoader color="#3b82f6" size={60} className="mb-4" />
        <span className="text-gray-500">Loading...</span>
      </div>
    </div>
  );
};

export default IconLoading;
