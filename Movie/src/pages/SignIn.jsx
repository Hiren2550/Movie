import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, load, error } = useSelector((state) => state.user);
  //console.log(currentUser, load, error);
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
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData = await res.json();
      if (userData.success == false) {
        dispatch(signInFailure(userData.message));
        return;
      }
      dispatch(signInSuccess(userData));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  const onError = (error) => {
    //console.log("error", error);
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form
        className="flex flex-col gap-4"
        method="post"
        onSubmit={handleSubmit(formSubmit, onError)}
      >
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
            {load ? "loading" : "Sign In"}
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
        <Link to={"/sign-up"}>
          <span className="text-blue-600">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-2">Error message:{error}</p>}
    </div>
  );
};

export default SignIn;
