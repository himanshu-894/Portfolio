import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Github, ExternalLink, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  desc: string;
  img: string;
  githubUrl?: string;
  liveUrl?: string;
  linkedinLink?: string;
}

const projects: Project[] = [
  {
    title: 'AI Chat Application',
    desc: 'This is my personal AI that can run offline and this is based on Llama3 and Phi models.',
    img: '/project1.png',
    githubUrl: 'https://github.com/HR-894/HR-AI-MIND',
    liveUrl: 'https://ai.hraimind.in',
  },
  {
    title: 'Product Analytics Dashboard',
    desc: 'Created a comprehensive analytics platform for tracking user metrics and KPIs.',
    img: '/project2.png',
    githubUrl: 'https://github.com/HR-894/HR-894',
  },
  {
    title: 'Prompt Engineering Tool',
    desc: 'Developed a prompt optimization tool for improving AI model outputs.Check it out on my LinkedIn Profile Projects section.',
    img: '/project3.jpg',
    liveUrl: 'https://gemini.google.com/gem/9e757c528d1e',
    linkedinLink: 'https://www.linkedin.com/in/himanshu-raj-373297383',
  },
  {
    title: 'AI Content Generator',
    desc: 'Built an AI-powered content generation platform with customizable templates.Check it out on my LinkedIn Profile Projects section.',
    img: '/project4.jpg',
    liveUrl: 'https://chatgpt.com/g/g-68f1256276d48191a789a0b4ea855347-ai-reels-trend-master',
    linkedinLink: 'https://www.linkedin.com/in/himanshu-raj-373297383',
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="portfolio" className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="section-heading-glass text-glow animate-glow inline-block">
              Featured <span className="text-gradient">Projects</span>
            </span>
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto text-foreground/90">
            A selection of my recent work in AI, product management, and software development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card
                onClick={() => setSelectedProject(project)}
                className="glass-effect cursor-pointer overflow-hidden
                  hover:shadow-[0_0_40px_rgba(160,80,240,0.4)] transition-all duration-500
                  relative group"
              >
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(160,80,240,0.8)]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    <span className="text-gradient">{project.title}</span>
                  </h3>
                  <p className="text-sm text-foreground/90 line-clamp-2">{project.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass-effect border-primary/20 max-w-3xl text-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              <span className="text-gradient">{selectedProject?.title}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <img
                src={selectedProject.img}
                alt={selectedProject.title}
                className="w-full rounded-xl"
              />
              <p className="text-foreground/90 leading-relaxed">{selectedProject.desc}</p>
              <div className="flex gap-3">
                {selectedProject.githubUrl && (
                  <Button asChild variant="outline" className="border-primary/30 hover:shadow-[0_0_20px_rgba(160,80,240,0.4)] transition-all">
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2" size={16} />
                      GitHub
                    </a>
                  </Button>
                )}
                {selectedProject.linkedinLink && (
                  <Button asChild variant="outline" className="border-primary/30 hover:shadow-[0_0_20px_rgba(160,80,240,0.4)] transition-all">
                    <a href={selectedProject.linkedinLink} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2" size={16} />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {selectedProject.liveUrl && (
                  <Button asChild className="hover:shadow-[0_0_30px_rgba(160,80,240,0.5)] transition-all duration-300">
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2" size={16} />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};