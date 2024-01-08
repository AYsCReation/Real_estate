import React, { useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import app from '../firebase';
const CreateListing = () => {
  const [files , setFiles] = useState([]);
  const [formData , setFormData] = useState({
    imageUrls:[],
  });
  const [imageUploadError , setImageUploadError] = useState(false);
  const [loading , setLoading] = useState(false);
  const handleChangeImage = () =>{
    if(files.length + formData.imageUrls.length == 0) setImageUploadError('First Select the images Champ!');
    else if(files.length > 0 && files.length + formData.imageUrls.length <7){
      setLoading(true);
      setImageUploadError(false);
   
    const Promises = [];
    for(let i = 0 ; i < files.length ; i++){
      Promises.push(handleStorage(files[i]));
    }
    Promise.all(Promises).then((urls) =>{
      setFormData({...formData , imageUrls : formData.imageUrls.concat(urls) });
      setImageUploadError(false);
      setLoading(false);
    })
    .catch((error) =>{
      setImageUploadError('Getting error on uploading the Images! (max 2mb per image)');
      setLoading(false);
    })
  }else{
    setImageUploadError('More than 6 Image can be a trouble , try less than 6');
  }
}
  const handleStorage = async(file) =>{
    return new Promise((resolve, reject) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage , fileName);
        const uploadTask = uploadBytesResumable(storageRef , file);
        uploadTask.on('state_changed' , 
        (snapshot) =>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },
        (error) =>{
          reject(error);

        },
        () =>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>   {
          resolve(downloadURL);
        })
      }
        )
    })
  }
  const handleDeleteImage = (index) =>{
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_ , i) => i !== index),
    })
  }
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
            <input onChange={(e) => setFiles(e.target.files)}  className='p-3 border border-gray-300 rounded w-full' type="file" accept='image/*' multiple />
            <button disabled = {loading} type='button' onClick={handleChangeImage} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-50'>{loading ? 'Uploading...' : 'upload'}</button>
           
          </div>
          <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 && formData.imageUrls.map((url , index) =>(
           <div key={url} className='flex justify-between p-3 border items-center'> <img src={url} alt='Listing Image' className='w-20 h-20 object-contain rounded-lg' />
         <button type='button' onClick={()=> handleDeleteImage(index)} className='text-red-700 p-3 hover:opacity-75'>DELETE</button>
          </div>
          ))
          }
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create List</button>
        </div>
       
      </form>
    </main>
  )
}

export default CreateListing;