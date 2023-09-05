import '../styles/EventCard.scss';
import {AiOutlineSearch} from 'react-icons/ai';

function Search({handleSearch}) {
  return (
    <div className='m-8'>
        <div className='flex justify-center items-center bg-[#32323233] h-10 rounded-lg searchBar'>
            <AiOutlineSearch className='bg-[#32323233] text-white h-10 text-3xl rounded-l-lg pl-1 '/>
            <input type="text" placeholder='Search events' className='outline-none bg-[#32323233] h-10 px-4 placeholder-gray-200 text-gray-200 rounded-r-lg searchBar' 
            onKeyUp={handleSearch}
            />
        </div>
    </div>
  )
}

export default Search

