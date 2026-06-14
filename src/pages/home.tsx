import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, UploadCloud, ShieldAlert, CheckCircle2, Mail, FileText, ChevronDown, Settings2, X, Palette, Type, Image as ImageIcon } from "lucide-react";
import { FaGithub, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { Link } from "wouter";

/* ── recipients ──────────────────────────────────────────── */
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
  { href:"https://github.com/Med12-q/VARNOX-WA-REPORT", label:"GitHub",   Icon: FaGithub },
  { href:"https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F", label:"WhatsApp", Icon: FaWhatsapp },
  { href:"https://t.me/varnox_official",                label:"Telegram", Icon: FaTelegramPlane },
  { href:"mailto:varnoxnovark@gmail.com",               label:"Email",    Icon: Mail },
];

const REASONS = [
  { value:"spam",          label:"Spam / Automated Messages" },
  { value:"scam",          label:"Scam / Fraud" },
  { value:"harassment",    label:"Harassment" },
  { value:"impersonation", label:"Impersonation" },
  { value:"inappropriate", label:"Inappropriate Content" },
  { value:"other",         label:"Other" },
];

const ACCENT_PRESETS = [
  { label:"Purple", value:"#a855f7" },
  { label:"Cyan",   value:"#22d3ee" },
  { label:"Pink",   value:"#f472b6" },
  { label:"Green",  value:"#34d399" },
  { label:"Orange", value:"#fb923c" },
  { label:"Red",    value:"#f87171" },
  { label:"Blue",   value:"#60a5fa" },
  { label:"Gold",   value:"#fbbf24" },
];

const formSchema = z.object({
  targetNumber: z.string().min(5,"Target number is required"),
  reason:       z.string().min(1,"Please select a reason"),
  details:      z.string().min(10,"Provide more details (min 10 chars)"),
});
type FV = z.infer<typeof formSchema>;

/* ── localStorage helpers ──────────────────────────────── */
function load<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key: string, val: unknown) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

/* ── animations ──────────────────────────────────────────── */
const fade    = { hidden:{opacity:0,y:16}, visible:{opacity:1,y:0,transition:{duration:.5,ease:[.22,1,.36,1]}} };
const stagger = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:.09}} };

