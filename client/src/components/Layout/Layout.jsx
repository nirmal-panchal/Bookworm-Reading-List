import React from "react";
import Header from "./Header"; // Importing the Header component
import Footer from "./Footer"; // Importing the Footer component

// Layout component is a higher-order component that wraps its children with Header and Footer
const Layout = ({ children }) => {
  return (
    <div>
      <Header /> {/* Render the Header component at the top */}
      {children} {/* Render the child components passed to Layout */}
      <Footer /> {/* Render the Footer component at the bottom */}
    </div>
  );
};

export default Layout; // Export the Layout component for use in other parts of the application
