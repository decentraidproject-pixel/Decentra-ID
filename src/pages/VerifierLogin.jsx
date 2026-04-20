import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Login.css";

function VerifierLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const res = await axios.post(
        "https://decentraidbackend-2.onrender.com/api/institution/login",
        formData
      );

      console.log("Login response:", res.data);

      if (!res.data.token) {
        alert("Token not received from server!");
        return;
      }

   
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("verifierName", res.data.name);

localStorage.setItem("verifierToken", res.data.token);
      console.log("Token saved in localStorage:", localStorage.getItem("token"));

      alert("Login Successful");

   
      window.location.href="http://localhost:5173/verifier-dashboard";
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <h1>Verifier Login</h1>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default VerifierLogin;
