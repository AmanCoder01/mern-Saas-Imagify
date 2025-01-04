import React, { useContext, useEffect, useState, useRef } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from '../components/Spinner';
import PostCard from '../components/PostCard';
import axios from "axios"

const Posts = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { posts, setPosts, backendUrl } = useContext(AppContext);


    const fetchPosts = async () => {
        if (!hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/post/all`, { params: { page, limit: 5 } });


            setPosts((prevPosts) => {
                const mergedPosts = [...prevPosts, ...response.data.data];

                // Remove duplicates based on `_id`
                const uniquePosts = mergedPosts.filter(
                    (post, index, self) => index === self.findIndex((p) => p._id === post._id)
                );

                return uniquePosts;
            });

            if (posts.length + response.data.data.length >= response.data.totalPosts) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (page > 1) fetchPosts();
    }, [page]);


    const handelInfiniteScroll = async () => {
        // console.log("scrollHeight" + document.documentElement.scrollHeight);
        // console.log("innerHeight" + window.innerHeight);
        // console.log("scrollTop" + document.documentElement.scrollTop);
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight - 212
            ) {
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);

    return (
        <div className='min-h-screen py-4 md:py-8'>
            <div className='flex flex-col justify-center gap-6 items-center'>

                {
                    posts?.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))
                }
            </div>

            {
                loading && (
                    <div className='  flex justify-center items-center h-screen'>
                        <div className='w-14 h-14'>
                            <Spinner />
                        </div>
                    </div>
                )
            }

            <div className=' flex justify-center mt-8'>
                {!hasMore && <p>No more posts to load.</p>}
            </div>
        </div>
    )
}

export default Posts
