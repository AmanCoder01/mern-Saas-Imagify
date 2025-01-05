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
    const [scrollPosition, setScrollPosition] = useState(0);


    const backendUrl = "https://saas-imagify.vercel.app/api/v1";
    // const backendUrl = "http://localhost:4000/api/v1";
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const fetchImages = async () => {

        try {
            const { data } = await axios.get(`${backendUrl}/image/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
        posts,
        setPosts,

        scrollPosition,
        setScrollPosition,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider