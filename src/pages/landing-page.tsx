import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/common/nav-bar.tsx";
import { isVerified } from "../utils/isVerified.ts";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="text-white bg-gradient-to-bl from-black to-gray-900 flex flex-col min-h-screen justify-center px-16 lg:px-64 border-none">
      <NavBar />
      <div className="text-4xl lg:text-6xl my-3 text-wrap" id="logo">
        ThreadKeep ⬢{" "}
      </div>
      <div className="text-2xl font-bold mb-3">
        {" "}
        Your personal archive for online conversations.
      </div>
      <div className=" text-gray-500 hidden sm:block text-pretty">
        This project aims to solve this problem by integrating a built-in data
        retrieval system. Inspired by an online-shopping platform, where users
        click on products into their shopping carts and pay for them in a single
        click, this web forum allows users to filter irrelevant information from
        multiple threads and retrieve the information at once.
      </div>
      {!isVerified() ? (
        <button
          className="bg-gray-600 rounded-full text-white text-xl px-1 py-2 my-10 max-w-56 hover:animate-pulse"
          onClick={() => navigate("threads")}
        >
          Sign In / Register →
        </button>
      ) : (
        <button
          className="bg-gray-600 rounded-full text-white text-xl px-1 py-2 my-10 max-w-56 hover:animate-pulse"
          onClick={() => navigate("threads")}
        >
          Discuss →
        </button>
      )}
    </div>
  );
}
