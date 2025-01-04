import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import PostCard from "../components/PostCard";
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import { FaRegUser } from "react-icons/fa";
import Skeleton from '../components/Skeleton';

const Comment = () => {

    const { backendUrl, token, setShowLogin, user } = useContext(AppContext);
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState([]);
    const [text, setText] = useState('');


    const submitHandler = async (e) => {
        e.preventDefault();
        if (!user) {
            setShowLogin(true);
            return;
        }
        try {
            const { data } = await axios.post(`${backendUrl}/post/comment/${postId}`, { text }, {
                headers: { token }
            });

            setComment(data.post.comments);
            setText("");
            toast.success(data.message)

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    const fetchPost = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/post/${postId}`);

            setPost(data.post);
            setComment(data.post.comments)
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }


    useEffect(() => {
        fetchPost();
        window.scrollTo(0, 0);
    }, [])


    if (loading) {
        return (
            <Skeleton />
        )

    }

    return (
        <div className='min-h-screen flex justify-center mx-auto flex-col'>
            <div className='flex justify-center items-center'>
                <PostCard post={post} />
            </div>

            <div className="mt-4 w-full sm:w-[450px] mx-auto">
                <h1 className="text-lg font-bold  text-gray-900 border-b-2 mb-2 border-gray-300">Comments</h1>

                <form onSubmit={submitHandler}>
                    <div className='flex items-center justify-between gap-2 rounded-full mt-4 px-6 py-2 border-2 border-gray-200 mb-4'>
                        <input
                            name='text'
                            type="text"
                            placeholder="Type your comment here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className='outline-none border-none bg-inherit'
                        />
                        <button className='bg-blue-500 rounded-full px-2 py-1 text-white'>Comment</button>
                    </div>
                </form>


                <div className='flex flex-col justify-center'>
                    {
                        comment?.reverse().map((item, index) => (
                            <div key={index} className="flex bg-gray-100 flex-col justify-between gap-2 rounded-md px-6 py-2 border-2 border-gray-200 mb-4">
                                <div className='flex items-center gap-3'>
                                    <FaRegUser />
                                    <span className="text-gray-900">{item?.user?.name}</span>
                                </div>

                                <p className='px-4'>{item.text}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Comment
