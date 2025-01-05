import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import toast from "react-hot-toast";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const { token, backendUrl } = useContext(AppContext);

    const [state, setState] = useState('images');
    const [loading, setLoading] = useState(false);
    const [savedPosts, setSavedPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [myGeneratedImages, setMyGeneartedImages] = useState([]);
    const [postToggle, setPostToggle] = useState(false);

    const saveUnsavePost = async (postId) => {
        try {
            const { data } = await axios.get(`${backendUrl}/post/save-unsave/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            toast.success(data.message)

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    const fetchSavedPost = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/post/get-saved`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSavedPosts(data.data);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    const fetchMyPosts = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(`${backendUrl}/post/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMyPosts(data.posts);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);

        }
    }

    const fetchMyGeneratedImages = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(`${backendUrl}/image/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMyGeneartedImages(data.images);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }



    const value = {
        fetchMyGeneratedImages,
        myGeneratedImages,
        saveUnsavePost,
        fetchMyPosts,
        myPosts,
        fetchSavedPost,
        savedPosts,
        loading,
        state,
        setState,
        postToggle,
        setPostToggle
    }

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}


export default PostContextProvider