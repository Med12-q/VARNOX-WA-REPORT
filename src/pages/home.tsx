import { useState, useRef, useEffect } from "react";
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
  { href:"https://github.com/Med12-q/VARNOX-WA-REPORT",           label:"GitHub",   Icon: FaGithub },
  { href:"https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F", label:"WhatsApp", Icon: FaWhatsapp },
  { href:"https://t.me/varnox_official",                           label:"Telegram", Icon: FaTelegramPlane },
  { href:"mailto:varnoxnovark@gmail.com",                          label:"Email",    Icon: Mail },
];

const formSchema = z.object({
  targetNumber: z.string().min(5, "Target number is required"),
  reason:       z.string().min(1, "Please select a reason"),
  details:      z.string().min(10, "Provide more details (min 10 chars)"),
});
type FV = z.infer<typeof formSchema>;

/* ── Animated Cinematic Banner (replaces video) ──────────── */
function CinematicBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PANELS = [
      { x: 0,    colors: ["#1a0030","#320060","#0a000f"], eyeColor: "#b040ff" },
      { x: 0.2,  colors: ["#0f0020","#200040","#050008"], eyeColor: "#7020d0" },
      { x: 0.4,  colors: ["#000010","#0a0025","#000008"], eyeColor: "#401080" },
      { x: 0.6,  colors: ["#0f0020","#200040","#050008"], eyeColor: "#7020d0" },
      { x: 0.8,  colors: ["#1a0030","#280050","#090010"], eyeColor: "#9030e0" },
    ];

    let t = 0;
    const W = canvas.width;
    const H = canvas.height;

    const draw = () => {
      t += 0.012;

      // black base
      ctx.fillStyle = "#05000f";
      ctx.fillRect(0, 0, W, H);

      const pw = W / PANELS.length;

      PANELS.forEach((p, i) => {
        const px = pw * i;
        const phase = t + i * 0.8;

        // panel gradient base
        const grad = ctx.createLinearGradient(px, 0, px, H);
        grad.addColorStop(0, p.colors[0]);
        grad.addColorStop(0.5, p.colors[1]);
        grad.addColorStop(1, p.colors[2]);
        ctx.fillStyle = grad;
        ctx.fillRect(px, 0, pw, H);

        // animated glow orb (head silhouette area)
        const headY = H * 0.35 + Math.sin(phase) * H * 0.04;
        const headR = pw * 0.32;
        const hGrad = ctx.createRadialGradient(px + pw / 2, headY, 0, px + pw / 2, headY, headR);
        hGrad.addColorStop(0, `${p.eyeColor}18`);
        hGrad.addColorStop(0.5, `${p.eyeColor}08`);
        hGrad.addColorStop(1, "transparent");
        ctx.fillStyle = hGrad;
        ctx.fillRect(px, 0, pw, H);

        // glowing eyes
        const eyeY = H * 0.38 + Math.sin(phase) * H * 0.04;
        const eyeSpacing = pw * 0.14;
        const eyeCx = px + pw / 2;
        const alpha = 0.55 + 0.45 * Math.sin(phase * 1.7);

        [-1, 1].forEach(side => {
          const ex = eyeCx + side * eyeSpacing;
          const ey = eyeY;

          // outer glow
          const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, pw * 0.1);
          eg.addColorStop(0, `${p.eyeColor}${Math.round(alpha * 255).toString(16).padStart(2,"0")}`);
          eg.addColorStop(0.4, `${p.eyeColor}${Math.round(alpha * 0.4 * 255).toString(16).padStart(2,"0")}`);
          eg.addColorStop(1, "transparent");
          ctx.fillStyle = eg;
          ctx.beginPath();
          ctx.arc(ex, ey, pw * 0.1, 0, Math.PI * 2);
          ctx.fill();

          // core iris
          ctx.beginPath();
          ctx.ellipse(ex, ey, pw * 0.038, pw * 0.028, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.eyeColor + "ee";
          ctx.fill();

          // pupil
          ctx.beginPath();
          ctx.arc(ex, ey, pw * 0.012, 0, Math.PI * 2);
          ctx.fillStyle = "#000000cc";
          ctx.fill();
        });

        // vertical panel divider
        if (i < PANELS.length - 1) {
          ctx.strokeStyle = "rgba(120,40,200,0.25)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px + pw, 0);
          ctx.lineTo(px + pw, H);
          ctx.stroke();
        }

        // subtle vertical scan line per panel
        const scanX = px + ((t * 60 * (1 + i * 0.15)) % pw);
        ctx.strokeStyle = `rgba(180,80,255,${0.06 + 0.04 * Math.sin(t * 3 + i)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(scanX, 0);
        ctx.lineTo(scanX, H);
        ctx.stroke();
      });

      // horizontal scan line across whole banner
      const hy = ((t * 30) % H);
      const hGlob = ctx.createLinearGradient(0, hy - 2, 0, hy + 2);
      hGlob.addColorStop(0, "transparent");
      hGlob.addColorStop(0.5, "rgba(160,60,255,0.12)");
      hGlob.addColorStop(1, "transparent");
      ctx.fillStyle = hGlob;
      ctx.fillRect(0, hy - 2, W, 4);

      // bottom purple fade
      const fade = ctx.createLinearGradient(0, H * 0.6, 0, H);
      fade.addColorStop(0, "transparent");
      fade.addColorStop(1, "#07040f");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, W, H);

      // top subtle fade
      const topFade = ctx.createLinearGradient(0, 0, 0, H * 0.15);
      topFade.addColorStop(0, "rgba(7,4,15,0.6)");
      topFade.addColorStop(1, "transparent");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} width={640} height={240}
      style={{ display:"block", width:"100%", height:"100%" }}
    />
  );
}

const fade    = { hidden:{opacity:0,y:20}, visible:{opacity:1,y:0,transition:{duration:.6,ease:[.22,1,.36,1]}} };
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
      style={{ background:"#07040f" }}>

      {/* ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
        <div style={{ position:"absolute", top:"-20%", left:"-15%", width:"65%", height:"65%",
          borderRadius:"50%", background:"hsl(280 100%50%/0.07)", filter:"blur(140px)" }}/>
        <div style={{ position:"absolute", bottom:"-20%", right:"-10%", width:"55%", height:"55%",
          borderRadius:"50%", background:"hsl(260 80%50%/0.04)", filter:"blur(120px)" }}/>
      </div>

      <motion.div className="relative z-10 w-full max-w-xl flex flex-col gap-5 pt-10"
        variants={stagger} initial="hidden" animate="visible">

        {/* ── HEADER ── */}
        <motion.div variants={fade} className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center gap-3">
            <ShieldAlert
              style={{
                width:"clamp(28px,7vw,38px)", height:"clamp(28px,7vw,38px)",
                color:"hsl(280 100%70%)",
                filter:"drop-shadow(0 0 14px hsl(280 100%70%/0.75))",
              }}/>
            <h1
              style={{
                fontFamily:"'Orbitron','Exo 2',sans-serif",
                fontWeight:900,
                fontSize:"clamp(2rem,10vw,3.6rem)",
                letterSpacing:"-0.02em",
                lineHeight:1,
                background:"linear-gradient(135deg,#ffffff 0%,hsl(280,100%,85%) 40%,hsl(270,100%,65%) 100%)",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                filter:"drop-shadow(0 0 28px hsl(280 100%70%/0.4))",
              }}>
              VARNOX
            </h1>
          </div>
          <p style={{
            fontFamily:"'Orbitron','Exo 2',sans-serif",
            fontWeight:700,
            fontSize:"clamp(0.58rem,2.8vw,0.78rem)",
            letterSpacing:"0.55em",
            color:"hsl(280 60%75%)",
            textTransform:"uppercase",
            paddingLeft:"0.55em",
          }}>
            WA REPORT
          </p>
          <p style={{
            fontSize:"clamp(0.78rem,3.5vw,0.95rem)",
            fontWeight:500,
            color:"hsl(185 90%62%)",
            letterSpacing:"0.03em",
            marginTop:"4px",
          }}>
            Report suspicious WhatsApp activity securely
          </p>
        </motion.div>

        {/* ── CINEMATIC BANNER ── */}
        <motion.div variants={fade}
          className="w-full overflow-hidden"
          style={{
            borderRadius:"16px",
            border:"1.5px solid hsl(280 100%60%/0.35)",
            boxShadow:"0 0 0 1px hsl(280 100%50%/0.06), 0 0 45px -8px hsl(280 100%60%/0.4)",
            lineHeight:0,
          }}>
          <CinematicBanner />
        </motion.div>

        {/* ── FORM CARD ── */}
        <motion.div variants={fade} className="w-full rounded-2xl overflow-hidden"
          style={{
            background:"rgba(18,8,32,0.65)",
            backdropFilter:"blur(28px)",
            border:"1px solid hsl(280 100%55%/0.14)",
            boxShadow:"0 0 50px -18px hsl(280 100%55%/0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
          <div className="p-6 sm:p-7">

            {/* card header */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background:"hsl(280 100%65%/0.15)", border:"1px solid hsl(280 100%65%/0.4)" }}>
                <ShieldAlert style={{ width:11, height:11, color:"hsl(280 100%78%)" }}/>
              </div>
              <span style={{
                fontFamily:"'Orbitron','Exo 2',sans-serif",
                fontSize:"0.7rem", fontWeight:700,
                letterSpacing:"0.3em", textTransform:"uppercase",
                color:"hsl(280 100%78%)",
              }}>Submit a Report</span>
              <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0"
                style={{ background:"hsl(280 100%55%/0.08)", border:"1px solid hsl(280 100%55%/0.22)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background:"hsl(280 100%72%)" }}/>
                <span style={{
                  fontFamily:"'Orbitron','Exo 2',sans-serif",
                  fontSize:"0.52rem", fontWeight:700,
                  letterSpacing:"0.22em", color:"hsl(280 100%78%)",
                }}>39 RECIPIENTS</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{opacity:1}} exit={{opacity:0,y:-8}}>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                      {/* TARGET NUMBER */}
                      <FormField control={form.control} name="targetNumber" render={({field})=>(
                        <FormItem>
                          <FormLabel style={{
                            fontFamily:"'Orbitron','Exo 2',sans-serif",
                            fontSize:"0.62rem", fontWeight:700,
                            letterSpacing:"0.28em", textTransform:"uppercase",
                            color:"hsl(280 55%70%/0.75)",
                          }}>Target Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+224 669 28 83 32"
                              className="h-12 border-0 font-mono text-sm text-white placeholder:text-white/18"
                              style={{
                                background:"rgba(255,255,255,0.05)", borderRadius:"12px",
                                boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)",
                              }}
                              onFocus={e=>{ e.currentTarget.style.boxShadow="inset 0 0 0 1.5px hsl(280 100%68%/0.5), 0 0 18px -6px hsl(280 100%68%/0.3)" }}
                              onBlur={e=>{  e.currentTarget.style.boxShadow="inset 0 0 0 1px rgba(255,255,255,0.08)" }}/>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400"/>
                        </FormItem>
                      )}/>

                      {/* REASON */}
                      <FormField control={form.control} name="reason" render={({field})=>(
                        <FormItem>
                          <FormLabel style={{
                            fontFamily:"'Orbitron','Exo 2',sans-serif",
                            fontSize:"0.62rem", fontWeight:700,
                            letterSpacing:"0.28em", textTransform:"uppercase",
                            color:"hsl(280 55%70%/0.75)",
                          }}>Reason</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 border-0 text-white text-sm"
                                style={{
                                  background:"rgba(255,255,255,0.05)", borderRadius:"12px",
                                  fontFamily:"monospace",
                                  boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)",
                                }}>
                                <SelectValue placeholder="Select a category"/>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent style={{
                              background:"#110820", borderRadius:"12px",
                              border:"1px solid rgba(255,255,255,0.1)",
                            }}>
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
                        <p style={{
                          fontFamily:"'Orbitron','Exo 2',sans-serif",
                          fontSize:"0.62rem", fontWeight:700,
                          letterSpacing:"0.28em", textTransform:"uppercase",
                          color:"hsl(280 55%70%/0.75)",
                        }}>Evidence</p>
                        <button type="button" onClick={()=>fileRef.current?.click()}
                          className="w-full rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-200"
                          style={{
                            height:"88px",
                            border:"1.5px dashed rgba(255,255,255,0.1)",
                            background:"rgba(255,255,255,0.025)",
                          }}
                          onMouseEnter={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor="hsl(280 100%68%/0.4)"; b.style.background="hsl(280 100%55%/0.05)" }}
                          onMouseLeave={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor="rgba(255,255,255,0.1)"; b.style.background="rgba(255,255,255,0.025)" }}>
                          <UploadCloud style={{ width:24, height:24, color: fileName?"hsl(280 100%78%)":"rgba(255,255,255,0.25)" }}/>
                          <span style={{ fontSize:"0.72rem", color: fileName?"hsl(280 100%82%)":"rgba(255,255,255,0.25)" }}>
                            {fileName || "Click to upload a screenshot"}
                          </span>
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden"
                          onChange={e=>setFileName(e.target.files?.[0]?.name??null)}/>
                      </div>

                      {/* DETAILS */}
                      <FormField control={form.control} name="details" render={({field})=>(
                        <FormItem>
                          <FormLabel style={{
                            fontFamily:"'Orbitron','Exo 2',sans-serif",
                            fontSize:"0.62rem", fontWeight:700,
                            letterSpacing:"0.28em", textTransform:"uppercase",
                            color:"hsl(280 55%70%/0.75)",
                          }}>Details</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Explain what happened…" rows={4}
                              className="resize-none border-0 text-sm text-white placeholder:text-white/20 leading-relaxed font-mono"
                              style={{
                                background:"rgba(255,255,255,0.05)", borderRadius:"12px",
                                boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.08)",
                              }}
                              onFocus={e=>{ e.currentTarget.style.boxShadow="inset 0 0 0 1.5px hsl(280 100%68%/0.5)" }}
                              onBlur={e=>{  e.currentTarget.style.boxShadow="inset 0 0 0 1px rgba(255,255,255,0.08)" }}/>
                          </FormControl>
                          <FormMessage className="text-xs text-red-400"/>
                        </FormItem>
                      )}/>

                      {/* SUBMIT */}
                      <button type="submit"
                        className="w-full rounded-xl font-bold uppercase flex items-center justify-center gap-2.5 transition-all duration-300"
                        style={{
                          height:"52px",
                          fontFamily:"'Orbitron','Exo 2',sans-serif",
                          fontSize:"0.7rem", letterSpacing:"0.3em",
                          background:"linear-gradient(135deg,hsl(280,100%,56%),hsl(300,90%,60%))",
                          color:"#fff",
                          boxShadow:"0 0 30px -6px hsl(280 100%58%/0.7)",
                        }}
                        onMouseEnter={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.boxShadow="0 0 42px -4px hsl(280 100%58%/0.9)"; b.style.transform="translateY(-1px)" }}
                        onMouseLeave={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.boxShadow="0 0 30px -6px hsl(280 100%58%/0.7)"; b.style.transform="translateY(0)" }}>
                        <Send style={{ width:16, height:16 }}/>
                        Send Report
                      </button>
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div key="ok" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}}
                  className="flex flex-col items-center py-12 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background:"hsl(280 100%55%/0.12)", border:"1px solid hsl(280 100%68%/0.38)" }}>
                    <CheckCircle2 style={{ width:32, height:32, color:"hsl(280 100%78%)" }}/>
                  </div>
                  <div>
                    <p style={{
                      fontFamily:"'Orbitron','Exo 2',sans-serif",
                      fontWeight:700, letterSpacing:"0.18em",
                      textTransform:"uppercase", color:"white", fontSize:"0.8rem",
                    }}>Report Transmitted</p>
                    <p style={{ fontSize:"0.75rem", marginTop:"6px", color:"rgba(255,255,255,0.35)" }}>
                      Sent to 39 official WhatsApp / Meta channels
                    </p>
                  </div>
                  <button
                    onClick={()=>{ form.reset(); setSubmitted(false); setFileName(null); }}
                    style={{
                      marginTop:"4px", height:"36px", padding:"0 28px", borderRadius:"10px",
                      fontFamily:"'Orbitron','Exo 2',sans-serif",
                      fontSize:"0.6rem", letterSpacing:"0.22em", textTransform:"uppercase",
                      border:"1px solid hsl(280 100%68%/0.3)", color:"hsl(280 100%78%)", background:"transparent",
                      cursor:"pointer", transition:"background .2s",
                    }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.background="hsl(280 100%55%/0.12)" }}
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
            <div className="rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all duration-200"
              style={{ background:"rgba(255,255,255,0.025)", border:"1px solid hsl(190 100%58%/0.18)" }}
              onMouseEnter={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.border="1px solid hsl(190 100%58%/0.45)"; d.style.background="hsl(190 100%58%/0.06)" }}
              onMouseLeave={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.border="1px solid hsl(190 100%58%/0.18)"; d.style.background="rgba(255,255,255,0.025)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:"hsl(190 100%58%/0.12)", border:"1px solid hsl(190 100%58%/0.28)" }}>
                <FileText style={{ width:18, height:18, color:"hsl(190 100%68%)" }}/>
              </div>
              <div className="flex-1">
                <p style={{
                  fontFamily:"'Orbitron','Exo 2',sans-serif",
                  fontSize:"0.65rem", fontWeight:700,
                  letterSpacing:"0.2em", textTransform:"uppercase",
                  color:"hsl(190 100%70%)",
                }}>Ban Texts</p>
                <p style={{ fontSize:"0.7rem", marginTop:"2px", color:"rgba(255,255,255,0.28)" }}>
                  Download ready-to-use ban scripts
                </p>
              </div>
              <span style={{ fontSize:"0.8rem", fontFamily:"monospace", color:"hsl(190 100%55%/0.55)" }}>→</span>
            </div>
          </Link>
        </motion.div>

        {/* ── FOOTER ── */}
        <motion.footer variants={fade} className="flex flex-col items-center gap-4 pt-1">
          <div className="w-full h-px"
            style={{ background:"linear-gradient(90deg,transparent,hsl(280 100%55%/0.22),transparent)" }}/>
          <div className="flex items-center gap-3">
            {SOCIAL.map(({href,label,Icon})=>(
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e=>{ const a=e.currentTarget as HTMLAnchorElement; a.style.background="hsl(280 100%55%/0.15)"; a.style.borderColor="hsl(280 100%55%/0.38)" }}
                onMouseLeave={e=>{ const a=e.currentTarget as HTMLAnchorElement; a.style.background="rgba(255,255,255,0.04)"; a.style.borderColor="rgba(255,255,255,0.07)" }}>
                <Icon size={15} color="rgba(255,255,255,0.38)"/>
              </a>
            ))}
          </div>
          <p style={{ fontSize:"0.62rem", letterSpacing:"0.18em", color:"rgba(255,255,255,0.14)" }}>
            © 2025 VARNOX WA REPORT — All rights reserved.
          </p>
          <p style={{ fontSize:"0.55rem", color:"rgba(255,255,255,0.09)" }}>
            Developed by <span style={{ color:"rgba(255,255,255,0.18)" }}>𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮</span>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
