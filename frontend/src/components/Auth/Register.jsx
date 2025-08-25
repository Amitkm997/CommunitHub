import React, { useState } from "react";
import '../../css/Register.css';
import API from "../../api";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const[success,setSuccess]=useState('')
  const[err,setErr]=useState("")

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Register data:", formData);
    setErr('');
    setSuccess("");
    // Here you’ll make an API call: axios.post('/register', formData)
    try{
        const res=await API.post('/user/register',formData);
        console.log(res)
        setSuccess(res.data.message)
    }catch(error){
        const message=error.response?.data?.message||error.message;
        setErr(message)
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="********"
          />
        </label>

        <button type="submit">Register</button>
        {err&& <p>{err}</p>}
        {success && <p>{success}</p>}
      </form>
    </div>
  );
}
