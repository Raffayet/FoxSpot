"use client"; // Important for Framer Motion
import React from "react";
import Button from "./Button";
import Image from "next/image";
import { motion } from "framer-motion";
import useScrollToOffset from "./hooks/hook.tsx"; // Or the correct path if you are using aliases

const GetApp = () => {
  const [appRef] = useScrollToOffset(80, 0.5); // Adjust 80px as needed
  return (
    <>
      <div ref={appRef} id="app"></div>

      <section className="flexCenter w-full flex-col pb-[100px]" id="app">
        <div className="get-app">
          <motion.div // Animate the left side
            className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12"
            initial={{ opacity: 0, x: -50 }} // Start off-screen to the left
            animate={{ opacity: 1, x: 0 }} // Animate into place
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.h2 // Animate the heading
              className="bold-40 lg:bold-64 xl:max-w-[320px] text-white"
              initial={{ scale: 0.8 }} // Start slightly smaller
              animate={{ scale: 1 }} // Scale up
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }} // Add delay
            >
              Get for free now!
            </motion.h2>
            <motion.p // Animate the description
              className="regular-16 text-gray-10"
              initial={{ opacity: 0 }} // Start transparent
              animate={{ opacity: 1 }} // Fade in
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }} // Add delay
            >
              Available on iOS and Android
            </motion.p>
            <motion.div // Animate the buttons container
              className="flex w-full flex-col gap-3 whitespace-nowrap xl:flex-row"
              initial={{ opacity: 0, y: 20 }} // Start slightly below
              animate={{ opacity: 1, y: 0 }} // Animate into place
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }} // Add delay
            >
              <Button
                type="button"
                title="App Store"
                icon="/apple.svg"
                variant="btn_white"
                full
              />
              <Button
                type="button"
                title="Play Store"
                icon="/android.svg"
                variant="btn_dark_green_outline"
                full
              />
            </motion.div>
          </motion.div>

          <motion.div // Animate the image container
            className="flex flex-1 items-center justify-end"
            initial={{ opacity: 0, x: 50 }} // Start off-screen to the right
            animate={{ opacity: 1, x: 0 }} // Animate into place
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image src="/phone3.png" alt="phones" width={350} height={570} />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default GetApp;
