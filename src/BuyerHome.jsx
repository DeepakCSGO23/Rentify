import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BuyerHome() {
  const [propertyData, setPropertyData] = useState([]);
  const [filterValue, setFilterValue] = useState();
  useEffect(() => {
    async function getAllProperties() {
      const response = await axios.get(
        "https://rentify-4asm.onrender.com/get-all-property"
      );
      return response.data;
    }
    async function getInfo() {
      const allproperties = await getAllProperties();
      console.log(allproperties);
      setPropertyData(allproperties);
    }
    getInfo();
  }, []);
  function handleFilterInputChange(e) {
    setFilterValue(e.target.value);
  }
  async function handleSearch() {
    const response = await axios.get(
      `https://rentify-4asm.onrender.com/filtered-property?filter=${filterValue}`
    );
    if (response.data === "No Property in the searched place") {
      return;
    }
    setPropertyData(response.data);
  }
  async function handleLike(id, email) {
    const response = await axios.patch(
      `https://rentify-4asm.onrender.com/like-property?id=${id}&email=${email}`
    );
    setPropertyData(response.data);
    console.log(response.data);
  }
  async function handleUnLike(id, email) {
    const response = await axios.patch(
      `https://rentify-4asm.onrender.com/unlike-property?id=${id}&email=${email}`
    );
    setPropertyData(response.data);
  }
  return (
    <div className="bg-[#212222] h-screen w-screen text-white roboto_clight flex flex-col items-center justify-center">
      <div className="relative bottom-20">
        <input
          required
          onChange={handleFilterInputChange}
          type="text"
          id="filter"
          className=" w-[40vw] h-[8vh] rounded-3xl p-10"
          placeholder="Search based on areas & places"
        />
        <img
          onClick={handleSearch}
          className="cursor-pointer absolute right-5 top-6"
          src="search.svg"
          alt="search"
          height="25px"
          width="25px"
        />
      </div>

      <div className="flex space-x-5">
        {propertyData &&
          propertyData.length > 0 &&
          propertyData.map((property, index) => (
            <div
              key={index}
              className="text-xl p-10 rounded-3xl bg-[#0f040b] space-y-5"
            >
              <h1>Area : {property.area}</h1>
              <h1>Place : {property.place}</h1>

              <h1>No of Bedrooms : {property.bedrooms}</h1>

              <h1>No of Bathrooms : {property.bathrooms}</h1>
              <h1>No of Hospitals nearby : {property.hospitals}</h1>
              <h1>No of colleges nearby : {property.colleges}</h1>
              <div className="flex space-x-4 items-center">
                <button className="rounded-3xl p-4 w-fit bg-[#1b2730] hover:scale-105 duration-500">
                  <Link to={`/seller-info?email=${property.email}`}>
                    {" "}
                    I'm Interested
                  </Link>
                </button>
                <h1>{property.likedBy && property.likedBy.length}</h1>
                {property.likedBy &&
                property.likedBy.includes(sessionStorage.getItem("email")) ? (
                  <img
                    onClick={() =>
                      handleUnLike(
                        property._id,
                        sessionStorage.getItem("email")
                      )
                    }
                    className="cursor-pointer"
                    src="liked.svg"
                    alt="liked"
                    height="40"
                    width="40"
                  />
                ) : (
                  <img
                    onClick={() =>
                      handleLike(property._id, sessionStorage.getItem("email"))
                    }
                    className="cursor-pointer"
                    src="unliked.svg"
                    alt="unliked"
                    height="40"
                    width="40"
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
