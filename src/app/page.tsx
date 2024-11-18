"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ParallaxSection = ({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className={`min-h-screen flex items-center justify-center ${bgColor}`}
    >
      {children}
    </motion.section>
  );
};

const AnimatedTitle = ({ children }: { children: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-4xl md:text-6xl font-bold mb-6 text-center text-gray-100"
    >
      {children}
    </motion.h2>
  );
};

const AnimatedDescription = ({ children }: { children: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-xl mb-8 text-center max-w-2xl text-gray-300"
    >
      {children}
    </motion.p>
  );
};

const AnimatedButton = ({
  children,
  href,
}: {
  children: string;
  href: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <Button
        asChild
        size="lg"
        variant="outline"
        className="text-lg bg-transparent border-gray-300 text-gray-100 hover:bg-gray-700"
      >
        <a href={href} className="inline-flex items-center">
          {children}
          <ExternalLink className="ml-2 h-5 w-5" />
        </a>
      </Button>
    </motion.div>
  );
};

export default function DarkImmersiveLanding() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.backgroundColor = "#111827"; // Set dark background color
    return () => {
      document.body.style.overflowX = "auto";
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="relative text-gray-100">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      <ParallaxSection bgColor="bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="text-center p-8">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-gray-100"
          >
            Transform Your Digital World
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 text-gray-300"
          >
            Discover our trio of powerful platforms designed to revolutionize
            your business
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="animate-bounce"
          >
            <ArrowDown className="mx-auto h-8 w-8 text-gray-300" />
          </motion.div>
        </div>
      </ParallaxSection>

      <ParallaxSection bgColor="bg-gradient-to-b from-gray-800 to-gray-700">
        <div className="text-center p-8">
          <AnimatedTitle>Sweven</AnimatedTitle>
          <AnimatedDescription>
            Revolutionize your adtech processes with our cutting-edge innovation
            platform. Stay ahead of the curve and drive growth with AI-powered
            insights and automation.
          </AnimatedDescription>
          <AnimatedButton href="https://www.getsweven.com/">
            Explore Sweven
          </AnimatedButton>
        </div>
      </ParallaxSection>

      <ParallaxSection bgColor="bg-gradient-to-b from-gray-700 to-gray-600">
        <div className="text-center p-8">
          <AnimatedTitle>12twelve</AnimatedTitle>
          <AnimatedDescription>
            Enhance team productivity with our state-of-the-art collaboration
            suite. Break down silos, streamline communication, and boost
            efficiency across your organization.
          </AnimatedDescription>
          <AnimatedButton href="https://www.my12twelve.com/">
            Discover 12twelve
          </AnimatedButton>
        </div>
      </ParallaxSection>

      <ParallaxSection bgColor="bg-gradient-to-b from-gray-600 to-gray-500">
        <div className="text-center p-8">
          <AnimatedTitle>Peen</AnimatedTitle>
          <AnimatedDescription>
            Share your ideas and engage with your audience through our
            feature-rich blogging platform. Create stunning content, build a
            loyal readership, and grow your online presence effortlessly.
          </AnimatedDescription>
          <AnimatedButton href="https://blogging-pink.vercel.app/">
            Try Peen
          </AnimatedButton>
        </div>
      </ParallaxSection>

      <footer className="bg-gray-900 text-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Harness the power of our innovative platforms and start your digital
            revolution today.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg bg-transparent border-gray-300 text-gray-100 hover:bg-gray-700"
          >
            <a href="#" className="inline-flex items-center">
              Get Started Now
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </footer>
    </div>
  );
}
