import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: "",
        type: 'all',
        offer: false,
        furnished: false,
        parking: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [listing , setListing] = useState([]);
    const [loading , setLoading] = useState(false);
const navigate = useNavigate();
    const handleSideData = (e) => {
        if (e.target.id === 'all' || e.target.id === 'sell' || e.target.id === 'rent') {
            setSidebarData({ ...sidebarData, type: e.target.id })
        }
        if (e.target.id === 'furnished' || e.target.id === 'parking' || e.target.id === 'offer') {
            console.log(e.target.checked, " ", e.target.id);
            setSidebarData({ ...sidebarData, [e.target.id]: e.target.checked })
        }
        if (e.target.id === 'sort_order') {
            setSidebarData({
                ...sidebarData,
                sort: e.target.value.split('_')[0],
                order: e.target.value.split('_')[1],
            })
        }
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, [e.target.id]: e.target.value })
        }
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl) {
            sidebarData.searchTerm = searchTermFromUrl || "";
            sidebarData.type = typeFromUrl || "all";
            sidebarData.parking = parkingFromUrl === 'true' ? true : false;
            sidebarData.furnished = furnishedFromUrl === 'true' ? true : false;
            sidebarData.offer = offerFromUrl === 'true' ? true : false;
            sidebarData.sort = sortFromUrl || "created_at";
            sidebarData.order = orderFromUrl || "desc";

        }

        const fetchData = async() =>{
            setLoading(true)
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json();
            setListing(data)
            setLoading(false)
        }

        fetchData();

    }, [location.search])
    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    console.log(listing);
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className=' whitespace-nowrap font-semibold'>Search Term:</label>
                        <input type='text' id='searchTerm' placeholder='search here' className='border p-3  rounded-lg w-full ' onChange={handleSideData} value={sidebarData.searchTerm} />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold' htmlFor=""> Type:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='all' className='w-5' onChange={handleSideData} checked={sidebarData.type === 'all'} />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' className='w-5' onChange={handleSideData} checked={sidebarData.type === 'rent'} />
                            <span>Rent </span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='sell' className='w-5' onChange={handleSideData} checked={sidebarData.type === 'sell'} />
                            <span> Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='offer' className='w-5' onChange={handleSideData} checked={sidebarData.offer} />
                            <span> Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold' htmlFor=""> Amenities:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5' onChange={handleSideData} checked={sidebarData.furnished} />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5' onChange={handleSideData} checked={sidebarData.parking} />
                            <span>Parking </span>
                        </div>

                    </div>
                    <div className='flex gap-2  items-center'>
                        <label className='font-semibold' htmlFor=""> Sort:</label>
                        <select onChange={handleSideData} defaultValue={'created_at_desc'} className='border rounded-lg p-3 capitalize' name="" id="sort_order" >
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_desc">latest</option>
                            <option value="createdAt_asc">oldest</option>
                        </select>

                    </div>
                    <button className='bg-slate-700 text-white uppercase hover:opacity-95 p-3 rounded-lg'>Search</button>
                </form>
            </div>
            <div className='' >
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Search Results:</h1>
            </div>
        </div>
    )
}

export default Search