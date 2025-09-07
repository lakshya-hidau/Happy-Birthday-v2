"use client"

import { motion, AnimatePresence } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function HappyBirthday({ onNext }) {
  const [balloonCount, setBalloonCount] = useState(5)
  const [currentBalloon, setCurrentBalloon] = useState(null) // track only the current popped balloon

  useEffect(() => {
    const updateBalloonCount = () => {
      setBalloonCount(window.innerWidth >= 768 ? 20 : 5)
    }
    updateBalloonCount()
    window.addEventListener("resize", updateBalloonCount)
    return () => window.removeEventListener("resize", updateBalloonCount)
  }, [])

  // 🎉 Random messages
  const messages = [
    "🎂 Happy Birthday, Queen!",
    "💖 Shine bright always!",
    "🎁 You’re a blessing!",
    "🌟 Keep smiling forever!",
    "💕 Sending hugs & love!",
    "🍰 Enjoy your special day!",
    "🎶 Let the music play!",
    "🌸 You deserve all the joy!",
    "✨ Stay magical always!",
    "🥳 Cheers to you!"
  ]

  // 🎈 Balloon Component
  const Balloon = ({ id, color, delay = 0, x = 0 }) => {
    const isPopped = currentBalloon && currentBalloon.id === id;

    const handlePop = (e) => {
      if (isPopped) return;
      const rect = e.target.getBoundingClientRect();
      const xPos = rect.left + rect.width / 2;
      const yPos = rect.top;
      setCurrentBalloon({
        id,
        x: xPos,
        y: yPos,
        message: messages[Math.floor(Math.random() * messages.length)]
      });
    };

    return (
      <motion.div
        className="absolute cursor-pointer"
        style={{ left: `${x}%`, bottom: "-2.5%", zIndex: 5 }}
        animate={
          !isPopped && {
            y: [0, -15, 0],
            x: [0, 5, -5, 0],
            rotate: [0, 3, -3, 0]
          }
        }
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut"
        }}
        onClick={handlePop}
      >
        {!isPopped ? (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative w-[70px] h-[80px]">
              {/* Balloon shape */}
              <div
                className={`w-full h-full bg-gradient-to-b ${color} relative shadow-md`}
                style={{ borderRadius: "75% 75% 80% 80% / 75% 75% 80% 80%" }}
              >
                {/* Highlights */}
                <div className="absolute top-2 left-2 w-3 h-5 bg-white/50 rounded-full blur-[1px]" />
                <div className="absolute bottom-2 left-3 w-2 h-1 bg-white/30 rounded-full blur-[0.5px]" />
              </div>

              {/* Tie */}
              <div
                className={`absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-[12px] h-[12px] bg-gradient-to-b ${color}`}
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    );
  };

  // 🎂 Cake Component (same as yours, unchanged)
  const AnimatedCake = () => (
    <motion.div
      className="relative z-10"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center">
        {/* candles */}
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 w-[50px] flex justify-between">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative">
              <motion.div
                className="relative mx-auto"
                animate={{ scaleY: [1, 1.3, 1], scaleX: [1, 0.8, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
              >
                <div className="w-2 h-3 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full mx-auto" />
                <motion.div
                  className="w-3 h-3 bg-yellow-300/50 rounded-full absolute -top-1 -left-0.5 blur-sm"
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                />
              </motion.div>
              <div className="w-1.5 h-8 bg-gradient-to-b from-yellow-100 to-yellow-300 rounded-sm mx-auto shadow-sm" />
            </div>
          ))}
        </div>
        {/* cake layers */}
        <div className="w-20 h-10 bg-gradient-to-b from-purple-200 to-purple-400 rounded-xl relative mx-auto -mt-1 shadow-lg">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-300 to-indigo-400 rounded-t-xl" />
        </div>
        <div className="w-28 h-12 bg-gradient-to-b from-pink-200 to-pink-400 rounded-xl relative mx-auto -mt-2 shadow-lg">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-300 to-purple-400 rounded-t-xl" />
        </div>
        <div className="w-36 h-14 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-xl relative mx-auto -mt-1 shadow-lg">
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-pink-300 to-pink-400 rounded-t-xl" />
        </div>
        <div className="w-40 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-lg" />
      </div>
    </motion.div>
  )

  const balloonColors = [
    "from-red-400 to-red-500",
    "from-blue-400 to-blue-500",
    "from-green-400 to-green-600",
    "from-yellow-400 to-yellow-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600"
  ]

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* 🎈 Balloons */}
      {Array.from({ length: balloonCount }, (_, i) => {
        const colorIndex = i % balloonColors.length
        const xPosition = (100 / balloonCount) * i
        return <Balloon key={`balloon-${i}`} id={i} color={balloonColors[colorIndex]} delay={i * 0.2} x={xPosition} />
      })}

      {/* 🎉 Show only one pop message at a time */}
      <AnimatePresence>
        {currentBalloon && (
          <motion.div
            key={currentBalloon.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute text-lg font-bold text-white drop-shadow-lg"
            style={{ left: currentBalloon.x, top: currentBalloon.y }}
          >
            {currentBalloon.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎂 Cake + Text */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 10 }}
      >
        <div className="mb-8">
          <AnimatedCake />
        </div>
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Happy Birthday
        </motion.h1>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          Madam Jii <span className="text-white">💕</span>
        </motion.h2>
      </motion.div>

      {/* Next button */}
      <motion.div
        className="relative z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      >
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white text-xl px-8 py-4 rounded-full shadow-xl border-2 border-white/70 transition-all duration-300 hover:scale-[103%]"
        >
          <motion.div className="flex items-center space-x-2" whileHover={{ x: 5 }}>
            <span>See Our Moments</span>
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </button>
      </motion.div>
    </motion.div>
  )
}
