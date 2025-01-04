import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"
import PostToggle from '../components/PostToggle';
import { PostContext } from '../context/PostContext';


const Result = () => {
    const { token, images, setImages, generateImage } = useContext(AppContext);
    const { postToggle, setPostToggle } = useContext(PostContext);

    const [image, setImage] = useState(images[0]?.imageUrl || assets.sample_img_1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");

    const navigate = useNavigate();



    const submitHandler = async (e) => {
        e.preventDefault();

        if (input) {
            setLoading(true);
            const image = await generateImage(input);
            setImages([...images, { imageUrl: image }]);
            setImage(image);
            setIsImageLoaded(true);
            setLoading(false);
            setInput("");
        } else {
            toast.error("Please Enter Prompt!");
        }
    }

    const downloadImage = async () => {
        try {
            // Fetch the image as a blob
            const response = await fetch(image);
            const blob = await response.blob();

            // Create a link element
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "downloaded-image.png"; // Set the desired file name
            link.click();

            // Clean up
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error("Error downloading the image:", error);
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault(); // Prevent right-click menu
        alert("Right-click is disabled on this image.");
    };



    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [])


    return (
        <>
            <motion.form
                onSubmit={submitHandler}
                initial={{ opacity: 0.2, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className='flex flex-col justify-center min-h-[90vh] items-center'>
                <div>
                    <div
                        className='relative'>
                        <img
                            onContextMenu={handleContextMenu} // Disable right-click
                            style={{
                                userSelect: "none", // Disable text/image selection
                                pointerEvents: "none", // Prevent drag
                            }}
                            src={image} className='max-w-sm rounded' alt="" />
                        {<span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? "w-full transition-all duration-[10s]" : "w-0"}`} />}
                    </div>
                    {loading && <p>Loading...</p>}
                </div>


                {!isImageLoaded &&
                    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text" placeholder='Describe what you want to generate'
                            className='placeholder-color flex-1 bg-transparent outline-none ml-8 max-sm:w-20' />
                        <button type='submit' className='bg-zinc-900 px-6 sm:px-16 py-3 rounded-full text-white'>Generate</button>
                    </div>}




                {
                    isImageLoaded &&
                    <div className='flex gap-2  flex-wrap justify-center text-white items-center text-sm  p-0.5 mt-10 rounded-full'>
                        <p onClick={() => setIsImageLoaded(false)} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
                        <button type='button' onClick={downloadImage} className='bg-zinc-900 px-4 sm:px-10 py-3 rounded-full cursor-pointer'>Download</button>

                        <button type='button' onClick={() => setPostToggle(true)} className='bg-zinc-900 px-4 sm:px-10 py-3 rounded-full cursor-pointer'>Post to Public</button>
                    </div>
                }
            </motion.form>

            {postToggle && <PostToggle image={image} setPost={setPostToggle} />}

        </>
    )
}

export default Result
