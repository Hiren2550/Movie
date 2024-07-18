import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null); //for Backend error
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const formSubmit = async (data) => {
    //console.log("Form data", data);
    try {
      setLoad(true);
      const res = await fetch("/api/auth/signup", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData = await res.json();
      //console.log(userData);
      if (userData.success == false) {
        setLoad(false);
        setError(userData.message);
        return;
      }
      setLoad(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoad(false);
      setError(error.message);
    }
  };
  const onError = (error) => {
    //console.log("error", error);
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form
        className="flex flex-col gap-2"
        method="post"
        onSubmit={handleSubmit(formSubmit, onError)}
      >
        <input
          className=" border border-gray-300  p-3 focus:outline-none rounded-lg"
          {...register("username", {
            pattern: {
              value: "/^[0-9A-Za-z]{6,16}$/",
              message: "use only characters and number",
            },
            required: {
              value: true,
              message: "fill the username",
            },
          })}
          type="text"
          placeholder="Enter username"
          autoComplete="off"
          id="username"
        />
        <p className="text-red-700">{errors.username?.message}</p>
        <input
          className=" border border-gray-300  p-3 focus:outline-none rounded-lg"
          {...register("email", {
            pattern: {
              value: "/^[w-.]+@([w-]+.)+[w-]{2,4}$/",
              message: "fill valid email",
            },
            required: {
              value: true,
              message: "fill the email",
            },
          })}
          type="email"
          placeholder="Enter email"
          autoComplete="off"
          id="email"
        />
        <p className="text-red-700">{errors.email?.message}</p>
        <input
          className=" border p-3 border-gray-300  focus:outline-none rounded-lg"
          {...register("password", {
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message: "Enter strong password",
            },
            required: { value: true, message: "fill the password" },
          })}
          type="password"
          placeholder="Enter password"
          autoComplete="off"
          id="password"
        />
        <p className="text-red-700">{errors.password?.message}</p>
        <div className="flex flex-col gap-2">
          <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95  disabled:opacity-80">
            {load ? "loading" : "Sign Up"}
          </button>
          <button
            onClick={() => reset()}
            className="bg-red-700 rounded-lg text-white p-3 uppercase hover:opacity-95  disabled:opacity-80"
          >
            Reset
          </button>
        </div>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-600">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-2">Error message:{error}</p>}
    </div>
  );
};

export default SignUp;
