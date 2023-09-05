import React, { useState } from 'react';
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';
import rulebook from '../Rulebook.pdf'
import { GiHamburgerMenu } from 'react-icons/gi'


function TopNav() {
 const [isOpen, setIsOpen] = useState(false);

 return (
  <nav className={`${isOpen?"bg-inherit":""} flex lg:flex lg:bg-inherit items-center justify-between flex-wrap p-6`}>
     <div className=" text-white mr-6 lg:mr-72">
       <Link to='/'><img src={logo} className="w-100 h-10 mr-2 lg:h-14" alt="Logo" /></Link>
     </div>
     <div className="lg:hidden">
       <button
         onClick={() => setIsOpen(!isOpen)}
         className={`flex items-center px-3 py-2 rounded text-black-400 hover:text-black-400 ${isOpen?"text-white":"text-black-400"}`}
       >
        <GiHamburgerMenu/>
       </button>
     </div>
     <div
       className={`flex flex-col justify-center  mt-4 w-full  flex-grow  lg:bg-inherit lg:flex lg:flex-row  lg:justify-around lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
     >
         <Link to='/about' className='lg:bg-[#0a233f] py-1 pt-2 px-6 text-base rounded-full'>About</Link>
         <a href={rulebook} download={true} className='lg:bg-[#0a233f] py-1 pt-2 px-6 text-base rounded-full mb-1'>Rulebook</a>
          <Link to='/proshow' className='lg:bg-[#0a233f] py-1 pt-2 px-6 text-base rounded-full mb-1'>Proshow</Link>
         <Link to='/events' className='lg:bg-[#0a233f] py-1 pt-2 px-6 text-base rounded-full mb-1'>Events</Link>
         <Link to='/contact' className='lg:bg-[#0a233f] py-1 pt-2 px-6 text-base rounded-full mb-2'>Contact Us</Link>
         <Link to='/team' className='lg:bg-[#0a233f] py-1 pt-2 px-6 text-base rounded-full mb-1'>System Admin</Link>
         <a href="https://register.revelsmit.in/" className={`${isOpen ? "bg-white w-24 ml-4 flex justify-center pt-2 pb-0.5 rounded-md text-black": "lg:bg-[#0a233f] py-1 pt-2 px-6 text-base rounded-full mb-2 text-white"}`}>Login</a>

     </div>
   </nav>
 );
}
export default TopNav;