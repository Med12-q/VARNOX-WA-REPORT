import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, UploadCloud, ShieldAlert, CheckCircle2, Mail, FileText, ChevronDown } from "lucide-react";
import { FaGithub, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { Link } from "wouter";

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

const formSchema = z.object({
  targetNumber: z.string().min(5,"Target number is required"),
  reason:       z.string().min(1,"Please select a reason"),
  details:      z.string().min(10,"Provide more details (min 10 chars)"),
});
type FV = z.infer<typeof formSchema>;

/* ── animation variants ──────────────────────────────────── */
const fade    = { hidden:{opacity:0,y:18}, visible:{opacity:1,y:0,transition:{duration:.55,ease:[.22,1,.36,1]}} };
const stagger = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:.1}} };

/* ──────────────────────────────────────────────────────────── */
export default function Home() {
  const [submitted,  setSubmitted]  = useState(false);
  const [fileName,   setFileName]   = useState<string|null>(null);
  const [dropOpen,   setDropOpen]   = useState(false);
  const [reasonVal,  setReasonVal]  = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FV>({
    resolver: zodResolver(formSchema),
    defaultValues: { targetNumber:"", reason:"", details:"" },
  });

  const onSubmit = (d: FV) => {
    const label  = REASONS.find(r=>r.value===d.reason)?.label ?? d.reason;
    const sub    = encodeURIComponent(`[BAN REQUEST] ${d.targetNumber}`);
    const body   = encodeURIComponent(
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
    window.open(
      `mailto:${TO_EMAILS}?cc=${CC_EMAILS}&bcc=${BCC_EMAILS}&subject=${sub}&body=${body}`,
      "_blank"
    );
    setTimeout(()=>setSubmitted(true), 400);
  };

  /* colour tokens */
  const card  = "rgba(22,14,42,0.82)";
  const field = "rgba(255,255,255,0.055)";
  const ring  = "1px solid rgba(255,255,255,0.08)";

  return (
    <div style={{ minHeight:"100dvh", width:"100%", background:"#07040f",
                  display:"flex", flexDirection:"column", alignItems:"center",
                  padding:"0 16px 64px" }}>

      {/* ── ambient background blobs ── */}
      <div style={{ position:"fixed", inset:0, overflow:"hidden", zIndex:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"-25%", left:"-18%", width:"68%", height:"68%",
          borderRadius:"50%", background:"hsl(280 100%50%/0.07)", filter:"blur(140px)" }}/>
        <div style={{ position:"absolute", bottom:"-22%", right:"-12%", width:"60%", height:"60%",
          borderRadius:"50%", background:"hsl(260 80%50%/0.045)", filter:"blur(120px)" }}/>
        <div style={{ position:"absolute", top:"40%", left:"30%", width:"40%", height:"40%",
          borderRadius:"50%", background:"hsl(270 100%45%/0.03)", filter:"blur(100px)" }}/>
      </div>

      <motion.div variants={stagger} initial="hidden" animate="visible"
        style={{ position:"relative", zIndex:10, width:"100%", maxWidth:480,
                 display:"flex", flexDirection:"column", gap:20, paddingTop:40 }}>

        {/* ── VARNOX HEADER ── */}
        <motion.div variants={fade} style={{ display:"flex", flexDirection:"column",
          alignItems:"center", gap:6, textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
            <ShieldAlert style={{
              width:"clamp(26px,6.5vw,36px)", height:"clamp(26px,6.5vw,36px)",
              color:"hsl(280 100%72%)",
              filter:"drop-shadow(0 0 16px hsl(280 100%72%/0.8))",
              flexShrink:0,
            }}/>
            <h1 style={{
              fontFamily:"'Orbitron','Exo 2',sans-serif", fontWeight:900,
              fontSize:"clamp(2rem,10vw,3.5rem)", letterSpacing:"-0.02em", lineHeight:1,
              background:"linear-gradient(135deg,#fff 0%,hsl(280,100%,86%) 40%,hsl(270,100%,66%) 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              filter:"drop-shadow(0 0 30px hsl(280 100%70%/0.45))",
              margin:0,
            }}>VARNOX</h1>
          </div>
          <p style={{
            fontFamily:"'Orbitron','Exo 2',sans-serif", fontWeight:700,
            fontSize:"clamp(0.56rem,2.6vw,0.74rem)", letterSpacing:"0.58em",
            color:"hsl(280 60%75%)", textTransform:"uppercase", paddingLeft:"0.58em",
          }}>WA REPORT</p>
          <p style={{
            fontSize:"clamp(0.78rem,3.4vw,0.92rem)", fontWeight:400,
            color:"rgba(255,255,255,0.42)", letterSpacing:"0.01em", marginTop:2,
          }}>Report suspicious WhatsApp activity safely</p>
        </motion.div>

        {/* ── VIDEO BANNER ── */}
        <motion.div variants={fade} style={{
          width:"100%", borderRadius:18,
          overflow:"hidden",
          border:"1.5px solid hsl(280 100%58%/0.4)",
          boxShadow:"0 0 0 1px hsl(280 100%45%/0.06), 0 0 55px -10px hsl(280 100%60%/0.45), 0 8px 32px rgba(0,0,0,0.5)",
          aspectRatio:"16/9",
          background:"#0a0012",
          position:"relative",
        }}>
          <video
            src="https://files.catbox.moe/7o30ye.mp4"
            autoPlay muted loop playsInline
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          />
          {/* top gradient overlay */}
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            background:"linear-gradient(to bottom, rgba(7,4,15,0.18) 0%, transparent 30%, transparent 70%, rgba(7,4,15,0.45) 100%)",
          }}/>
        </motion.div>

        {/* ── FORM CARD ── */}
        <motion.div variants={fade} style={{
          width:"100%", borderRadius:24, overflow:"hidden",
          background:card,
          backdropFilter:"blur(32px)",
          border:"1px solid rgba(255,255,255,0.07)",
          boxShadow:"0 0 60px -20px hsl(280 100%55%/0.18), 0 24px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          <div style={{ padding:"28px 24px 32px" }}>

            {/* card top bar */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{
                  width:32, height:32, borderRadius:"50%",
                  background:"hsl(280 100%60%/0.12)", border:"1px solid hsl(280 100%60%/0.35)",
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                }}>
                  <ShieldAlert style={{ width:15, height:15, color:"hsl(280 100%78%)" }}/>
                </div>
                <span style={{
                  fontFamily:"'Orbitron','Exo 2',sans-serif",
                  fontSize:"0.68rem", fontWeight:700,
                  letterSpacing:"0.28em", textTransform:"uppercase",
                  color:"hsl(280 100%82%)",
                }}>Submit a Report</span>
              </div>
              <div style={{
                display:"flex", alignItems:"center", gap:6,
                padding:"5px 12px", borderRadius:999,
                background:"hsl(280 100%55%/0.08)",
                border:"1px solid hsl(280 100%55%/0.22)",
              }}>
                <span style={{
                  width:7, height:7, borderRadius:"50%",
                  background:"hsl(280 100%72%)",
                  boxShadow:"0 0 8px hsl(280 100%72%/0.8)",
                  animation:"pulse 1.8s ease-in-out infinite",
                  display:"inline-block",
                }}/>
                <span style={{
                  fontFamily:"'Orbitron','Exo 2',sans-serif",
                  fontSize:"0.5rem", fontWeight:700,
                  letterSpacing:"0.22em", color:"hsl(280 100%80%)",
                }}>39 RECIPIENTS</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{opacity:1}} exit={{opacity:0,y:-10}}>
                  <form onSubmit={form.handleSubmit(onSubmit)}
                    style={{ display:"flex", flexDirection:"column", gap:18 }}>

                    {/* TARGET NUMBER */}
                    <div>
                      <label style={{
                        display:"block", marginBottom:8,
                        fontWeight:700, fontSize:"0.78rem",
                        letterSpacing:"0.06em", textTransform:"uppercase",
                        color:"#ffffff",
                      }}>Target Number</label>
                      <input
                        {...form.register("targetNumber")}
                        placeholder="+1 234 567 8900"
                        style={{
                          width:"100%", height:52, borderRadius:12, padding:"0 16px",
                          background:field, border:ring, outline:"none",
                          color:"#ffffff", fontSize:"0.9rem", fontFamily:"monospace",
                          boxSizing:"border-box", transition:"box-shadow .2s",
                        }}
                        onFocus={e=>{ e.currentTarget.style.boxShadow="0 0 0 2px hsl(280 100%65%/0.45)" }}
                        onBlur={e=>{ e.currentTarget.style.boxShadow="none" }}
                      />
                      {form.formState.errors.targetNumber && (
                        <p style={{ color:"#f87171", fontSize:"0.7rem", marginTop:4 }}>
                          {form.formState.errors.targetNumber.message}
                        </p>
                      )}
                    </div>

                    {/* REASON */}
                    <div style={{ position:"relative" }}>
                      <label style={{
                        display:"block", marginBottom:8,
                        fontWeight:700, fontSize:"0.78rem",
                        letterSpacing:"0.06em", textTransform:"uppercase",
                        color:"#ffffff",
                      }}>Reason</label>
                      <div style={{ position:"relative" }}>
                        <button
                          type="button"
                          onClick={()=>setDropOpen(p=>!p)}
                          style={{
                            width:"100%", height:52, borderRadius:12, padding:"0 16px",
                            background:field, border: dropOpen ? "1px solid hsl(280 100%65%/0.45)" : ring,
                            outline:"none", color: reasonVal ? "#ffffff" : "rgba(255,255,255,0.28)",
                            fontSize:"0.88rem", textAlign:"left",
                            display:"flex", alignItems:"center", justifyContent:"space-between",
                            cursor:"pointer", boxSizing:"border-box", transition:"border .2s",
                          }}>
                          <span>{reasonVal ? REASONS.find(r=>r.value===reasonVal)?.label : "Select..."}</span>
                          <ChevronDown style={{
                            width:16, height:16, color:"rgba(255,255,255,0.35)",
                            transform: dropOpen ? "rotate(180deg)" : "none", transition:"transform .2s",
                          }}/>
                        </button>
                        <AnimatePresence>
                          {dropOpen && (
                            <motion.div
                              initial={{opacity:0,y:-6,scaleY:0.92}} animate={{opacity:1,y:0,scaleY:1}}
                              exit={{opacity:0,y:-6,scaleY:0.92}} transition={{duration:.18}}
                              style={{
                                position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:100,
                                background:"#170d2a", borderRadius:14,
                                border:"1px solid rgba(255,255,255,0.1)",
                                boxShadow:"0 16px 40px rgba(0,0,0,0.6)",
                                overflow:"hidden",
                                transformOrigin:"top",
                              }}>
                              {REASONS.map(r=>(
                                <button
                                  key={r.value} type="button"
                                  onClick={()=>{
                                    setReasonVal(r.value);
                                    form.setValue("reason",r.value,{shouldValidate:true});
                                    setDropOpen(false);
                                  }}
                                  style={{
                                    width:"100%", padding:"12px 16px", textAlign:"left",
                                    background:"transparent", border:"none",
                                    color: reasonVal===r.value ? "hsl(280 100%80%)" : "rgba(255,255,255,0.7)",
                                    fontSize:"0.86rem", cursor:"pointer", transition:"background .15s",
                                  }}
                                  onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.06)" }}
                                  onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.background="transparent" }}
                                >{r.label}</button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {form.formState.errors.reason && (
                        <p style={{ color:"#f87171", fontSize:"0.7rem", marginTop:4 }}>
                          {form.formState.errors.reason.message}
                        </p>
                      )}
                    </div>

                    {/* EVIDENCE */}
                    <div>
                      <label style={{
                        display:"block", marginBottom:8,
                        fontWeight:600, fontSize:"0.8rem", color:"rgba(255,255,255,0.75)",
                      }}>Evidence</label>
                      <button
                        type="button"
                        onClick={()=>fileRef.current?.click()}
                        style={{
                          width:"100%", height:60, borderRadius:12,
                          border:"1.5px dashed rgba(255,255,255,0.18)",
                          background:"rgba(255,255,255,0.025)",
                          display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                          cursor:"pointer", transition:"all .2s", boxSizing:"border-box",
                          color: fileName ? "hsl(280 100%82%)" : "rgba(255,255,255,0.28)",
                          fontSize:"0.8rem",
                        }}
                        onMouseEnter={e=>{
                          const b=e.currentTarget as HTMLButtonElement;
                          b.style.borderColor="hsl(280 100%65%/0.5)";
                          b.style.background="hsl(280 100%55%/0.06)";
                        }}
                        onMouseLeave={e=>{
                          const b=e.currentTarget as HTMLButtonElement;
                          b.style.borderColor="rgba(255,255,255,0.18)";
                          b.style.background="rgba(255,255,255,0.025)";
                        }}>
                        <UploadCloud style={{ width:20, height:20 }}/>
                        {fileName || "Click to upload screenshot"}
                      </button>
                      <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
                        onChange={e=>setFileName(e.target.files?.[0]?.name??null)}/>
                    </div>

                    {/* DETAILS */}
                    <div>
                      <label style={{
                        display:"block", marginBottom:8,
                        fontWeight:600, fontSize:"0.8rem", color:"rgba(255,255,255,0.75)",
                      }}>Details</label>
                      <textarea
                        {...form.register("details")}
                        placeholder="Explain what happened..."
                        rows={4}
                        style={{
                          width:"100%", borderRadius:12, padding:"12px 16px",
                          background:field, border:ring, outline:"none", resize:"none",
                          color:"#ffffff", fontSize:"0.86rem",
                          fontFamily:"inherit", lineHeight:1.6,
                          boxSizing:"border-box", transition:"box-shadow .2s",
                        }}
                        onFocus={e=>{ e.currentTarget.style.boxShadow="0 0 0 2px hsl(280 100%65%/0.4)" }}
                        onBlur={e=>{ e.currentTarget.style.boxShadow="none" }}
                      />
                      {form.formState.errors.details && (
                        <p style={{ color:"#f87171", fontSize:"0.7rem", marginTop:4 }}>
                          {form.formState.errors.details.message}
                        </p>
                      )}
                    </div>

                    {/* SEND REPORT BUTTON */}
                    <button
                      type="submit"
                      style={{
                        width:"100%", height:56, borderRadius:14,
                        background:"linear-gradient(135deg,#2563eb,#3b82f6,#1d4ed8)",
                        border:"none", color:"#ffffff", fontSize:"1rem", fontWeight:700,
                        letterSpacing:"0.02em", cursor:"pointer",
                        display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                        boxShadow:"0 4px 24px rgba(59,130,246,0.45)",
                        transition:"all .2s",
                      }}
                      onMouseEnter={e=>{
                        const b=e.currentTarget as HTMLButtonElement;
                        b.style.boxShadow="0 6px 32px rgba(59,130,246,0.65)";
                        b.style.transform="translateY(-1px)";
                      }}
                      onMouseLeave={e=>{
                        const b=e.currentTarget as HTMLButtonElement;
                        b.style.boxShadow="0 4px 24px rgba(59,130,246,0.45)";
                        b.style.transform="none";
                      }}>
                      Send Report
                      <Send style={{ width:18, height:18 }}/>
                    </button>

                    {/* REPORT READY indicator */}
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, paddingTop:4 }}>
                      <div style={{
                        width:40, height:40, borderRadius:"50%",
                        background:"hsl(145 80%42%/0.15)", border:"2px solid hsl(145 80%50%/0.5)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                      }}>
                        <CheckCircle2 style={{ width:22, height:22, color:"hsl(145 75%55%)" }}/>
                      </div>
                      <span style={{ color:"hsl(145 75%55%)", fontSize:"0.82rem", fontWeight:700 }}>
                        Report Ready!
                      </span>
                    </div>

                  </form>
                </motion.div>
              ) : (
                <motion.div key="done" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}}
                  style={{ display:"flex", flexDirection:"column", alignItems:"center",
                           padding:"40px 0", gap:16, textAlign:"center" }}>
                  <div style={{
                    width:64, height:64, borderRadius:"50%",
                    background:"hsl(145 80%42%/0.15)", border:"2px solid hsl(145 80%50%/0.5)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <CheckCircle2 style={{ width:34, height:34, color:"hsl(145 75%55%)" }}/>
                  </div>
                  <div>
                    <p style={{ fontWeight:700, fontSize:"0.9rem", color:"#fff", letterSpacing:"0.06em" }}>
                      Report Transmitted
                    </p>
                    <p style={{ fontSize:"0.75rem", marginTop:6, color:"rgba(255,255,255,0.32)" }}>
                      Sent to 39 official WhatsApp / Meta channels
                    </p>
                  </div>
                  <button
                    onClick={()=>{ form.reset(); setSubmitted(false); setFileName(null); setReasonVal(""); }}
                    style={{
                      marginTop:8, height:36, padding:"0 24px", borderRadius:10,
                      border:"1px solid rgba(255,255,255,0.18)", color:"rgba(255,255,255,0.55)",
                      background:"transparent", cursor:"pointer", fontSize:"0.75rem", transition:".2s",
                    }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.07)" }}
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
            <div
              style={{
                borderRadius:18, padding:"14px 18px",
                display:"flex", alignItems:"center", gap:14, cursor:"pointer",
                background:"rgba(255,255,255,0.025)",
                border:"1px solid hsl(185 100%55%/0.18)",
                transition:"all .2s",
              }}
              onMouseEnter={e=>{
                const d=e.currentTarget as HTMLDivElement;
                d.style.border="1px solid hsl(185 100%55%/0.45)";
                d.style.background="hsl(185 100%55%/0.06)";
              }}
              onMouseLeave={e=>{
                const d=e.currentTarget as HTMLDivElement;
                d.style.border="1px solid hsl(185 100%55%/0.18)";
                d.style.background="rgba(255,255,255,0.025)";
              }}>
              <div style={{
                width:40, height:40, borderRadius:12, flexShrink:0,
                background:"hsl(185 100%55%/0.1)", border:"1px solid hsl(185 100%55%/0.28)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <FileText style={{ width:18, height:18, color:"hsl(185 100%68%)" }}/>
              </div>
              <div style={{ flex:1 }}>
                <p style={{
                  fontFamily:"'Orbitron','Exo 2',sans-serif",
                  fontSize:"0.63rem", fontWeight:700,
                  letterSpacing:"0.22em", textTransform:"uppercase",
                  color:"hsl(185 100%70%)", margin:0,
                }}>Ban Texts</p>
                <p style={{ fontSize:"0.7rem", marginTop:3, color:"rgba(255,255,255,0.28)" }}>
                  Download ready-to-use ban scripts
                </p>
              </div>
              <span style={{ fontSize:"0.85rem", color:"hsl(185 100%55%/0.5)", fontFamily:"monospace" }}>→</span>
            </div>
          </Link>
        </motion.div>

        {/* ── FOOTER ── */}
        <motion.footer variants={fade}
          style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, paddingTop:4 }}>
          <div style={{ width:"100%", height:1,
            background:"linear-gradient(90deg,transparent,hsl(280 100%55%/0.2),transparent)" }}/>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {SOCIAL.map(({href,label,Icon})=>(
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{
                  width:36, height:36, borderRadius:"50%",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
                  transition:"all .2s",
                }}
                onMouseEnter={e=>{
                  const a=e.currentTarget as HTMLAnchorElement;
                  a.style.background="hsl(280 100%55%/0.14)";
                  a.style.borderColor="hsl(280 100%55%/0.38)";
                }}
                onMouseLeave={e=>{
                  const a=e.currentTarget as HTMLAnchorElement;
                  a.style.background="rgba(255,255,255,0.04)";
                  a.style.borderColor="rgba(255,255,255,0.07)";
                }}>
                <Icon size={14} color="rgba(255,255,255,0.35)"/>
              </a>
            ))}
          </div>
          <p style={{ fontSize:"0.6rem", letterSpacing:"0.16em", color:"rgba(255,255,255,0.13)" }}>
            © 2025 VARNOX WA REPORT — All rights reserved.
          </p>
          <p style={{ fontSize:"0.54rem", color:"rgba(255,255,255,0.09)" }}>
            Developed by <span style={{ color:"rgba(255,255,255,0.18)" }}>𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝮈</span>
          </p>
        </motion.footer>

      </motion.div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; }
          50% { opacity:0.4; }
        }
      `}</style>
    </div>
  );
}
