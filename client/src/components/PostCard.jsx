import React, { useContext, useEffect, useState } from 'react'
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots, FaRegUser } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { CiSaveDown1 } from 'react-icons/ci';
import { PostContext } from '../context/PostContext';


const PostCard = ({ post }) => {
    const { user, setPosts, backendUrl, token, setShowLogin, scrollPosition, setScrollPosition } = useContext(AppContext);
    const { saveUnsavePost } = useContext(PostContext);

    const [likes, setLikes] = React.useState(post?.likes?.length);
    const [saved, setSaved] = useState(post?.savedBy?.includes(user?._id));
    const [comments, setComments] = useState(post?.comments?.length);
    const [showLike, setShowLike] = useState(post?.likes?.includes(user?._id));


    const navigate = useNavigate();

    const likePost = async () => {

        if (!user) {
            setShowLogin(true);
            return;
        }
        try {
            const { data } = await axios.get(`${backendUrl}/post/like-dislike/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setLikes(data.likes)
            setShowLike(!showLike);
            toast.success(data.message)
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }


    const handleDelete = async () => {
        if (!user) {
            setShowLogin(true);
            return;
        }
        try {
            const { data } = await axios.delete(`${backendUrl}/post/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success(data.message);
            setPosts((prevState) => (
                prevState.filter((item) => item._id != post._id)
            ))
            console.log(data);

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`https://imagify-ai-sigma.vercel.app/post/${post._id}`);
            toast.success("Link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
            toast.error("Failed to copy text.");
        }
    };


    const handlePostDetails = () => {
        navigate(`/post/${post._id}`);
        // setScrollPosition(window.scrollY); // Save the current scroll position
    }


    // useEffect(() => {
    //     window.scrollTo(0, scrollPosition);
    // }, [scrollPosition]);

    return (
        <div className='border shadow-md p-1 rounded-md'>
            <div className='p-3 flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                    <FaRegUser size={20} />
                    <span className='ml-2 text-lg font-medium'>{post?.user.name}</span>
                </div>

                <div className='relative cursor-pointer group'>
                    <BsThreeDots size={24} className='cursor-pointer ' />


                    <div className='absolute top-6 -right-2 bg-gray-100 rounded-lg p-4 hidden group-hover:block'>
                        <div className='flex flex-col gap-3'>
                            {post?.user?._id === user?._id && <p onClick={handleDelete} className='font-semibold text-sm inline-flex items-center gap-1.5 hover:text-red-600'><MdDelete size={16} color='red' /> Delete</p>}


                            <p onClick={() => {
                                if (!user) {
                                    setShowLogin(true);
                                    return;
                                }
                                saveUnsavePost(post._id)
                                setSaved(!saved)
                            }} className='font-semibold text-nowrap text-sm inline-flex items-center gap-1.5 hover:text-blue-500'><CiSaveDown1 color='blue' size={16} />           {saved ? "Un Save" : "Save"}</p>
                        </div>
                    </div>
                </div>

            </div>
            <p className=' px-2 pb-2'>{post?.caption}</p>

            <img src={post?.content} width={400} className='object-contain rounded-md' alt="" />

            <div className='py-2 flex items-center justify-between border-b-2 px-2 border-gray-300'>
                <p className='flex items-center gap-1 '><BiSolidLike className='text-blue-500' />  {likes} </p>
                <div className=''>
                    <span >  {comments} comments </span>
                    {/* <span className='pl-2'>  0 shares </span> */}
                </div>
            </div>
            <div className='p-3 flex items-center justify-between'>
                {
                    showLike ?
                        <p onClick={likePost} className='flex items-center gap-2 cursor-pointer'>  <BiSolidLike className='text-blue-500' size={20} /> Like</p>
                        :
                        <p onClick={likePost} className='flex items-center gap-2 cursor-pointer'>  <BiLike size={20} /> Like</p>
                }
                <p onClick={handlePostDetails} className='flex items-center gap-2 cursor-pointer'>  <FaRegCommentDots size={20} /> Comments</p>
                <p onClick={handleCopy} className='flex items-center gap-2 cursor-pointer'>  <FaRegShareFromSquare size={20} /> Share</p>
            </div>
        </div>
    )
}

export default PostCard
