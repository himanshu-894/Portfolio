import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ── Throttled rainbow mouse spotlight tracker ──
let lastMoveTime = 0;
const THROTTLE_MS = 32; // ~30fps instead of every pixel move

const onMouseMove = (e: MouseEvent) => {
    const now = performance.now();
    if (now - lastMoveTime < THROTTLE_MS) return;
    lastMoveTime = now;

    const x = ((e.clientX / window.innerWidth) * 100).toFixed(1);
    const y = ((e.clientY / window.innerHeight) * 100).toFixed(1);
    const hue = Math.round((e.clientX / window.innerWidth) * 360);

    const s = document.body.style;
    s.setProperty('--mouse-x', `${x}%`);
    s.setProperty('--mouse-y', `${y}%`);
    s.setProperty('--spotlight-hue', `${hue}`);
};

document.addEventListener('mousemove', onMouseMove, { passive: true });

createRoot(document.getElementById("root")!).render(<App />);
