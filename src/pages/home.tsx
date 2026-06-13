import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Send, UploadCloud, ShieldAlert, CheckCircle2, Mail,
  FileText, RefreshCw, Github, Activity,
} from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
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

/* ──────────────────────────────────────────────── constants */
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
  { href:"https://github.com/Med12-q/VARNOX-WA-REPORT", label:"GitHub",   Icon: Github },
  { href:"https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F", label:"WhatsApp", Icon: FaWhatsapp },
  { href:"https://t.me/varnox_official", label:"Telegram", Icon: FaTelegramPlane },
  { href:"mailto:varnoxnovark@gmail.com", label:"Email", Icon: Mail },
];

const formSchema = z.object({
  targetNumber: z.string().min(5, "Target number is required"),
  reason:       z.string().min(1, "Please select a reason"),
  details:      z.string().min(10, "Provide more details (min 10 chars)"),
});
type FV = z.infer<typeof formSchema>;

const fade  = { hidden:{opacity:0,y:20}, visible:{opacity:1,y:0,transition:{duration:.55,ease:[.22,1,.36,1]}} };
const stagger = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:.14}} };

/* ──────────────────────────────────────────────── component */
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
              DETAILS
════════════════════════════════════
${d.details}
════════════════════════════════════
  This number has been reported for
  violating WhatsApp Terms of Service.
  Immediate action is requested.
