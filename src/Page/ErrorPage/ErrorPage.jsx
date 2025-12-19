import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex justify-center ">
        <img
          className="h-[400px] w-[600px] mt-12 rounded-2xl"
          src="https://i.ibb.co.com/Xx9Qf2BS/8bb64b612b0b7444fa62fdd26e8ae6e2.jpg"
          alt=""
        />
      </div>
      <div className="flex justify-center">
        <Link
          to="/"
          className="btn  bg-black rounded-2xl text-white"
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
