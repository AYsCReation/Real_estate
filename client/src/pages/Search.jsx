import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                <label className=' whitespace-nowrap font-semibold'>Search Term:</label>
                <input type='text' id='searchTerm' placeholder='search here' className='border p-3  rounded-lg w-full '/>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold' htmlFor=""> Type:</label>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='all' className='w-5' />
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='rent' className='w-5' />
                        <span>Rent </span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sell' className='w-5' />
                        <span> Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='offer' className='w-5' />
                        <span> Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold' htmlFor=""> Amenities:</label>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='furnished' className='w-5' />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5' />
                        <span>Parking </span>
                    </div>
                   
                </div>
                <div className='flex gap-2  items-center'>
                    <label className='font-semibold' htmlFor=""> Sort:</label>
                   <select className='border rounded-lg p-3 capitalize' name="" id="sort_order" >
                    <option value="asc">Price high to low</option>
                    <option value="asc">Price low to high</option>
                    <option value="asc">latest</option>
                    <option value="asc">oldest</option>
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