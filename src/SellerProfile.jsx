import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SellerProfile() {
  // Getting all the Property Information uploaded by you
  useEffect(() => {
    async function getProperties() {
      const response = await axios.get(
        `https://rentify-4asm.onrender.com/get-properties?email=${sessionStorage.getItem(
          "email"
        )}`
      );
      return response.data;
    }
    async function getInfo() {
      const properties = await getProperties();
      console.log(properties);
      setPropertyData(properties);
    }
    getInfo();
  }, []);
  async function handleDelete(id) {
    const response = await axios.delete(
      `https://rentify-4asm.onrender.com/delete-property?id=${id}&email=${sessionStorage.getItem(
        "email"
      )}`
    );
    setPropertyData(response.data);
    console.log(response.data);
  }

  //State to show all the properties
  const [propertyData, setPropertyData] = useState([]);
  return (
    <div className="bg-[#212222] h-screen w-screen text-white roboto_clight flex flex-col items-center justify-center">
      <div className="flex space-x-5">
        {propertyData &&
          propertyData.map((property, index) => (
            <div
              key={index}
              className="text-xl p-10 rounded-3xl bg-[#42647D] space-y-5"
            >
              <h1>Area : {property.area}</h1>
              <h1>Place : {property.place}</h1>

              <h1>No of Bedrooms : {property.bedrooms}</h1>

              <h1>No of Bathrooms : {property.bathrooms}</h1>
              <h1>No of Hospitals nearby : {property.hospitals}</h1>
              <h1>No of colleges nearby : {property.colleges}</h1>
              <div className="edit&delete flex items items-center justify-evenly">
                <Link to={`/edit-property?id=${property._id}`}>
                  <img
                    className="cursor-pointer"
                    src="edit.svg"
                    alt="editproperty"
                    height="35"
                    width="35"
                    title="Edit Property"
                  />
                </Link>
                <img
                  onClick={() => handleDelete(property._id)}
                  className="cursor-pointer"
                  src="delete.svg"
                  alt="deleteproperty"
                  height="35"
                  width="35"
                  title="Delete Property"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
