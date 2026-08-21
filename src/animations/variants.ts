/** Motion / GSAP variant presets — populated in later phases. */
export const motionPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
} as const;
