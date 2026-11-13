"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export function Tilt3D({
  children,
  className = "",
  maxTilt = 14,
  glare = true,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for fluid tilt physics
  const rotateXSpring = useSpring(useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 250,
    damping: 25,
  });

  // Glare position
  const glareX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), { stiffness: 200, damping: 20 });
  const glareY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), { stiffness: 200, damping: 20 });
  const glareOpacity = useSpring(useTransform(mouseX, [0, 0.5, 1], [0.3, 0.15, 0.3]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 cursor-pointer ${className}`}
    >
      {children}

      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={{
            opacity: glareOpacity,
          }}
        >
          <motion.div
            className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_60%)] mix-blend-overlay"
            style={{
              x: useTransform(glareX, (v) => `${v - 50}%`),
              y: useTransform(glareY, (v) => `${v - 50}%`),
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
