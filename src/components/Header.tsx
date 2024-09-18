import "../css/Header.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div id="header">
      <div id="name">
        <h1>Benjamin</h1>
        <h2>Plante</h2>
      </div>
      {/* <div id="links">
        <a href="https://github.com/walord99" target="_blank">
          <img src="/github.svg" alt="" />
        </a>
        <a href="https://www.linkedin.com/in/b-plante/" target="_blank">
          <img src="/linkdin.svg" alt="" />
        </a>
      </div> */}
      <div id="navbar">
        <NavLink to="/">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/settings">
          <img src="/cog.svg" alt="settings" />
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
