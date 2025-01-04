import React, { useContext, useState } from 'react'
import { FaRegClosedCaptioning } from "react-icons/fa6";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const PostToggle = ({ image, setPost }) => {
    const [caption, setCaption] = useState('');
    const navigate = useNavigate();
    const { backendUrl, posts, setPosts, token } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/post/create`, {
                content: image,
                caption: caption
            }, {
                headers: { token }
            })
            setPost(false);
            navigate(`/post/${data.post._id}`)

            setPosts((prevPosts) => [...prevPosts, data.post])

            toast.success(data.message);

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center '>

            <div className='relative bg-white p-8 rounded-xl text-slate-500'>
                <form onSubmit={handleSubmit} className='text-center'>
                    <h1 className='text-2xl font-bold '>Post</h1>
                    <p className='text-sm'>Post your ai created image to public</p>
                    <div className='flex items-center gap-2 rounded-full mt-6 px-6 py-2 border'>
                        <FaRegClosedCaptioning />
                        <input
                            name='caption'
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className='outline-none border-none'
                            type="text" placeholder='Write something as caption?' />

                    </div>

                    <button className='py-2 mt-6 w-full rounded-full bg-blue-600  text-white'>Post</button>
                </form>
            </div>
        </div>
    )
}

export default PostToggle
