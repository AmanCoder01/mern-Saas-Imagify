import { motion } from 'motion/react'
import React, { useContext, useState } from 'react'
import { MdLockOutline } from "react-icons/md";
import Spinner from '../components/Spinner';
import toast from "react-hot-toast";
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import axios from "axios"

const VerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const { backendUrl } = useContext(AppContext);
    const [password, setPassword] = useState("");

    const params = useParams();


    // get params from url
    const resetToken = params.resetToken;

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${backendUrl}/user/verify-email/${resetToken}`, { password });

            if (data.success) {
                toast.success(data.message);
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(data.message);
            }

        } catch (error) {
            setLoading(false);

            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='min-h-[80vh] mt-20 max-w-lg mx-auto text-center'>
            <motion.form
                onSubmit={submitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl font-medium text-neutral-700'>Reset Password</h1>
                <p className='text-sm mt-1 mb-6'>Enter new password </p>


                <div className='flex items-center gap-2 rounded-full mt-4 px-6 py-2 border mb-4'>
                    <MdLockOutline size={18} />
                    <input
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='outline-none border-none'
                        type="password" placeholder='Password' />
                </div>


                <button className='py-2 w-full mt-4 rounded-full bg-blue-600  text-white'>
                    {
                        loading ? <div className='flex items-center justify-center gap-3'>
                            <Spinner />
                            Reseting...
                        </div> : "Reset Password"
                    }
                </button>

            </motion.form>
        </div>
    )
}

export default VerifyEmail
