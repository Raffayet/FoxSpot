"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBriefcase,
  faTrophy,
  faPalette,
  faPaintbrush,
  faHandshake,
  faUtensils,
  faComputer,
  faCampground,
  faMusic,
  faLandmark,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
const eventIcons = [
  // Array of event icons
  { keywords: ["party", "bash"], icon: faMusic },
  { keywords: ["coding"], icon: faComputer },
  { keywords: ["marathon", "sports", "football"], icon: faTrophy },
  { keywords: ["gallery", "art"], icon: faPalette },
  { keywords: ["meeting", "business", "launch"], icon: faHandshake },
  { keywords: ["festival", "food", "dinner"], icon: faUtensils },
  { keywords: ["camp", "adventure"], icon: faCampground },
  { keywords: ["music", "rocked"], icon: faMusic },
  { keywords: ["cultural", "celebrated"], icon: faLandmark },
];

const PEOPLE_URL = ["person-4.png", "person-2.png", "person-3.png"];

interface CampProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  peopleJoined: string;
  style?: React.CSSProperties;
}

const CampSite = ({
  backgroundImage,
  title,
  subtitle,
  peopleJoined,
  style,
}: CampProps) => {
  const getIconForEvent = (title: string) => {
    const titleLower = title.toLowerCase();

    for (const eventIcon of eventIcons) {
      // Iterate through the array
      for (const keyword of eventIcon.keywords) {
        // Check each keyword
        if (titleLower.includes(keyword)) {
          return eventIcon.icon;
        }
      }
    }

    return faMapMarkerAlt; // Default icon
  };

  const eventIcon = getIconForEvent(title);

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <img
        src={backgroundImage}
        alt={title}
        className="object-cover w-full h-full"
      />

      <div className="absolute inset-0 flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10 bg-gradient-to-b from-black/30 to-black/60">
        <div className="flex items-center gap-4">
          <motion.div // Animate the icon container
            className="rounded-full bg-green-50 p-4"
            initial={{ scale: 0 }} // Start very small
            animate={{ scale: 1 }} // Scale up to normal size
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FontAwesomeIcon icon={eventIcon} className="w-7 h-7" />
          </motion.div>
          <motion.div // Animate the title container (same as before)
            className="flex flex-col gap-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          >
            <motion.h4 // Animate the title (same as before)
              className="font-bold text-lg text-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {title}
            </motion.h4>
            <motion.p // Animate the subtitle (same as before)
              className="text-sm text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex -space-x-4 overflow-hidden">
            {PEOPLE_URL.map((url, index) => (
              <img
                key={index}
                className="inline-block h-10 w-10 rounded-full ring-white"
                src={url}
                alt={`person ${index + 1}`}
              />
            ))}
          </span>
          <motion.p // Animate the people joined count (same as before)
            className="font-bold text-lg md:text-xl text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
          >
            {peopleJoined}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const Camp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      backgroundImage:
        "https://images.unsplash.com/photo-1600102975337-e66752d32557?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Party Image
      title: "Party Bash",
      subtitle: "Summer Party, Novi Sad",
      peopleJoined: "100+ Partied",
    },
    {
      backgroundImage:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Workshop Image
      title: "Coding Workshop",
      subtitle: "Tech Hub, San Francisco",
      peopleJoined: "60+ Coded",
    },
    {
      backgroundImage:
        "https://images.unsplash.com/photo-1721441904917-1afc7f0de133?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Sports Event Image
      title: "Football match",
      subtitle: "Downtown, New York",
      peopleJoined: "9+ joining",
    },
    {
      backgroundImage:
        "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Art workshop",
      subtitle: "Modern Art Museum, Belgrade",
      peopleJoined: "33+ Viewed",
    },
    {
      backgroundImage:
        "https://images.unsplash.com/photo-1571645163064-77faa9676a46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Business Meeting Image
      title: "Product Launch",
      subtitle: "Conference Center, Tokyo",
      peopleJoined: "150+ Attended",
    },
    {
      backgroundImage:
        "https://images.unsplash.com/photo-1505426101273-b50e6f3ff9a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Dinner/Food Image
      title: "Food Festival",
      subtitle: "Central Park, Paris",
      peopleJoined: "300+ Tasted",
    },
    {
      backgroundImage:
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Camping Adventure",
      subtitle: "Yosemite National Park",
      peopleJoined: "75+ Camped",
    },
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div id="events">
        <br></br>
      </div>
      <section className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20">
        <div className="hide-scrollbar relative h-[700px] w-full overflow-hidden rounded-3xl">
          <AnimatePresence>
            {slides.map((slide, index) =>
              index === currentSlide ? (
                <CampSite key={index} {...slide} />
              ) : null
            )}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            disabled={isTransitioning} // Disable during transition
          >
            {/* ... SVG ... */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            disabled={isTransitioning} // Disable during transition
          >
            {/* ... SVG ... */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentSlide(index);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
                disabled={isTransitioning} // Disable during transition
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Camp;
