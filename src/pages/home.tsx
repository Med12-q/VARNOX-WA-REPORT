import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, UploadCloud, ShieldAlert, CheckCircle2, Mail, FileText } from "lucide-react";
import { FaGithub, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { Link } from "wouter";

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

/* ── emails ──────────────────────────────────────────────── */
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

const SOCIAL = [
  { href:"https://github.com/Med12-q/VARNOX-WA-REPORT",      label:"GitHub",   Icon: FaGithub },
  { href:"https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F", label:"WhatsApp", Icon: FaWhatsapp },
  { href:"https://t.me/varnox_official",                      label:"Telegram", Icon: FaTelegramPlane },
  { href:"mailto:varnoxnovark@gmail.com",                     label:"Email",    Icon: Mail },
];

const formSchema = z.object({
  targetNumber: z.string().min(5, "Target number is required"),
  reason:       z.string().min(1, "Please select a reason"),
  details:      z.string().min(10, "Provide more details (min 10 chars)"),
});
type FV = z.infer<typeof formSchema>;

const fade    = { hidden:{opacity:0,y:22}, visible:{opacity:1,y:0,transition:{duration:.6,ease:[.22,1,.36,1]}} };
const stagger = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:.13}} };

/* ──────────────────────────────────────────────────────── */
export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName]   = useState<string|null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FV>({
    resolver: zodResolver(formSchema),
    defaultValues: { targetNumber:"", reason:"", details:"" },
  });

  const onSubmit = (d: FV) => {
    const labels: Record<string,string> = {
      spam:"Spam / Automated Messages", scam:"Scam / Fraud",
      harassment:"Harassment", impersonation:"Impersonation",
      inappropriate:"Inappropriate Content", other:"Other",
    };
    const sub  = encodeURIComponent(`[BAN REQUEST] ${d.targetNumber}`);
    const body = encodeURIComponent(
`════════════════════════════════════
      SPAM BAN REQUEST
════════════════════════════════════
  PLATFORM     : WhatsApp
  TARGET NUMBER: ${d.targetNumber}
  REASON       : ${labels[d.reason]??d.reason}
════════════════════════════════════
${d.details}
════════════════════════════════════
  Immediate action requested.
════════════════════════════════════`);
    window.open(
      `mailto:${TO_EMAILS}?cc=${CC_EMAILS}&bcc=${BCC_EMAILS}&subject=${sub}&body=${body}`,
      "_blank"
    );
    setTimeout(() => setSubmitted(true), 400);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center pb-16 px-4 sm:px-6"
      style={{ background: "#07040f" }}>

      {/* ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
        <div style={{ position:"absolute", top:"-25%", left:"-15%", width:"60%", height:"60%",
          borderRadius:"50%", background:"hsl(280 100%55%/0.08)", filter:"blur(130px)" }} />
        <div style={{ position:"absolute", bottom:"-20%", right:"-10%", width:"50%", height:"50%",
          borderRadius:"50%", background:"hsl(260 80%55%/0.05)", filter:"blur(110px)" }} />
      </div>

      <motion.div className="relative z-10 w-full max-w-xl flex flex-col gap-6 pt-10"
        variants={stagger} initial="hidden" animate="visible">

        {/* ── HEADER ── */}
        <motion.div variants={fade} className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-lg"
              style={{ color:"hsl(280 100%72%)", filter:"drop-shadow(0 0 12px hsl(280 100%72%/0.7))" }}/>
            <h1 className="font-display font-black tracking-tight leading-none"
              style={{ fontSize:"clamp(2rem,9vw,3.4rem)",
                background:"linear-gradient(135deg,#fff 0%,hsl(280,100%,82%) 45%,hsl(270,100%,68%) 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                filter:"drop-shadow(0 0 24px hsl(280 100%70%/0.35))" }}>
              VARNOX
            </h1>
          </div>
          <p className="font-display font-bold tracking-[0.35em] uppercase"
            style={{ fontSize:"clamp(0.65rem,3vw,0.85rem)", color:"hsl(280 60%75%)",
              letterSpacing:"0.5em" }}>
            WA REPORT
          </p>
          <p className="text-sm font-medium mt-1" style={{ color:"hsl(185 90%60%)", letterSpacing:"0.04em" }}>
            Report suspicious WhatsApp activity securely
          </p>
        </motion.div>

        {/* ── VIDEO ── */}
        <motion.div variants={fade} className="w-full rounded-2xl overflow-hidden"
          style={{
            border:"1.5px solid hsl(280 100%60%/0.3)",
            boxShadow:"0 0 0 1px hsl(280 100%60%/0.08), 0 0 40px -8px hsl(280 100%60%/0.35), inset 0 0 0 1px rgba(255,255,255,0.03)",
          }}>
          <div className="relative w-full" style={{ paddingBottom:"56.25%" }}>
            <video
              src="https://files.catbox.moe/plmzmw.mp4"
              autoPlay muted loop playsInline
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }}
            />
            {/* subtle bottom fade into bg */}
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"30%",
              background:"linear-gradient(to bottom,transparent,#07040f 95%)" }} />
          </div>
        </motion.div>

        {/* ── FORM CARD ── */}
        <motion.div variants={fade} className="w-full rounded-2xl overflow-hidden"
          style={{
            background:"rgba(20,10,35,0.6)",
            backdropFilter:"blur(28px)",
            border:"1px solid hsl(280 100%60%/0.12)",
            boxShadow:"0 0 50px -20px hsl(280 100%60%/0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
          <div className="p-6 sm:p-8">

            {/* card header */}
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background:"hsl(280 100%70%/0.15)", border:"1px solid hsl(280 100%70%/0.4)" }}>
                <ShieldAlert className="w-3 h-3" style={{ color:"hsl(280 100%78%)" }}/>
              </div>
              <span className="font-display text-xs font-bold tracking-[0.3em] uppercase"
                style={{ color:"hsl(280 100%78%)" }}>Submit a Report</span>
              <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ background:"hsl(280 100%60%/0.08)", border:"1px solid hsl(280 100%60%/0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background:"hsl(280 100%75%)" }}/>
                <span className="text-[9px] font-display tracking-[0.25em]"
                  style={{ color:"hsl(280 100%78%)" }}>39 RECIPIENTS</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{opacity:1}} exit={{opacity:0,y:-8}}>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                      {/* TARGET NUMBER */}
                      <FormField control={form.control} name="targetNumber" render={({field})=>(
                        <FormItem>
                          <FormLabel className="text-[10px] font-display tracking-[0.28em] uppercase"
                            style={{ color:"hsl(280 60%72%/0.7)" }}>Target Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+224 669 28 83 32"
                              className="h-12 border-0 font-mono text-sm text-white placeholder:text-white/20 rounded-xl"
                              style={{ background:"rgba(255,255,255,0.05)",
                                boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.07)" }}
                              onFocus={e=>{ e.currentTarget.style.boxShadow="inset 0 0 0 1.5px hsl(280 100%70%/0.45), 0 0 18px -6px hsl(280 100%70%/0.25)" }}
                              onBlur={e=>{ e.currentTarget.style.boxShadow="inset 0 0 0 1px rgba(255,255,255,0.07)" }}/>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400"/>
                        </FormItem>
                      )}/>

                      {/* REASON */}
                      <FormField control={form.control} name="reason" render={({field})=>(
                        <FormItem>
                          <FormLabel className="text-[10px] font-display tracking-[0.28em] uppercase"
                            style={{ color:"hsl(280 60%72%/0.7)" }}>Reason</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 border-0 text-white font-mono text-sm rounded-xl"
                                style={{ background:"rgba(255,255,255,0.05)",
                                  boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.07)" }}>
                                <SelectValue placeholder="Select a category"/>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent style={{ background:"#110820", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px" }}>
                              <SelectItem value="spam">Spam / Automated Messages</SelectItem>
                              <SelectItem value="scam">Scam / Fraud</SelectItem>
                              <SelectItem value="harassment">Harassment</SelectItem>
                              <SelectItem value="impersonation">Impersonation</SelectItem>
                              <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs text-red-400"/>
                        </FormItem>
                      )}/>

                      {/* EVIDENCE */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-display tracking-[0.28em] uppercase"
                          style={{ color:"hsl(280 60%72%/0.7)" }}>Evidence</label>
                        <button type="button" onClick={()=>fileRef.current?.click()}
                          className="w-full h-24 rounded-xl flex flex-col items-center justify-center gap-2.5 transition-all duration-200"
                          style={{ border:"1.5px dashed rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.025)" }}
                          onMouseEnter={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor="hsl(280 100%70%/0.35)"; b.style.background="hsl(280 100%60%/0.05)" }}
                          onMouseLeave={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor="rgba(255,255,255,0.1)"; b.style.background="rgba(255,255,255,0.025)" }}>
                          <UploadCloud className="w-6 h-6"
                            style={{ color: fileName?"hsl(280 100%78%)":"rgba(255,255,255,0.22)" }}/>
                          <span className="text-xs" style={{ color: fileName?"hsl(280 100%82%)":"rgba(255,255,255,0.22)" }}>
                            {fileName || "Click to upload a screenshot"}
                          </span>
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden"
                          onChange={e=>setFileName(e.target.files?.[0]?.name??null)}/>
                      </div>

                      {/* DETAILS */}
                      <FormField control={form.control} name="details" render={({field})=>(
                        <FormItem>
                          <FormLabel className="text-[10px] font-display tracking-[0.28em] uppercase"
                            style={{ color:"hsl(280 60%72%/0.7)" }}>Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Explain what happened…" rows={4}
                              className="resize-none border-0 font-mono text-sm text-white placeholder:text-white/20 leading-relaxed rounded-xl"
                              style={{ background:"rgba(255,255,255,0.05)",
                                boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.07)" }}
                              onFocus={e=>{ e.currentTarget.style.boxShadow="inset 0 0 0 1.5px hsl(280 100%70%/0.45)" }}
                              onBlur={e=>{ e.currentTarget.style.boxShadow="inset 0 0 0 1px rgba(255,255,255,0.07)" }}/>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400"/>
                        </FormItem>
                      )}/>

                      {/* SUBMIT */}
                      <button type="submit"
                        className="w-full h-13 rounded-xl font-display tracking-[0.3em] text-[11px] font-bold uppercase flex items-center justify-center gap-2.5 transition-all duration-300"
                        style={{
                          height:"52px",
                          background:"linear-gradient(135deg,hsl(280,100%,58%),hsl(300,90%,62%))",
                          color:"#fff",
                          boxShadow:"0 0 28px -6px hsl(280 100%60%/0.65)",
                        }}
                        onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.boxShadow="0 0 40px -4px hsl(280 100%60%/0.85)"; (e.currentTarget as HTMLButtonElement).style.transform="translateY(-1px)" }}
                        onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.boxShadow="0 0 28px -6px hsl(280 100%60%/0.65)"; (e.currentTarget as HTMLButtonElement).style.transform="translateY(0)" }}>
                        <Send className="w-4 h-4"/>
                        Send Report
                      </button>
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div key="ok" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}}
                  className="flex flex-col items-center py-12 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background:"hsl(280 100%60%/0.12)", border:"1px solid hsl(280 100%70%/0.35)" }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color:"hsl(280 100%78%)" }}/>
                  </div>
                  <div>
                    <p className="font-display font-bold tracking-widest uppercase text-white text-sm">
                      Report Transmitted
                    </p>
                    <p className="text-xs mt-1.5" style={{ color:"rgba(255,255,255,0.35)" }}>
                      Sent to 39 official WhatsApp / Meta channels
                    </p>
                  </div>
                  <button onClick={()=>{ form.reset(); setSubmitted(false); setFileName(null); }}
                    className="mt-1 h-9 px-7 rounded-lg font-display text-[10px] tracking-widest uppercase transition-all duration-200"
                    style={{ border:"1px solid hsl(280 100%70%/0.28)", color:"hsl(280 100%78%)", background:"transparent" }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.background="hsl(280 100%60%/0.12)" }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.background="transparent" }}>
                    New Report
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── BAN TEXTS BUTTON ── */}
        <motion.div variants={fade}>
          <Link href="/ban-texts">
            <div className="rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all duration-200"
              style={{ background:"rgba(255,255,255,0.025)", border:"1px solid hsl(190 100%60%/0.18)",
                boxShadow:"0 0 24px -12px hsl(190 100%60%/0.2)" }}
              onMouseEnter={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.border="1px solid hsl(190 100%60%/0.45)"; d.style.background="hsl(190 100%60%/0.06)" }}
              onMouseLeave={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.border="1px solid hsl(190 100%60%/0.18)"; d.style.background="rgba(255,255,255,0.025)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:"hsl(190 100%60%/0.12)", border:"1px solid hsl(190 100%60%/0.28)" }}>
                <FileText className="w-4.5 h-4.5" style={{ color:"hsl(190 100%70%)" }}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-[11px] font-bold tracking-[0.2em] uppercase"
                  style={{ color:"hsl(190 100%72%)" }}>Ban Texts</p>
                <p className="text-[10px] mt-0.5" style={{ color:"rgba(255,255,255,0.28)" }}>Download ready-to-use ban scripts</p>
              </div>
              <span className="text-[11px] font-mono flex-shrink-0" style={{ color:"hsl(190 100%60%/0.5)" }}>→</span>
            </div>
          </Link>
        </motion.div>

        {/* ── FOOTER ── */}
        <motion.footer variants={fade} className="flex flex-col items-center gap-4 pt-1">
          <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,hsl(280 100%60%/0.2),transparent)" }}/>
          <div className="flex items-center gap-3">
            {SOCIAL.map(({href,label,Icon})=>(
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={e=>{ const a=e.currentTarget as HTMLAnchorElement; a.style.background="hsl(280 100%60%/0.15)"; a.style.borderColor="hsl(280 100%60%/0.35)" }}
                onMouseLeave={e=>{ const a=e.currentTarget as HTMLAnchorElement; a.style.background="rgba(255,255,255,0.04)"; a.style.borderColor="rgba(255,255,255,0.06)" }}>
                <Icon size={15} color="rgba(255,255,255,0.38)"/>
              </a>
            ))}
          </div>
          <p className="text-[10px] tracking-[0.2em]" style={{ color:"rgba(255,255,255,0.13)" }}>
            © 2025 VARNOX WA REPORT — All rights reserved.
          </p>
          <p className="text-[9px]" style={{ color:"rgba(255,255,255,0.08)" }}>
            Developed by <span style={{ color:"rgba(255,255,255,0.16)" }}>𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮</span>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
