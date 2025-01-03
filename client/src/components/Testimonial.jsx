import React from 'react'
import { testimonialsData } from '../assets/assets'
import Slider from "react-slick";
import TestimonialCard from './TestimonialCard';
import { motion } from "motion/react"


const Testimonial = () => {

    const settings = {

        slidesToShow: 3,
        speed: 500,
        // dots: true,
        // slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024, // Screen width less than 1024px
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600, // Screen width less than 600px
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='flex overflow-hidden flex-col items-center justify-center my-15 py-12 md:px-[6.5rem]'>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Customer testimonials</h1>
            <p className='text-gray-600  mt-2 mb-6'>What Our Users Are Saying</p>

            <div className="slider-container  w-full py-6">
                <Slider {...settings} >
                    {
                        testimonialsData.map((item, index) => (
                            <TestimonialCard item={item} key={index} />
                        ))
                    }
                </Slider>
            </div>
        </motion.div>
    )
}

export default Testimonial
