import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [canLogin, setCanLogin] = useState("");
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    sessionStorage.setItem("email", formData.email);
    const response = await axios.get(
      `https://rentify-4asm.onrender.com/login?email=${formData.email}&password=${formData.password}`
    );
    console.log(response);
    if (response.data.message === "Login successful") {
      history(`/${response.data && response.data.character}-home`);
    } else if (response.data === "User not found") {
      setCanLogin("Register");
    } else {
      setCanLogin("IncorrectPass");
    }
  };
  return (
    <div className="bg-[#212222] h-screen w-screen text-white roboto_clight flex flex-col items-center justify-center">
      {" "}
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center relative justify-center space-y-5 bg-[#343b3b] p-10 flex-col rounded-3xl w-[50vw] h-[75vh] text-xl"
      >
        {canLogin === "Register" && (
          <h1>User not found Register now to continue</h1>
        )}
        {canLogin === "IncorrectPass" && <h1>Incorrect password!</h1>}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">EMAIL</label>
          <input
            required
            onChange={handleInputChange}
            type="email"
            name=""
            id="email"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password">PASSWORD</label>
          <input
            required
            onChange={handleInputChange}
            type="password"
            id="password"
          />
        </div>
        <button
          type="submit"
          className="rounded-3xl p-4 w-fit absolute bottom-20 self-center bg-[#42647d] hover:scale-105 duration-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
