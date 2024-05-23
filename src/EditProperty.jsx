import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProperty() {
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const queryString = new URLSearchParams(window.location.search);
    const id = queryString.get("id");
    const response = await axios.patch(
      `http://localhost:5000/save-edited-property?id=${id}`,
      formData
    );
    history("/seller-profile");
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const [formData, setFormData] = useState({
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    hospitals: "",
    colleges: "",
  });
  //Retreiving the property information which you wanted to edit
  useEffect(() => {
    async function getEditingPropertyInfo() {
      const queryString = new URLSearchParams(window.location.search);
      const id = queryString.get("id");
      console.log(id);
      const response = await axios.get(
        `http://localhost:5000/get-one-property?id=${id}`
      );
      return response.data;
    }
    async function getInfo() {
      const propertyinfo = await getEditingPropertyInfo();
      console.log(propertyinfo);
      setFormData(propertyinfo);
    }
    getInfo();
  }, []);
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
            defaultValue={formData && formData.place}
            type="text"
            id="place"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Area</label>
          <input
            defaultValue={formData && formData.area}
            type="text"
            id="area"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>No of Bedrooms</label>
          <input
            defaultValue={formData && formData.bedrooms}
            type="text"
            id="bedrooms"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>No of Bathrooms</label>
          <input
            defaultValue={formData && formData.bathrooms}
            type="number"
            id="bathrooms"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>No of Hospitals Nearby</label>
          <input
            defaultValue={formData && formData.hospitals}
            type="number"
            id="hospitals"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>No of Colleges Nearby</label>
          <input
            defaultValue={formData && formData.colleges}
            type="number"
            id="colleges"
            onChange={handleChange}
          />
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
