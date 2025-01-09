import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuBar = () => {
  return (
    <div className="min-h-screen bg-blue-900 text-white w-64 flex flex-col fixed">
      <div className="p-4 text-lg font-bold border-b border-green-300">
        <NavLink
          to="/dashboard"
          className="text-white hover:text-green-300"
        >
          Dashboard
        </NavLink>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/display"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-green-600' : 'hover:bg-green-700'
                }`
              }
            >
              Trainee List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-green-600' : 'hover:bg-green-700'
                }`
              }
            >
              Add Trainee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/supAttendance"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-green-600' : 'hover:bg-green-700'
                }`
              }
            >
              Attendance
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuBar;
