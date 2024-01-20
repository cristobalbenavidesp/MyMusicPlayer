import { PlayerContext } from "@/context/PlayerContext";
import { useContext } from "react";
import { motion } from "framer-motion";

export default function Visualizer() {
  const { animations, canvasRef } = useContext(PlayerContext);
  return (
    <div className="absolute m-auto overflow-visible grid place-items-center">
      <motion.div
        id="circle1"
        className="w-1 h-1 rounded-full bg-[#09f] z-10"
        animate={
          animations.circle
            ? {
                scale: 600,
                opacity: 0,
                animationDirection: "initial",
                transition: {
                  duration: 0.5,
                  ease: [0.86, 0, 0.07, 1],
                },

                translateX: 20,
                translateY: -20,
              }
            : {
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }
        }
      ></motion.div>
      <motion.div
        id="circle2"
        className="w-1 h-1 rounded-full bg-[#f0f] z-10"
        animate={
          animations.circle
            ? {
                scale: 600,
                opacity: 0,
                translateX: -20,
                translateY: -20,
                animationDirection: "initial",
                transition: {
                  duration: 0.5,
                  ease: [0.86, 0, 0.07, 1],

                  delay: 0.2,
                },
              }
            : {
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }
        }
      ></motion.div>
      <motion.div
        id="circle3"
        className="w-1 h-1 rounded-full bg-[#0f2] z-10"
        animate={
          animations.circle
            ? {
                scale: 500,
                opacity: 0,
                translateY: 20,
                animationDirection: "initial",
                transition: {
                  duration: 0.5,
                  ease: [0.86, 0, 0.07, 1],

                  delay: 0.3,
                },
              }
            : {
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }
        }
      ></motion.div>
      <canvas ref={canvasRef} className="fixed w-full h-full z-0" />
    </div>
  );
}
