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
    const [loading, setLoading] = useState(false);

    const backendUrl = "https://saas-imagify.onrender.com/api";
    // const backendUrl = "http://localhost:4000/api";
    const navigate = useNavigate();


    const fetchImages = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/image/all`, {
                headers: { token }
            })

            if (data.success) {
                setImages(data.images);
            }

        } catch (error) {
            console.error(error);
        }
    }


    const fetchUser = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/user/profile`, {
                headers: { token }
            })

            if (data.success) {
                setUser(data.user);
                setLoading(false);
            } else {
                toast.error(data.message);
                setLoading(false);
            }

        } catch (error) {
            setLoading(false)
            // console.error(error);
        }
    }



    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(`${backendUrl}/image/generate-image`, { prompt }, {
                headers: { token },
            })

            if (data.success) {
                fetchUser();
                return data.image;
            } else {
                toast.error(data.message);
                if (data.credits === 0) {
                    navigate("/pricing");
                }
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }


    useEffect(() => {
        fetchUser();
    }, [token])

    useEffect(() => {
        fetchImages();
    }, [user])

    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        generateImage,
        fetchUser,
        images,
        setImages,
        fetchImages,
        loading
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider