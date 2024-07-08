import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const menuIcon= document.querySelector("#menu");
  const [menu, setmenu] = useState("close");
  const [dis, setDis] = useState("hidden");
  const [category, setCategory] = useState("general");

  function handleMenu(){
    setmenu("close");
    
    setDis("hidden");
  }

  function onToggleMenu() {
    if(menu === "close"){
      setmenu("open");
      //changes are made in the menu
      setDis("");
    }
    else{
      setmenu("close");
      //changes are made in the menu
      setDis("hidden");
    }
  }

  return (
    <div className="flex fixed top-0 w-full">
      <nav className="bg-white border-gray-200  w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 w-full">
          <Link
            to="/"
            onClick={handleMenu}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqaX-yel4wc3YZ4POBFKNEp5pFzbVMdmFLOw&s"
              className="h-16"
              alt="ShreeJee Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              ShreeJee Steels
            </span>
          </Link>
          <img id="menu" srcSet="https://cdn-icons-png.flaticon.com/512/2099/2099192.png" onClick={onToggleMenu} alt="menu-card" className="text-3xl cursor-pointer md:hidden h-9"/>
          
          <div className= {`w-full md:block md:w-auto ${dis}`} id="navbar-default">
            <ul className="md:items-center md:text-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  onClick={() => { handleMenu(); setCategory("general"); }}
                  className={`block py-2 px-3 ${category === "general" ? "md:text-blue-500 bg-blue-500" : ""}   rounded md:hover:text-blue-500 hover:bg-gray-700 md:hover:bg-transparent md:bg-transparent md:p-0 `}
                  aria-current="page"
                >
                  बिल बनाये
                </Link>
              </li>
              <li>
                <Link
                  to="/record"
                  onClick={() => { handleMenu(); setCategory("sports"); }}
                  className={`block py-2 px-3 rounded md:border-0 ${category === "sports" ? "md:text-blue-500 bg-blue-500"  : ""} md:p-0 md:hover:text-blue-500 hover:bg-gray-700 hover:md:hover:bg-transparent md:bg-transparent `}
                >
                  सारे बिल देखे
                </Link>
              </li>

              <li>
                <Link
                  to="/addstock"
                  onClick={() => { handleMenu(); setCategory("technology"); }}
                  className={`block py-2 px-3 rounded md:border-0 ${category === "technology" ? "md:text-blue-500 bg-blue-500" : ""} md:p-0 md:hover:text-blue-500 hover:bg-gray-700 hover:md:hover:bg-transparent md:bg-transparent`}
                >
                  Stock जोड़ें
                </Link>
              </li>
              <li>
                <Link
                  to="/viewstock"
                  onClick={() => { handleMenu(); setCategory("science"); }}
                  className={`block py-2 px-3 rounded md:border-0 ${category === "science" ? "md:text-blue-500 bg-blue-500" : ""} md:p-0 md:hover:text-blue-500 hover:bg-gray-700 hover:md:hover:bg-transparent md:bg-transparent`}
                >
                  सारे Stock देखे
                </Link>
              </li>
              <li>
                <Link
                  to="/monthly"
                  onClick={() => { handleMenu(); setCategory("monthly"); }}
                  className={`block py-2 px-3 rounded md:border-0 ${category === "monthly" ? "md:text-blue-500 bg-blue-500" : ""} md:p-0 md:hover:text-blue-500 hover:bg-gray-700 hover:md:hover:bg-transparent md:bg-transparent`}
                >
                  Monthly Details
                </Link>
              </li>
              
            </ul>
            {/* <div className="flex items-center gap-6">
                <img id="menu" srcSet="https://cdn.icon-icons.com/icons2/950/PNG/512/cross-symbol_icon-icons.com_74149.png" onClick={onToggleMenu} alt="menu-card" className="text-3xl h-32  cursor-pointer md:hidden "/>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;