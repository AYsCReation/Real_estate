import React, { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useRef } from 'react';
import { useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import app from '../firebase';
import { updateUserStart , updateUserSuccess , updateUserFailure , deleteUserStart , deleteUserSuccess , deleteUserFailure , signOutUserStart , signOutUserSuccess , signOutUserFailure} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

const Profile = () => {
  const {currentUser , loading , error} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file , setFile] = useState(undefined);
  const [filePerc , setFilePerc] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false);
  const [ formdata , setFormData] = useState({});
  const [updateSuccess , setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
   setFormData({...formdata , [e.target.id] : e.target.value});
  }
  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage , fileName);
    const uploadTask = uploadBytesResumable(storageRef , file);
    uploadTask.on('state_changed' , 
    (snapshot) =>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePerc(Math.floor(progress));
    }, (error) => {
      setFileUploadError(true);
    },
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>   {
        setFormData({...formdata , avatar : downloadURL});
      })
    },
    );
   

  }; 
  
  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}` , {
        method : 'POST',
        headers :{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formdata),
      })
      const data = await res.json();
      if(data.success == false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

    const handleDeleteUser = async() =>{
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
          method : 'DELETE',

        });
        const data = res.json();
        if(data.success == false){
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    }
    const handleSignOut = async() =>{
      dispatch(signOutUserStart());
      try {
        const res = await fetch('/api/auth/signout');
        const data = res.json();
        if(data.success == false){
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data));
      } catch (error) {
        dispatch(signOutUserFailure(error.message));
      }
    }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0]) } type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} className='rounded-full self-center w-24 h-24 object-cover cursor-pointer mt-2' 
        src={formdata.avatar || currentUser.avatar} alt="Profile" />
        <p className='text-sm self-center'>
          {fileUploadError ? (<span className='text-red-700'>Error on Uploading Image </span>) : filePerc > 0 && filePerc < 100 ? (<span className='text-blue-700'>{` ${filePerc}% uploading... `}</span>) : filePerc == 100 ? (<span className='text-green-700'>File Uploaded Successfully!</span>) : ""}
        </p>
        <input type='text' onChange={handleChange} placeholder='username' defaultValue={currentUser.username} className='border p-3 rounded-lg' id='username' />
        <input type='email' onChange={handleChange} placeholder='email' defaultValue={currentUser.email} className='border p-3 rounded-lg' id='email' />
        <input type='password' onChange={handleChange} placeholder='password'  className='border p-3 rounded-lg' id='password' />
        <button disabled = {loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95  disabled:opacity-80 '>{loading ? "loading..." : "update"}</button>
      <Link className='bg-green-700 p-3 rounded-lg text-center uppercase text-white hover:opacity-95' to={"/create-listing"}>
        create listing
      </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 text-center mt-5'>{error ? error : ""}</p>
      <p className='text-green-600 text-center  mt-5'>{updateSuccess ? "User is Updated Successfully!" : ""}</p>
    </div>
  )
}

export default Profile