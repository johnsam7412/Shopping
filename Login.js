import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!form.username.trim()) validationErrors.username = "Username is required";
    if (!form.password.trim()) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username: form.username,
        password: form.password,
      });

      if (response.status === 200) {

        localStorage.setItem("username", form.username);

        alert("Login successful!");
        navigate("/"); // 
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data); // backend error
      } else {
        alert("Something went wrong!");
      }
    }
  };

  // Google Login 

  const handleGoogleSuccess = async (credentialResponse) => {

    try {

      const decoded = jwtDecode(credentialResponse.credential);
      const email = decoded.email;
      const name = decoded.name;

      const response = await axios.post("http://localhost:8080/api/google-login", {
        email: email,
        username: name,

      });


      if (response.status === 200) {
        localStorage.setItem("username",name); // save email as identifier
        alert("Login successful with Google!");
        navigate("/");
      }

    } catch (error) {

      console.error("Google login error:", error);
      alert("Google login failed. Try again!");
    }

  };

  // 🔹 Google Login Failure
  const handleGoogleFailure = () => {
    alert("Google login failed!");
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className={errors.username ? "input-error" : ""}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit">Login</button>
      </form>


      {/* Divider */}
      <div style={{ margin: "20px 0", textAlign: "center" }}>OR</div>

      {/* Google Login */}
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />

      <p>
        Don’t have an account? <Link to="/sign">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
