import React from 'react'
import ProshowCard from '../components/ProshowCard';
import TopNav from '../components/TopNav'
import '../styles/Proshow.scss';
import { PROSHOW_EVENTS } from "./proshow_Events.js";


export default function ProshowFinal() {
    return (
        <>
            <div className='proshow-container'>
                <TopNav />
                <div className='proshow-title'>PROSHOW 2023</div>
                <div className="flex flex-row flex-wrap justify-center">
                    {PROSHOW_EVENTS.map((event) =>
                        <div className="m-4">
                            <ProshowCard event={event} />
                        </div>
                    )}
                </div>

                <div className="text-center pt-8 pb-4 text-gray-900 font-bold">
                    *Entry for Mohit Chauhan show will be given only to those who have a valid college id.
                </div>
            </div>
        </>)
}
