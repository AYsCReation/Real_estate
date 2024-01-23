import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
const ListingItem = ({list}) => {
  const formatCurrency = (value) => {
    // Format the currency using the Intl.NumberFormat API
    const formattedValue = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);

    return formattedValue+'K';
  };
  return (
    <div className='bg-white shadow-md hover:shadow-xl transition-shadow overflow-hidden w-full rounded-lg sm:w-[330px]'>
      <Link to={`/listing/${list._id}`}>
       
        {list.imageUrls ? ( <img src={list.imageUrls[0]} alt='listing cover' className='h-[320px] sm:h-[220px] w-full object-cove hover:scale-105 transition-scale duration-300' /> ): ''}
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='text-lg font-semibold text-slate-700 truncate '>{list.name}</p>
        <div className='flex items-center gap-1'>
        <MdLocationOn className='h-4 w-4 text-green-700' />
        <p className='truncate text-sm text-gray-600 w-full'>{list.address}</p>
      </div>
      <div>
        <p className='text-sm text-gray-600 line-clamp-3'>{list.description}</p>
      </div>
      <p className='text-slate-500 mt-2 font-semibold '>
        
        {list.offer ? formatCurrency(list.discountPrice) : formatCurrency(list.regularPrice)}
        {list.type === 'rent' && '/month'}
      </p>
      <div className='text-slate-700 flex gap-4'>
      <div className='font-bold text-xs'>
      {
    list.bedrooms > 1 ? `${list.bedrooms} Beds` : `${list.bedrooms} Bed`
                }
      </div>
      <div className='font-bold text-xs'>
      {
    list.bathrooms > 1 ? `${list.bathrooms} Baths` : `${list.bathrooms} Bath`
                }
      </div>
      </div>
      </div>
      
      </Link>
    </div>
  )
}

export default ListingItem