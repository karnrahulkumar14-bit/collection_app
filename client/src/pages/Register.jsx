import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password:"",
  });
  const navigate = useNavigate();
  const {storeTokenInLs} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // update field correctly
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // send data as JSON
      });
  
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
  
      const result = await response.json(); // 👈 parse JSON response
      alert('Register successfully');
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      navigate("/login");
      storeTokenInLs(result.token);
    } catch (error) {
      console.error("Register error:", error);
    }
  };
  
  return (
    <>
      <div className="container pt-5 pb-5">
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">

          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control form-control-lg"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control form-control-lg"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              className="form-control form-control-lg"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          
            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control form-control-lg"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="true"
              />
            </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Register