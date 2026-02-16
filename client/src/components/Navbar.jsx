import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { token, logout } = useContext(AuthContext);

  const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};
  const navLinkStyle =
    "relative px-2 py-1 hover:text-yellow-400 transition duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link to="/">Bellcorp Events</Link>
      </h1>

      <div className="flex items-center gap-6 text-lg">
        <Link to="/events" className={navLinkStyle}>
          Events
        </Link>

        {token ? (
          <>
            <Link to="/dashboard" className={navLinkStyle}>
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={navLinkStyle}>
              Login
            </Link>

            <Link to="/register" className={navLinkStyle}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
