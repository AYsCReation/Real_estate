import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings , setOfferListings] = useState([]);
  const [sellListings , setSellListings] = useState([]);
  const [rentListings , setRentListings] = useState([]);

  useEffect(() =>{
    const fetchOfferListings = async() =>{
    try {
     
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
      console.log(error);
    }
  }
  const fetchRentListings = async() =>{
    try {
     
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSellListings();
      } catch (error) {
      console.log(error);
    }
  }
    
    const fetchSellListings = async() =>{
      try {
       
          const res = await fetch(`/api/listing/get?type=sell&limit=4`);
          const data = await res.json();
          setSellListings(data);
        } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
   
     
     
    
})

  return (
    <div>
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
    <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>Dream </span>
    <br />
    place with ease</h1>
    <div className='text-xs sm:text-sm text-gray-400'>
      AYs Real Estate is the best place to find your next perfect place to live.
      <br />
      We have a wide range of properties for you to choose from.
    </div>
    <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>Lets get started...</Link>
    </div>
    <Swiper navigation>
      {offerListings && offerListings.length >0 && offerListings.map((listing) =>(
        <SwiperSlide >
          <div key={listing._id} style={{background : `url(${listing.imageUrls[0]}) center no-repeat` , backgroundSize : 'cover'}} className='h-[500px]'></div>
        </SwiperSlide>
      ))}
    </Swiper>
    <div className='max-w-[1400px] mx-auto p-3 flex flex-col  gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className='items-center'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem list={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
         {rentListings && rentListings.length > 0 && (
          <div className='items-center'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Latest House on Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more house for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem list={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
         {sellListings && sellListings.length > 0 && (
          <div className='items-center'>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Latest House on Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sell'}>Show more house for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {sellListings.map((listing) => (
                <ListingItem list={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
     </div>
    </div>
  )
}

export default Home