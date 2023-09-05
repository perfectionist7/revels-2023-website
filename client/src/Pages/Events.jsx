import React, { useState } from "react";
import TopNav from "../components/TopNav";
import "../styles/Proshow.scss";
import EventCard from "../components/EventCard";
import { events } from "./EventsData";
import Search from "../components/Search";
import rulebook from "../Rulebook.pdf";
import {GoCalendar} from 'react-icons/go'
export default function Events() {
  const [result, setResult] = useState(events);

  const fetchSearch = (e) => {
    let search = e.target.value;
    let items;
    if (search) {
      items = result.filter(
        (data) =>
          data.eventName.toLowerCase().includes(search.toLowerCase()) ||
          data.categoryName.toLowerCase().includes(search.toLowerCase()) ||
          data.eventTags.toLowerCase().includes(search.toLowerCase())
      );
      setResult(items);
    } else {
      setResult(events);
    }
  };

  // console.log(events.result.eventName);
  return (
    <>
      <div className="schedule-container">
        <TopNav />
        <div className="proshow-title">REVELS 2023: Schedule</div>
        <div className="flex flex-col justify-center mt-2">
          <div className="flex flex-col justify-center mt-10">
            <div className="flex justify-center">
              <Search handleSearch={fetchSearch} />
            </div>
            <div className="flex lg:flex-row flex-col lg:justify-between justify-center px-10">
            <a href={"https://docs.google.com/spreadsheets/d/17Vv3FsMpTT8UtisnJzp1q1TbnZucnyFInRKsNjUiCUc/edit"} target={'_blank'} className="lg:mx-0 mx-auto block my-2">
                <button className="p-3  px-6 rounded-3xl bg-[#141414] text-lg">
                  Events Timetable <GoCalendar className="text-2xl mx-2 inline"/>
                </button>
              </a>
              <a href={"https://drive.google.com/drive/folders/1JKo4LY-WTLmO781B_v3JgENBFH7AY0Gt"} target={'_blank'}  className="lg:mx-0 mx-auto block my-2">
                <button className="p-3 px-6 rounded-3xl bg-[#141414] text-lg">
                  Sports Fixtures <GoCalendar className="text-2xl mx-2 inline"/>
                </button>
              </a>
            </div>
            <div className="m-0 grid gap-12 grid-cols-fluid place-items-center md:mx-8 py-10">
              {result.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