════════════════════════════════════`);
    window.open(
      `mailto:${TO_EMAILS}?cc=${CC_EMAILS}&bcc=${BCC_EMAILS}&subject=${sub}&body=${body}`,
      "_blank"
    );
    setTimeout(() => setSubmitted(true), 400);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center pb-16 px-4 sm:px-6"
      style={{ background:"#07040f" }}>

      {/* ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div style={{ position:"absolute",top:"-20%",left:"-10%",width:"55%",height:"55%",
          borderRadius:"50%",background:"hsl(280 100% 60%/0.07)",filter:"blur(120px)" }} />
        <div style={{ position:"absolute",bottom:"-20%",right:"-10%",width:"50%",height:"50%",
          borderRadius:"50%",background:"hsl(220 80% 60%/0.05)",filter:"blur(120px)" }} />
      </div>

      <motion.div className="relative z-10 w-full max-w-xl flex flex-col gap-6 pt-12"
        variants={stagger} initial="hidden" animate="visible">

        {/* ── HEADER ── */}
        <motion.div variants={fade} className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full mb-1"
            style={{ background:"hsl(280 100%60%/0.1)", border:"1px solid hsl(280 100%60%/0.25)" }}>
            <ShieldAlert className="w-3.5 h-3.5" style={{color:"hsl(280 100%75%)"}}/>
            <span className="text-[10px] font-display tracking-[0.3em] uppercase"
              style={{color:"hsl(280 100%75%)"}}>WhatsApp Enforcement</span>
          </div>
          <h1 className="font-display font-black uppercase leading-none"
            style={{ fontSize:"clamp(2rem,8vw,3.2rem)",
              background:"linear-gradient(135deg,#fff 0%,hsl(280,100%,80%) 50%,hsl(280,100%,60%) 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              filter:"drop-shadow(0 0 30px hsl(280 100%70%/0.3))" }}>
            VARNOX
            <span style={{ display:"block",fontSize:"0.45em",letterSpacing:"0.55em",
              color:"hsl(280 100%75%)", WebkitTextFillColor:"hsl(280 100%75%)", paddingLeft:"0.55em" }}>
              WA REPORT
            </span>
          </h1>
          <p className="text-sm" style={{color:"hsl(280 60%70%/0.55)",letterSpacing:"0.05em"}}>
            Report suspicious WhatsApp activity securely
          </p>
        </motion.div>

        {/* ── VIDEO ── */}
        <motion.div variants={fade} className="w-full rounded-2xl overflow-hidden"
          style={{ boxShadow:"0 0 0 1px hsl(280 100%60%/0.2), 0 20px 60px -20px hsl(280 100%60%/0.25)" }}>
          <div className="relative w-full" style={{ paddingBottom:"52%" }}>
            <video src="https://files.catbox.moe/plmzmw.mp4"
              autoPlay muted loop playsInline
              style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block" }}
            />
            <div style={{ position:"absolute",inset:0,
              background:"linear-gradient(to bottom,transparent 50%,#07040f 100%)" }} />
          </div>
        </motion.div>

        {/* ── FORM CARD ── */}
        <motion.div variants={fade} className="w-full rounded-2xl overflow-hidden"
          style={{ background:"rgba(255,255,255,0.025)", backdropFilter:"blur(24px)",
            border:"1px solid rgba(255,255,255,0.07)",
            boxShadow:"0 0 40px -15px hsl(280 100%60%/0.2), inset 0 1px 0 rgba(255,255,255,0.06)" }}>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-5 rounded-full" style={{background:"hsl(280 100%70%)"}} />
              <span className="font-display text-[11px] tracking-[0.3em] uppercase font-semibold"
                style={{color:"hsl(280 100%75%)"}}>Submit a Report</span>
              <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                style={{background:"hsl(280 100%60%/0.1)",border:"1px solid hsl(280 100%60%/0.2)"}}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:"hsl(280 100%75%)"}}/>
                <span className="text-[9px] font-display tracking-widest" style={{color:"hsl(280 100%75%)"}}>39 RECIPIENTS</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{opacity:1}} exit={{opacity:0,y:-10}}>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                      <FormField control={form.control} name="targetNumber" render={({field})=>(
                        <FormItem>
                          <FormLabel className="text-[10px] font-display tracking-[0.25em] uppercase"
                            style={{color:"hsl(280 60%70%/0.7)"}}>Target Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+224 XXX XXX XXX"
                              className="h-11 border-0 font-mono text-sm text-white placeholder:text-white/15"
                              style={{background:"rgba(255,255,255,0.04)",
                                boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)"}}
                              onFocus={e=>{e.currentTarget.style.boxShadow="inset 0 0 0 1.5px hsl(280 100%70%/0.5), 0 0 16px -4px hsl(280 100%70%/0.2)"}}
                              onBlur={e=>{e.currentTarget.style.boxShadow="inset 0 0 0 1px rgba(255,255,255,0.08)"}} />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400"/>
                        </FormItem>
                      )}/>

                      <FormField control={form.control} name="reason" render={({field})=>(
                        <FormItem>
                          <FormLabel className="text-[10px] font-display tracking-[0.25em] uppercase"
                            style={{color:"hsl(280 60%70%/0.7)"}}>Reason</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 border-0 text-white font-mono text-sm"
                                style={{background:"rgba(255,255,255,0.04)",
                                  boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)"}}>
                                <SelectValue placeholder="Select a reason…"/>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent style={{background:"#12091e",border:"1px solid rgba(255,255,255,0.1)"}}>
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

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-display tracking-[0.25em] uppercase"
                          style={{color:"hsl(280 60%70%/0.7)"}}>Evidence</label>
                        <button type="button" onClick={()=>fileRef.current?.click()}
                          className="w-full h-20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-200"
                          style={{border:"1.5px dashed rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.02)"}}
                          onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor="hsl(280 100%70%/0.35)";(e.currentTarget as HTMLButtonElement).style.background="hsl(280 100%60%/0.05)"}}
                          onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor="rgba(255,255,255,0.1)";(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.02)"}}>
                          <UploadCloud className="w-5 h-5" style={{color:fileName?"hsl(280 100%75%)":"rgba(255,255,255,0.2)"}}/>
                          <span className="text-xs" style={{color:fileName?"hsl(280 100%80%)":"rgba(255,255,255,0.2)"}}>
                            {fileName||"Click to upload a screenshot"}
                          </span>
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden"
                          onChange={e=>setFileName(e.target.files?.[0]?.name??null)}/>
                      </div>

                      <FormField control={form.control} name="details" render={({field})=>(
                        <FormItem>
                          <FormLabel className="text-[10px] font-display tracking-[0.25em] uppercase"
                            style={{color:"hsl(280 60%70%/0.7)"}}>Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Explain what happened…" rows={4}
                              className="resize-none border-0 font-mono text-sm text-white placeholder:text-white/15 leading-relaxed"
                              style={{background:"rgba(255,255,255,0.04)",
                                boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)"}}
                              onFocus={e=>{e.currentTarget.style.boxShadow="inset 0 0 0 1.5px hsl(280 100%70%/0.5)"}}
                              onBlur={e=>{e.currentTarget.style.boxShadow="inset 0 0 0 1px rgba(255,255,255,0.08)"}}/>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400"/>
                        </FormItem>
                      )}/>

                      <button type="submit"
                        className="w-full h-12 rounded-xl font-display tracking-[0.25em] text-xs font-bold uppercase flex items-center justify-center gap-2.5 transition-all duration-300"
                        style={{ background:"linear-gradient(135deg,hsl(280,100%,60%),hsl(300,90%,65%))",
                          color:"#fff", boxShadow:"0 0 24px -6px hsl(280 100%60%/0.6)" }}
                        onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.boxShadow="0 0 36px -4px hsl(280 100%60%/0.8)"}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.boxShadow="0 0 24px -6px hsl(280 100%60%/0.6)"}}>
                        <Send className="w-4 h-4"/>
                        Send Report
                      </button>
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div key="ok" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}
                  className="flex flex-col items-center py-10 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{background:"hsl(280 100%60%/0.15)", border:"1px solid hsl(280 100%70%/0.3)"}}>
                    <CheckCircle2 className="w-8 h-8" style={{color:"hsl(280 100%75%)"}}/>
                  </div>
                  <div>
                    <p className="font-display font-bold tracking-widest text-white uppercase text-sm">Report Transmitted</p>
                    <p className="text-xs mt-1" style={{color:"rgba(255,255,255,0.35)"}}>Sent to 39 official channels</p>
                  </div>
                  <button onClick={()=>{form.reset();setSubmitted(false);setFileName(null);}}
                    className="mt-2 h-9 px-6 rounded-lg font-display text-[10px] tracking-widest uppercase transition-all duration-200"
                    style={{border:"1px solid hsl(280 100%70%/0.25)",color:"hsl(280 100%75%)",background:"transparent"}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="hsl(280 100%60%/0.1)"}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="transparent"}}>
                    New Report
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── NAV BUTTONS ── */}
        <motion.div variants={fade} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Recovery */}
            <Link href="/recovery">
              <div className="rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all duration-250"
                style={{ background:"rgba(255,255,255,0.025)", border:"1px solid hsl(142 72%45%/0.2)",
                  boxShadow:"0 0 20px -10px hsl(142 72%45%/0.3)" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.border="1px solid hsl(142 72%45%/0.5)";(e.currentTarget as HTMLDivElement).style.background="hsl(142 72%45%/0.07)"}}
                onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.border="1px solid hsl(142 72%45%/0.2)";(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.025)"}}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{background:"hsl(142 72%45%/0.15)", border:"1px solid hsl(142 72%45%/0.3)"}}>
                  <RefreshCw className="w-4 h-4" style={{color:"hsl(142 72%60%)"}}/>
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase truncate"
                    style={{color:"hsl(142 72%65%)"}}>WA Recovery</p>
                  <p className="text-[9px] mt-0.5 truncate" style={{color:"rgba(255,255,255,0.3)"}}>Recover banned account</p>
                </div>
              </div>
            </Link>

            {/* Ban Texts */}
            <Link href="/ban-texts">
              <div className="rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all duration-250"
                style={{ background:"rgba(255,255,255,0.025)", border:"1px solid hsl(190 100%60%/0.2)",
                  boxShadow:"0 0 20px -10px hsl(190 100%60%/0.2)" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.border="1px solid hsl(190 100%60%/0.5)";(e.currentTarget as HTMLDivElement).style.background="hsl(190 100%60%/0.07)"}}
                onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.border="1px solid hsl(190 100%60%/0.2)";(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.025)"}}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{background:"hsl(190 100%60%/0.15)", border:"1px solid hsl(190 100%60%/0.3)"}}>
                  <FileText className="w-4 h-4" style={{color:"hsl(190 100%70%)"}}/>
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase truncate"
                    style={{color:"hsl(190 100%70%)"}}>Ban Texts</p>
                  <p className="text-[9px] mt-0.5 truncate" style={{color:"rgba(255,255,255,0.3)"}}>Download ban scripts</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Stats — full width */}
          <Link href="/stats">
            <div className="rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all duration-250"
              style={{ background:"rgba(255,255,255,0.025)", border:"1px solid hsl(280 100%60%/0.2)",
                boxShadow:"0 0 20px -10px hsl(280 100%60%/0.25)" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.border="1px solid hsl(280 100%60%/0.5)";(e.currentTarget as HTMLDivElement).style.background="hsl(280 100%60%/0.07)"}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.border="1px solid hsl(280 100%60%/0.2)";(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.025)"}}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{background:"hsl(280 100%60%/0.15)", border:"1px solid hsl(280 100%60%/0.3)"}}>
                <Activity className="w-4 h-4" style={{color:"hsl(280 100%75%)"}}/>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[10px] font-bold tracking-[0.18em] uppercase"
                  style={{color:"hsl(280 100%75%)"}}>Live Stats</p>
                <p className="text-[9px] mt-0.5" style={{color:"rgba(255,255,255,0.3)"}}>
                  Real-time activity · reports · recoveries · uptime
                </p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0 px-2 py-1 rounded-full"
                style={{background:"hsl(280 100%60%/0.1)", border:"1px solid hsl(280 100%60%/0.25)"}}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:"hsl(280 100%75%)"}}/>
                <span className="text-[8px] font-display tracking-widest" style={{color:"hsl(280 100%75%)"}}>LIVE</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── FOOTER ── */}
        <motion.footer variants={fade} className="flex flex-col items-center gap-4 pt-2">
          <div className="flex items-center gap-3">
            {SOCIAL.map(({href,label,Icon})=>(
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.background="hsl(280 100%60%/0.15)";(e.currentTarget as HTMLAnchorElement).style.borderColor="hsl(280 100%60%/0.35)"}}
                onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.04)";(e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(255,255,255,0.07)"}}>
                <Icon size={15} color="rgba(255,255,255,0.4)"/>
              </a>
            ))}
          </div>
          <p className="text-[10px] tracking-[0.2em]" style={{color:"rgba(255,255,255,0.15)"}}>
            © 2025 VARNOX WA REPORT — All rights reserved.
          </p>
          <p className="text-[9px] tracking-widest" style={{color:"rgba(255,255,255,0.1)"}}>
            Developed by <span style={{color:"rgba(255,255,255,0.18)"}}>𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮 𝚸𝚪𝚰𝚳𝚵𝚵𝚵𝚵𝚵𝚵</span>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
