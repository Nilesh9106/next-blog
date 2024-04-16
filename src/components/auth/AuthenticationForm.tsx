"use client";
import useAuth from "@/hooks/useAuth";
import { LoginForm, SignupForm } from "@/types/form";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [data, setData] = useState<SignupForm>({
    email: "",
    password: "",
    username: "",
  });
  const { signUp } = useAuth();
  const handleSubmit = async () => {
    await toast.promise(signUp(data), {
      success: "Signed up successfully",
      pending: "Signing up...",
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="input"
          id="username"
          required
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
          value={data.username}
          placeholder="Username"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="input"
          required
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
          id="email"
          placeholder="Email"
          value={data.email}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="input"
          id="password"
          required
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
          value={data.password}
          placeholder="Password"
        />
      </div>
      <div>
        <button type="submit" className="btn w-full">
          Sign up
        </button>
      </div>
    </form>
  );
};

const Login = () => {
  const [data, setData] = useState<LoginForm>({
    password: "",
    username: "",
  });
  const { signIn } = useAuth();
  const handleSubmit = async () => {
    await toast.promise(signIn(data), {
      success: "Logged in successfully",
      pending: "Logging in...",
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="input"
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
          value={data.username}
          required
          placeholder="Username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="input"
          id="password"
          required
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
          value={data.password}
          placeholder="Password"
        />
      </div>
      <div>
        <button className="btn w-full">Login</button>
      </div>
    </form>
  );
};

const AuthenticationForm = () => {
  const [selected, setSelected] = useState<"login" | "signup">("login");
  return (
    <>
      <div className="max-w-lg mx-auto my-5 dark:bg-neutral-900 bg-neutral-200 p-4 rounded-lg flex flex-col gap-4">
        <div className="flex border-b dark:border-neutral-700 border-neutral-500 pb-3">
          <div
            onClick={() => setSelected("login")}
            className={`flex-1 hover:text-emerald-600 ${
              selected == "login" ? "text-emerald-600" : ""
            } cursor-pointer transition-all flex justify-center items-center text-center`}
          >
            Login
          </div>
          <div
            onClick={() => setSelected("signup")}
            className={`flex-1 hover:text-emerald-600 ${
              selected == "signup" ? "text-emerald-600" : ""
            } cursor-pointer transition-all flex justify-center items-center text-center`}
          >
            SignUp
          </div>
        </div>
        <div>{selected === "login" ? <Login /> : <SignUp />}</div>
      </div>
    </>
  );
};

export default AuthenticationForm;
