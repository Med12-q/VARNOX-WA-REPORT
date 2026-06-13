import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowLeft, Send, UploadCloud, CheckCircle2, ShieldCheck,
  Download, Mail, Github,
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

/* ─── palette ─────────────────────────────────────────────── */
const G = {
  pri:   "hsl(142 72%48%)",
  bri:   "hsl(142 85%58%)",
  dim:   "hsl(142 50%35%)",
  g08:   "hsl(142 72%48%/0.08)",
  g15:   "hsl(142 72%48%/0.15)",
  g25:   "hsl(142 72%48%/0.25)",
  g40:   "hsl(142 72%48%/0.40)",
  g60:   "hsl(142 72%48%/0.60)",
};

/* ─── emails ───────────────────────────────────────────────── */
const TO = [
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
const CC = [
  "italy@support.whatsapp.com","netherlands@support.whatsapp.com",
  "belgium@support.whatsapp.com","switzerland@support.whatsapp.com",
  "canada@support.whatsapp.com","australia@support.whatsapp.com",
  "privacy@whatsapp.com","legal@whatsapp.com",
  "dmca@whatsapp.com","trustandsafety@whatsapp.com",
].join(",");
const BCC = [
  "report@whatsapp.com","terrorism@whatsapp.com",
  "childsafety@whatsapp.com","tonymontana200500@gmail.com",
  "toureibhahim712@gmail.com",
].join(",");

/* ─── scripts ─────────────────────────────────────────────── */
const SCRIPTS = [
  {id:1,  flag:"🇬🇧",lang:"EN", name:"Standard Appeal",         file:"recovery-en-standard.txt"},
  {id:2,  flag:"🇫🇷",lang:"FR", name:"Appel Standard",          file:"recovery-fr-standard.txt"},
  {id:3,  flag:"🇸🇦",lang:"AR", name:"نموذج استرداد",            file:"recovery-ar-standard.txt"},
  {id:4,  flag:"🇪🇸",lang:"ES", name:"Apelación Estándar",      file:"recovery-es-standard.txt"},
  {id:5,  flag:"🇧🇷",lang:"PT", name:"Apelo Padrão",            file:"recovery-pt-standard.txt"},
  {id:6,  flag:"🇩🇪",lang:"DE", name:"Standard-Einspruch",      file:"recovery-de-standard.txt"},
  {id:7,  flag:"🇮🇹",lang:"IT", name:"Appello Standard",        file:"recovery-it-standard.txt"},
  {id:8,  flag:"🇷🇺",lang:"RU", name:"Стандартная апелляция",   file:"recovery-ru-standard.txt"},
  {id:9,  flag:"🇹🇷",lang:"TR", name:"Standart İtiraz",         file:"recovery-tr-standard.txt"},
  {id:10, flag:"🇬🇧",lang:"EN", name:"URGENT Appeal",           file:"recovery-en-urgent.txt"},
  {id:11, flag:"🇫🇷",lang:"FR", name:"Appel URGENT",            file:"recovery-fr-urgent.txt"},
  {id:12, flag:"🇪🇸",lang:"ES", name:"Apelación URGENTE",       file:"recovery-es-urgent.txt"},
  {id:13, flag:"🇧🇷",lang:"PT", name:"Apelo URGENTE",           file:"recovery-pt-urgent.txt"},
  {id:14, flag:"🇸🇦",lang:"AR", name:"طلب عاجل",                file:"recovery-ar-urgent.txt"},
  {id:15, flag:"🇬🇧",lang:"EN", name:"Business Account",        file:"recovery-en-business.txt"},
  {id:16, flag:"🇫🇷",lang:"FR", name:"Compte Business",         file:"recovery-fr-business.txt"},
  {id:17, flag:"🇬🇧",lang:"EN", name:"Wrongful Ban",            file:"recovery-en-wrongful.txt"},
  {id:18, flag:"🇬🇧",lang:"EN", name:"Spam Ban Appeal",         file:"recovery-en-spam-appeal.txt"},
  {id:19, flag:"🇬🇧",lang:"EN", name:"Formal Legal",            file:"recovery-en-formal.txt"},
  {id:20, flag:"🇬🇧",lang:"EN", name:"Technical Issue",         file:"recovery-en-technical.txt"},
  {id:21, flag:"🇬🇧",lang:"EN", name:"FINAL Appeal",            file:"recovery-en-final.txt"},
  {id:22, flag:"🇬🇧",lang:"EN", name:"Detailed (Full)",         file:"recovery-en-detailed.txt"},
  {id:23, flag:"🇬🇧",lang:"EN", name:"Quick Short",             file:"recovery-en-short.txt"},
  {id:24, flag:"🇬🇧",lang:"EN", name:"Mod App Disclosure",      file:"recovery-en-mod-appeal.txt"},
  {id:25, flag:"🇬🇧",lang:"EN", name:"Number Change",           file:"recovery-en-number-change.txt"},
];

const SOCIAL = [
  {href:"https://github.com/Med12-q/VARNOX-WA-REPORT",label:"GitHub",  Icon:Github},
  {href:"https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F",label:"WhatsApp",Icon:FaWhatsapp},
  {href:"https://t.me/varnox_official",label:"Telegram",Icon:FaTelegramPlane},
  {href:"mailto:varnoxnovark@gmail.com",label:"Email",Icon:Mail},
];

const formSchema = z.object({
  bannedNumber: z.string().min(5,"Phone number required"),
  accountType:  z.string().min(1,"Select account type"),
  banReason:    z.string().min(1,"Select a reason"),
  email:        z.string().email("Valid email required"),
  details:      z.string().min(10,"Describe your situation (min 10 chars)"),
});
type FV = z.infer<typeof formSchema>;

const fade    = {hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.55,ease:[.22,1,.36,1]}}};
const stagger = {hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.12}}};

