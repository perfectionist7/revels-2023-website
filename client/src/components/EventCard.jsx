import '../styles/EventCard.scss';

function EventCard({categoryName,eventName,eventMode,eventTags,eventDescription,teamSize,Date,Time,Venue}) {
  return (
    <div className="eventCard-Wrapper text-white bg-[#242424] rounded-lg">
     <div className='contentContainer flex flex-col justify-around p-3'>
     <div className='flex justify-between'>
        <div>
        <p className='text-[#FF9A28] text-lg'>{categoryName}</p>
        <p className='font-medium text-2xl'>{eventName}</p>
        </div>
        <p className='bg-[#FFFFFF] font-medium text-md px-2 py-1 rounded-md h-8 text-black '>{eventMode}</p>
      </div>

      {/* tags  */}
      <p className='text-sm font-bold'>{eventTags}</p>

      {/* event-description  */}
      <p className='text-sm'>
       {eventDescription}
      </p>


      {/* <div className='flex justify-around items-center'>
        <div className='flex flex-col items-center'>
            <p className='font-semibold text-md text-[#FF9A28]'>Team Size</p>
            <p className='text-sm'>{teamSize}</p>
        </div>

        <div className='flex flex-col items-center'>
            <p className='font-semibold text-md text-[#FF9A28]'>Date</p>
            <p className='text-sm'>{Date}</p>
        </div>

        <div className='flex flex-col items-center'>
            <p className='font-semibold text-md text-[#FF9A28]'>Time</p>
            <p className='text-sm'>{Time}</p>
        </div>

        <div className='flex flex-col items-center'>
            <p className='font-semibold text-md text-[#FF9A28]'>Venue</p>
            <p className='text-sm'>{Venue}</p>
        </div> */}
      {/* </div> */}
     </div>
    </div>
  );
}

export default EventCard;
