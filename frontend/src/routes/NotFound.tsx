import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-fleapo-green-150 p-6">
      <div className="text-center bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-7xl font-extrabold text-gray-800">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-500">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Button
            onClick={handleGoHome}
            className="px-6 py-3 w-full bg-fleapo-green-100 hover:bg-fleapo-green-125 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
