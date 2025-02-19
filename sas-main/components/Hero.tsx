"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./Button";
const Hero = () => {
  return (
    <>
      <div id="home"></div>
      <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-map"
        />

        <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bold-52 lg:bold-88"
          >
            Fox Spot
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]"
          >
            Foxspot connects you with the experiences you crave. Discover
            parties, workshops, festivals, and more – all in one place. Find
            your next adventure or create your own and share it with the world.
            Foxspot: Your city's pulse, at your fingertips.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="my-11 flex flex-wrap gap-5"
          >
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(1)
                .map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Image src="/star.svg" alt="star" width={24} height={24} />
                  </motion.div>
                ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bold-16 lg:bold-20 text-blue-70"
            >
              198k
              <span className="regular-16 lg:regular-20 ml-1">
                Excellent Reviews
              </span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col w-full gap-3 sm:flex-row"
          >
            <Button type="button" title="Download App" variant="btn_green" />
            <Button
              type="button"
              title="How we work?"
              icon="/play.svg"
              variant="btn_white_text"
            />
          </motion.div>
        </div>

        <div className="relative flex flex-1 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8"
          >
            <div className="flex flex-col">
              <div className="flexBetween">
                <p className="regular-16 text-gray-20">Location</p>
                <Image src="/close.svg" alt="close" width={24} height={24} />
              </div>
              <p className="bold-20 text-white">City Center</p>
            </div>

            <div className="flexBetween">
              <div className="flex flex-col">
                <p className="regular-16 block text-gray-20">Distance</p>
                <p className="bold-20 text-white">173 m</p>
              </div>
              <div className="flex flex-col">
                <p className="regular-16 block text-gray-20">Type of event</p>
                <p className="bold-20 text-white">Party</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
