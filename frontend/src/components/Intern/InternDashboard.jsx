import React, { useEffect, useState } from "react";
import Header from './Header';


function InternDashboard() { 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    // Get firstName and lastName from localStorage
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName"); 

    if (storedFirstName) {
      setFirstName(storedFirstName);
    }

    if (storedLastName) {
      setLastName(storedLastName); 
    }
  }, []);


  return (
    <div className="min-h-screen bg-slt-light flex flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-grow">
        {/* Sidebar */}
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
                href="/MarkAttendance"
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

        {/* Main Content */}
        <main className="flex-grow p-8 bg-white shadow-md">
       
        <p className="text-slt-dark text-3xl font-bold">
         Hello, {firstName}! 
          </p>



          {/* Performance Metrics */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Performance Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-slt-sltGreenSecondary text-white rounded-lg shadow hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-bold">Tasks Completed</h3>
                <p className="text-4xl">15</p>
              </div>
              <div className="p-6 bg-slt-sltGreenSecondary text-white rounded-lg shadow hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-bold">Attendance Rate</h3>
                <p className="text-4xl">95%</p>
              </div>
              <div className="p-6 bg-slt-sltGreenSecondary text-white rounded-lg shadow hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-bold">Pending Tasks</h3>
                <p className="text-4xl">3</p>
              </div>
            </div>
          </section>


          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Latest Announcements</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <p className="text-gray-800">Meeting on project updates scheduled for Friday.</p>
              </li>
              <li>
                <p className="text-gray-800">Submit your monthly progress report by the 20th.</p>
              </li>
            </ul>
          </section>

           {/* Performance Review Table */}
           <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Performance Review</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-slt-sltGreenSecondary text-white">
                    <th className="px-4 py-2 text-left">Criteria</th>
                    <th className="px-4 py-2 text-left">Rating</th>
                    <th className="px-4 py-2 text-left">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2">Task Completion</td>
                    <td className="px-4 py-2">4/5</td>
                    <td className="px-4 py-2">Completed tasks on time, but could improve quality.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">Team Collaboration</td>
                    <td className="px-4 py-2">5/5</td>
                    <td className="px-4 py-2">Excellent communication and teamwork.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Leadership</td>
                    <td className="px-4 py-2">3/5</td>
                    <td className="px-4 py-2">Needs to take more initiative.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>


        </main>
      </div>
    </div>
  );
}

export default InternDashboard;
