import { motion } from "framer-motion";

export default function SpaceBackground() {
  return (
    <motion.div
      className="bg-space w-full h-full absolute"
      initial={{ scale: 1 }}
      animate={{
        scale: 1.5,
        transition: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 10,
        },
      }}
    ></motion.div>
  );
}
