import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

interface OverlayProps {
    scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

export const Overlay = ({ scrollContainerRef }: OverlayProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: scrollContainerRef,
        offset: ["start start", "end end"],
    });

    // Section 1: 0% → 20% scroll — Center (Original Hero text)
    const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.22], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.22], [60, 0, 0, -80]);

    // Section 2: 25% → 45% scroll — Left
    const opacity2 = useTransform(scrollYProgress, [0.23, 0.3, 0.4, 0.47], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.23, 0.3, 0.4, 0.47], [60, 0, 0, -80]);

    // Section 3: 50% → 70% scroll — Right
    const opacity3 = useTransform(scrollYProgress, [0.48, 0.55, 0.65, 0.72], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.48, 0.55, 0.65, 0.72], [60, 0, 0, -80]);

    // Section 4: 75% → 95% scroll — Center CTA
    const opacity4 = useTransform(scrollYProgress, [0.73, 0.8, 0.9, 0.97], [0, 1, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.73, 0.8, 0.9, 0.97], [60, 0, 0, -40]);
    const scale4 = useTransform(scrollYProgress, [0.73, 0.8, 0.9, 0.97], [0.9, 1, 1, 0.95]);

    return (
        <div
            ref={ref}
            className="absolute inset-0 z-10 pointer-events-none flex flex-col"
        >
            {/* Section 1 — Original Hero: Name + Role + Social Icons */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex items-center justify-center px-6"
            >
                <div className="text-center max-w-4xl">
                    <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter">
                        Hi, I'm{' '}
                        <span className="text-gradient">
                            HIMANSHU RAJ
                        </span>
                    </h1>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/40" />
                        <p className="text-base md:text-lg text-white/70 font-light tracking-wide text-glow">
                            Product Management & Applied AI Student 🚀
                        </p>
                        <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/40" />
                    </div>

                    {/* Social Icons — original links */}
                    <div className="mt-8 flex items-center justify-center gap-6 pointer-events-auto">
                        <a
                            href="https://github.com/HR-894"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-link-box github"
                            aria-label="GitHub"
                        >
                            <Github size={20} className="text-white" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/himanshu-raj-373297383/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-link-box linkedin"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} className="text-white" />
                        </a>
                        <a
                            href="mailto:contacthimanshu222@gmail.com?subject=Portfolio%20enquiry&body=Hi%20Himanshu,"
                            className="icon-link-box email"
                            aria-label="Email"
                        >
                            <Mail size={20} className="text-white" />
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Section 2 — IIT Roorkee description, left aligned */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex items-center px-8 md:px-20"
            >
                <div className="max-w-xl">
                    <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-6" />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                        Currently at{' '}
                        <span className="text-gradient">
                            IIT Roorkee (iHUB)
                        </span>
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-white/50 font-light max-w-md leading-relaxed">
                        I'm focused on building AI-first product thinking. As a CUET 2026 aspirant, I'm passionate about generative AI, prompt engineering, and product strategy.
                    </p>
                </div>
            </motion.div>

            {/* Section 3 — Right aligned */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex items-center justify-end px-8 md:px-20"
            >
                <div className="max-w-xl text-right">
                    <div className="h-1 w-16 bg-gradient-to-l from-accent to-primary rounded-full mb-6 ml-auto" />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                        Passionate about{' '}
                        <span className="text-gradient">
                            generative AI
                        </span>
                        , prompt engineering & product strategy.
                    </h2>
                </div>
            </motion.div>

            {/* Section 4 — Scroll CTA */}
            <motion.div
                style={{ opacity: opacity4, y: y4, scale: scale4 }}
                className="absolute inset-0 flex items-center justify-center px-6"
            >
                <div className="text-center">
                    <p className="text-sm uppercase tracking-[0.4em] text-white/40 mb-6 font-medium">
                        Explore
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight text-glow">
                        Scroll to discover
                        <br />
                        <span className="text-gradient">
                            my work
                        </span>
                    </h2>
                    <div className="mt-8 flex justify-center">
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                            <motion.div
                                className="w-1.5 h-1.5 bg-white/70 rounded-full"
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
