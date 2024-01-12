import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const ListingPage = () => {
    SwiperCore.use([Navigation])
    const [listingData, setListingData] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading state to true
    const [error, setError] = useState(false);
    const params = useParams();

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
    console.log(listingData.imageUrls)
    console.log(loading , error);
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
    </div>
)}

        </main>
    );
};

export default ListingPage;
