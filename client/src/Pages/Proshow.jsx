import React from 'react'
import TopNav from '../components/TopNav'
import '../styles/Proshow.scss';
export default function Proshow() {
  return (
    <>
        <div className='proshow-container'>
        <TopNav/>
            <div className='proshow-title'>PROSHOW 2023</div>
            <div className='coming-soon'>COMING SOON</div>
        </div>
    </>
  )
}
