import React from "react";
import "../styles/Developers.scss";
import DeveloperCard from "../components/DeveloperCard";
import TopNav from "../components/TopNav";
import background from "../Pages/landing-page.svg";
import {data} from './DevelopersData';
//gradient background not added
function Developers() {
  
  return (
    <>
    <div className="dev-container">
    <TopNav />
      <div className="flex flex-row">
       
      </div>
      <div className="flex ">
        <div className="maincontainer2 ">
          <div
            className="dev-heading font-bold text-center"
    
          >
            System Admin Team
          </div>
          {/* <div
            className="header2 font-medium text-center"
           
          >
            Team behind revels 2023 website
          </div> */}
          <div
            className="flex -mt-12 grid p-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-24 lg:gap-36 text-center"
            style={{ marginLeft: "50vw", transform: "translateX(-50%)", width:'100vw' }}
          >
           {data.map((item)=>(
            <DeveloperCard
              name={item.name}
              designation={item.designation}
              github={item.github}
              linkedIn={item.linkedIn}
              email={item.email}
              portfolio={item.portfolio}
              img={item.img}
              instagram={item.instagram}

            />
           ))}
          </div>
          <div
            className="dev-heading font-bold text-center"

          >
            {" "}
            ORGANISING TEAM
          </div>
          
          <div
            className=" flex flex-col justify-center lg:w-1/3 list-none header3 font-bold text-center text-[#141414]"

          >
           <li>Ayush Khandelwal</li>
           <li> Daksh Dadhania</li>
           <li>Jyotishman Shandilya</li>
           <li> Kkrishna Saxena</li>
           <li> Lance Barreto</li>
           <li>  Nikita Malik</li>
           <li> Rishabh Jain</li>
           <li> Siddharth Mittal</li>
           <li> Sidhant Sharma</li>
           <li> Sweta Chunduri</li>
          </div>
          <div
            className="header2 font-bold text-center"
            style={{
              marginLeft: "9vw",
              marginTop: "2vw",
              color: "#ffffff",
              fontFamily: "Roboto",
            }}
          >
           {" "}
          </div>
       
        </div>
        
      </div>
    </div>

    </>
  );
}

export default Developers;
