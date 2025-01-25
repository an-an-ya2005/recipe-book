import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <p>&copy; {new Date().getFullYear()} Recipe App. All rights reserved.</p>
    </footer>
  );
};

// Styles
const footerStyles = {
  textAlign: "center",
  padding: "10px",
  backgroundColor: "black",
  color: "#fff",
  marginTop: "auto",
};

export default Footer;
