import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuBar = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white w-64 flex flex-col fixed">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        <NavLink to="/dashboard" className="text-white hover:text-gray-300">
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
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
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
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`
              }
            >
              Add Trainee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
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
