import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, MessageSquare, Check, Github, Loader2 } from "lucide-react";
import { SiInstagram, SiLeetcode } from "react-icons/si";
import { Linkedin as LinkedinIcon } from "lucide-react";
import { goExternal } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const directContacts = [
  {
    icon: Mail,
    label: "EMAIL",
    value: "ishantbhoyar59@gmail.com",
    color: "#7C5CFC",
    action: "copy",
    testId: "contact-email",
  },
  {
    icon: Phone,
    label: "PHONE",
    value: "+91 7798881236",
    color: "#a78bfa",
    action: "tel:+917798881236",
    testId: "contact-phone",
  },
  {
    icon: MapPin,
    label: "LOCATION",
    value: "Sitare University, Lucknow",
    color: "#60a5fa",
    action: null,
    testId: "contact-location",
  },
];

const socials = [
  { icon: Github,        label: "GitHub",    href: "https://github.com/ISHANT57",                        color: "#e2e8f0" },
  { icon: LinkedinIcon,  label: "LinkedIn",  href: "https://linkedin.com/in/ishant-bhoyar-555413214",    color: "#0ea5e9" },
  { icon: SiInstagram,   label: "Instagram", href: "https://instagram.com/ishant_bhoyar",                color: "#e1306c" },
  { icon: SiLeetcode,    label: "LeetCode",  href: "https://leetcode.com/u/Ishant_57/",                  color: "#f97316" },
];

export function Contact() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("ishantbhoyar59@gmail.com").then(() => {
      setCopied(true);
      toast({ title: "Email copied!", description: "ishantbhoyar59@gmail.com copied to clipboard." });
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message)
      return;

    setSending(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        toast({
          title: "Success",
          description: "Message sent successfully",
        });
      } else {
        toast({
          title: "Failed",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Server connection failed",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-violet-600/12 -bottom-24 left-1/2 -translate-x-1/2" />
      <div className="orb w-[300px] h-[300px] bg-blue-600/10 top-0 -right-16" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="section-divider mb-24" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mt-2">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="mt-4 text-sm max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            Have a project in mind or just want to say hi? I'm always open to discussing new
            opportunities and creative ideas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">

          {/* LEFT — Send a Message form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl p-8"
            style={{
              background: "rgba(12,12,22,0.85)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
            }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>Send a Message</h3>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>I'll get back to you within 24 hours.</p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)" }}>
                    <Check className="w-8 h-8" style={{ color: "#4ade80" }} />
                  </div>
                  <p className="text-lg font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>Message Sent!</p>
                  <p className="text-sm text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Thanks {form.name}! I'll be in touch soon.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                    className="mt-2 text-xs font-mono px-4 py-2 rounded-lg transition-all hover:opacity-80"
                    style={{ background: "rgba(124,92,252,0.15)", color: "#a78bfa", border: "1px solid rgba(124,92,252,0.25)" }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-mono font-semibold mb-2 tracking-widest"
                      style={{ color: "#7C5CFC" }}>
                      <User className="w-3 h-3" /> YOUR NAME
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.85)",
                        borderLeft: "2px solid #7C5CFC",
                      }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "#7C5CFC60"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(124,92,252,0.12)"; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.target as HTMLInputElement).style.borderLeft = "2px solid #7C5CFC"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-mono font-semibold mb-2 tracking-widest"
                      style={{ color: "rgba(255,255,255,0.4)" }}>
                      <Mail className="w-3 h-3" /> YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.85)",
                      }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "#7C5CFC60"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(124,92,252,0.12)"; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 text-[11px] font-mono font-semibold mb-2 tracking-widest"
                      style={{ color: "rgba(255,255,255,0.4)" }}>
                      <MessageSquare className="w-3 h-3" /> YOUR MESSAGE
                    </label>
                    <textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.85)",
                      }}
                      onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = "#7C5CFC60"; (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 2px rgba(124,92,252,0.12)"; }}
                      onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.target as HTMLTextAreaElement).style.boxShadow = "none"; }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.9)",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(124,92,252,0.15)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(124,92,252,0.4)"; (e.currentTarget as HTMLButtonElement).style.color = "#c4b5fd"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)"; }}
                    data-testid="contact-send"
                  >
                    {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> SENDING…</> : <>SEND MESSAGE <Send className="w-4 h-4" /></>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT — Direct contact + socials */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Send className="w-4 h-4" style={{ color: "#7C5CFC" }} />
                <h3 className="text-base font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>Direct Contact</h3>
              </div>
              <div className="space-y-3">
                {directContacts.map((item, i) => {
                  const Icon = item.icon;
                  const isEmail = item.action === "copy";

                  return (
                    <motion.div
                      key={item.testId}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-all duration-200 group"
                      style={{
                        background: "rgba(12,12,22,0.85)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      onClick={() => {
                        if (isEmail) handleEmailCopy();
                        else if (item.action && item.action.startsWith("tel:")) goExternal(item.action);
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}40`;
                        (e.currentTarget as HTMLDivElement).style.background = `${item.color}08`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                        (e.currentTarget as HTMLDivElement).style.background = "rgba(12,12,22,0.85)";
                      }}
                      data-testid={item.testId}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                        style={{ background: `${item.color}14`, border: `1px solid ${item.color}28`, color: item.color }}>
                        <AnimatePresence mode="wait" initial={false}>
                          {isEmail && copied ? (
                            <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                              <Check className="w-4 h-4" style={{ color: "#4ade80" }} />
                            </motion.span>
                          ) : (
                            <motion.span key="icon" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                              <Icon className="w-4 h-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-mono tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{item.label}</p>
                        <p className="text-sm font-semibold truncate transition-colors duration-200 group-hover:text-white"
                          style={{ color: isEmail && copied ? "#4ade80" : "rgba(255,255,255,0.8)" }}>
                          {isEmail && copied ? "Copied!" : item.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Social Presence */}
            <div>
              <h3 className="text-base font-bold mb-5" style={{ color: "rgba(255,255,255,0.9)" }}>Social Presence</h3>
              <div className="flex items-center gap-3">
                {socials.map(social => {
                  const Icon = social.icon;
                  return (
                    <motion.button
                      key={social.label}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      onClick={() => goExternal(social.href)}
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = `${social.color}15`;
                        (e.currentTarget as HTMLButtonElement).style.borderColor = `${social.color}40`;
                        (e.currentTarget as HTMLButtonElement).style.color = social.color;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)";
                      }}
                      title={social.label}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
