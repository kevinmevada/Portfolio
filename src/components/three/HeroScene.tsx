"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
  loading: () => <Poster />,
});

function Poster() {
  return (
    <div
      className="absolute inset-0"
      aria-hidden
      style={{
        background:
          "radial-gradient(circle at 50% 42%, rgba(255,255,255,0.95) 0%, transparent 42%), radial-gradient(circle at 50% 48%, rgba(126,182,255,0.28) 0%, transparent 38%), radial-gradient(circle at 50% 55%, rgba(200,210,230,0.35) 0%, transparent 55%)",
      }}
    />
  );
}

export function HeroScene() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);

    const t = window.setTimeout(() => setReady(true), 120);
    return () => {
      mq.removeEventListener("change", onChange);
      window.clearTimeout(t);
    };
  }, []);

  if (reduced || !ready) {
    return (
      <div className="absolute inset-0">
        <Poster />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0"
      role="img"
      aria-label="Refractive glass sculpture representing precision engineered AI systems"
    >
      <Poster />
      <Suspense fallback={null}>
        <SceneCanvas />
      </Suspense>
    </div>
  );
}
