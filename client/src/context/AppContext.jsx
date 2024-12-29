import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [images, setImages] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [appLoading, setAppLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    // const backendUrl = "https://saas-imagify.vercel.app/api";
    const backendUrl = "http://localhost:4000/api";
    const navigate = useNavigate();



    const fetchAllPosts = async () => {

        try {
            const { data } = await axios.get(`${backendUrl}/post/all`);


            setPosts(data.posts);


        } catch (error) {
            console.log(error);
        }
    }

    const fetchImages = async () => {

        try {
            const { data } = await axios.get(`${backendUrl}/image/all`, {
                headers: { token }
            })



            if (data.success) {
                setImages(data.images);
            }

        } catch (error) {
            // console.error(error);
        }
    }


    const fetchUser = async () => {
        setAppLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/user/profile`, {
                headers: { token }
            })



            if (data.success) {
                setUser(data.user);
                setAppLoading(false);
            } else {
                toast.error(data.message);
                setAppLoading(false);
            }

        } catch (error) {
            setAppLoading(false)
        }
    }



    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(`${backendUrl}/image/generate-image`, { prompt }, {
                headers: { token },
            })



            if (data.success) {
                setUser({ ...user, credits: user.credits - 1 });

                return data.image;
            } else {
                toast.error(data.message);
                if (data.credits === 0) {
                    navigate("/pricing");
                }
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    useEffect(() => {
        if (token) {
            fetchUser();
            fetchImages();
        }
    }, [token]);


    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        generateImage,
        images,
        setImages,
        appLoading,
        fetchAllPosts,
        posts,
        setPosts
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider