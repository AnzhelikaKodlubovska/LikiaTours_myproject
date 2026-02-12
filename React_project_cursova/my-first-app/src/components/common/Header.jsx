import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // додав useLocation
import "../../styles/components/Header.css";
import logo from "../../images/logo.png";

function Header() {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // щоб знати, на якій ми сторінці

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.error(err);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthClick = () => {
    window.open("/auth", "_blank", "width=500,height=600");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="LikiaTours" />
          <Link to="/">
            Likia<span>Tours</span>
          </Link>
        </div>

        <nav className="nav">
          <Link
            to="/destinations"
            className={location.pathname === "/destinations" ? "active" : ""}
          >
            Напрямки
          </Link>
          <Link
            to="/reviews"
            className={location.pathname === "/reviews" ? "active" : ""}
          >
            Відгуки
          </Link>
          <Link
            to="/faq"
            className={location.pathname === "/faq" ? "active" : ""}
          >
            FAQ
          </Link>
          <Link
            to="/contacts"
            className={location.pathname === "/contacts" ? "active" : ""}
          >
            Контакти
          </Link>
        </nav>

        <div className="user-menu">
          {user ? (
            <>
              {(user.is_admin === 1 || user.is_admin === true) && (
                <Link to="/admin" className="admin-badge">
                  🛡️ Адмін
                </Link>
              )}
              <Link to="/profile" className="profile-link">
                Профіль
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Вийти
              </button>
            </>
          ) : (
            <button onClick={handleAuthClick} className="login-btn">
              Увійти
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
