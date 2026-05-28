import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LogoSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("tt_splash_seen")) return;
    setShow(true);
    sessionStorage.setItem("tt_splash_seen", "1");
    const t = setTimeout(() => setShow(false), 3600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
        >
          <video
            src="/media/logo-intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => setShow(false)}
            className="max-w-[80vw] max-h-[80vh] object-contain"
          />
          <button
            onClick={() => setShow(false)}
            className="absolute bottom-8 right-8 text-bone/60 hover:text-accent text-[10px] tracking-[0.4em] uppercase"
            aria-label="Skip intro"
          >
            Skip ↘
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
