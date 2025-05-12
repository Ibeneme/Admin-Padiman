import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NewNav.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleNavbar = (): void => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <p>PadimanRoute</p>
          {/* <img
        src={logo}
            alt=""
            style={{
              width: 0,
              height: 0,
              objectFit: "cover",
              objectPosition: "center",
              transform: "scale(1.9)",
            }}
          /> */}
        </div>

        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/" className="nav-link" onClick={closeNavbar}>
            Home
          </NavLink>
          <NavLink to="/terms" className="nav-link" onClick={closeNavbar}>
            Terms
          </NavLink>
          <NavLink to="/privacy" className="nav-link" onClick={closeNavbar}>
            Privacy
          </NavLink>

          <button className="donate-btn" style={{ border: "none" }}>
            Download App
          </button>
        </div>

        <div className="menu-icon" onClick={toggleNavbar}>
          {isOpen ? "✕" : "☰"}
        </div>
      </nav>

      {isOpen && <div className="backdrop" onClick={closeNavbar}></div>}
    </>
  );
};

export default Navbar;
