import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useHistory, useLocation, Link } from "react-router-dom"; // Import useLocation and Link

const API_BASE_URL = "http://localhost:3000/api";

export const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);

  const { setUser } = useUser();
  const history = useHistory();
  const location = useLocation();

  const isLogin = location.pathname === "/login";

  useEffect(() => {
    setErrors([]);
    setEmail("");
    setPassword("");
    setUsername("");
  }, [isLogin]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);

    // Construct the full URL using API_BASE_URL
    const url = isLogin ? `${API_BASE_URL}/users/login` : `${API_BASE_URL}/users`;
    const method = "POST";
    const requestBody = isLogin ? { user: { email, password } } : { user: { username, email, password } };

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors
        if (data.errors) {
          const errorMessages = Object.keys(data.errors).map(key => `${key} ${data.errors[key].join(", ")}`);
          setErrors(errorMessages);
        } else {
          setErrors(["An unexpected error occurred."]);
        }
        return;
      }

      const { user } = data;
      setUser({
        username: user.username,
        email: user.email,
        token: user.token,
        bio: user.bio || "",
        image: user.image || "",
      });
      localStorage.setItem("jwtToken", user.token);
      history.push("/");
    } catch (error) {
      console.error("Authentication error:", error);
      setErrors(["Network error or server is unreachable."]);
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{isLogin ? "Sign In" : "Sign Up"}</h1>
            <p className="text-xs-center">
              {isLogin ? (
                <Link to="/register">Need an account?</Link>
              ) : (
                <Link to="/login">Have an account?</Link>
              )}
            </p>

            <ul className="error-messages">
              {errors.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </fieldset>
              )}
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
