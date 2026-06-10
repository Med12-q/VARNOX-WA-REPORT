import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, UploadCloud, ShieldAlert, CheckCircle2, Shield, Mail, FileText } from "lucide-react";
import { FaGithub, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  targetNumber: z.string().min(5, { message: "Target number is required" }),
  reason: z.string().min(1, { message: "Please select a reason" }),
  details: z.string().min(10, { message: "Please provide more details (min 10 characters)" }),
});

type FormValues = z.infer<typeof formSchema>;

const REPORT_EMAILS = [
  "varnoxnovark@gmail.com",
  "smashsouare82@gmail.com",
  "techowner90@gmail.com",
  "xdbotnovark@gmail.com",
  "overn2443@gmail.com",
  "systemmed89@gmail.com",
  "catbox223@gmail.com",
  "deathvarnoxprims@gmail.com",
  "vortexiabarry@gmail.com",
  "alphonsebarry093@gmail.com",
  "sresouare@gmail.com",
  "cmmah7459@gmail.com",
  "mohamedvarnoxornovark@gmail.com",
  "mohamedsoumahv@gmail.com",
  "santanafamille50@gmail.com",
].join(",");

const SOCIAL_LINKS = [
  {
    href: "https://github.com/Med12-q/VARNOX-WA-REPORT",
    label: "GitHub",
    Icon: FaGithub,
  },
  {
    href: "https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F",
    label: "WhatsApp",
    Icon: FaWhatsapp,
  },
  {
    href: "https://t.me/varnox_official",
    label: "Telegram",
    Icon: FaTelegramPlane,
  },
  {
    href: "mailto:varnoxnovark@gmail.com",
    label: "Email",
    Icon: Mail,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetNumber: "",
      reason: "",
      details: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const reasonLabels: Record<string, string> = {
      spam: "Spam / Automated Messages",
      scam: "Scam / Fraud",
      harassment: "Harassment",
      impersonation: "Impersonation",
      inappropriate: "Inappropriate Content",
      other: "Other",
    };
    const subject = encodeURIComponent(
      `[BAN REQUEST] ${data.targetNumber}`
    );
    const body = encodeURIComponent(
`════════════════════════════════════
        SPAM BAN REQUEST
════════════════════════════════════

  PLATFORM     : WhatsApp
  TARGET NUMBER: ${data.targetNumber}
  REASON       : ${reasonLabels[data.reason] ?? data.reason}

════════════════════════════════════
              DETAILS
════════════════════════════════════

${data.details}

════════════════════════════════════
  This number has been reported for
  violating WhatsApp Terms of Service.
  Immediate action is requested.
════════════════════════════════════`
    );
    window.open(
      `mailto:${REPORT_EMAILS}?subject=${subject}&body=${body}`,
      "_blank"
    );
    setTimeout(() => setIsSubmitted(true), 400);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background relative overflow-hidden flex flex-col items-center justify-start pt-10 pb-10 px-4 sm:px-6 md:px-8 selection:bg-primary/30">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-0" />
      <div className="absolute top-[-15%] left-[-8%] w-[45%] h-[45%] bg-primary/8 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[45%] h-[45%] bg-secondary/8 blur-[140px] rounded-full pointer-events-none z-0" />

      <motion.div
        className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Header ── */}
        <motion.header variants={itemVariants} className="text-center space-y-1 pt-2">
          <div className="flex items-center justify-center gap-3 mb-1">
            <ShieldAlert className="w-7 h-7 text-primary" style={{ filter: "drop-shadow(0 0 8px hsl(280 100% 70% / 0.7))" }} />
            <h1
              className="font-display text-4xl sm:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white via-primary/80 to-primary uppercase"
              style={{ textShadow: "0 0 30px hsl(280 100% 70% / 0.35)" }}
            >
              VARNOX
            </h1>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-[0.25em] text-white/80">
            WA REPORT
          </h2>
          <p className="text-sm text-secondary/80 tracking-wide font-medium mt-1">
            Report suspicious WhatsApp activity securely
          </p>
        </motion.header>

        {/* ── Video Banner ── */}
        <motion.div variants={itemVariants} className="w-full relative group">
          <div className="absolute -inset-[2px] bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur-sm opacity-25 group-hover:opacity-45 transition-opacity duration-700" />
          <div
            className="relative rounded-xl overflow-hidden bg-black"
            style={{
              border: "1px solid hsl(280 100% 70% / 0.35)",
              boxShadow: "0 0 32px -8px hsl(280 100% 70% / 0.4)",
              aspectRatio: "21 / 8",
            }}
          >
            <video
              src="https://files.catbox.moe/7o30ye.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* ── Report Form Card ── */}
        <motion.div variants={itemVariants} className="w-full max-w-2xl">
          <Card className="glass-card border-none rounded-2xl overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-center gap-2 mb-6 border-b border-white/8 pb-4">
                      <Shield className="w-4 h-4 text-secondary opacity-80" />
                      <h3 className="font-display text-base font-semibold text-white/90 tracking-widest">
                        SUBMIT A REPORT
                      </h3>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        {/* Target Number */}
                        <FormField
                          control={form.control}
                          name="targetNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary/80 font-display tracking-widest text-[10px] uppercase font-medium">
                                Target Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+224 669 28 83 32"
                                  data-testid="input-target-number"
                                  className="glass-input h-11 text-base font-mono text-white placeholder:text-muted-foreground/40"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-destructive text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Reason */}
                        <FormField
                          control={form.control}
                          name="reason"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary/80 font-display tracking-widest text-[10px] uppercase font-medium">
                                Reason
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger
                                    data-testid="select-reason"
                                    className="glass-input h-11 text-white font-medium"
                                  >
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-card/95 backdrop-blur-xl border-primary/20 text-white">
                                  <SelectItem value="spam">Spam / Automated Messages</SelectItem>
                                  <SelectItem value="scam">Scam / Fraud</SelectItem>
                                  <SelectItem value="harassment">Harassment</SelectItem>
                                  <SelectItem value="impersonation">Impersonation</SelectItem>
                                  <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-destructive text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Evidence upload */}
                        <div className="space-y-2">
                          <label className="text-primary/80 font-display tracking-widest text-[10px] uppercase font-medium block">
                            Evidence
                          </label>
                          <button
                            type="button"
                            data-testid="button-upload-evidence"
                            onClick={() => fileRef.current?.click()}
                            className="w-full h-28 rounded-lg border border-dashed border-primary/25 bg-input/20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/8 hover:border-primary/45 transition-all duration-300 group"
                          >
                            <UploadCloud className="w-7 h-7 text-secondary/60 group-hover:text-secondary group-hover:scale-110 transition-all duration-300" />
                            <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors">
                              {fileName ? fileName : "Click to upload a screenshot"}
                            </p>
                          </button>
                          <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                          />
                        </div>

                        {/* Details */}
                        <FormField
                          control={form.control}
                          name="details"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary/80 font-display tracking-widest text-[10px] uppercase font-medium">
                                Details
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Explain what happened in detail..."
                                  data-testid="textarea-details"
                                  className="glass-input min-h-[110px] text-white resize-y placeholder:text-muted-foreground/40 text-sm leading-relaxed"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-destructive text-xs" />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          data-testid="button-send-report"
                          className="w-full h-12 bg-primary hover:bg-primary/85 text-primary-foreground font-display font-bold tracking-[0.12em] text-sm rounded-lg transition-all duration-300 relative overflow-hidden group"
                          style={{ boxShadow: "0 0 22px -6px hsl(280 100% 70% / 0.6)" }}
                        >
                          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                          <span className="relative flex items-center justify-center gap-2">
                            SEND REPORT <Send className="w-4 h-4" />
                          </span>
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 20 }}
                    >
                      <CheckCircle2
                        className="w-20 h-20 text-secondary mb-6"
                        style={{ filter: "drop-shadow(0 0 14px hsl(190 100% 60% / 0.7))" }}
                      />
                    </motion.div>
                    <h3 className="font-display text-xl font-bold text-white mb-2 tracking-wider">
                      REPORT TRANSMITTED
                    </h3>
                    <p className="text-muted-foreground text-sm mb-8 max-w-xs leading-relaxed">
                      Your report has been successfully sent to our secure servers.
                    </p>
                    <Button
                      onClick={() => { form.reset(); setIsSubmitted(false); setFileName(null); }}
                      variant="outline"
                      data-testid="button-new-report"
                      className="border-primary/30 text-primary/80 hover:bg-primary/10 hover:text-white font-display tracking-widest text-xs uppercase transition-all duration-300 h-10 px-6"
                    >
                      Submit Another Report
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Get Ban TXT ── */}
        <motion.div variants={itemVariants} className="w-full max-w-2xl">
          <Link href="/ban-texts">
            <div
              className="w-full rounded-xl p-5 flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 group"
              style={{
                background: "hsl(190 100% 60% / 0.05)",
                border: "1px solid hsl(190 100% 60% / 0.2)",
                boxShadow: "0 0 20px -8px hsl(190 100% 60% / 0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "hsl(190 100% 60% / 0.1)";
                (e.currentTarget as HTMLDivElement).style.border = "1px solid hsl(190 100% 60% / 0.4)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 28px -6px hsl(190 100% 60% / 0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "hsl(190 100% 60% / 0.05)";
                (e.currentTarget as HTMLDivElement).style.border = "1px solid hsl(190 100% 60% / 0.2)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px -8px hsl(190 100% 60% / 0.2)";
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsl(190 100% 60% / 0.1)", border: "1px solid hsl(190 100% 60% / 0.3)" }}
                >
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-white tracking-wider">
                    GET BAN TEXTS
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Download ready-to-use ban request scripts
                  </p>
                </div>
              </div>
              <span className="text-secondary/70 group-hover:text-secondary text-xs font-display tracking-widest transition-colors">
                VIEW →
              </span>
            </div>
          </Link>
        </motion.div>

        {/* ── Footer ── */}
        <motion.footer variants={itemVariants} className="w-full border-t border-white/6 pt-8 pb-2 flex flex-col items-center gap-4">
          {/* Social icons */}
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-testid={`link-${label.toLowerCase()}`}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/8 text-muted-foreground hover:text-white hover:bg-primary/15 hover:border-primary/30 transition-all duration-300"
                style={{ backdropFilter: "blur(8px)" }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-muted-foreground/50 tracking-wider text-center">
            &copy; 2025 VARNOX WA REPORT — All rights reserved.
          </p>

          {/* Developer credit */}
          <p className="text-[10px] text-muted-foreground/35 tracking-widest text-center">
            Developed by{" "}
            <span className="text-secondary/50">
              𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮 𝚸𝚪𝚰𝚳𝚵𝚵𝚵𝚵𝚵𝚵
            </span>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
