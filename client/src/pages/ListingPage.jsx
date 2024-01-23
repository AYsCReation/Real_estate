import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';
import { Link } from 'react-router-dom';


const ListingPage = () => {
    SwiperCore.use([Navigation])
    const [listingData, setListingData] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading state to true
    const [error, setError] = useState(false);
    const [contact , setContact] = useState(false);
    const params = useParams();
    const {currentUser}  = useSelector((state)=> state.user);
    const formatCurrency = (value) => {
        // Format the currency using the Intl.NumberFormat API
        const formattedValue = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
        }).format(value);
    
        return formattedValue+'K';
      };
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setError(false);
                const res = await fetch(`/api/listing/get/${params.id}`);
                const data = await res.json();
               
                if (data.success === false) {
                    setError(true);
                } else {
                    setError(false);
                    setListingData(data);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchListing();
    }, [params.id]); // Add params.id as a dependency to useEffect

    return (
        <main>
            {loading &&
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
           }
           {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
           {listingData && !loading && !error && (
    <div>
        <Swiper navigation>
            {listingData.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                    <div className='h-[550px]' style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}></div>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold '>
              {listingData.name } - {' '}
              {listingData.offer
                ? (<>
                <span style={{ textDecoration: 'line-through' , color : 'red' }}>{formatCurrency(listingData.regularPrice)}</span>
               <span className=''>  {formatCurrency(listingData.discountPrice)} </span>
                </>)
                : formatCurrency(listingData.regularPrice)}
              {listingData.type === 'rent' && '/month'}
            </p>
            <p className='flex cursor-pointer w-fit items-center  gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listingData.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900  w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listingData.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>{listingData.offer &&
              (
              <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md flex justify-center'>
                {formatCurrency(+listingData.regularPrice - +listingData.discountPrice)}
                {listingData.type === 'rent' && '/month'} <BiSolidOffer className='text-yellow-500' /> 
              </p>
              
              )}
              </div>
              <p className='text-slate-800'> <span className='font-semibold text-black'>Description - </span>
        {listingData.description}</p>
        <ul className='text-green-900 text-sm font-semibold flex items-center gap-4 sm:gap-6 flex-wrap'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg' /> {
                    listingData.bedrooms > 1 ? `${listingData.bedrooms} Beds` : `${listingData.bedrooms} Bed`
                }
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg' /> {
                    listingData.bathrooms > 1 ? `${listingData.bathrooms} Baths` : `${listingData.bathrooms} Bath`
                }
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg' /> {
                    listingData.parking  ? `Parking Spot` : `No Parking`
                }
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg' /> {
                    listingData.furnished ? `Furnished` : `Unfurnished`
                }
            </li>
            
        </ul>
           {currentUser && currentUser._id !== listingData.userRef && !contact &&
           <button onClick={() => setContact(true)} className='bg-slate-700 p-3 rounded-lg uppercase text-white hover:opacity-95'>Contact Owner</button>
           } 
           {!currentUser && (<p className='font-semibold text-center p-2'>You have to <Link to={'/sign-in'}> <span className='text-blue-800 cursor-pointer hover:underline'> Sign in </span></Link> first to contact with the owner</p>)}
          {contact && <Contact listingData={listingData} setContact={setContact} contact={contact} />}

    </div>
 
    </div>
    
)}

        </main>
    );
};

export default ListingPage;
