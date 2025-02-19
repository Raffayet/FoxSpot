"use client"; // Important for Framer Motion in Next.js 13 App Router
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <div id="about">
        <br></br>
        <br></br>
      </div>
      <section className="flexCenter flex-col">
        <motion.div // Animate the entire section (optional)
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div
            className="padding-container max-container w-full pb-24"
            id="guide"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10 items-center">
              <motion.div // Animate the text side
                className="lg:max-w-[50%]"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              >
                <h2 className="bold-40 lg:bold-64 text-center lg:text-left mb-4">
                  Explore your city
                </h2>
                <p className="regular-16 text-gray-30">
                  Browse a curated selection of parties, workshops, festivals,
                  concerts, and more, all tailored to your interests. Powerful
                  search filters help you find exactly what you're looking for,
                  while interactive maps guide you to the venue. For organizers,
                  Foxspot provides the tools to create and manage events, sell
                  tickets, and connect with attendees. Experience the future of
                  event discovery with Foxspot.
                </p>
              </motion.div>

              <motion.div // Animate the image side
                className="lg:max-w-[50%] relative"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1652641742436-1a5b9a18636b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="nature scene"
                  width={720}
                  height={300}
                  className="object-cover object-center 2xl:rounded-5xl w-full"
                />
                <motion.div // Animate the overlay
                  className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[-8%] lg:top-10 w-auto"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
                >
                  <Image
                    src="/meter.svg"
                    alt="icon"
                    width={10}
                    height={158}
                    className="h-full w-auto ml-3"
                  />
                  <div className="flexBetween flex-col">
                    <div className="flex w-full flex-col">
                      <div className="flexBetween w-full">
                        <p className="regular-16 text-gray-20">Our Values</p>
                      </div>
                      <p className="bold-20 mt-2">Sustainability</p>
                    </div>

                    <div className="flex w-full flex-col">
                      <p className="regular-16 text-gray-20">Our Vision</p>
                      <h4 className="bold-20 mt-2 whitespace-nowrap">
                        Inspiring Exploration
                      </h4>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default About;
