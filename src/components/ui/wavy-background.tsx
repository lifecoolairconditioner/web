"use client";

import { cn } from "@/lib/utils";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationId = useRef<number | null>(null);
  const w = useRef<number>(window.innerWidth);
  const h = useRef<number>(window.innerHeight);
  const nt = useRef<number>(0);

  const waveColors = useMemo(() => {
    return colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
  }, [colors]);

  const getSpeed = useCallback(() => {
    return speed === "fast" ? 0.05 : 0.02;
  }, [speed]);

  const drawWave = useCallback(
    (n: number, ctx: CanvasRenderingContext2D) => {
      nt.current += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w.current; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt.current) * 100;
          ctx.lineTo(x, y + h.current * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    },
    [noise, waveWidth, waveColors, getSpeed]
  );

  const render = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = backgroundFill || "black";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w.current, h.current);
      drawWave(5, ctx);
      animationId.current = requestAnimationFrame(() => render(ctx));
    },
    [backgroundFill, waveOpacity, drawWave]
  );

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      w.current = ctx.canvas.width = window.innerWidth;
      h.current = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;

      window.onresize = function () {
        w.current = ctx.canvas.width = window.innerWidth;
        h.current = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
      };
      render(ctx);
    }
  }, [blur, render]);

  useEffect(() => {
    init();
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [init]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSafari(
        navigator.userAgent.includes("Safari") &&
          !navigator.userAgent.includes("Chrome")
      );
    }
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={isSafari ? { filter: `blur(${blur}px)` } : {}}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
