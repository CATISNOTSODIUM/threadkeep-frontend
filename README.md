# ThreadKeep ⬢  - Your personal archive for online conversations.
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

| Name                 | Matriculation number |
| -------------------- | -------------------- |
| Kosolpattanadurong Thitiwat       | A0305613N |


**ThreadKeep** is a web forum where people can create online forums. It's designed to be easy to use, and a special feature lets users easily pull out the most important information from other people's forums. This project was developed as a part of CVWO Assignment for the School of Computing, National University of Singapore (NUS). 

![](preview.mp4)

This is the **frontend** repository. For backend repository, please visit [here](https://github.com/CATISNOTSODIUM/threadkeep-backend).

## Introduction
While most of the forum discussion platforms available today allow users can engage in conversations by posting messages, sharing information, asking questions, and interacting with others on a variety of topics, retrieving information from the thread can only be done in only one way, retrieving information from the thread can only be done in one way: manually dragging the relevant part from the post and copying it into the clipboard. For instance, for the thread about solving a coding problem, the most relevant information is the code snippet. Imagine users having to retrieve information from multiple threads; manually copying one by one can be tedious.

This project aims to solve this problem by integrating a built-in data retrieval system. Inspired by an online-shopping platform, where users click on products into their shopping carts and pay for them in a single click, this web forum allows users to filter irrelevant information from multiple threads and retrieve the information at once. 

## Tech Stack
- **Programming Language**: TypeScript
- **Third-party Libraries**: React, [dnd-kit](https://dndkit.com/) for drag and drop components,  [react-markdown-editor](https://uiwjs.github.io/react-markdown-editor/) for markdown editor and preview
- **Styling**: Tailwind CSS

# Table of contents
- [ThreadKeep ⬢  - Your personal archive for online conversations.](#threadkeep-----your-personal-archive-for-online-conversations)
  - [Introduction](#introduction)
  - [Tech Stack](#tech-stack)
- [Table of contents](#table-of-contents)
- [Quick start](#quick-start)
  - [Building and Running the App Locally](#building-and-running-the-app-locally)
  - [Deployment](#deployment)
- [User manual](#user-manual)
  - [Account Registeration](#account-registeration)
  - [Posting Threads and Comments](#posting-threads-and-comments)
  - [Data retrieval system](#data-retrieval-system)
- [Acknowledgement](#acknowledgement)
- [License](#license)

# Quick start
## Building and Running the App Locally
To start a local development server, make sure to install the required dependencies by running `npm install`. Then, you can start the local server by executing `npm start`.

After you have run the following commands, the development server will be hosted at port 3000 `http://localhost:3000/`. 

## Deployment
todo!
# User manual
- [User manual](#user-manual)
  - [Account Registeration](#account-registeration)
  - [Posting Threads and Comments](#posting-threads-and-comments)
  - [Data retrieval system](#data-retrieval-system)
  
## Account Registeration
After visiting the landing page, click on the `Sign In / Register` button to sign in or create a new account. If you're new to ThreadKeep, this web forum authenticates users based solely on their usernames. You can optionally enter a password for added security. Note that you must sign in to view other pages.
After you have signed in, you will be redirected to `/threads` page.
## Posting Threads and Comments

## Data retrieval system
todo!
# Acknowledgement
todo!
# License
todo!