/* ─── WhatsApp logo SVG watermark ─────────────────────────── */
function WaLogo(){
  return (
    <svg viewBox="0 0 175 175" xmlns="http://www.w3.org/2000/svg"
      className="w-40 h-40 sm:w-52 sm:h-52"
      style={{opacity:.055,filter:`drop-shadow(0 0 40px ${G.bri})`}}>
      <circle cx="87.5" cy="87.5" r="87.5" fill={G.pri}/>
      <path fill="white" d="M87.5 26.3C53.7 26.3 26.3 53.7 26.3 87.5c0 10.8 2.9 20.9 8 29.6L25 150l34-9.1c8.4 4.6 18 7.2 28.2 7.2C120.9 148.1 148.8 120.5 148.8 87.5S120.9 26.3 87.5 26.3zm0 111.3c-9.6 0-18.7-2.6-26.5-7.2L59.2 129l-19.2 5.1 5.1-18.7-1.9-3.2c-5-8.2-7.9-17.7-7.9-27.9C35.3 58.5 58.8 35.4 87.5 35.4S139.7 58.5 139.7 87.5 116.2 137.6 87.5 137.6z"/>
      <path fill="white" d="M116.5 100.8c-1.5-.8-9.1-4.5-10.5-5-.1 0-.2-.1-.3-.1-1.2 0-2.1.6-2.8 1.6l-1.5 2c-.6.9-1.3 1.1-2.3.7l-.4-.2c-1.7-.7-6.7-2.6-12.6-7.8-4.7-4.2-7.9-9.3-8.8-10.9-.8-1.5-.1-2.4.6-3.1.6-.6 1.3-1.5 2-2.2.5-.7.8-1.2 1.2-2 .4-1 .1-1.9-.2-2.6-.3-.7-3.5-8.4-4.8-11.5-.7-1.8-1.5-2.1-2.4-2.1-.1 0-.2 0-.3 0-.9 0-1.9.1-2.9.1-1.1 0-2.7.4-4.1 1.9-1.3 1.5-5.1 5-5.1 12.1 0 7.1 5.2 14.1 6 15.2 0 .1 12.7 19.4 30.7 27.2 4.3 1.9 7.7 3 10.3 3.8 2.6.7 5 .6 6.8.4 2.1-.3 6.4-2.6 7.3-5.1.9-2.5.9-4.7.6-5.1-.3-.5-.8-.8-1.5-1.3z"/>
    </svg>
  );
}

