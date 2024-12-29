import React, { useContext, useState } from 'react'
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots, FaRegUser } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';


const PostCard = ({ post }) => {
    const { user, backendUrl, token, setShowLogin } = useContext(AppContext);
    const [likes, setLikes] = React.useState(post?.likes?.length);
    const [comments, setComments] = useState(post?.comments?.length);
    const [showLike, setShowLike] = useState(post?.likes?.includes(user?._id));



    const likePost = async () => {

        if (!user) {
            setShowLogin(true);
            return;
        }
        try {
            const { data } = await axios.get(`${backendUrl}/post/like-dislike/${post._id}`, {
                headers: { token }
            })
            setLikes(data.likes)
            setShowLike(!showLike);
            toast.success(data.message)
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='border shadow-md p-1 rounded-md'>
            <div className='p-3 flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                    <FaRegUser size={20} />
                    <span className='ml-2 text-lg font-medium'>{post?.user.name}</span>
                </div>
                {post.user?._id === user?._id && <BsThreeDots size={24} className='cursor-pointer' />}
            </div>
            <p className=' px-2 pb-2'>{post.caption}</p>

            <img src={post.content} width={400} className='object-contain rounded-md' alt="" />

            <div className='py-2 flex items-center justify-between border-b-2 px-2 border-gray-300'>
                <p className='flex items-center gap-1 '><BiSolidLike className='text-blue-500' />  {likes} </p>
                <div className=''>
                    <span >  {comments} comments </span>
                    <span className='pl-2'>  0 shares </span>
                </div>
            </div>
            <div className='p-3 flex items-center justify-between'>
                {
                    showLike ?
                        <p onClick={likePost} className='flex items-center gap-2 cursor-pointer'>  <BiSolidLike className='text-blue-500' size={20} /> Like</p>
                        :
                        <p onClick={likePost} className='flex items-center gap-2 cursor-pointer'>  <BiLike size={20} /> Like</p>
                }
                <p className='flex items-center gap-2 cursor-pointer'>  <FaRegCommentDots size={20} /> Comments</p>
                <p className='flex items-center gap-2 cursor-pointer'>  <FaRegShareFromSquare size={20} /> Share</p>
            </div>
        </div>
    )
}

export default PostCard
