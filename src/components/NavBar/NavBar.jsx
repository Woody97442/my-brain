import React from "react";
import { Link } from "react-router-dom";

// Importation du Css
import "./NavBar.css";

function NavBar() {
  return (
    <header className="bg-custom">
      <div className="flex flex-row items-center gap-4">
        <Link to={`/`} className="logo">
          <img src="/logo.jpg" alt="Logo" className="w-16 h-16" />
        </Link>
        <Link to={`/`}>
          <h1 className="text-2xl font-bold text-center p-4 tracking-widest text-white">
            My Second Brain
          </h1>
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
