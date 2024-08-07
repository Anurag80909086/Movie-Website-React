import "./Header.css";
import Logo from "./Logo.png";
function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="Logo" id="logo" />
      <h3 className="logo-name">Movies Hub</h3>
    </div>
  );
}

export default Header;