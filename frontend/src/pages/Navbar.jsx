import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { logoutUser } from "../authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="navbar bg-gray-300 text-gray-800 shadow-md px-6">
      {/* Left side - App Name */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-600 cursor-pointer"
        >
          LeetCode
        </Link>
      </div>

      {/* Right side - Profile Dropdown */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 flex justify-center items-center text-3xl rounded-full ring ring-yellow-400 ring-offset-2">
              {user?.firstName?.charAt(0).toUpperCase()}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            <li>
              <Link className="hover::bg-yellow-50">Profile</Link>
            </li>
            <li>
              <Link
                onClick={handleLogout}
                className="hover:bg-yellow-50 text-red-500"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
