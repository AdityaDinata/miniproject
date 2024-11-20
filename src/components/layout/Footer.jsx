import React from "react";

const AppFooter = () => {
  return (
    <footer className="py-4 bg-white text-center text-black shadow-t-md">
      <p className="text-sm">
        © {new Date().getFullYear()} Eco Smart. All rights reserved.
      </p>
    </footer>
  );
};

export default AppFooter;
