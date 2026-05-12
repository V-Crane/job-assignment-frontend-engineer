import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export const NavBar = () => {
  const { user, setUser } = useUser();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("jwtToken");
  };

  const getNavLinkClass = path => {
    return `nav-link ${location.pathname === path ? "active" : ""}`;
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className={getNavLinkClass("/")} to="/">
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link className={getNavLinkClass("/editor")} to="/editor">
                  <i className="ion-compose" />
                  &nbsp;New Article
                </Link>
              </li>
              <li className="nav-item">
                <Link className={getNavLinkClass("/settings")} to="/settings">
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link className={getNavLinkClass(`/profile/${user.username}`)} to={`/profile/${user.username}`}>
                  <i className="ion-person" />
                  &nbsp;{user.username}
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                  &nbsp;Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className={getNavLinkClass("/login")} to="/login">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className={getNavLinkClass("/register")} to="/register">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
