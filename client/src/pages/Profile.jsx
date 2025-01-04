import React, { useContext, useEffect, useState } from 'react'
import { FaRegUser, FaSpinner } from "react-icons/fa";
import { AppContext } from '../context/AppContext';
import { FaImages } from "react-icons/fa";
import { BsFillFilePostFill } from "react-icons/bs";
import { CiSaveDown1 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import PostToggle from '../components/PostToggle';


const Profile = () => {
    const [imageUrl, setImageUrl] = useState();

    const { user } = useContext(AppContext);
    const { postToggle, setPostToggle, state, setState, fetchMyGeneratedImages, myGeneratedImages, fetchMyPosts, myPosts, fetchSavedPost, savedPosts, loading } = useContext(PostContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (state === "images") {
            fetchMyGeneratedImages();
        } else if (state === "posts") {
            fetchMyPosts();
        } else {
            fetchSavedPost();
        }
    }, [state])



    return (
        <div className='min-h-screen'>
            <div className='max-w-lg mx-auto border rounded-md py-3 md:py-12 px-7 md:px-10 border-b-2'>

                <div className='flex items-center  gap-6 md:gap-12 justify-center'>
                    <div className='border p-6 rounded-full bg-gray-300'>
                        <FaRegUser size={50} />
                    </div>
                    <div>
                        <h2 className='text-lg font-bold'>Name</h2>
                        <p className='text-gray-600 tracking-wider'>{user?.name}</p>
                        <h2 className='text-lg font-bold mt-3'>Email</h2>
                        <p className='text-gray-600 tracking-wider'>{user?.email}</p>

                    </div>
                </div>
            </div>

            <div className='w-full md:max-w-lg mx-auto'>
                <div className='flex items-center space-x-20  md:space-x-32 justify-center py-4 border px-6 md:px-12'>
                    <div className={`flex flex-col justify-center items-center group cursor-pointer ${state === "images" && "text-blue-500"}`}
                        onClick={() => setState("images")}
                    >
                        <FaImages size={24} className='group-hover:opacity-60' />
                        <p className='text-sm group-hover:opacity-50'>Generated</p>
                    </div>
                    <div className={`flex flex-col justify-center items-center group cursor-pointer ${state === "posts" && "text-blue-500"}`}
                        onClick={() => setState("posts")}
                    >
                        <BsFillFilePostFill size={21} className='group-hover:opacity-60' />
                        <p className='text-sm tgroup-hover:opacity-50'>Posts</p>
                    </div>
                    <div className={`flex flex-col justify-center items-center group cursor-pointer ${state === "saved" && "text-blue-500"}`}
                        onClick={() => setState("saved")}

                    >
                        <CiSaveDown1 size={24} className='font-bold group-hover:opacity-60' />
                        <p className='text-sm  group-hover:opacity-50'>Saved</p>
                    </div>
                </div>

                {
                    loading && (
                        <div className='flex justify-center mt-10'>
                            <FaSpinner size={30} className='animate-spin' />
                        </div>
                    )
                }

                <div className='grid grid-cols-3 gap-1'>
                    {state === "images" && (
                        myGeneratedImages?.map((image) => (
                            <div key={image._id} className='cursor-pointer relative group'>
                                <img src={image.imageUrl} alt="" />

                                <div className='absolute hidden group-hover:flex  top-20 left-0 right-0 items-center bottom-0 justify-center  '>
                                    <button onClick={() => {
                                        setPostToggle(true)
                                        setImageUrl(image.imageUrl)
                                    }} className='bg-blue-500 opacity-90 text-white px-3 py-1 md:py-2 rounded-full'>Post It</button>
                                </div>
                            </div>
                        ))
                    )}
                    {state === "posts" && (
                        myPosts?.map((post) => (
                            <div key={post._id} className='cursor-pointer'
                                onClick={() => navigate(`/post/${post._id}`)}
                            >
                                <img src={post.content} alt="" />
                            </div>
                        ))
                    )}
                    {state === "saved" && (
                        savedPosts?.map((post) => (
                            <div key={post._id} className='cursor-pointer'
                                onClick={() => navigate(`/post/${post._id}`)}
                            >
                                <img src={post.content} alt="" />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {postToggle && <PostToggle image={imageUrl} setPost={setPostToggle} />}

        </div>
    )
}

export default Profile
