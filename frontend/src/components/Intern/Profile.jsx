import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const InternsProfile = () => {
  const [profile, setProfile] = useState({
    name: "Dasindu Dinsara",
    nic: "123456789V",
    section: "Software Engineering",
    group: "Team Alpha",
    mobile: "9876543210",
    email: "hanna.gover@system.com",
  });

  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Generate a preview of the image
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profile);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        {/* Profile Content */}
        <div className="flex flex-grow flex-col md:flex-row bg-white shadow-lg rounded-lg m-4 p-6">
          {/* Profile Card */}
          <div className="flex flex-col items-center md:w-1/3 bg-blue-50 p-6 rounded-md shadow-md">
            <img
              className="w-64 h-64 rounded-full border-4 border-white shadow-lg object-cover"
              src={image || "https://via.placeholder.com/200"}
              alt="Profile"
            />
            <label
              htmlFor="imageUpload"
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              onChange={handleImageUpload}
            />
            <h2 className="mt-4 text-xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-500">Intern</p>
          </div>

          {/* Profile Details */}
          <div className="flex-grow mt-6 md:mt-0 md:ml-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Profile Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name (Read-Only) */}
              <div className="flex flex-col">
                <label className="text-gray-500 text-sm">Full Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 bg-gray-100"
                  value={profile.name}
                  disabled
                />
              </div>

              {/* NIC (Read-Only) */}
              <div className="flex flex-col">
                <label className="text-gray-500 text-sm">NIC</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 bg-gray-100"
                  value={profile.nic}
                  disabled
                />
              </div>

              {/* Intern Section (Editable) */}
              <div className="flex flex-col">
                <label className="text-gray-500 text-sm">Intern Section</label>
                <input
                  type="text"
                  name="section"
                  className={`border border-gray-300 rounded-md p-2 ${
                    !isEditing ? "bg-gray-100" : ""
                  }`}
                  value={profile.section}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              {/* Group (Editable) */}
              <div className="flex flex-col">
                <label className="text-gray-500 text-sm">Group</label>
                <input
                  type="text"
                  name="group"
                  className={`border border-gray-300 rounded-md p-2 ${
                    !isEditing ? "bg-gray-100" : ""
                  }`}
                  value={profile.group}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              {/* Mobile No (Editable) */}
              <div className="flex flex-col">
                <label className="text-gray-500 text-sm">Mobile No</label>
                <input
                  type="text"
                  name="mobile"
                  className={`border border-gray-300 rounded-md p-2 ${
                    !isEditing ? "bg-gray-100" : ""
                  }`}
                  value={profile.mobile}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email (Read-Only) */}
              <div className="flex flex-col">
                <label className="text-gray-500 text-sm">Email</label>
                <input
                  type="email"
                  className="border border-gray-300 rounded-md p-2 bg-gray-100"
                  value={profile.email}
                  disabled
                />
              </div>
              <button
                onClick={isEditing ? handleSave : toggleEdit}
                className={`mt-auto w-full py-2 px-4 rounded-md text-white ${
                  isEditing ? "bg-blue-600" : "bg-green-600"
                }`}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternsProfile;
