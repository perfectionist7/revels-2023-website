import React from "react";
import TopNav from "../components/TopNav";
import "./About.css";
import logo from "../images/logo.png";
import star from "../images/octo.svg";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import eicher from "../images/Sponsers/eicher.png";
import ubi from "../images/Sponsers/ubi.png";
import max from "../images/Sponsers/max.png";
import realme from "../images/Sponsers/realme.png";
import paradyes from "../images/Sponsers/paradyes.png";
import ongc from "../images/Sponsers/ongc.png";

function Star() {
  return <img src={star} />;
}

export default function About() {
  return (
    <div class="section-about">
      <TopNav />
      <div class="container-about">
        <div className="about-left">
          <div class="title-about">
            <br />
            <h2 class="heading-about">REVELS 23&nbsp;</h2>
          </div>
          <img src={logo} className="about-logo-mob" />

          <div class="content-about">
            <p>
              Founded in 1982, Revels is the annual cultural festival of Manipal
              Institute of Technology, Manipal, heralded by the onset of spring.
              Conducted over a period of four days, including a much celebrated
              sports tournament called Revels Cup, the fest is a junction of a
              plethora of events. Whether it be Literature, Music, Dance,
              Dramatics, Quiz, Debate, Fashion, Art, Comedy, and Professional
              concerts, the fest boasts of throngs of 'thorns to competition'.
              Every year, thousands of students from colleges all over the
              country, as well as international delegations assemble together to
              make Revels one of the largest nexuses of cultural exchange.
              <br />
              <br />
              <br />
              <div class="svg-title-about">
                <Star />
                &nbsp;<h2>HISTORY</h2>
              </div>
              In 1982, Manipal Institute of Technology, Manipal, celebrated its
              Ruby Jubilee. To commemorate the milestone, the administration and
              the students came up with a string of events, that aimed at
              propagating Arts and Culture. <br />
              From these efforts was born Revels-82- "Stormy Interlude", the
              first edition of the cultural fest, presided by dignitaries led by
              Shri Govind Narain (then Governor of Karnataka state). <br />
              Over time, the fest has grown to mammoth proportions, boasting
              both sustained participation and an enthused Organizing Team.
            </p>
          </div>
        </div>

        <img src={logo} className="about-logo" />
      </div>
      <div>
        <div
          className="proshow-title"
          id="sponsers"
          style={{ color: "#141414" }}
        >
          Sponsors
        </div>
        <div className="block lg:block text-center w-[100%] py-12">
         
        <div className="lg:inline-block lg:mx-10 my-4 text-center">
            <div className="bg-white h-[11rem] lg:w-[20rem] px-2 pt-[5.5rem] block w-[75vw] mx-auto">
              <img src={ongc} className="max-h-[6rem] -translate-y-[50%] ml-[50%] -translate-x-[50%]"/>
            </div>
            <div className="sponser-label">Co-Title Partner</div>
          </div>
          <div className="lg:inline-block lg:mx-10 my-4 text-center">
            <div className="bg-white h-[11rem] lg:w-[20rem] px-2 pt-[5.5rem] block w-[75vw] mx-auto">
              <img src={ubi} className=" -translate-y-[50%]"/>
            </div>
            <div className="sponser-label">Proshow Partner</div>
          </div>
          <div className="lg:inline-block lg:mx-10 my-4 text-center">
            <div className="bg-white h-[11rem] lg:w-[20rem] px-2 pt-[5.5rem] block w-[75vw] mx-auto">
              <img src={realme} className="-translate-y-[50%]"/>
            </div>
            <div className="sponser-label">Smartphone Partner</div>
          </div>

          <div className="lg:inline-block lg:mx-10 my-4 text-center">
            <div className="bg-white h-[11rem] lg:w-[20rem] px-2 pt-[5.5rem] block w-[75vw] mx-auto">
              <img src={max} className="max-h-[11rem] -translate-y-[50%] ml-[50%] -translate-x-[50%]"/>
            </div>
            <div className="sponser-label">Fashion Partner</div>
          </div>
         

          <div className="lg:inline-block lg:mx-10 my-4 text-center">
            <div className="bg-white h-[11rem] lg:w-[20rem] px-2 pt-[5.5rem] block w-[75vw] mx-auto">
              <img src={paradyes} className="-translate-y-[50%]"/>
            </div>
            <div className="sponser-label sponser-none">.</div>
          </div>
          <div className="lg:inline-block lg:mx-10 my-4 text-center">
            <div className="bg-white h-[11rem] lg:w-[20rem] px-2 pt-[5.5rem] block w-[75vw] mx-auto">
              <img src={eicher} className="-translate-y-[50%]"/>
            </div>
            <div className="sponser-label sponser-none">.</div>
          </div>
         
          
          
     
          {/* 
        
       
          <div className="lg:inline-block lg:mx-10 my-4 text-center">
          <div className="mx-auto flex justify-center align-center my-12 bg-[#ffffffbb] p-6 lg:w-[18rem] rounded-xl h-[12rem] w-[70vw]">
              <img src={realme} className="w-[17rem] h-[60%] mt-[12%]" />
          </div>
          <div className="sponser-label">
        Smartphone Partner
          </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
