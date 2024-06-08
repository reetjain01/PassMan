import React from "react";

const Navbar = () => {
  return (
    <nav className=" bg-slate-800 text-white overflow-x-hidden">
      <div className="mycontainer flex justify-between   items-center sm:px-8 px-1 py-5 h-16">
        <div className="logo font-bold text-xl ">
          <span className=" text-green-500">&lt; </span>
          Pass
          <span className=" text-green-500">Man /&gt;</span>
        </div>
        {/* <ul>
          <li className=" flex gap-8">
            <a className=" hover:font-bold hover:text-slate-100" href="/">
              Home
            </a>
            <a className=" hover:font-bold hover:text-slate-100" href="#">
              About
            </a>
            <a className=" hover:font-bold hover:text-slate-100" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button className=" text-white sm:w-28 w-[70px]  my-2  flex justify-center  items-center sm:px-4 px-1 ring-1 ring-white rounded-full">
          <a href="https://github.com/reetjain01" target="_blank" className=" flex justify-center items-center">
            <img
              className=" invert p-2 w-10"
              src="/icons/github.svg"
              alt="github logo"
            />
            <span className=" font-bold hidden sm:block">Github</span>
         </a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
