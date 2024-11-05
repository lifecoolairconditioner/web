"use client";

import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

type SnowfallProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SnowfallBackground = (props: SnowfallProps) => {
  const {
    id,
    className,
    background = "#87CEEB",
    minSize = 1,
    maxSize = 5,
    speed = 1,
    particleColor = "#ffffff",
    particleDensity = 100,
  } = props;

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  const generatedId = useId();

  return (
    <motion.div
      animate={controls}
      className={cn(
        "opacity-0 absolute inset-0 shadow-2xl shadow-blue-400",
        className
      )}
    >
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background,
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: particleColor,
              },
              move: {
                direction: "bottom",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: false,
                speed: speed,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 400,
                  height: 400,
                },
                value: particleDensity,
              },
              opacity: {
                value: 0.7,
              },
              shape: {
                type: ["circle", "star"],
              },
              size: {
                value: { min: minSize, max: maxSize },
              },
              wobble: {
                enable: true,
                distance: 10,
                speed: {
                  min: 1,
                  max: 3,
                },
              },
              zIndex: {
                value: { min: 0, max: 100 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};

export default SnowfallBackground;
