import React, { useState } from "react";
import "./Navbar.css";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`navbar-container ${isOpen ? "expanded" : "collapsed"}`}>
      {/* Toggle Button */}
      {!isOpen && (
        <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
          <div style={{ marginRight: "0px", marginTop: "4px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="15" height="50" viewBox="0 0 19.67950439453125 33.4765625" fill="none">
              <path fill="rgba(0, 0, 0, 1)" stroke="black" stroke-width="0.3" style={{ mixBlendMode: "normal" }} d="M19.6335 1.51853L2.13352 16.5185L1.48273 15.7593L2.17951 15.042L19.6795 32.042L18.2859 33.4766L0.785941 16.4766L0.831936 15L18.3319 2.07424e-05L19.6335 1.51853ZM0.831936 15L1.48273 15.7593L0.785941 16.4766L2.06232e-05 15.7131L0.831936 15Z">
              </path>
            </svg>
          </div>
        </button>
      )
      }

      {/* Navbar Content */}
      {isOpen && (
        <nav className="navbar">
          <div className="title">
            <div>NYU</div>
            <div>Global</div>
            <div>Show & Tell</div>
          </div>
          <div className="nav-buttons">
            {["Submit", "Call for Collaboration", "Showcase", "Event Calendar", "About"].map(
              (text, index) => (
                <button key={index} className="nav-button">
                  {text}
                </button>
              )
            )}
            {/* <div className="svg-container" onClick={() => setIsOpen(!isOpen)}>
              <svg className="svg-toggle-button" width="38" height="67" viewBox="0 0 38 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37 38C37 17.8999 20.9722 1.54319 1 1.01325V75.9867C20.9722 75.4568 37 59.1001 37 39V38Z" fill="white" stroke="black" stroke-width="2" />
              </svg>
              <svg className="overlay-arrow" width="18" height="34" viewBox="0 0 18 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L16 16L1 33" stroke="black" stroke-width="2" />
              </svg>


            </div> */}

            <button className="toggle-button-close" onClick={() => setIsOpen(!isOpen)}>
              <div style={{ marginLeft: "0px", marginTop: "4px" }}>
                <svg width="15" height="50" viewBox="0 0 18 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L16 16L1 33" stroke="black" stroke-width="2" />
                </svg>
              </div>
            </button>

          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
