import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

// ── Email validation (RFC 5322–ish) ──
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
  'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
  'discard.email', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com',
  'maildrop.cc', 'harakirimail.com', '10minutemail.com', 'mohmal.com',
  'burnermail.io', 'inboxbear.com', 'mailnesia.com', 'getnada.com',
]);

function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email.trim()) return { valid: false, error: 'Email is required.' };
  if (!EMAIL_REGEX.test(email)) return { valid: false, error: 'Please enter a valid email address.' };
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return { valid: false, error: 'Invalid email domain.' };
  if (DISPOSABLE_DOMAINS.has(domain)) return { valid: false, error: 'Disposable email addresses are not allowed.' };
  return { valid: true };
}

function validateName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, error: 'Name is required.' };
  if (trimmed.length < 2) return { valid: false, error: 'Name must be at least 2 characters.' };
  if (/[<>{}()\[\]]/.test(trimmed)) return { valid: false, error: 'Name contains invalid characters.' };
  return { valid: true };
}

function validateMessage(msg: string): { valid: boolean; error?: string } {
  const trimmed = msg.trim();
  if (!trimmed) return { valid: false, error: 'Message is required.' };
  if (trimmed.length < 10) return { valid: false, error: 'Message must be at least 10 characters.' };
  const urlCount = (trimmed.match(/https?:\/\//gi) || []).length;
  if (urlCount > 3) return { valid: false, error: 'Too many links — please reduce to avoid spam filters.' };
  return { valid: true };
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
interface FieldErrors { name?: string; email?: string; message?: string; }

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const mountTimeRef = useRef(Date.now());

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || status === 'sending') return;

    if (honeypot) { setStatus('success'); return; }
    if (Date.now() - mountTimeRef.current < 3000) { setStatus('success'); return; }

    const formData = new FormData(formRef.current);
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('_replyto') as string) || '';
    const message = (formData.get('message') as string) || '';

    const nameCheck = validateName(name);
    const emailCheck = validateEmail(email);
    const msgCheck = validateMessage(message);
    const newErrors: FieldErrors = {};
    if (!nameCheck.valid) newErrors.name = nameCheck.error;
    if (!emailCheck.valid) newErrors.email = emailCheck.error;
    if (!msgCheck.valid) newErrors.message = msgCheck.error;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setErrors({});
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xldarrpa', {
        method: 'POST', body: formData, headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }, [honeypot, status]);

  const clearFieldError = (field: keyof FieldErrors) => {
    setErrors((prev) => { const copy = { ...prev }; delete copy[field]; return copy; });
  };

  return (
    <section id="contact" className="container mx-auto px-6 py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="section-heading-glass text-glow animate-glow inline-block">
            Get In <span className="text-gradient">Touch</span>
          </span>
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-foreground/90">
          Have a project in mind or want to collaborate? Let's connect!
        </p>
      </motion.div>

      <div className="contact-content max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* ── Form Card ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="glass-effect p-8 relative overflow-hidden hover:shadow-[0_0_40px_rgba(160,80,240,0.3)] transition-all duration-500">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/30" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/30" />

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative" noValidate>
              {/* Honeypot */}
              <input type="text" name="_gotcha" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div>
                <Input type="text" name="name" placeholder="Your Name" required
                  onChange={() => clearFieldError('name')}
                  className="bg-card border-muted hover:border-primary/50 focus:border-primary transition-all" />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Input type="email" name="_replyto" placeholder="Your Email" required
                  onChange={() => clearFieldError('email')}
                  className="bg-card border-muted hover:border-primary/50 focus:border-primary transition-all" />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <Textarea name="message" placeholder="Your Message (min 10 characters)" required rows={6}
                  onChange={() => clearFieldError('message')}
                  className="bg-card border-muted resize-none hover:border-primary/50 focus:border-primary transition-all" />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <Button type="submit" size="lg" disabled={status === 'sending' || status === 'success'}
                className={`w-full transition-all duration-300
                  ${status === 'success'
                    ? 'bg-emerald-600 hover:bg-emerald-600'
                    : status === 'error'
                      ? 'bg-red-600 hover:bg-red-500'
                      : 'hover:shadow-[0_0_30px_rgba(160,80,240,0.5)]'
                  }`}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Send className="w-4 h-4" /> <span className="text-glow">Send Message</span></motion.span>}
                  {status === 'sending' && <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Sending...</motion.span>}
                  {status === 'success' && <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Message Sent!</motion.span>}
                  {status === 'error' && <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Failed — Try Again</motion.span>}
                </AnimatePresence>
              </Button>

              <p className="text-xs text-foreground/40 text-center flex items-center justify-center gap-1.5 pt-1">
                <Shield className="w-3 h-3" /> Your information is never shared or sold.
              </p>
            </form>
          </Card>
        </motion.div>

        {/* ── Contact Info Cards ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <Card className="glass-effect p-6 flex items-start gap-4 hover:scale-105 hover:shadow-[0_0_30px_rgba(160,80,240,0.3)] transition-all duration-300 relative group">
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(160,80,240,0.6)] transition-all duration-300">
              <Mail className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(160,80,240,0.8)]" size={20} />
            </div>
            <div>
              <h3 className="font-bold mb-1">
                <span className="text-gradient">Email</span>
              </h3>
              <a href="mailto:contacthimanshu222@gmail.com" className="text-foreground/90 text-sm hover:text-primary transition-colors">
                contacthimanshu222@gmail.com
              </a>
            </div>
          </Card>

          <Card className="glass-effect p-6 flex items-start gap-4 hover:scale-105 hover:shadow-[0_0_30px_rgba(160,80,240,0.3)] transition-all duration-300 relative group">
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(160,80,240,0.6)] transition-all duration-300">
              <Phone className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(160,80,240,0.8)]" size={20} />
            </div>
            <div>
              <h3 className="font-bold mb-1">
                <span className="text-gradient">Phone</span>
              </h3>
              <p className="text-foreground/90 text-sm">Available on request</p>
            </div>
          </Card>

          <Card className="glass-effect p-6 flex items-start gap-4 hover:scale-105 hover:shadow-[0_0_30px_rgba(160,80,240,0.3)] transition-all duration-300 relative group">
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(160,80,240,0.6)] transition-all duration-300">
              <MapPin className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(160,80,240,0.8)]" size={20} />
            </div>
            <div>
              <h3 className="font-bold mb-1">
                <span className="text-gradient">Location</span>
              </h3>
              <p className="text-foreground/90 text-sm">Bihar, India</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};