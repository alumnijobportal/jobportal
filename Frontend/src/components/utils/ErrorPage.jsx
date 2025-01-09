import React from "react";
import { Typography, Button } from "@mui/material";
import { FaFlag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {

    const navigate = useNavigate();

  return (
    <div className="h-screen grid place-items-center text-center px-8">
      <div>
        <FaFlag className="w-20 h-20 mx-auto text-gray-700" />
        <div
          variant="h4"
          className="mt-10 text-3xl leading-snug text-gray-800 md:text-4xl"
        >
          Error 404 <br /> It looks like something went wrong.
        </div>
        <div className="mt-4  mb-2 text-lg text-gray-500 md:max-w-sm text-center mx-auto">
          Don&apos;t worry, our team is already on it. Please try refreshing the
          page or come back later.
        </div>
        <button 
          className="bg-gray-700 text-white w-full px-4 py-1 rounded-lg md:w-[8rem] hover:bg-gray-800"
          onClick={()=>navigate("/")}
        >
          Back Home
        </button>
      </div>
    </div>
  );
}

