import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slt-primary text-white shadow-lg">
      <ul className="space-y-4 p-4">
        <li>
          <a
            href="/intern-dashboard"
            className="block px-4 py-2 rounded hover:bg-slt-secondary transition duration-300"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="/InternsProfile"
            className="block px-4 py-2 rounded hover:bg-slt-secondary transition duration-300"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            href="/attendance"
            className="block px-4 py-2 rounded hover:bg-slt-secondary transition duration-300"
          >
            Mark Attendance
          </a>
        </li>
        <li>
          <a
            href="/tasks-assignments"
            className="block px-4 py-2 rounded hover:bg-slt-secondary transition duration-300"
          >
            Tasks & Assignments
          </a>
        </li>
        <li>
          <a
            href="/Requestleave"
            className="block px-4 py-2 rounded hover:bg-slt-secondary transition duration-300"
          >
            Request Leave
          </a>
        </li>
        <li>
          <a
            href="/announcements"
            className="block px-4 py-2 rounded hover:bg-slt-secondary transition duration-300"
          >
            Announcements
          </a>
        </li>
        <li>
          <a
            href="/attendance-history"
            className="block px-4 py-2 rounded hover:bg-slt-secondary transition duration-300"
          >
            Attendance History
          </a>
        </li>
        <li>
          <a
            href="/intern-guidelines"
            className="block px-4 py-2 rounded hover:bg-slt-secondary transition duration-300"
          >
            Internship Guidelines
          </a>
        </li>
        <li>
          <a
            href="/logout"
            className="block px-4 py-2 rounded hover:bg-slt-secondary transition duration-300"
          >
            Logout
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
