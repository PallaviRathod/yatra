import { useNavigate } from "react-router-dom";
import img from "../assets/404.png";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="">
          <img src={img} alt="img" className="inset-0 max-w-2xl" />
        </div>

        <div className="flex justify-center items-center flex-col">
          <h1 className="text-3xl md:text-4xl text-gray-800">Page Not Found</h1>
          <p className="text-base md:text-lg text-center">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <button
            className="bg-blue-700 text-white! px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
            onClick={() => navigate("/")}
          >
            Return Home
          </button>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;