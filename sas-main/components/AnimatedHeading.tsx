import { motion } from "framer-motion";

const AnimatedHeading = () => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-white lg:text-7xl"
    >
      Fox Spot
    </motion.h1>
  );
};

export default AnimatedHeading;
