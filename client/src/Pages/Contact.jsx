import React from "react";
import TopNav from "../components/TopNav";
import "../styles/Proshow.scss";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import aditya from '../images/Conveners/aditya.jpg';
import pragya from '../images/Conveners/pragya.jpg';
import namitha from '../images/Conveners/namitha.jpg';
import satyap from '../images/Conveners/satyap.jpg';

export default function Contact() {
  return (
    <>
      <div className="contact-container">
        <TopNav />
        <div>
          <div
            className="proshow-title"
            id="contact"
            style={{ color: "#141414" }}
          >
            CONTACT US
          </div>
          <div className="title2"
            style={{ color: "#141414" }}

          >Conveners</div>
          <div className="flex justify-center text-white mt-6">
            <div className="grid-cols-1 grid md:grid-cols-2 gap-y-6 place-items-center converners">
              <div className="flex justify-evenly items-center bg-[#512b36] rounded-lg py-3 px-2 w-80 ">
                <img src={pragya} className="object-cover rounded-lg img" />

                <div className="flex flex-col items-center">
                  <p className="text-xl font-semibold">Pragya Chawla</p>
                  <p>Cultural Secretary</p>
                  {/* <p className="font-medium text-sm mt-1">+91 9999063093</p> */}
                </div>
              </div>

              <div className="flex justify-evenly items-center bg-[#512b36] rounded-lg py-3 px-2 w-80">
                <img src={aditya} className="object-cover rounded-md img" />

                <div className="flex flex-col items-center">
                  <p className="text-xl font-semibold">Aditya Goyal</p>
                  <p>Cultural Secretary</p>
                  {/* <p className="font-medium text-sm mt-1">+91 8839846625</p> */}
                </div>
              </div>

              <div className="flex justify-evenly items-center bg-[#512b36] rounded-lg py-3 px-2 w-80">
                <img src={namitha} className="object-cover rounded-lg img" />

                <div className="flex flex-col items-center">
                  <p className="text-xl font-semibold">Namitha M</p>
                  <p>Sports Secretary</p>
                  {/* <p className="font-medium text-sm mt-1">+91 9108270077</p> */}
                </div>
              </div>

              <div className="flex justify-evenly items-center bg-[#512b36] rounded-lg py-3 px-2 w-80">
                <img src={satyap} className="object-cover rounded-lg img" />

                <div className="flex flex-col items-center">
                  <p className="text-xl font-semibold">Satyap Ilme</p>
                  <p className="font-medium">Sports Secretary</p>
                  {/* <p className="font-medium text-sm mt-1">+91 9137499252</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="queries bg-[#512b36] text-center rounded-lg lg:w-[45rem] w-[80vw] mx-auto p-8 lg:px-2 px-4">
            <div>
              If you are facing any technical difficulties on the website,
              please fill out
              &nbsp; <a href="https://forms.gle/6BBzrHKtWtj4ZHZs6" target={'_blank'}>this form</a>
              , and please refer
              to Revels MIT Instagram before contacting us at:
            </div>
            <div className="text-white text-sm mt-4">
              <div className="lg:inline-block block">
                Vinamra:+917999126191 |
              </div>
              <div className="lg:inline-block block">
                &nbsp;Arnav:+916363960690 |
              </div>
              <div className="lg:inline-block block">
                &nbsp;Suryaansh: +919619514015
              </div>
            </div>
              <div className="text-white text-sm lg:mt-4">

              <div className="lg:inline-block block">
                &nbsp;Kushagr: +919007263935 |
              </div>
              <div className="lg:inline-block block">
                &nbsp;Aditya: +916303647181
              </div>
            </div>
          </div>
          <div className="queries bg-[#512b36] text-center rounded-lg lg:w-[45rem] w-[80vw] mx-auto p-8 lg:px-2 px-4">
            <div>
              If you are a non-MAHE student and have any queries, please reach out to: &nbsp;
              <a href="mailto:outstation.revels@manipal.edu">
                outstation.revels@manipal.edu
              </a>
            </div>
            <div className="text-white text-sm mt-4">
              <div className="lg:inline-block block">
                Sriya Mishra:+919635663290 |
              </div>
              <div className="lg:inline-block block">
                &nbsp;Harsh Vardhan:+916266173388 |
              </div>
              <div className="lg:inline-block block">
                &nbsp;Pruthviraj Patil: +919325699766
              </div>
            </div>
          </div>
          <div className="queries bg-[#512b36] text-center rounded-lg lg:w-[45rem] w-[80vw] mx-auto p-8 lg:px-2 px-4">
            <div>
            If you have proshow-related queries, please contact 
              
            </div>
            <div className="text-white text-sm mt-4">
              <div className="lg:inline-block block">
               Tushar Srivastav: +9190448 93225 |
              </div>
              <div className="lg:inline-block block">
                &nbsp;Aditya Goyal :+918839846625
              </div>
             
            </div>
          </div>
          <div className="queries bg-[#512b36] text-center rounded-lg lg:w-[45rem] w-[80vw] mx-auto p-8 lg:px-2 px-4">
            <div>
              If you have any sports related queries please contact <br/>
              <a href="mailto:sportssec.mitsc@manipal.edu">
              sportssec.mitsc@manipal.edu
              </a>
            </div>
            <div className="text-white text-sm mt-4">
              <div className="lg:inline-block block">
              Satyap:+919137499252 |
              </div>
              <div className="lg:inline-block block">
                &nbsp;Namitha:+919108270077
              </div>
              
            </div>
          </div>

          <div className="queries bg-[#512b36] text-center rounded-lg lg:w-[45rem] w-[80vw] mx-auto p-8 lg:px-2 px-4">
            <div>
            If you have  cultural events-related queries, please contact 
              
            </div>
            <div className="text-white text-sm mt-4">
              <div className="lg:inline-block block">
              Aditya Goyal:+918839846625|
              </div>
              <div className="lg:inline-block block">
                &nbsp;Pragya Chawla:+919999063093
              </div>
             
            </div>
          </div>

          <div className="contact-details">
            <div className="icons-container">
              <a href="https://www.facebook.com/mitrevels" target={"_blank"}>
                <AiFillFacebook className="contact-icon" />
              </a>

              <a
                href=" https://instagram.com/revelsmit?igshid=YmMyMTA2M2Y="
                target={"_blank"}
              >
                <AiFillInstagram className="contact-icon" />
              </a>

              <a
                href="https://www.linkedin.com/company/revels/"
                target={"_blank"}
              >
                <AiFillLinkedin className="contact-icon" />
              </a>
              <a
                href="https://twitter.com/RevelsMIT?t=9QEyC_AcqlKKr1nA5w3Jyw&s=09"
                target={"_blank"}
              >
                <AiOutlineTwitter className="contact-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
