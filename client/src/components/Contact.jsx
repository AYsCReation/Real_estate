import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listingData , setContact , contact}) => {
    const [landlord , setLandlord] = useState(null);
    const [message , setMessage] = useState('');
    console.log(landlord);
    useEffect(() => {
        const fetchLandlord = async() => {
            try {
                const res = await fetch(`/api/user/${listingData.userRef}`)
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandlord();
    }, [listingData.userRef])
    const onChange = (e) =>{
        setMessage(e.target.value);
    }
  return (
    <div>
        {landlord && (
            <div className='flex flex-col gap-2'>
                <p>Contact <span className='font-semibold '>{landlord.username}</span> for <span className='font-semibold '>{listingData.name.toLowerCase()}</span></p>
                <textarea placeholder='Enter Your Message Here...' className='w-full border border-green-300 p-3 rounded-lg' name='message' id='message' rows={2} value={message} onChange={onChange}></textarea>
           <div className='w-full sm:w-[50%] mx-auto mt-4 flex gap-3'>
            <Link to={`mailto:${landlord.email}?subject=Regarding ${listingData.name}&body=${message}`} className='bg-slate-700 flex-1 text-center uppercase text-white p-2 rounded-lg hover:opacity-95'>
            Send message
            </Link>
            <p className='bg-red-700 flex-1 text-center uppercase text-white p-2 cursor-pointer rounded-lg hover:opacity-95' onClick={() => setContact(false)}>
    Cancel
</p>

            </div>
            </div>
        )}
    </div>
  )
}

export default Contact