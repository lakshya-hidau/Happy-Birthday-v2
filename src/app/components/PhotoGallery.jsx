"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { Camera, ArrowRight, Heart } from "lucide-react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCube, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'

export default function PhotoGallery({ onNext }) {
    const photos = [
        { id: 1, src: "/images/1.jpg" }
    ]

    // Loader and love animation state
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showHearts, setShowHearts] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 2000); // Show hearts for 2 seconds
    };

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="text-center mb-8"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="mb-8"
                    animate={{
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                    <Camera className="w-16 h-16 text-pink-400 mx-auto" />
                </motion.div>

                <h1 className="text-4xl md:text-6xl py-1 md:py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-6">
                Moments with You 
                </h1>
                <p className="text-xl text-purple-300">Beautiful moments with Madam Jii 📸</p>
            </motion.div>

            {/* Cube Gallery */}
            <div className="w-full max-w-sm mx-auto">
                <Swiper
                    effect={'cube'}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    pagination={true}
                    modules={[EffectCube, Pagination]}
                    className="mySwiper h-[350px] md:h-[450px]" // adjust height as needed
                >
                    {photos.map((photo, index) => (
                        <SwiperSlide key={photo.id}>
                            <div className="relative w-full h-full flex items-center justify-center">
                                {!imageLoaded && (
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center bg-black/10 z-20"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                            className="flex items-center justify-center"
                                        >
                                            <Heart className="w-14 h-14 text-pink-400 animate-pulse" />
                                        </motion.div>
                                    </motion.div>
                                )}
                                <img
                                    src={photo.src || "/placeholder.svg"}
                                    alt={`Memory ${index + 1}`}
                                    className={`w-full h-full object-cover rounded-xl transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={handleImageLoad}
                                />
                                {showHearts && imageLoaded && (
                                    <div className="absolute inset-0 pointer-events-none z-10">
                                        {[...Array(18)].map((_, i) => {
                                            // Randomize heart color, size, rotation, and horizontal position
                                            const colors = ["text-pink-400", "text-red-400", "text-purple-400", "text-fuchsia-400", "text-rose-400"];
                                            const color = colors[Math.floor(Math.random() * colors.length)];
                                            const size = Math.random() * 16 + 24; // 24px to 40px
                                            const rotate = Math.random() * 360;
                                            const scale = Math.random() * 0.5 + 0.8;
                                            const left = Math.random() * 80 + 10; // 10% to 90%
                                            const delay = i * 0.08 + Math.random() * 0.2;
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ y: -60, opacity: 0, scale: scale, rotate: rotate }}
                                                    animate={{ y: 420, opacity: 1, scale: scale + 0.2, rotate: rotate + 60 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 2.2, delay }}
                                                    style={{ position: 'absolute', left: `${left}%`, top: 0 }}
                                                >
                                                    <Heart className={`drop-shadow-lg ${color}`} style={{ width: size, height: size }} />
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white text-lg px-8 py-4 rounded-full shadow-xl border-2 border-white/70 transition-all duration-300 hover:scale-[103%]"
                >
                    <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
                        <span>One Last Thing</span>
                        <ArrowRight className="w-5 h-5" />
                    </motion.div>
                </button>
            </motion.div>
        </motion.div>
    )
}
