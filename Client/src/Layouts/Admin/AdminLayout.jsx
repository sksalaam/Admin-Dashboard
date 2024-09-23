import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { logoutUser } from "@/Store/Auth-Slice";
import { useDispatch } from "react-redux";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth/login");
      }
    });
  };
  return (
    <div>
      <nav className="bg-gray-800 p-4 flex justify-around gap-12 items-center">
        <div className="text-white text-lg font-bold">Logo</div>
        <div className="flex items-center space-x-4">
          <Link to="dashboard" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="employees" className="text-gray-300 hover:text-white">
            Employee List
          </Link>
          <span className="text-white">{}</span>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white"
          >
            Logout
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
