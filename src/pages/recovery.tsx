import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowLeft, Send, UploadCloud, CheckCircle2, ShieldCheck,
  Download, FileText, Mail,
} from "lucide-react";
import { FaGithub, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

/* ─── Green palette ─────────────────────────────────────── */
const G = {
  primary:    "hsl(142 72% 45%)",
  bright:     "hsl(142 90% 55%)",
  dim:        "hsl(142 60% 35%)",
  glow10:     "hsl(142 72% 45% / 0.10)",
  glow18:     "hsl(142 72% 45% / 0.18)",
  glow25:     "hsl(142 72% 45% / 0.25)",
  glow35:     "hsl(142 72% 45% / 0.35)",
  glow50:     "hsl(142 72% 45% / 0.50)",
  glowShadow: "0 0 20px -6px hsl(142 72% 45% / 0.5)",
};

/* ─── Email targets (same channels, recovery subject) ────── */
const TO_EMAILS = [
  "android@support.whatsapp.com","iphone@support.whatsapp.com",
  "webclient@support.whatsapp.com","business@support.whatsapp.com",
  "business@whatsapp.com","enterprise@whatsapp.com",
  "abuse@fb.com","phish@fb.com","security@facebookmail.com",
  "integrity@fb.com","safety@fb.com","appeals@fb.com",
  "platformcs@support.facebook.com","datarequests@support.facebook.com",
  "legal@fb.com","lawenforcement@fb.com","records@fb.com",
  "press@fb.com","emergency@fb.com","europe@support.whatsapp.com",
  "uk@support.whatsapp.com","germany@support.whatsapp.com",
  "france@support.whatsapp.com","spain@support.whatsapp.com",
].join(",");

const CC_EMAILS = [
  "italy@support.whatsapp.com","netherlands@support.whatsapp.com",
  "belgium@support.whatsapp.com","switzerland@support.whatsapp.com",
  "canada@support.whatsapp.com","australia@support.whatsapp.com",
  "privacy@whatsapp.com","legal@whatsapp.com",
  "dmca@whatsapp.com","trustandsafety@whatsapp.com",
].join(",");

const BCC_EMAILS = [
  "report@whatsapp.com","terrorism@whatsapp.com",
  "childsafety@whatsapp.com","tonymontana200500@gmail.com",
  "toureibhahim712@gmail.com",
].join(",");

/* ─── 25 recovery scripts ───────────────────────────────── */
const SCRIPTS = [
  { id:1,  lang:"🇬🇧 EN", name:"Standard Appeal",           file:"recovery-en-standard.txt",     desc:"English — classic reinstatement request" },
  { id:2,  lang:"🇫🇷 FR", name:"Appel Standard",            file:"recovery-fr-standard.txt",     desc:"Français — demande de réactivation standard" },
  { id:3,  lang:"🇸🇦 AR", name:"نموذج استرداد",              file:"recovery-ar-standard.txt",     desc:"عربي — طلب استعادة الحساب" },
  { id:4,  lang:"🇪🇸 ES", name:"Apelación Estándar",        file:"recovery-es-standard.txt",     desc:"Español — solicitud de restablecimiento" },
  { id:5,  lang:"🇧🇷 PT", name:"Apelo Padrão",              file:"recovery-pt-standard.txt",     desc:"Português — pedido de recuperação" },
  { id:6,  lang:"🇩🇪 DE", name:"Standard-Einspruch",        file:"recovery-de-standard.txt",     desc:"Deutsch — Antrag auf Kontowiederherstellung" },
  { id:7,  lang:"🇮🇹 IT", name:"Appello Standard",          file:"recovery-it-standard.txt",     desc:"Italiano — richiesta di ripristino" },
  { id:8,  lang:"🇷🇺 RU", name:"Стандартная Апелляция",     file:"recovery-ru-standard.txt",     desc:"Русский — запрос на восстановление" },
  { id:9,  lang:"🇹🇷 TR", name:"Standart İtiraz",           file:"recovery-tr-standard.txt",     desc:"Türkçe — hesap kurtarma talebi" },
  { id:10, lang:"🇬🇧 EN", name:"URGENT Appeal",             file:"recovery-en-urgent.txt",       desc:"English — high-priority reinstatement" },
  { id:11, lang:"🇫🇷 FR", name:"Appel URGENT",              file:"recovery-fr-urgent.txt",       desc:"Français — récupération urgente" },
  { id:12, lang:"🇪🇸 ES", name:"Apelación URGENTE",         file:"recovery-es-urgent.txt",       desc:"Español — restablecimiento urgente" },
  { id:13, lang:"🇧🇷 PT", name:"Apelo URGENTE",             file:"recovery-pt-urgent.txt",       desc:"Português — recuperação urgente" },
  { id:14, lang:"🇸🇦 AR", name:"طلب عاجل",                  file:"recovery-ar-urgent.txt",       desc:"عربي — استرداد عاجل" },
  { id:15, lang:"🇬🇧 EN", name:"Business Account",          file:"recovery-en-business.txt",     desc:"English — WhatsApp Business recovery" },
  { id:16, lang:"🇫🇷 FR", name:"Compte Business",           file:"recovery-fr-business.txt",     desc:"Français — récupération compte Business" },
  { id:17, lang:"🇬🇧 EN", name:"Wrongful Ban Appeal",       file:"recovery-en-wrongful.txt",     desc:"English — unjust ban dispute" },
  { id:18, lang:"🇬🇧 EN", name:"Spam Ban Appeal",           file:"recovery-en-spam-appeal.txt",  desc:"English — spam detection appeal" },
  { id:19, lang:"🇬🇧 EN", name:"Formal Legal Appeal",       file:"recovery-en-formal.txt",       desc:"English — official legal-style letter" },
  { id:20, lang:"🇬🇧 EN", name:"Technical Issue Appeal",    file:"recovery-en-technical.txt",    desc:"English — system/device error appeal" },
  { id:21, lang:"🇬🇧 EN", name:"FINAL Appeal",              file:"recovery-en-final.txt",        desc:"English — last-resort escalation" },
  { id:22, lang:"🇬🇧 EN", name:"Detailed Comprehensive",    file:"recovery-en-detailed.txt",     desc:"English — full structured appeal" },
  { id:23, lang:"🇬🇧 EN", name:"Quick Short Appeal",        file:"recovery-en-short.txt",        desc:"English — brief & direct request" },
  { id:24, lang:"🇬🇧 EN", name:"Mod App Disclosure",        file:"recovery-en-mod-appeal.txt",   desc:"English — modded app confession & appeal" },
  { id:25, lang:"🇬🇧 EN", name:"Number Change Recovery",    file:"recovery-en-number-change.txt",desc:"English — number transfer issue" },
];

const SOCIAL_LINKS = [
  { href:"https://github.com/Med12-q/VARNOX-WA-REPORT", label:"GitHub",   Icon: FaGithub },
  { href:"https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F", label:"WhatsApp", Icon: FaWhatsapp },
  { href:"https://t.me/varnox_official", label:"Telegram", Icon: FaTelegramPlane },
  { href:"mailto:varnoxnovark@gmail.com", label:"Email", Icon: Mail },
];

const formSchema = z.object({
  bannedNumber: z.string().min(5, { message: "Phone number is required" }),
  accountType:  z.string().min(1, { message: "Select account type" }),
  banReason:    z.string().min(1, { message: "Select a reason" }),
  email:        z.string().email({ message: "Valid email required" }),
  details:      z.string().min(10, { message: "Describe your situation (min 10 chars)" }),
});

type FormValues = z.infer<typeof formSchema>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── WhatsApp SVG watermark ─────────────────────────────── */
function WaWatermark() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-56 h-56 sm:w-72 sm:h-72 opacity-[0.06] select-none pointer-events-none"
      style={{ filter: `drop-shadow(0 0 40px ${G.bright})` }}
    >
      <circle cx="50" cy="50" r="50" fill="#25D366" />
      <path
        d="M50 15C30.7 15 15 30.7 15 50c0 6.2 1.7 12 4.6 17L15 85l18.4-4.8C38.2 82.9 44 84.5 50 84.5 69.3 84.5 85 68.8 85 49.5S69.3 15 50 15zm0 63.7c-5.5 0-10.7-1.5-15.2-4.1l-1.1-.6-11 2.9 2.9-10.7-.7-1.1C22.3 60.5 21 55.4 21 50c0-15.9 13.1-29 29-29s29 13.1 29 29-13.1 29-29 29z"
        fill="white"
      />
      <path
        d="M65.4 57.6c-.9-.4-5.2-2.5-6-2.8-.8-.3-1.4-.4-2 .4-.6.8-2.3 2.8-2.8 3.4-.5.6-1 .7-1.9.2-.9-.4-3.8-1.4-7.2-4.4-2.7-2.4-4.5-5.3-5-6.2-.5-.9-.1-1.4.4-1.8.4-.4.9-1 1.3-1.5.4-.5.6-.9.9-1.5.3-.6.1-1.1-.1-1.5-.2-.4-2-4.8-2.7-6.6-.7-1.7-1.5-1.5-2-.1-.5 1.3-.5 2.6-.5 3.9 0 1.2.4 2.5 1.2 3.5.8 1 4.4 7 10.6 9.8 6.3 2.8 6.3 1.9 7.4 1.8 1.1-.1 3.6-1.5 4.1-2.9.5-1.4.5-2.6.4-2.8-.2-.2-.8-.4-1.1-.6z"
        fill="white"
      />
    </svg>
  );
}

