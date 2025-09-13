import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  // Go back to previous page
  const handleGoBack = () => navigate(-1);

  return (
    <div className="flex flex-col items-center">
      {/* Big 404 number with gradient text */}
      <h1 className="text-[10rem] font-extrabold lg:text-[16rem] text-transparent bg-gradient-to-r from-[#6054e8] to-[#f8485e] bg-clip-text">
        404
      </h1>

      {/* Message with emoji */}
      <p className="text-2xl font-bold text-gray-700">
        Page not found{" "}
        <span role="img" aria-labelledby="crying face">
          😢
        </span>
      </p>

      {/* Button to go back */}
      <button className="btn btn-secondary" onClick={handleGoBack}>
        Return to safety
      </button>
    </div>
  );
};

export default NotFound;