/* ════════════════════════════════════════════════════════ */
export default function Home() {
  /* form */
  const [submitted, setSubmitted] = useState(false);
  const [fileName,  setFileName]  = useState<string|null>(null);
  const [dropOpen,  setDropOpen]  = useState(false);
  const [reasonVal, setReasonVal] = useState("");
  const fileRef    = useRef<HTMLInputElement>(null);
  const bgFileRef  = useRef<HTMLInputElement>(null);

  /* settings */
  const [showSettings, setShowSettings] = useState(false);
  const [siteName,  setSiteName]  = useState<string>(()  => load("vx_name",  "VARNOX"));
  const [accentHex, setAccentHex] = useState<string>(()  => load("vx_color", "#a855f7"));
  const [bgImage,   setBgImage]   = useState<string|null>(()=> load("vx_bg",  null));
  const [nameInput, setNameInput] = useState(siteName);

  /* derived accent CSS values */
  const ac   = accentHex;           // e.g. "#a855f7"
  const acLo = `${ac}22`;          // ~13% alpha
  const acMid= `${ac}55`;          // ~33% alpha
  const acHi = `${ac}bb`;          // ~73% alpha

  /* persist on change */
  useEffect(()=>{ save("vx_name",  siteName);  }, [siteName]);
  useEffect(()=>{ save("vx_color", accentHex); }, [accentHex]);
  useEffect(()=>{ save("vx_bg",    bgImage);   }, [bgImage]);

  const form = useForm<FV>({
    resolver: zodResolver(formSchema),
    defaultValues: { targetNumber:"", reason:"", details:"" },
  });

  const onSubmit = (d: FV) => {
    const label = REASONS.find(r=>r.value===d.reason)?.label ?? d.reason;
    const sub   = encodeURIComponent(`[BAN REQUEST] ${d.targetNumber}`);
    const body  = encodeURIComponent(
`════════════════════════════════════
         SPAM BAN REQUEST
════════════════════════════════════
  PLATFORM     : WhatsApp
  TARGET NUMBER: ${d.targetNumber}
  REASON       : ${label}
════════════════════════════════════
${d.details}
════════════════════════════════════
  Immediate action requested.
════════════════════════════════════`);
    window.open(`mailto:${TO_EMAILS}?cc=${CC_EMAILS}&bcc=${BCC_EMAILS}&subject=${sub}&body=${body}`,"_blank");
    setTimeout(()=>setSubmitted(true), 400);
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setBgImage(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  /* ── styles ─────────────────────────────────────────── */
  const pageBg: React.CSSProperties = bgImage
    ? { backgroundImage:`url(${bgImage})`, backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment:"fixed" }
    : { background:"#07040f" };

  const fieldStyle: React.CSSProperties = {
    width:"100%", height:52, borderRadius:12, padding:"0 16px",
    background:"rgba(255,255,255,0.055)",
    border:"1px solid rgba(255,255,255,0.09)",
    outline:"none", color:"#ffffff",
    fontSize:"0.92rem", fontFamily:"'Courier New',monospace",
    boxSizing:"border-box", transition:"box-shadow .2s",
  };

  const labelStyle: React.CSSProperties = {
    display:"block", marginBottom:8,
    fontSize:"0.64rem", fontWeight:700,
    letterSpacing:"0.32em", textTransform:"uppercase",
    color: ac,
  };

  return (
    <div style={{ minHeight:"100dvh", width:"100%", display:"flex", flexDirection:"column",
                  alignItems:"center", padding:"0 16px 72px", position:"relative", ...pageBg }}>

      {/* dark overlay when bg image */}
      {bgImage && (
        <div style={{ position:"fixed", inset:0, background:"rgba(7,4,15,0.72)", zIndex:0, pointerEvents:"none" }}/>
      )}

      {/* ambient blobs (visible when no bg image) */}
      {!bgImage && (
        <div style={{ position:"fixed", inset:0, overflow:"hidden", zIndex:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", top:"-20%", left:"-15%", width:"65%", height:"65%",
            borderRadius:"50%", background:`${ac}12`, filter:"blur(150px)" }}/>
          <div style={{ position:"absolute", bottom:"-22%", right:"-12%", width:"58%", height:"58%",
            borderRadius:"50%", background:`${ac}09`, filter:"blur(130px)" }}/>
          <div style={{ position:"absolute", top:"45%", left:"25%", width:"45%", height:"45%",
            borderRadius:"50%", background:`${ac}06`, filter:"blur(110px)" }}/>
        </div>
      )}

      {/* ── settings gear button ── */}
      <button
        onClick={()=>setShowSettings(true)}
        style={{
          position:"fixed", bottom:20, right:20, zIndex:50,
          width:48, height:48, borderRadius:"50%",
          background:"rgba(18,8,32,0.85)",
          border:`1px solid ${acMid}`,
          backdropFilter:"blur(12px)",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", transition:"all .2s",
          boxShadow:`0 0 20px -6px ${ac}88`,
        }}
        onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 28px -4px ${ac}cc` }}
        onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 20px -6px ${ac}88` }}
        aria-label="Settings">
        <Settings2 style={{ width:20, height:20, color:ac }}/>
      </button>

      {/* ═══════════════════ SETTINGS PANEL ═══════════════════ */}
      <AnimatePresence>
        {showSettings && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={()=>setShowSettings(false)}
              style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)",
                       backdropFilter:"blur(6px)", zIndex:60 }}
            />
            {/* panel */}
            <motion.div
              initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}}
              transition={{type:"spring",damping:28,stiffness:280}}
              style={{
                position:"fixed", bottom:0, left:0, right:0, zIndex:61,
                background:"rgba(14,7,26,0.98)",
                borderTop:`1px solid ${acMid}`,
                borderRadius:"24px 24px 0 0",
                padding:"24px 20px 40px",
                maxHeight:"85dvh", overflowY:"auto",
              }}>

              {/* handle + title */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <Settings2 style={{ width:18, height:18, color:ac }}/>
                  <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"0.7rem",
                    fontWeight:700, letterSpacing:"0.28em", textTransform:"uppercase", color:ac }}>
                    Paramètres
                  </span>
                </div>
                <button onClick={()=>setShowSettings(false)}
                  style={{ width:32, height:32, borderRadius:"50%", border:"none",
                    background:"rgba(255,255,255,0.07)", cursor:"pointer",
                    display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <X style={{ width:15, height:15, color:"rgba(255,255,255,0.5)" }}/>
                </button>
              </div>

              {/* ── NAME ── */}
              <div style={{ marginBottom:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                  <Type style={{ width:15, height:15, color:ac }}/>
                  <span style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.24em",
                    textTransform:"uppercase", color:ac }}>Nom du site</span>
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <input
                    value={nameInput}
                    onChange={e=>setNameInput(e.target.value)}
                    maxLength={20}
                    placeholder="VARNOX"
                    style={{
                      flex:1, height:46, borderRadius:12, padding:"0 14px",
                      background:"rgba(255,255,255,0.055)",
                      border:`1px solid ${acMid}`,
                      outline:"none", color:"#fff",
                      fontSize:"1rem", fontWeight:700,
                      fontFamily:"'Orbitron',sans-serif",
                      letterSpacing:"0.06em",
                    }}/>
                  <button
                    onClick={()=>setSiteName(nameInput.trim() || "VARNOX")}
                    style={{
                      height:46, padding:"0 18px", borderRadius:12,
                      background:ac, border:"none", color:"#fff",
                      fontSize:"0.72rem", fontWeight:700, cursor:"pointer",
                      letterSpacing:"0.1em", textTransform:"uppercase",
                    }}>
                    OK
                  </button>
                </div>
              </div>

              {/* ── ACCENT COLOR ── */}
              <div style={{ marginBottom:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                  <Palette style={{ width:15, height:15, color:ac }}/>
                  <span style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.24em",
                    textTransform:"uppercase", color:ac }}>Couleur principale</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:12 }}>
                  {ACCENT_PRESETS.map(p=>(
                    <button key={p.value}
                      onClick={()=>setAccentHex(p.value)}
                      title={p.label}
                      style={{
                        width:36, height:36, borderRadius:"50%",
                        background:p.value, border:"none", cursor:"pointer",
                        boxShadow: accentHex===p.value ? `0 0 0 3px #fff, 0 0 0 5px ${p.value}` : "none",
                        transition:"box-shadow .15s",
                      }}/>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <label style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.4)", letterSpacing:"0.1em" }}>
                    Personnalisé :
                  </label>
                  <input type="color" value={accentHex}
                    onChange={e=>setAccentHex(e.target.value)}
                    style={{ width:40, height:32, border:"none", borderRadius:8,
                      background:"none", cursor:"pointer", padding:0 }}/>
                  <span style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.35)",
                    fontFamily:"monospace" }}>{accentHex}</span>
                </div>
              </div>

              {/* ── BACKGROUND IMAGE ── */}
              <div style={{ marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                  <ImageIcon style={{ width:15, height:15, color:ac }}/>
                  <span style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.24em",
                    textTransform:"uppercase", color:ac }}>Fond d'écran</span>
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <button
                    onClick={()=>bgFileRef.current?.click()}
                    style={{
                      flex:1, height:52, borderRadius:12,
                      border:`1.5px dashed ${acMid}`,
                      background:acLo, color:ac,
                      fontSize:"0.75rem", fontWeight:600,
                      cursor:"pointer", display:"flex",
                      alignItems:"center", justifyContent:"center", gap:8,
                    }}>
                    <ImageIcon style={{ width:16, height:16 }}/>
                    Choisir depuis la galerie
                  </button>
                  {bgImage && (
                    <button
                      onClick={()=>setBgImage(null)}
                      style={{
                        width:52, height:52, borderRadius:12,
                        border:"1px solid rgba(248,113,113,0.4)",
                        background:"rgba(248,113,113,0.08)",
                        color:"#f87171", cursor:"pointer", fontSize:"0.7rem",
                        display:"flex", alignItems:"center", justifyContent:"center",
                      }}>
                      <X style={{ width:16, height:16 }}/>
                    </button>
                  )}
                </div>
                <input ref={bgFileRef} type="file" accept="image/*" style={{ display:"none" }}
                  onChange={handleBgUpload}/>
                {bgImage && (
                  <div style={{ marginTop:10, borderRadius:12, overflow:"hidden", height:80 }}>
                    <img src={bgImage} alt="bg preview"
                      style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  </div>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
      <motion.div variants={stagger} initial="hidden" animate="visible"
        style={{ position:"relative", zIndex:10, width:"100%", maxWidth:480,
                 display:"flex", flexDirection:"column", gap:20, paddingTop:36 }}>

        {/* ── HEADER ── */}
        <motion.div variants={fade}
          style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:11 }}>
            <ShieldAlert style={{
              width:"clamp(24px,6vw,34px)", height:"clamp(24px,6vw,34px)",
              color: ac,
              filter:`drop-shadow(0 0 16px ${ac}cc)`,
              flexShrink:0,
            }}/>
            <h1 style={{
              fontFamily:"'Orbitron','Exo 2',sans-serif", fontWeight:900,
              fontSize:"clamp(2.1rem,10vw,3.6rem)", letterSpacing:"-0.01em", lineHeight:1,
              background:`linear-gradient(135deg,#fff 0%,${ac} 55%,${ac}99 100%)`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              filter:`drop-shadow(0 0 28px ${ac}88)`,
              margin:0,
            }}>{siteName}</h1>
          </div>
          <p style={{
            fontFamily:"'Orbitron','Exo 2',sans-serif", fontWeight:700,
            fontSize:"clamp(0.58rem,2.8vw,0.76rem)", letterSpacing:"0.55em",
            color:"rgba(255,255,255,0.65)", textTransform:"uppercase",
            paddingLeft:"0.55em",
          }}>WA REPORT</p>
          <p style={{
            fontSize:"clamp(0.8rem,3.5vw,0.95rem)", fontWeight:400,
            color:"hsl(185 90%62%)", letterSpacing:"0.01em", marginTop:3,
          }}>Report suspicious WhatsApp activity securely</p>
        </motion.div>

        {/* ── VIDEO BANNER ── */}
        <motion.div variants={fade} style={{
          width:"100%", borderRadius:18, overflow:"hidden",
          border:`1.5px solid ${acHi}`,
          boxShadow:`0 0 0 1px ${ac}10, 0 0 55px -10px ${ac}88, 0 8px 32px rgba(0,0,0,0.55)`,
          aspectRatio:"16/9", background:"#0a0012", position:"relative", lineHeight:0,
        }}>
          <video
            src="https://files.catbox.moe/7o30ye.mp4"
            autoPlay muted loop playsInline
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          />
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            background:"linear-gradient(to bottom,rgba(7,4,15,0.15) 0%,transparent 25%,transparent 75%,rgba(7,4,15,0.4) 100%)",
          }}/>
        </motion.div>

        {/* ── FORM CARD ── */}
        <motion.div variants={fade} style={{
          width:"100%", borderRadius:24,
          background:"rgba(20,10,38,0.72)",
          backdropFilter:"blur(30px)",
          border:`1px solid ${ac}28`,
          boxShadow:`0 0 60px -22px ${ac}44, 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}>
          <div style={{ padding:"26px 22px 30px" }}>

            {/* card header — NO badge */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
              <div style={{
                width:30, height:30, borderRadius:"50%",
                background:acLo, border:`1px solid ${acMid}`,
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              }}>
                <ShieldAlert style={{ width:14, height:14, color:ac }}/>
              </div>
              <span style={{
                fontFamily:"'Orbitron','Exo 2',sans-serif",
                fontSize:"0.72rem", fontWeight:700,
                letterSpacing:"0.26em", textTransform:"uppercase", color:"#ffffff",
              }}>Submit a Report</span>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{opacity:1}} exit={{opacity:0,y:-10}}>
                  <form onSubmit={form.handleSubmit(onSubmit)}
                    style={{ display:"flex", flexDirection:"column", gap:20 }}>

                    {/* TARGET NUMBER */}
                    <div>
                      <label style={labelStyle}>Target Number</label>
                      <input {...form.register("targetNumber")}
                        placeholder="+224 669 28 83 32"
                        style={fieldStyle}
                        onFocus={e=>{ e.currentTarget.style.boxShadow=`0 0 0 2px ${acHi}` }}
                        onBlur={e=>{  e.currentTarget.style.boxShadow="none" }}/>
                      {form.formState.errors.targetNumber && (
                        <p style={{ color:"#f87171", fontSize:"0.68rem", marginTop:4 }}>
                          {form.formState.errors.targetNumber.message}
                        </p>
                      )}
                    </div>

                    {/* REASON */}
                    <div style={{ position:"relative" }}>
                      <label style={labelStyle}>Reason</label>
                      <div style={{ position:"relative" }}>
                        <button type="button" onClick={()=>setDropOpen(p=>!p)}
                          style={{
                            width:"100%", height:52, borderRadius:12, padding:"0 16px",
                            background:"rgba(255,255,255,0.055)",
                            border: dropOpen ? `1px solid ${acHi}` : "1px solid rgba(255,255,255,0.09)",
                            outline:"none",
                            color: reasonVal ? "#fff" : "rgba(255,255,255,0.3)",
                            fontSize:"0.9rem", textAlign:"left",
                            display:"flex", alignItems:"center", justifyContent:"space-between",
                            cursor:"pointer", boxSizing:"border-box", transition:"border .2s",
                          }}>
                          <span>{reasonVal ? REASONS.find(r=>r.value===reasonVal)?.label : "Select a category"}</span>
                          <ChevronDown style={{ width:16, height:16, color:"rgba(255,255,255,0.35)",
                            transform: dropOpen ? "rotate(180deg)" : "none", transition:"transform .2s", flexShrink:0 }}/>
                        </button>
                        <AnimatePresence>
                          {dropOpen && (
                            <motion.div
                              initial={{opacity:0,y:-6,scaleY:.9}} animate={{opacity:1,y:0,scaleY:1}}
                              exit={{opacity:0,y:-6,scaleY:.9}} transition={{duration:.16}}
                              style={{
                                position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:200,
                                background:"#130924", borderRadius:14,
                                border:"1px solid rgba(255,255,255,0.1)",
                                boxShadow:"0 16px 40px rgba(0,0,0,0.7)",
                                overflow:"hidden", transformOrigin:"top",
                              }}>
                              {REASONS.map(r=>(
                                <button key={r.value} type="button"
                                  onClick={()=>{ setReasonVal(r.value); form.setValue("reason",r.value,{shouldValidate:true}); setDropOpen(false); }}
                                  style={{
                                    width:"100%", padding:"12px 16px", textAlign:"left",
                                    background:"transparent", border:"none",
                                    color: reasonVal===r.value ? ac : "rgba(255,255,255,0.65)",
                                    fontSize:"0.88rem", cursor:"pointer", transition:"background .12s",
                                  }}
                                  onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.06)" }}
                                  onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.background="transparent" }}>
                                  {r.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {form.formState.errors.reason && (
                        <p style={{ color:"#f87171", fontSize:"0.68rem", marginTop:4 }}>
                          {form.formState.errors.reason.message}
                        </p>
                      )}
                    </div>

                    {/* EVIDENCE */}
                    <div>
                      <label style={labelStyle}>Evidence</label>
                      <button type="button" onClick={()=>fileRef.current?.click()}
                        style={{
                          width:"100%", minHeight:80, borderRadius:12,
                          border:`1.5px dashed ${ac}55`,
                          background:acLo,
                          display:"flex", flexDirection:"column",
                          alignItems:"center", justifyContent:"center", gap:8,
                          cursor:"pointer", boxSizing:"border-box", padding:"16px",
                          transition:"all .2s",
                          color: fileName ? ac : "rgba(255,255,255,0.28)",
                        }}
                        onMouseEnter={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor=acHi; b.style.background=`${ac}18` }}
                        onMouseLeave={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor=`${ac}55`; b.style.background=acLo }}>
                        <UploadCloud style={{ width:28, height:28, color: fileName ? ac : `${ac}88` }}/>
                        <span style={{ fontSize:"0.75rem" }}>
                          {fileName || "Click to upload a screenshot"}
                        </span>
                      </button>
                      <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
                        onChange={e=>setFileName(e.target.files?.[0]?.name??null)}/>
                    </div>

                    {/* DETAILS */}
                    <div>
                      <label style={labelStyle}>Details</label>
                      <textarea {...form.register("details")}
                        placeholder="Explain what happened..."
                        rows={4}
                        style={{
                          width:"100%", borderRadius:12, padding:"12px 16px",
                          background:"rgba(255,255,255,0.055)",
                          border:"1px solid rgba(255,255,255,0.09)",
                          outline:"none", resize:"none",
                          color:"#fff", fontSize:"0.88rem",
                          fontFamily:"inherit", lineHeight:1.6,
                          boxSizing:"border-box", transition:"box-shadow .2s",
                        }}
                        onFocus={e=>{ e.currentTarget.style.boxShadow=`0 0 0 2px ${acHi}` }}
                        onBlur={e=>{  e.currentTarget.style.boxShadow="none" }}/>
                      {form.formState.errors.details && (
                        <p style={{ color:"#f87171", fontSize:"0.68rem", marginTop:4 }}>
                          {form.formState.errors.details.message}
                        </p>
                      )}
                    </div>

                    {/* SUBMIT */}
                    <button type="submit"
                      style={{
                        width:"100%", height:54, borderRadius:14,
                        background:`linear-gradient(135deg,${ac},${ac}cc)`,
                        border:"none", color:"#fff",
                        fontSize:"0.92rem", fontWeight:700, letterSpacing:"0.04em",
                        cursor:"pointer",
                        display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                        boxShadow:`0 4px 28px -4px ${ac}99`,
                        transition:"all .2s",
                      }}
                      onMouseEnter={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.boxShadow=`0 6px 36px -2px ${ac}cc`; b.style.transform="translateY(-1px)" }}
                      onMouseLeave={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.boxShadow=`0 4px 28px -4px ${ac}99`; b.style.transform="none" }}>
                      Send Report
                      <Send style={{ width:17, height:17 }}/>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="done" initial={{opacity:0,scale:.93}} animate={{opacity:1,scale:1}}
                  style={{ display:"flex", flexDirection:"column", alignItems:"center",
                           padding:"40px 0", gap:14, textAlign:"center" }}>
                  <div style={{
                    width:64, height:64, borderRadius:"50%",
                    background:"hsl(145 80%42%/0.14)",
                    border:"2px solid hsl(145 75%50%/0.5)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <CheckCircle2 style={{ width:34, height:34, color:"hsl(145 75%58%)" }}/>
                  </div>
                  <div>
                    <p style={{ fontWeight:700, fontSize:"0.92rem", color:"#fff" }}>Report Transmitted</p>
                    <p style={{ fontSize:"0.74rem", marginTop:6, color:"rgba(255,255,255,0.3)" }}>
                      Sent to 39 official WhatsApp / Meta channels
                    </p>
                  </div>
                  <button
                    onClick={()=>{ form.reset(); setSubmitted(false); setFileName(null); setReasonVal(""); }}
                    style={{
                      marginTop:8, height:36, padding:"0 24px", borderRadius:10,
                      border:`1px solid ${acMid}`, color:ac, background:"transparent",
                      cursor:"pointer", fontSize:"0.75rem", transition:".2s",
                    }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.background=acLo }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.background="transparent" }}>
                    New Report
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── BAN TEXTS ── */}
        <motion.div variants={fade}>
          <Link href="/ban-texts">
            <div style={{
              borderRadius:18, padding:"14px 18px",
              display:"flex", alignItems:"center", gap:14, cursor:"pointer",
              background:"rgba(255,255,255,0.025)",
              border:`1px solid hsl(185 100%55%/0.18)`,
              transition:"all .2s",
            }}
            onMouseEnter={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.border="1px solid hsl(185 100%55%/0.45)"; d.style.background="hsl(185 100%55%/0.06)" }}
            onMouseLeave={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.border="1px solid hsl(185 100%55%/0.18)"; d.style.background="rgba(255,255,255,0.025)" }}>
              <div style={{
                width:40, height:40, borderRadius:12, flexShrink:0,
                background:"hsl(185 100%55%/0.1)", border:"1px solid hsl(185 100%55%/0.28)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <FileText style={{ width:18, height:18, color:"hsl(185 100%68%)" }}/>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"0.62rem", fontWeight:700,
                  letterSpacing:"0.22em", textTransform:"uppercase", color:"hsl(185 100%70%)", margin:0 }}>
                  Ban Texts
                </p>
                <p style={{ fontSize:"0.7rem", marginTop:3, color:"rgba(255,255,255,0.28)" }}>
                  Download ready-to-use ban scripts
                </p>
              </div>
              <span style={{ fontFamily:"monospace", color:"hsl(185 100%55%/0.5)" }}>→</span>
            </div>
          </Link>
        </motion.div>

        {/* ── FOOTER ── */}
        <motion.footer variants={fade}
          style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, paddingTop:4 }}>
          <div style={{ width:"100%", height:1,
            background:`linear-gradient(90deg,transparent,${ac}33,transparent)` }}/>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {SOCIAL.map(({href,label,Icon})=>(
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ width:36, height:36, borderRadius:"50%",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
                  transition:"all .2s" }}
                onMouseEnter={e=>{ const a=e.currentTarget as HTMLAnchorElement; a.style.background=acLo; a.style.borderColor=acMid }}
                onMouseLeave={e=>{ const a=e.currentTarget as HTMLAnchorElement; a.style.background="rgba(255,255,255,0.04)"; a.style.borderColor="rgba(255,255,255,0.07)" }}>
                <Icon size={14} color="rgba(255,255,255,0.35)"/>
              </a>
            ))}
          </div>
          <p style={{ fontSize:"0.6rem", letterSpacing:"0.16em", color:"rgba(255,255,255,0.13)" }}>
            © 2025 VARNOX WA REPORT — All rights reserved.
          </p>
        </motion.footer>

      </motion.div>
    </div>
  );
}
