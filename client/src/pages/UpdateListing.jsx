import React, { useEffect, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import app from '../firebase';
import { useSelector } from 'react-redux';
import {useNavigate , useParams} from 'react-router-dom';

const UpdateListing = () => {
  const {currentUser} = useSelector(state => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files , setFiles] = useState([]);
  const [formData , setFormData] = useState({
    imageUrls:[],
    name: "",
    description : "",
    address : "",
    type : "rent",
    bedrooms : 1,
    bathrooms : 1,
    regularPrice : 20,
    discountPrice : 0,
    offer : false,
    parking : false,
    furnished : false,

  });
  const [imageUploadError , setImageUploadError] = useState(false);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(false);
  const [loadingMain , setLoadingMain] = useState(false);

useEffect(() =>{
    const fetchListing = async() =>{
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if(data.success === false){
            console.log(data.message);
            return;
        }
        setFormData(data);
    }
    fetchListing();
}, [])


  const handleChangeImage = () =>{
    if(files.length  === 0) setImageUploadError('First Select the images Champ!');
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
  const handleChangeData = (e) =>{
    if(e.target.id === "sell" || e.target.id === "rent"){
      setFormData({
        ...formData ,
        type : e.target.id,
      })
    }
      if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
        setFormData({
          ...formData , 
          [e.target.id] : e.target.checked,
        })
      }
    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
      setFormData({
        ...formData ,
        [e.target.id] : e.target.value,
      })
    }
  }
 const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      if(formData.imageUrls.length < 1 )  return setError('You must upload at least one image!')
      if(+formData.discountPrice > +formData.regularPrice )  return setError('You Cant give a discount of more than its own price!');
      setLoadingMain(true);
      setError(false);
   
    const res = await fetch(`/api/listing/update/${params.listingId}` , {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({...formData , 
        userRef : currentUser._id
      })
     
    })
    const data = await res.json();
    setLoadingMain(false);
    if(data.success === false){
      setError(data.message);
      return;
    }
    navigate(`/listing/${data._id}`);

  } catch (error) {
      setError(error.message);
      setLoadingMain(false);
  }
 }
  return (
    <main className='max-w-4xl mx-auto p-3'>
      <h1 className='text-3xl font-semibold text-center my-7'>Update a Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-5'>
        <div className='flex flex-col gap-4 flex-1'>
          <input onChange={handleChangeData} value={formData.name} type='text' className='border p-3 rounded-lg' id='name' placeholder='Name' maxLength={62} minLength={10} required/>
          <textarea  onChange={handleChangeData} value={formData.description} type='text' className='border p-3 rounded-lg' id='description' placeholder='Description' required/>
          <input  onChange={handleChangeData} value={formData.address} type='text' className='border p-3 rounded-lg' id='address' placeholder='address'  required/>
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type="checkbox" id='sell' className='w-5'  onChange={handleChangeData} checked = {formData.type === "sell"} />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='rent' className='w-5' onChange={handleChangeData} checked = {formData.type === "rent"} />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='parking' className='w-5' onChange={handleChangeData} checked = {formData.parking} />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='furnished' className='w-5' onChange={handleChangeData} checked = {formData.furnished} />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='offer' className='w-5' onChange={handleChangeData} checked = {formData.offer} />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'> 
            <div className='flex gap-2 items-center'>
              <input onChange={handleChangeData} value={formData.bedrooms} type="number" className='p-3 border border-gray-300 rounded-lg' min='1' max={10} name="bedrooms" id="bedrooms" required/>
              <p>Beds</p>      
            </div>
            <div className='flex gap-2 items-center'>
              <input onChange={handleChangeData} value={formData.bathrooms}  type="number" className='p-3 border border-gray-300 rounded-lg' min='1' max={10} name="bathrooms" id="bathrooms" required />
              <p>Baths</p>      
            </div>
            <div className='flex gap-2 items-center'>
              <input onChange={handleChangeData} value={formData.regularPrice}  type="number" className='p-3 border border-gray-300 rounded-lg' min='20' max={1000} name="regularPrice" id="regularPrice" />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
               {formData.type === 'rent' ? ( <span className='text-xs '>(rs / month)</span>) : ''}
                </div>      
            </div>
          {formData.offer && (  <div className='flex gap-2 items-center'>
              <input onChange={handleChangeData} value={formData.discountPrice} type="number" className='p-3 border border-gray-300 rounded-lg' min='0' max={1000} name="discountPrice" id="discountPrice" />
              <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                {formData.type === 'rent' ? ( <span className='text-xs '>(rs / month)</span>) : ''}
                </div>     
            </div>)}
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
          <button disabled = {loadingMain || loading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loadingMain ? "Wait Sir..." : "Update List"}</button>
          {error && <p className='text-red-600 text-sm'>{error}</p>}
        </div>
       
      </form>
    </main>
  )
}

export default UpdateListing;