"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  // Set speed and direction based on props
  const [animationDuration, setAnimationDuration] = useState("40s");
  const [animationDirection, setAnimationDirection] = useState("forwards");

  useEffect(() => {
    // Set speed based on prop
    const speedDurations: { [key: string]: string } = {
      fast: "20s",
      normal: "40s",
      slow: "80s",
    };
    setAnimationDuration(speedDurations[speed]);

    // Set direction based on prop
    setAnimationDirection(direction === "left" ? "forwards" : "reverse");
  }, [speed, direction]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden ",
        className
      )}
      style={
        {
          "--animation-duration": animationDuration,
          "--animation-direction": animationDirection,
        } as React.CSSProperties
      }
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full gap-4 py-4 w-max flex-nowrap animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.concat(items).map((item, index) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={`${item.name}-${index}`}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute "
              ></div>

              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-black font-normal">
                    {item.name}
                  </span>
                  <span className="relative z-20 text-sm leading-[1.6] text-black font-normal">
                    {item.quote}
                  </span>
                  <span className="text-sm leading-[1.6] text-black font-normal">
                    <User className="w-16 h-16 ml-2 text-gray-400" />
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
