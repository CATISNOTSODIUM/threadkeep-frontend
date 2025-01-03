import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
   const [isOpen, setIsOpen] = React.useState(false);
const tabs = ["Home", "Threads", "Profile"];
  const url = ["/", "/threads", "/profile"];
 return (
   <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-100 flex items-center justify-between flex-wrap p-6">
     <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
      
      <button onClick={() => navigate("/")} className="flex items-center text-black">
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">ThreadKeep ⬢ </span>
      </button>
     </div>
     <div className="block">
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
       >
         <svg
           className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
         </svg>
         <svg
           className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
         </svg>
       </button>
     </div>
     
     <div
       className={` w-full block flex-grow ${isOpen ? "block" : "hidden"} `}
     >
       <div className="text-sm w-full justify-end">
          {tabs.map((tab, index) => (
                  <button key={index} onClick={() => navigate(url[index])} className="block text-base mt-4  text-white-200 mr-48">
                    {tab}
                  </button>
            ))}
       </div>
     </div>

   </nav>
 );
}