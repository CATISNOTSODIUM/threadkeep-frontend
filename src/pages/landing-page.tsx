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
      <div className="text-xs text-gray-400">
        This web forum is created for CVWO winter assignment.        
      </div>
      <div className="text-xs text-gray-400 pb-2">
        © 2025 ThreadKeep. All rights reserved.
      </div>
      {/* Github icon */}
      <a href="https://github.com/CATISNOTSODIUM/threadkeep-frontend">
        <svg aria-hidden="true" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>
    </div>
  );
}
