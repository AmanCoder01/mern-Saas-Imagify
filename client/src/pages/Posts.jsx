import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from '../components/Spinner';
import PostCard from '../components/PostCard';

const Posts = () => {
    const [loading, setAppLoading] = useState(false);
    const { fetchAllPosts, posts, user } = useContext(AppContext);



    useEffect(() => {
        const fun = async () => {
            setAppLoading(true);
            await fetchAllPosts();
            setAppLoading(false);
        }
        fun();
    }, [])


    if (loading) {
        return (
            <div className='  flex justify-center items-center h-screen'>
                <div className='w-14 h-14'>
                    <Spinner />
                </div>
            </div>
        )

    }

    return (
        <div className='min-h-screen py-10'>
            <div className='flex flex-col justify-center gap-6 items-center'>
                {
                    posts.map((post, index) => (
                        <PostCard key={index} post={post} user={user} />
                    ))
                }
            </div>
        </div>
    )
}

export default Posts
