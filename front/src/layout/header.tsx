import { ChartBar, ClipboardList, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="container">
        <div className="bg-white rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            SATLY Admin Panel
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your platform, users, and tests
          </p>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="flex items-center">
          <div className="flex items-center">
            <NavLink
              to="/platform"
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-10 border-b-2 text-[18px] font-medium transition-colors
    ${
      isActive
        ? "text-blue-600 border-blue-600"
        : "text-gray-600 border-transparent"
    } 
    `
              }
            >
              <ChartBar className="w-5 h-5" />
              <h1>Platform Analytics</h1>
            </NavLink>
          </div>
          <div className="flex items-center gap-2">
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-10 border-b-2 text-[18px] font-medium transition-colors
    ${
      isActive
        ? "text-blue-600 border-blue-600"
        : "text-gray-600 border-transparent"
    } 
    `
              }
            >
              <Users />
              <h1>User Management</h1>
            </NavLink>
          </div>
          <div className="flex items-center gap-2">
            <NavLink
              to="/test"
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-10 border-b-2 text-[18px] font-medium transition-colors
    ${
      isActive
        ? "text-blue-600 border-blue-600"
        : "text-gray-600 border-transparent"
    } `
              }
            >
              <ClipboardList />
              <h1>Test Analytics</h1>
            </NavLink>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
