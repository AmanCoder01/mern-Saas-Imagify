import React, { useContext, useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { AppContext } from '../context/AppContext';
import { FaImages } from "react-icons/fa";
import { BsFillFilePostFill } from "react-icons/bs";
import { CiSaveDown1 } from "react-icons/ci";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const [state, setState] = useState('images');
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [posts, setPosts] = useState([]);


    const navigate = useNavigate();

    const { user, backendUrl, token } = useContext(AppContext);

    const fetchGeneratedImages = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/image/all`, {
                headers: { token }
            });

            console.log(data);
            setImages(data.images);

        } catch (error) {
            console.log(error);

        }
    }

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/post/my`, {
                headers: { token }
            });

            setPosts(data.posts);

        } catch (error) {
            console.log(error);

        }
    }



    useEffect(() => {
        if (state === "images") {
            fetchGeneratedImages();
        } else if (state === "posts") {
            fetchPosts();
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
                    <div className='flex flex-col justify-center items-center group cursor-pointer'
                        onClick={() => setState("images")}
                    >
                        <FaImages size={24} className='group-hover:opacity-60' />
                        <p className='text-sm text-gray-900 group-hover:opacity-50'>Generated</p>
                    </div>
                    <div className='flex flex-col justify-center items-center group cursor-pointer'
                        onClick={() => setState("posts")}
                    >
                        <BsFillFilePostFill size={21} className='group-hover:opacity-60' />
                        <p className='text-sm text-gray-900 group-hover:opacity-50'>Posts</p>
                    </div>
                    <div className='flex flex-col justify-center items-center group cursor-pointer'
                        onClick={() => setState("saved")}

                    >
                        <CiSaveDown1 size={24} className='group-hover:opacity-60' />
                        <p className='text-sm text-gray-900 group-hover:opacity-50'>Saved</p>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-1'>
                    {state === "images" && (
                        images?.map((image) => (
                            <div key={image._id} className='cursor-pointer relative group'>
                                <img src={image.imageUrl} alt="" />

                                <div className='absolute hidden group-hover:flex  top-20 left-0 right-0 items-center bottom-0 justify-center  '>
                                    <button className='bg-blue-500 opacity-90 text-white px-3 py-2 rounded-full'>Post It</button>
                                </div>
                            </div>
                        ))
                    )}
                    {state === "posts" && (
                        posts?.map((post) => (
                            <div key={post._id} className=''
                                onClick={() => navigate(`/post/${post._id}`)}
                            >
                                <img src={post.content} alt="" />
                            </div>
                        ))
                    )}
                    {state === "saved" && (
                        <div className=' mt-6'>This feature not live</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
