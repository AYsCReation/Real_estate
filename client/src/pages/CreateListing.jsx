import React from 'react'

const CreateListing = () => {
  return (
    <main className='max-w-4xl mx-auto p-3'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-5'>
        <div className='flex flex-col gap-4 flex-1'>
          <input type='text' className='border p-3 rounded-lg' id='name' placeholder='Name' maxLength={62} minLength={10} required/>
          <textarea type='text' className='border p-3 rounded-lg' id='description' placeholder='Description' required/>
          <input type='text' className='border p-3 rounded-lg' id='address' placeholder='address'  required/>
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type="checkbox" id='sell' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='parking' className='w-5' />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'> 
            <div className='flex gap-2 items-center'>
              <input type="number" className='p-3 border border-gray-300 rounded-lg' min='1' max={10} name="bedrooms" id="bedrooms" required/>
              <p>Beds</p>      
            </div>
            <div className='flex gap-2 items-center'>
              <input type="number" className='p-3 border border-gray-300 rounded-lg' min='1' max={10} name="bathrooms" id="bathrooms" required />
              <p>Baths</p>      
            </div>
            <div className='flex gap-2 items-center'>
              <input type="number" className='p-3 border border-gray-300 rounded-lg' min='1' max={10} name="regularPrice" id="regularPrice" />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                <span className='text-xs '>(rs / month)</span>
                </div>      
            </div>
            <div className='flex gap-2 items-center'>
              <input type="number" className='p-3 border border-gray-300 rounded-lg' min='1' max={10} name="discountPrice" id="discountPrice" />
              <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                <span className='text-xs'>(rs / month)</span>
                </div>     
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold text-center'>Images:
          <span className='font-normal ml-2 text-gray-600'> The first image will be the cover (max 6)</span>
          </p>
          <div className='flex gap-4'>
            <input className='p-3 border border-gray-300 rounded w-full' type="file" accept='image/*' multiple />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create List</button>
        </div>
       
      </form>
    </main>
  )
}

export default CreateListing;