import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { useHistory, useLocation, Link } from "react-router-dom";
import { loginUser } from "../../api/api"; // Import API functions
import "./LoginRegister.css";

export const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]); // Initialize errors as an array

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

    try {
      let userData;
      if (isLogin) {
        userData = await loginUser(email, password);
      } else {
        setErrors(["Registration not implemented."]);
        return
        //userData = await registerUser(username, email, password);
      }

      const { user } = userData;
      setUser({
        username: user.username,
        email: user.email,
        token: user.token,
        bio: user.bio || "",
        image: user.image || "",
      });
      localStorage.setItem("jwtToken", user.token);
      history.push("/");
    } catch (err) {
      console.error("Authentication error:", err);
      if (err.errors) {
        const errorMessages = Object.keys(err.errors).map(key => `${key} ${err.errors[key].join(", ")}`);
        setErrors(errorMessages);
      } else if (err.message) {
        setErrors([err.message]);
      } else {
        setErrors(["Network error or server is unreachable."]);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{isLogin ? "Sign In" : "Sign Up"}</h1>
            <p className="text-xs-center">
              {isLogin ? <Link to="/register">Need an account?</Link> : <Link to="/login">Have an account?</Link>}
            </p>
            <ul className="error-messages">
              {errors.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="form-login-register">
              {!isLogin && (
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  name="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              )}
              <input
                className="form-control form-control-lg"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
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
