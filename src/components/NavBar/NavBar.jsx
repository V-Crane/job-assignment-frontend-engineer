import './NavBar.css'

export const NavBar = () => {
  const login  = false

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/public#">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" class when you're on that page" */}
            <a className="nav-link active" href="/public#">
              Home
            </a>
          </li>
          {login ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/public#/editor">
                  <i className="ion-compose" />
                  &nbsp;New Article
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/public#/settings">
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/public#/login">
                  Sign in
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/public#/register">
                  Sign up
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
