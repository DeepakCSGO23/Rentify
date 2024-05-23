import React, { useEffect, useState } from "react";
import axios from "axios";
export default function SellerInfo() {
  const [profileData, setProfileData] = useState("");
  useEffect(() => {
    async function getSellerInfo() {
      const queryString = new URLSearchParams(window.location.search);
      const email = queryString.get("email");
      const response = await axios.get(
        `https://rentify-4asm.onrender.com/get-profile-info?email=${email}`
      );
      console.log(response.data);
      setProfileData(response.data);
    }
    getSellerInfo();
  }, []);
  return (
    <div className="bg-[#212222] h-screen w-screen text-white roboto_clight flex flex-col text-xl items-center justify-center">
      <h1 className="text-3xl mb-[10vh]">Seller Information</h1>
      <div className="flex flex-col space-y-5 items-baseline">
        <h1>FirstName :{profileData.firstname}</h1>
        <h1>LastName : {profileData.lastname}</h1>
        <h1>Email : {profileData.email}</h1>
        <h1>Phone No : {profileData.phone}</h1>
      </div>
    </div>
  );
}
