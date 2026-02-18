import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#types', label: 'Types' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-effect shadow-[0_0_30px_rgba(160,80,240,0.3)]' : ''
          }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-gradient">
                Himanshu Raj
              </span>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:drop-shadow-[0_0_8px_rgba(160,80,240,0.6)]"
                  >
                    <span className="text-sm font-medium">{link.label}</span>
                  </a>
                </li>
              ))}

              {/* Social Icons in nav */}
              <li className="flex items-center gap-3 ml-2 border-l border-foreground/10 pl-6">
                <a href="https://github.com/HR-894" target="_blank" rel="noopener noreferrer"
                  className="icon-link-box github" aria-label="GitHub">
                  <Github size={16} className="text-white" />
                </a>
                <a href="https://www.linkedin.com/in/himanshu-raj-373297383/" target="_blank" rel="noopener noreferrer"
                  className="icon-link-box linkedin" aria-label="LinkedIn">
                  <Linkedin size={16} className="text-white" />
                </a>
                <a href="mailto:contacthimanshu222@gmail.com?subject=Portfolio%20enquiry&body=Hi%20Himanshu,"
                  className="icon-link-box email" aria-label="Email">
                  <Mail size={16} className="text-white" />
                </a>
              </li>

              {/* Theme Toggle */}
              <li>
                <ThemeToggle />
              </li>
            </ul>

            {/* Mobile: Theme toggle + Menu button */}
            <div className="flex items-center gap-3 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        style={{ top: '72px' }}
      >
        <div
          className="absolute inset-0 glass-effect"
          onClick={() => setIsMenuOpen(false)}
        />
        <ul className="relative flex flex-col items-center gap-6 pt-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-2xl text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-4 mt-4 pt-4 border-t border-foreground/10">
            <a href="https://github.com/HR-894" target="_blank" rel="noopener noreferrer"
              className="icon-link-box github" aria-label="GitHub">
              <Github size={20} className="text-white" />
            </a>
            <a href="https://www.linkedin.com/in/himanshu-raj-373297383/" target="_blank" rel="noopener noreferrer"
              className="icon-link-box linkedin" aria-label="LinkedIn">
              <Linkedin size={20} className="text-white" />
            </a>
            <a href="mailto:contacthimanshu222@gmail.com?subject=Portfolio%20enquiry&body=Hi%20Himanshu,"
              className="icon-link-box email" aria-label="Email">
              <Mail size={20} className="text-white" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};