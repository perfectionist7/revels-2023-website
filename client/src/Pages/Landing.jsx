import React from "react";
import TopNav from '../components/TopNav';
import "../styles/Landing.scss";
import Countdown from "react-countdown";
import logo from '../images/logo.png';

const renderer = ({ total, days, hours, minutes }) => {
  // Render a countdown
  return (
    <div className='flex  justify-center items-center text-white'>
   <div className="w-2/3 justify-around flex md:justify-between md:w-1/3">
   <div className="">
     <p className='text-4xl md:text-7xl'>{days}</p>
     <p className='text-lg md:text-2xl'>days</p>
   </div>

   <div>
     <p className='text-4xl md:text-7xl'>{hours}</p>
     <p className='text-lg md:text-2xl'>hours</p>
   </div>

   <div>
     <p className='text-4xl md:text-7xl'>{minutes}</p>
     <p className='text-lg md:text-2xl'>minutes</p>
   </div>
   </div>
  </div>
 );
};


export default function Landing() {
  const bg = require('../images/landingBackground.jpeg')

  return (

    <div className="landingPage"
      style={{
        backgroundImage: 'url(' + bg + ')',
        backgroundSize: "cover",
        height: "100vh",
      }}>
      <TopNav />
      <div>
        <img src={logo} className="lg:w-[25%] md:w-[40%] w-[80%] lg:mt-24 lg:mb-4 mt-12 mb-12 ml-[50%] -translate-x-[50%]" />
      </div>
      <h1 className="headline font-Chakra text-white text-4xl text-6xl font-bold mt-0 mb-2 text-center non-italic leading-3 tracking-[0.79em] pt-8">
        REVELS 23
      </h1>
      {new Date() < new Date("2023-03-22 00:00:00") &&
        <div className="countdown">
          <Countdown
            date={new Date("2023-03-22 00:00:00")}
            intervalDelay={10}
            precision={1}
            renderer={renderer}
          />
        </div>
      }
    </div>
  );
}
