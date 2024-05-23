import "./App.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Register() {
  const history = useNavigate();

  const [isRegistered, setIsRegistered] = useState(true);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    character: "",
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/register",
      formData
    );
    // New User
    if (response.data === "Registered Successfuly") {
      history("/login");
    }
    // Already a user
    else {
      setIsRegistered(false);
    }
  };
  const handleInputChange = (e) => {
    console.log(document.getElementById("character").value);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  console.log(isRegistered);

  return (
    <div className="bg-[#212222] h-screen w-screen text-white roboto_clight flex flex-col items-center justify-center">
      {isRegistered === false && (
        <h1>You are already a User!! Please Login to Continue.</h1>
      )}
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r text-5xl tracking-wider roboto_cbold via-slate-500 from-[#96bbbe] to-slate-200 mb-[5vh]">
        RENTIFY
      </h1>
      <form className="bg-[#343b3b] flex items-center p-10 rounded-3xl w-[50vw] h-[75vh]  justify-evenly text-xl">
        <section className="space-y-4 ">
          <div className="flex flex-col items-baseline space-y-2">
            <label htmlFor="firstname">FIRST NAME</label>
            <input
              required
              onChange={handleInputChange}
              type="text"
              id="firstname"
            />
          </div>
          <div className="flex flex-col items-baseline space-y-2">
            <label htmlFor="lastname">LAST NAME</label>
            <input
              required
              onChange={handleInputChange}
              type="text"
              id="lastname"
            />
          </div>
          <div className="flex flex-col items-baseline space-y-2">
            <label htmlFor="email">EMAIL</label>
            <input
              required
              onChange={handleInputChange}
              type="email"
              id="email"
            />
          </div>
          <div className="flex flex-col items-baseline space-y-2">
            <label htmlFor="password">PASSWORD</label>
            <input
              required
              onChange={handleInputChange}
              type="password"
              id="password"
            />
          </div>
          <div className="flex flex-col items-baseline space-y-2">
            <label htmlFor="">PHONE</label>
            <input
              required
              onChange={handleInputChange}
              type="text"
              id="phone"
            />
          </div>
          <div className="flex space-y-2 flex-col items-baseline">
            <label htmlFor="character">CHARACTER</label>
            <select
              onChange={handleInputChange}
              name="character"
              id="character"
              className="text-black"
            >
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
        </section>
        <section className="roboto_clight h-full flex flex-col justify-evenly">
          {/* <img
            src="register_home1.jpg"
            alt="Home"
            height="400"
            width="400"
            className="rounded-3xl"
          /> */}
          <h1 className="self-center">
            Already a User? click{" "}
            <span className="underline cursor-pointer">
              <Link to="/login"> here </Link>{" "}
            </span>{" "}
            to Login
          </h1>
          <button
            onClick={handleFormSubmit}
            type="submit playfair"
            className="rounded-3xl p-4 w-fit self-center bg-[#42647d] hover:scale-105 duration-500"
          >
            Register
          </button>
        </section>
      </form>
    </div>
  );
}

export default Register;
