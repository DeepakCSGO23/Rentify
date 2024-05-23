import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellerHome() {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    email: sessionStorage.getItem("email"),
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    hospitals: "",
    colleges: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/add-property",
      formData
    );
    if (response.status === 200) {
      history("/seller-profile");
    }
  };

  return (
    <div className="bg-[#212222] h-screen w-screen text-white roboto_clight flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-[10vh]">
        Secure Your New Home Today - Apply Now!
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start text-xl"
      >
        <div className="flex flex-col space-y-2">
          <label>Place:</label>
          <input
            type="text"
            id="place"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Area</label>
          <input type="text" id="area" onChange={handleChange} required />
        </div>
        <div className="flex flex-col space-y-2">
          <label>No of Bedrooms</label>
          <input type="text" id="bedrooms" onChange={handleChange} />
        </div>
        <div className="flex flex-col space-y-2">
          <label>No of Bathrooms</label>
          <input type="number" id="bathrooms" onChange={handleChange} />
        </div>
        <div className="flex flex-col space-y-2">
          <label>No of Hospitals Nearby</label>
          <input type="number" id="hospitals" onChange={handleChange} />
        </div>
        <div className="flex flex-col space-y-2">
          <label>No of Colleges Nearby</label>
          <input type="number" id="colleges" onChange={handleChange} />
        </div>
        <button
          type="submit"
          className="rounded-3xl p-4 w-fit absolute bottom-20 self-center bg-[#42647d] hover:scale-105 duration-500"
        >
          Submit
        </button>{" "}
      </form>
    </div>
  );
}

export default SellerHome;
