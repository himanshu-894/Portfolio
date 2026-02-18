import { motion } from 'framer-motion';
import { Card } from './ui/card';

const skills = [
  { label: 'Generative AI & LLMs' },
  { label: 'Prompt Engineering & AI Optimization' },
  { label: 'Product Management & Strategy' },
  { label: 'Full-Stack Development (React, Node.js)' },
  { label: 'Data Analysis & Visualization' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'backOut' },
  },
};

export const About = () => {
  return (
    <section id="about" className="container mx-auto px-6 py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="section-heading-glass text-glow animate-glow inline-block">
            About <span className="text-gradient">Me</span>
          </span>
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-foreground/90">
          Passionate about leveraging AI to solve real-world problems
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        viewport={{ once: true }}
      >
        <Card className="glass-effect p-8 max-w-4xl mx-auto hover:shadow-[0_0_40px_rgba(160,80,240,0.3)] transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/30" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/30" />

          <div className="space-y-4 text-lg relative">
            <p className="text-foreground/90 leading-relaxed">
              I'm currently pursuing Product Management & Applied AI at{' '}
              <span className="text-gradient font-semibold">IIT Roorkee (iHUB)</span>, where I'm
              learning to bridge the gap between cutting-edge technology and user-centric product development.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              My journey in tech began with a fascination for artificial intelligence and its potential to transform
              industries. Today, I specialize in <strong>generative AI</strong>,{' '}
              <strong>prompt engineering</strong>, and <strong>AI-first product strategy</strong>.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              As a <span className="text-gradient font-semibold">CUET 2026 aspirant</span>, I'm constantly expanding my
              knowledge and building projects that showcase the intersection of AI innovation and practical product
              thinking.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-xl font-bold mb-6">
              <span className="text-gradient">Core Competencies</span>
            </h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill.label}
                  variants={itemVariants}
                  className="glass-effect px-4 py-2 rounded-full text-sm font-medium text-foreground/90
                    hover:shadow-[0_0_20px_rgba(160,80,240,0.4)] hover:scale-105 transition-all duration-300 cursor-default"
                >
                  {skill.label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};