import { ReactNode, useContext } from "react";
import { motion } from "framer-motion";
import { PlayerContext } from "../context/PlayerContext";

export default function Background({ children }: { children: ReactNode }) {
  const { animations } = useContext(PlayerContext);

  return (
    <motion.main
      className="flex h-screen overflow-hidden flex-col place-content-center items-center p-24 bg-black relative"
      animate={
        animations.flashing
          ? {
              backgroundColor: "#fff",
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
              animationDirection: "initial",
            }
          : {
              backgroundColor: "#000",
              transition: {
                duration: 0.01,
                ease: "easeInOut",
              },
            }
      }
    >
      {children}
    </motion.main>
  );
}