export default function Recovery() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { bannedNumber:"", accountType:"", banReason:"", email:"", details:"" },
  });

  const onSubmit = (data: FormValues) => {
    const reasonLabels: Record<string, string> = {
      wrongful:   "Wrongfully Banned",
      spam:       "Spam Detection Error",
      mod:        "Modified App Usage",
      mass:       "Mass Messaging",
      unknown:    "Unknown Reason",
      technical:  "Technical Issue",
    };
    const subject = encodeURIComponent(`[RECOVERY REQUEST] ${data.bannedNumber}`);
    const body = encodeURIComponent(
`════════════════════════════════════════
     WHATSAPP ACCOUNT RECOVERY REQUEST
════════════════════════════════════════

  PLATFORM       : WhatsApp
  BANNED NUMBER  : ${data.bannedNumber}
  ACCOUNT TYPE   : ${data.accountType === "business" ? "Business" : "Personal"}
  BAN REASON     : ${reasonLabels[data.banReason] ?? data.banReason}
  REPLY EMAIL    : ${data.email}

════════════════════════════════════════
                DETAILS
════════════════════════════════════════

${data.details}

════════════════════════════════════════
  This is a formal recovery request.
  The account holder asserts they have
  not violated WhatsApp Terms of Service.
  Immediate review is requested.
════════════════════════════════════════`
    );
    window.open(
      `mailto:${TO_EMAILS}?cc=${CC_EMAILS}&bcc=${BCC_EMAILS}&subject=${subject}&body=${body}`,
      "_blank"
    );
    setTimeout(() => setIsSubmitted(true), 400);
  };

  return (
    <div
      className="min-h-[100dvh] w-full relative overflow-hidden flex flex-col items-center justify-start pt-10 pb-10 px-4 sm:px-6 md:px-8 selection:bg-green-500/20"
      style={{ background: "hsl(145 30% 4%)" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(${G.glow10} 1px, transparent 1px), linear-gradient(90deg, ${G.glow10} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ambient glow blobs */}
      <div className="absolute top-[-15%] left-[-8%] w-[45%] h-[45%] rounded-full pointer-events-none z-0"
        style={{ background: G.glow10, filter: "blur(140px)" }} />
      <div className="absolute bottom-[-15%] right-[-8%] w-[45%] h-[45%] rounded-full pointer-events-none z-0"
        style={{ background: "hsl(160 80% 40% / 0.07)", filter: "blur(140px)" }} />

      <motion.div
        className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8"
        variants={containerVariants} initial="hidden" animate="visible"
      >
        {/* ── Back button ── */}
        <motion.div variants={itemVariants} className="w-full">
          <Link href="/">
            <button className="flex items-center gap-2 text-green-400/50 hover:text-green-300 transition-colors duration-200 group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Report
            </button>
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <motion.header variants={itemVariants} className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-1">
            <ShieldCheck className="w-7 h-7" style={{ color: G.primary, filter: `drop-shadow(0 0 8px ${G.glow50})` }} />
            <h1
              className="font-display text-3xl sm:text-4xl font-black tracking-widest uppercase"
              style={{
                background: `linear-gradient(135deg, white 0%, ${G.primary} 60%, ${G.dim} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
                filter: `drop-shadow(0 0 24px ${G.glow35})`,
              }}
            >
              𝗩𝗔𝗥𝗡𝗢𝗫.𝗪𝗔 𝗥𝗘𝗖𝗢𝗩𝗘𝗥𝗬
            </h1>
          </div>
          <p className="text-sm tracking-wide font-medium" style={{ color: G.dim }}>
            Recover your banned or restricted WhatsApp account
          </p>
        </motion.header>

        {/* ── Video banner ── */}
        <motion.div variants={itemVariants} className="w-full">
          <div
            className="w-full rounded-2xl overflow-hidden relative"
            style={{
              border: `1px solid ${G.glow25}`,
              boxShadow: `0 0 40px -10px ${G.glow50}, inset 0 0 20px -10px ${G.glow18}`,
            }}
          >
            <video
              src="https://files.catbox.moe/7aujtb.mp4"
              autoPlay muted loop playsInline
              className="w-full aspect-video object-cover"
              style={{ display: "block" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, transparent 60%, hsl(145 30% 4% / 0.7) 100%)`,
              }}
            />
          </div>
        </motion.div>

        {/* ── Recovery Form ── */}
        <motion.div variants={itemVariants} className="w-full">
          <Card
            className="w-full border-0 overflow-hidden"
            style={{
              background: "hsl(145 20% 7% / 0.65)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${G.glow18}`,
              boxShadow: `0 0 40px -12px ${G.glow35}`,
            }}
          >
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-4 h-4" style={{ color: G.primary }} />
                <h2
                  className="font-display text-xs tracking-[0.25em] uppercase font-semibold"
                  style={{ color: G.primary }}
                >
                  Submit Recovery Request
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div key="form" initial={{ opacity:1 }} exit={{ opacity:0 }}>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                        {/* Banned number */}
                        <FormField control={form.control} name="bannedNumber" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-display tracking-widest text-[10px] uppercase font-medium" style={{ color: `${G.primary}CC` }}>
                              Banned Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+224 XXX XXX XXX"
                                {...field}
                                className="border-0 h-11 text-white placeholder:text-white/20 font-mono text-sm focus-visible:ring-1"
                                style={{
                                  background: `hsl(145 20% 10% / 0.6)`,
                                  outline: "none",
                                  boxShadow: `inset 0 0 0 1px ${G.glow25}`,
                                }}
                                onFocus={e => (e.currentTarget.style.boxShadow = `inset 0 0 0 1.5px ${G.glow50}, 0 0 12px -4px ${G.glow35}`)}
                                onBlur={e  => (e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${G.glow25}`)}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Account type */}
                          <FormField control={form.control} name="accountType" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-display tracking-widest text-[10px] uppercase font-medium" style={{ color: `${G.primary}CC` }}>
                                Account Type
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11 border-0 text-white font-mono text-sm" style={{ background: `hsl(145 20% 10% / 0.6)`, boxShadow: `inset 0 0 0 1px ${G.glow25}` }}>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-card/95 backdrop-blur-xl border-green-500/20 text-white">
                                  <SelectItem value="personal">Personal</SelectItem>
                                  <SelectItem value="business">Business</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )} />

                          {/* Ban reason */}
                          <FormField control={form.control} name="banReason" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-display tracking-widest text-[10px] uppercase font-medium" style={{ color: `${G.primary}CC` }}>
                                Reason for Ban
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11 border-0 text-white font-mono text-sm" style={{ background: `hsl(145 20% 10% / 0.6)`, boxShadow: `inset 0 0 0 1px ${G.glow25}` }}>
                                    <SelectValue placeholder="Select reason" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-card/95 backdrop-blur-xl border-green-500/20 text-white">
                                  <SelectItem value="wrongful">Wrongfully Banned</SelectItem>
                                  <SelectItem value="spam">Spam Detection Error</SelectItem>
                                  <SelectItem value="mod">Modified App Usage</SelectItem>
                                  <SelectItem value="mass">Mass Messaging</SelectItem>
                                  <SelectItem value="technical">Technical Issue</SelectItem>
                                  <SelectItem value="unknown">Unknown Reason</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )} />
                        </div>

                        {/* Reply email */}
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-display tracking-widest text-[10px] uppercase font-medium" style={{ color: `${G.primary}CC` }}>
                              Your Email (for WhatsApp response)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                                className="border-0 h-11 text-white placeholder:text-white/20 font-mono text-sm"
                                style={{ background: `hsl(145 20% 10% / 0.6)`, boxShadow: `inset 0 0 0 1px ${G.glow25}` }}
                                onFocus={e => (e.currentTarget.style.boxShadow = `inset 0 0 0 1.5px ${G.glow50}, 0 0 12px -4px ${G.glow35}`)}
                                onBlur={e  => (e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${G.glow25}`)}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )} />

                        {/* Evidence */}
                        <div className="space-y-2">
                          <label className="font-display tracking-widest text-[10px] uppercase font-medium block" style={{ color: `${G.primary}CC` }}>
                            Evidence / Screenshot
                          </label>
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="w-full h-24 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 group"
                            style={{ border: `1px dashed ${G.glow35}`, background: `${G.glow10}` }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = G.glow18; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = G.glow10; }}
                          >
                            <UploadCloud className="w-6 h-6 transition-all duration-300 group-hover:scale-110" style={{ color: G.dim }} />
                            <p className="text-sm text-white/30 group-hover:text-white/50 transition-colors">
                              {fileName ? fileName : "Click to upload screenshot"}
                            </p>
                          </button>
                          <input ref={fileRef} type="file" accept="image/*" className="hidden"
                            onChange={e => setFileName(e.target.files?.[0]?.name ?? null)} />
                        </div>

                        {/* Details */}
                        <FormField control={form.control} name="details" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-display tracking-widest text-[10px] uppercase font-medium" style={{ color: `${G.primary}CC` }}>
                              Describe Your Situation
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Explain what happened, when you were banned, and why you believe it's an error..."
                                {...field}
                                rows={4}
                                className="resize-none border-0 text-white placeholder:text-white/20 text-sm font-mono leading-relaxed"
                                style={{ background: `hsl(145 20% 10% / 0.6)`, boxShadow: `inset 0 0 0 1px ${G.glow25}` }}
                                onFocus={e => (e.currentTarget.style.boxShadow = `inset 0 0 0 1.5px ${G.glow50}`)}
                                onBlur={e  => (e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${G.glow25}`)}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )} />

                        <Button
                          type="submit"
                          className="w-full h-12 font-display tracking-[0.2em] text-xs uppercase font-bold text-black transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${G.primary}, ${G.bright})`,
                            boxShadow: G.glowShadow,
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 28px -4px ${G.glow50}`; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = G.glowShadow; }}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Recovery Request
                        </Button>

                        <p className="text-[10px] text-center" style={{ color: `${G.dim}80` }}>
                          Sends to 39 official WhatsApp &amp; Meta channels — TO · CC · BCC
                        </p>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity:0, scale:.95 }}
                    animate={{ opacity:1, scale:1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle2 className="w-14 h-14 mb-4" style={{ color: G.primary, filter: `drop-shadow(0 0 12px ${G.glow50})` }} />
                    <h3 className="font-display text-xl font-bold tracking-widest uppercase mb-2" style={{ color: G.primary }}>
                      REQUEST SENT
                    </h3>
                    <p className="text-muted-foreground text-sm mb-8 max-w-xs leading-relaxed">
                      Your recovery request has been dispatched to all official WhatsApp &amp; Meta channels.
                    </p>
                    <Button
                      onClick={() => { form.reset(); setIsSubmitted(false); setFileName(null); }}
                      variant="outline"
                      className="font-display tracking-widest text-xs uppercase transition-all duration-300 h-10 px-6"
                      style={{ borderColor: G.glow35, color: G.primary }}
                    >
                      New Request
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── 25 Recovery Scripts ── */}
        <motion.div variants={itemVariants} className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4" style={{ color: G.primary }} />
            <h2 className="font-display text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: G.primary }}>
              Recovery Scripts — {SCRIPTS.length} templates
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SCRIPTS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity:0, y:16 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay: 0.05 * i, duration: 0.4, ease:[0.22,1,0.36,1] }}
              >
                <div
                  className="rounded-xl p-4 flex items-center justify-between gap-3 transition-all duration-300"
                  style={{
                    background: `hsl(145 20% 7% / 0.55)`,
                    border: `1px solid ${G.glow18}`,
                    boxShadow: `0 0 16px -8px ${G.glow18}`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.border = `1px solid ${G.glow35}`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px -6px ${G.glow25}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.border = `1px solid ${G.glow18}`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px -8px ${G.glow18}`;
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono" style={{ color: G.dim }}>{s.lang}</span>
                      <span className="text-white text-[11px] font-display font-semibold tracking-wide truncate">{s.name}</span>
                    </div>
                    <p className="text-[10px] text-white/25 truncate font-mono">{s.desc}</p>
                  </div>
                  <a href={`/${s.file}`} download={s.file} className="flex-shrink-0">
                    <button
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                      style={{ background: G.glow18, border: `1px solid ${G.glow25}` }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = G.glow35; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = G.glow18; }}
                    >
                      <Download className="w-3.5 h-3.5" style={{ color: G.primary }} />
                    </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── WhatsApp logo watermark ── */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 pt-4">
          <WaWatermark />
          <p className="text-[11px] text-white/20 tracking-widest text-center">
            &copy; 2025 VARNOX.WA RECOVERY — All rights reserved.
          </p>
        </motion.div>

        {/* ── Footer social ── */}
        <motion.footer variants={itemVariants} className="w-full flex flex-col items-center gap-4 border-t pt-6"
          style={{ borderColor: `${G.glow18}` }}
        >
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: G.glow10, border: `1px solid ${G.glow18}`, color: "hsl(0 0% 50%)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  (e.currentTarget as HTMLAnchorElement).style.background = G.glow25;
                  (e.currentTarget as HTMLAnchorElement).style.border = `1px solid ${G.glow35}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "hsl(0 0% 50%)";
                  (e.currentTarget as HTMLAnchorElement).style.background = G.glow10;
                  (e.currentTarget as HTMLAnchorElement).style.border = `1px solid ${G.glow18}`;
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-[10px] text-white/20 tracking-widest text-center">
            Developed by{" "}
            <span style={{ color: `${G.dim}80` }}>
              𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮 𝚸𝚪𝚰𝚳𝚵𝚵𝚵𝚵𝚵𝚵
            </span>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
