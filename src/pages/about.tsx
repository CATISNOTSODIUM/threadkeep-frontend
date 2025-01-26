import React from "react";
import NavBar from "../components/common/nav-bar.tsx";
import {
  Button,
  HStack
} from "@chakra-ui/react";
export default function About() {
  return (
    <div className="text-white bg-gradient-to-bl from-black to-gray-900 flex flex-col min-h-screen justify-center px-16 lg:px-64 border-none overflow-scroll">
      <NavBar />
      <div className="text-4xl lg:text-6xl my-3 text-wrap" id="logo">
        ThreadKeep ⬢{" "}
      </div>

      <HStack className="my-2">
        <Button variant={"outline"} colorScheme="yellow">
          <a href="https://catisnotsodium.vercel.app/">About me 🐱</a>
        </Button>
        <Button variant={"solid"} colorScheme="yellow">
          <a href="https://github.com/CATISNOTSODIUM/threadkeep-frontend">
            Frontend
          </a>
        </Button>
        <Button variant={"solid"} colorScheme="yellow">
          <a href="https://github.com/CATISNOTSODIUM/threadkeep-backend">
            Backend
          </a>
        </Button>
      </HStack>
        <div className="text-xl font-bold mb-3">
        {" "}
        This project was built for CVWO Winter Assignment
      </div>
      <div className="text-xs md:text-base overflow-scroll">
        <p>
        First and foremost, I would like to extend my sincere thanks to the CVWO
        committee who offers the invaluable opportunity to embrace myself
        through web development frameworks within two months. It has helped me
        learn essential programming concepts and become familiar with web
        development frameworks step by step throughout the guide. To be honest,
        grinding through this assignment was initially daunting and
        mind-blocking. Those can be surpassed by the excitement to grasp new
        concepts from practical experience.
      </p>
      <p className="py-2 text-yellow-100 font-bold">
        In the end, it’s actually worth it! ♥ Phew 😅
      </p>
      <p>
        Nonetheless, I would like to acknowledge the assistance of all online
        tutorials such as Net Ninja, Fireship, and Web Dev Simplified who
        provided helpful tutorials throughout this assignment. Also, thank you
        to the DataCamp course for helping me grasp the basic ideas of working
        with SQL. Special thanks to Stack Overflow for giving me ingenious
        suggestions on writing good-practice code. Finally, I would like to
        express special thanks to all of the CS seniors who recommended this
        program for relentlessly giving support and helpful advice. Also,
        special thanks to NUS School of Computing for offering this opportunity
        and keeping me busy during the winter break. This break would not have
        been as interesting without this assignment.
      </p>
      </div>
    </div>
  );
}