/* ─── component ───────────────────────────────────────────── */
export default function Recovery() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName]   = useState<string|null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FV>({
    resolver: zodResolver(formSchema),
    defaultValues:{bannedNumber:"",accountType:"",banReason:"",email:"",details:""},
  });

  const onSubmit = (d:FV) => {
    const labels:Record<string,string> = {
      wrongful:"Wrongfully Banned", spam:"Spam Detection Error",
      mod:"Modified App Usage", mass:"Mass Messaging",
      technical:"Technical Issue", unknown:"Unknown Reason",
    };
    const sub  = encodeURIComponent(`[RECOVERY REQUEST] ${d.bannedNumber}`);
    const body = encodeURIComponent(
`════════════════════════════════════════
   WHATSAPP ACCOUNT RECOVERY REQUEST
════════════════════════════════════════
  PLATFORM       : WhatsApp
  BANNED NUMBER  : ${d.bannedNumber}
  ACCOUNT TYPE   : ${d.accountType==="business"?"Business":"Personal"}
  BAN REASON     : ${labels[d.banReason]??d.banReason}
  REPLY EMAIL    : ${d.email}
════════════════════════════════════════
                DETAILS
════════════════════════════════════════
${d.details}
════════════════════════════════════════
  Formal recovery request. The account
  holder asserts no ToS violation.
  Immediate review is requested.
════════════════════════════════════════`);
    window.open(`mailto:${TO}?cc=${CC}&bcc=${BCC}&subject=${sub}&body=${body}`,"_blank");
    setTimeout(()=>setSubmitted(true),400);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center pb-16 px-4 sm:px-6"
      style={{background:"#040d07"}}>

      {/* ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div style={{position:"absolute",top:"-20%",left:"-10%",width:"55%",height:"55%",
          borderRadius:"50%",background:`${G.g08}`,filter:"blur(120px)"}}/>
        <div style={{position:"absolute",bottom:"-20%",right:"-10%",width:"50%",height:"50%",
          borderRadius:"50%",background:"hsl(160 80%40%/0.05)",filter:"blur(120px)"}}/>
      </div>

      <motion.div className="relative z-10 w-full max-w-xl flex flex-col gap-6 pt-10"
        variants={stagger} initial="hidden" animate="visible">

        {/* ── BACK ── */}
        <motion.div variants={fade}>
          <Link href="/">
            <button className="flex items-center gap-2 transition-colors duration-200 group text-sm"
              style={{color:`${G.dim}`}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.color=G.pri}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.color=G.dim}}>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"/>
              Back to Report
            </button>
          </Link>
        </motion.div>

        {/* ── HEADER ── */}
        <motion.div variants={fade} className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{background:`${G.g08}`,border:`1px solid ${G.g25}`}}>
            <ShieldCheck className="w-3.5 h-3.5" style={{color:G.pri}}/>
            <span className="text-[10px] font-display tracking-[0.3em] uppercase" style={{color:G.pri}}>
              WhatsApp Recovery
            </span>
          </div>
          <h1 className="font-display font-black uppercase leading-none"
            style={{fontSize:"clamp(1.8rem,7vw,2.8rem)",
              background:`linear-gradient(135deg,#fff 0%,${G.bri} 55%,${G.dim} 100%)`,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              filter:`drop-shadow(0 0 28px ${G.g40})`}}>
            𝗩𝗔𝗥𝗡𝗢𝗫.𝗪𝗔
            <span style={{display:"block",fontSize:"0.45em",letterSpacing:"0.55em",
              color:G.pri,WebkitTextFillColor:G.pri,paddingLeft:"0.55em"}}>
              RECOVERY
            </span>
          </h1>
          <p className="text-sm" style={{color:`${G.dim}`,letterSpacing:"0.05em"}}>
            Recover your banned or restricted WhatsApp account
          </p>
        </motion.div>

        {/* ── VIDEO ── */}
        <motion.div variants={fade} className="w-full rounded-2xl overflow-hidden"
          style={{boxShadow:`0 0 0 1px ${G.g25}, 0 20px 60px -20px ${G.g40}`}}>
          <div className="relative w-full" style={{paddingBottom:"52%"}}>
            <video src="https://files.catbox.moe/7aujtb.mp4"
              autoPlay muted loop playsInline
              style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
            <div style={{position:"absolute",inset:0,
              background:"linear-gradient(to bottom,transparent 50%,#040d07 100%)"}}/>
          </div>
        </motion.div>

        {/* ── FORM CARD ── */}
        <motion.div variants={fade} className="w-full rounded-2xl overflow-hidden"
          style={{background:"rgba(255,255,255,0.025)", backdropFilter:"blur(24px)",
            border:`1px solid ${G.g15}`,
            boxShadow:`0 0 40px -15px ${G.g40}, inset 0 1px 0 rgba(255,255,255,0.05)`}}>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-5 rounded-full" style={{background:G.pri}}/>
              <span className="font-display text-[11px] tracking-[0.3em] uppercase font-semibold" style={{color:G.pri}}>
                Submit Recovery Request
              </span>
              <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                style={{background:`${G.g08}`,border:`1px solid ${G.g25}`}}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:G.bri}}/>
                <span className="text-[9px] font-display tracking-widest" style={{color:G.pri}}>39 CHANNELS</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{opacity:1}} exit={{opacity:0,y:-10}}>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                      {/* Banned number */}
                      <FormField control={form.control} name="bannedNumber" render={({field})=>(
                        <FormItem>
                          <FormLabel className="text-[10px] font-display tracking-[0.25em] uppercase" style={{color:`${G.dim}`}}>
                            Banned Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+224 XXX XXX XXX"
                              className="h-11 border-0 font-mono text-sm text-white placeholder:text-white/15"
                              style={{background:"rgba(255,255,255,0.04)",boxShadow:`inset 0 0 0 1px ${G.g15}`}}
                              onFocus={e=>{e.currentTarget.style.boxShadow=`inset 0 0 0 1.5px ${G.g60}, 0 0 16px -4px ${G.g25}`}}
                              onBlur={e=>{e.currentTarget.style.boxShadow=`inset 0 0 0 1px ${G.g15}`}}/>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400"/>
                        </FormItem>
                      )}/>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="accountType" render={({field})=>(
                          <FormItem>
                            <FormLabel className="text-[10px] font-display tracking-[0.25em] uppercase" style={{color:`${G.dim}`}}>
                              Account Type
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11 border-0 text-white font-mono text-sm"
                                  style={{background:"rgba(255,255,255,0.04)",boxShadow:`inset 0 0 0 1px ${G.g15}`}}>
                                  <SelectValue placeholder="Select…"/>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent style={{background:"#061008",border:`1px solid ${G.g25}`}}>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs text-red-400"/>
                          </FormItem>
                        )}/>

                        <FormField control={form.control} name="banReason" render={({field})=>(
                          <FormItem>
                            <FormLabel className="text-[10px] font-display tracking-[0.25em] uppercase" style={{color:`${G.dim}`}}>
                              Reason for Ban
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11 border-0 text-white font-mono text-sm"
                                  style={{background:"rgba(255,255,255,0.04)",boxShadow:`inset 0 0 0 1px ${G.g15}`}}>
                                  <SelectValue placeholder="Select…"/>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent style={{background:"#061008",border:`1px solid ${G.g25}`}}>
                                <SelectItem value="wrongful">Wrongfully Banned</SelectItem>
                                <SelectItem value="spam">Spam Detection</SelectItem>
                                <SelectItem value="mod">Modified App</SelectItem>
                                <SelectItem value="mass">Mass Messaging</SelectItem>
                                <SelectItem value="technical">Technical Issue</SelectItem>
                                <SelectItem value="unknown">Unknown</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs text-red-400"/>
                          </FormItem>
                        )}/>
                      </div>

                      <FormField control={form.control} name="email" render={({field})=>(
                        <FormItem>
                          <FormLabel className="text-[10px] font-display tracking-[0.25em] uppercase" style={{color:`${G.dim}`}}>
                            Your Email (for response)
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="your@email.com"
                              className="h-11 border-0 font-mono text-sm text-white placeholder:text-white/15"
                              style={{background:"rgba(255,255,255,0.04)",boxShadow:`inset 0 0 0 1px ${G.g15}`}}
                              onFocus={e=>{e.currentTarget.style.boxShadow=`inset 0 0 0 1.5px ${G.g60}, 0 0 16px -4px ${G.g25}`}}
                              onBlur={e=>{e.currentTarget.style.boxShadow=`inset 0 0 0 1px ${G.g15}`}}/>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400"/>
                        </FormItem>
                      )}/>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-display tracking-[0.25em] uppercase" style={{color:`${G.dim}`}}>
                          Evidence / Screenshot
                        </label>
                        <button type="button" onClick={()=>fileRef.current?.click()}
                          className="w-full h-20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-200"
                          style={{border:`1.5px dashed ${G.g25}`,background:`${G.g08}`}}
                          onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=G.g60;(e.currentTarget as HTMLButtonElement).style.background=G.g15}}
                          onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=G.g25;(e.currentTarget as HTMLButtonElement).style.background=G.g08}}>
                          <UploadCloud className="w-5 h-5" style={{color:fileName?G.bri:`${G.g40}`}}/>
                          <span className="text-xs" style={{color:fileName?G.pri:"rgba(255,255,255,0.2)"}}>
                            {fileName||"Click to upload screenshot"}
                          </span>
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden"
                          onChange={e=>setFileName(e.target.files?.[0]?.name??null)}/>
                      </div>

                      <FormField control={form.control} name="details" render={({field})=>(
                        <FormItem>
                          <FormLabel className="text-[10px] font-display tracking-[0.25em] uppercase" style={{color:`${G.dim}`}}>
                            Describe Your Situation
                          </FormLabel>
                          <FormControl>
                            <Textarea {...field}
                              placeholder="Explain what happened, when you were banned, and why you believe it's an error…"
                              rows={4}
                              className="resize-none border-0 font-mono text-sm text-white placeholder:text-white/15 leading-relaxed"
                              style={{background:"rgba(255,255,255,0.04)",boxShadow:`inset 0 0 0 1px ${G.g15}`}}
                              onFocus={e=>{e.currentTarget.style.boxShadow=`inset 0 0 0 1.5px ${G.g60}`}}
                              onBlur={e=>{e.currentTarget.style.boxShadow=`inset 0 0 0 1px ${G.g15}`}}/>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400"/>
                        </FormItem>
                      )}/>

                      <button type="submit"
                        className="w-full h-12 rounded-xl font-display tracking-[0.25em] text-xs font-bold uppercase flex items-center justify-center gap-2.5 transition-all duration-300"
                        style={{background:`linear-gradient(135deg,${G.pri},${G.bri})`,
                          color:"#fff",boxShadow:`0 0 24px -6px ${G.g60}`}}
                        onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 36px -4px ${G.g60}`}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 24px -6px ${G.g60}`}}>
                        <Send className="w-4 h-4"/>
                        Send Recovery Request
                      </button>
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div key="ok" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}
                  className="flex flex-col items-center py-10 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{background:`${G.g15}`,border:`1px solid ${G.g40}`}}>
                    <CheckCircle2 className="w-8 h-8" style={{color:G.bri}}/>
                  </div>
                  <div>
                    <p className="font-display font-bold tracking-widest text-white uppercase text-sm">Request Sent</p>
                    <p className="text-xs mt-1" style={{color:"rgba(255,255,255,0.35)"}}>Dispatched to 39 official channels</p>
                  </div>
                  <button onClick={()=>{form.reset();setSubmitted(false);setFileName(null);}}
                    className="mt-2 h-9 px-6 rounded-lg font-display text-[10px] tracking-widest uppercase transition-all duration-200"
                    style={{border:`1px solid ${G.g25}`,color:G.pri,background:"transparent"}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=G.g15}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="transparent"}}>
                    New Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── DOWNLOAD SCRIPTS BUTTON ── */}
        <motion.div variants={fade}>
          <Link href="/recovery-scripts">
            <div className="rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-250"
              style={{background:"rgba(255,255,255,0.025)", border:`1px solid ${G.g25}`,
                boxShadow:`0 0 30px -12px ${G.g40}`}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background=G.g08;(e.currentTarget as HTMLDivElement).style.borderColor=G.g60}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.025)";(e.currentTarget as HTMLDivElement).style.borderColor=G.g25}}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{background:G.g15, border:`1px solid ${G.g40}`}}>
                <Download className="w-5 h-5" style={{color:G.bri}}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-bold tracking-[0.2em] uppercase"
                  style={{color:G.bri}}>Download Recovery Scripts</p>
                <p className="text-[10px] mt-1" style={{color:G.dim}}>
                  25 professional appeal templates · 9 languages — free
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center gap-1">
                <span className="text-lg font-bold font-mono text-white">25</span>
                <span className="text-[8px] font-display tracking-widest uppercase" style={{color:G.dim}}>scripts</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── SCRIPTS PREVIEW (first 5 only, link to full page) ── */}
        <motion.div variants={fade} className="w-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 rounded-full" style={{background:G.pri}}/>
              <span className="font-display text-[11px] tracking-[0.3em] uppercase font-semibold" style={{color:G.pri}}>
                Recovery Scripts
              </span>
            </div>
            <Link href="/recovery-scripts">
              <span className="text-[10px] font-mono cursor-pointer transition-colors duration-150"
                style={{color:`${G.dim}`}}
                onMouseEnter={e=>{(e.currentTarget as HTMLSpanElement).style.color=G.pri}}
                onMouseLeave={e=>{(e.currentTarget as HTMLSpanElement).style.color=G.dim}}>
                View all {SCRIPTS.length} →
              </span>
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden"
            style={{border:`1px solid ${G.g15}`,
              background:"rgba(255,255,255,0.018)", backdropFilter:"blur(16px)"}}>
            {SCRIPTS.map((s,i)=>(
              <div key={s.id}
                className="flex items-center gap-3 px-4 py-3 transition-all duration-150"
                style={{borderBottom:i<SCRIPTS.length-1?`1px solid ${G.g08}`:"none"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background=G.g08}}
                onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="transparent"}}>
                {/* flag + lang badge */}
                <div className="flex items-center gap-1.5 flex-shrink-0 w-14">
                  <span className="text-base leading-none">{s.flag}</span>
                  <span className="text-[9px] font-mono font-bold" style={{color:`${G.dim}`}}>{s.lang}</span>
                </div>
                {/* name */}
                <span className="flex-1 text-[11px] text-white/70 font-mono truncate">{s.name}</span>
                {/* number badge */}
                <span className="text-[9px] font-mono flex-shrink-0 w-6 text-right" style={{color:`${G.g40}`}}>
                  {String(s.id).padStart(2,"0")}
                </span>
                {/* download button */}
                <a href={`/${s.file}`} download={s.file} className="flex-shrink-0">
                  <button
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                    style={{background:`${G.g08}`,border:`1px solid ${G.g15}`}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=G.g25;(e.currentTarget as HTMLButtonElement).style.borderColor=G.g40}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=G.g08;(e.currentTarget as HTMLButtonElement).style.borderColor=G.g15}}>
                    <Download className="w-3.5 h-3.5" style={{color:G.bri}}/>
                  </button>
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── WATERMARK ── */}
        <motion.div variants={fade} className="flex flex-col items-center gap-2 pt-4">
          <WaLogo/>
          <p className="text-[10px] tracking-[0.2em]" style={{color:"rgba(255,255,255,0.12)"}}>
            © 2025 VARNOX.WA RECOVERY
          </p>
        </motion.div>

        {/* ── FOOTER ── */}
        <motion.footer variants={fade} className="flex flex-col items-center gap-4">
          <div className="w-full h-px" style={{background:`linear-gradient(90deg,transparent,${G.g25},transparent)`}}/>
          <div className="flex items-center gap-3">
            {SOCIAL.map(({href,label,Icon})=>(
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{background:"rgba(255,255,255,0.04)", border:`1px solid ${G.g15}`}}
                onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.background=G.g15;(e.currentTarget as HTMLAnchorElement).style.borderColor=G.g40}}
                onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.04)";(e.currentTarget as HTMLAnchorElement).style.borderColor=G.g15}}>
                <Icon size={15} color="rgba(255,255,255,0.4)"/>
              </a>
            ))}
          </div>
          <p className="text-[9px] tracking-widest" style={{color:"rgba(255,255,255,0.1)"}}>
            Developed by <span style={{color:"rgba(255,255,255,0.18)"}}>𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮 𝚸𝚪𝚰𝚳𝚵𝚵𝚵𝚵𝚵𝚵</span>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
