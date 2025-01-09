import React from 'react';
import logo from '/src/assets/logo.png';

const Header = () => {
  return (
    <header className="bg-slt-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3 ml-[-70px]"> {/* Adjusted margin-left */}
          <img src={logo} alt="SLT Logo" className="h-14 w-55" />
        </div>
        <h1 className="text-3xl font-bold text-center flex-grow">
          Attendance Portal
        </h1>
        <div className="w-10"></div>
      </div>
      
    </header>
    

  );
};

export default Header;
