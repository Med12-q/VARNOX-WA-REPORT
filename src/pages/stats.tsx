import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Activity, Globe, Mail, FileText, Shield, Users, Clock, Zap } from "lucide-react";
import { Link } from "wouter";

/* ── animated counter hook ───────────────────── */
function useCounter(target: number, duration: number = 2000, delay: number = 0) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setValue(Math.floor(ease * target));
        if (progress < 1) requestAnimationFrame(step);
        else setValue(target);
      };
      requestAnimationFrame(step);
      started.current = true;
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  return value;
}

/* ── live clock ──────────────────────────────── */
function useLiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ── format number ───────────────────────────── */
function fmt(n: number, suffix = "") {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M" + suffix;
  if (n >= 1_000)     return (n / 1_000).toFixed(0)     + "K" + suffix;
  return n.toString() + suffix;
}

/* ── stat card ───────────────────────────────── */
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent: string;
  delay?: number;
}
function StatCard({ icon, label, value, sub, accent, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${accent}22`,
        boxShadow: `0 0 30px -12px ${accent}44`,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
          {icon}
        </div>
        <span className="text-[9px] font-display tracking-[0.25em] uppercase px-2 py-0.5 rounded-full"
          style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}>
          LIVE
        </span>
      </div>
      <div>
        <p className="font-display font-black text-2xl sm:text-3xl text-white leading-none">
          {value}
        </p>
        {sub && <p className="text-[10px] mt-1 font-mono" style={{ color: `${accent}80` }}>{sub}</p>}
        <p className="text-[10px] mt-2 uppercase tracking-[0.2em] font-display"
          style={{ color: "rgba(255,255,255,0.35)" }}>{label}</p>
      </div>
    </motion.div>
  );
}

/* ── activity row ────────────────────────────── */
interface ActivityItem {
  country: string;
  flag: string;
  type: "report" | "recovery";
  time: string;
  number: string;
}

function generateActivity(): ActivityItem[] {
  const countries = [
    {country:"Guinea",flag:"🇬🇳"},{country:"France",flag:"🇫🇷"},
    {country:"Senegal",flag:"🇸🇳"},{country:"Côte d'Ivoire",flag:"🇨🇮"},
    {country:"Mali",flag:"🇲🇱"},{country:"Cameroon",flag:"🇨🇲"},
    {country:"Morocco",flag:"🇲🇦"},{country:"Tunisia",flag:"🇹🇳"},
    {country:"Nigeria",flag:"🇳🇬"},{country:"Ghana",flag:"🇬🇭"},
    {country:"Algeria",flag:"🇩🇿"},{country:"Congo",flag:"🇨🇩"},
    {country:"Brazil",flag:"🇧🇷"},{country:"Portugal",flag:"🇵🇹"},
    {country:"Spain",flag:"🇪🇸"},{country:"Belgium",flag:"🇧🇪"},
  ];
  const types: Array<"report"|"recovery"> = ["report","report","report","recovery","recovery"];
  const now = Date.now();
  return Array.from({length:12},(_,i)=>{
    const c = countries[Math.floor(Math.random()*countries.length)];
    const t = types[Math.floor(Math.random()*types.length)];
    const secsAgo = Math.floor(Math.random()*120)+i*10;
    const d = new Date(now-secsAgo*1000);
    const mins = Math.floor(secsAgo/60);
    const secs = secsAgo%60;
    const timeStr = secsAgo<60?`${secs}s ago`:`${mins}m ${secs}s ago`;
    const num = `+${Math.floor(Math.random()*900)+100}${Math.floor(Math.random()*9000000)+1000000}`;
    return {...c, type:t, time:timeStr, number:num};
  });
}

const fade    = {hidden:{opacity:0,y:18},visible:{opacity:1,y:0,transition:{duration:.5,ease:[.22,1,.36,1]}}};
const stagger = {hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.1}}};

/* ── page ────────────────────────────────────── */
export default function Stats() {
  const clock    = useLiveClock();
  const reports  = useCounter(148_239, 2500, 100);
  const recovered= useCounter(12_847, 2200, 200);
  const countries= useCounter(152, 1800, 300);
  const channels = useCounter(39, 1200, 0);
  const scripts  = useCounter(28, 1000, 150);
  const uptime   = useCounter(99, 1500, 400);

  const [activity] = useState<ActivityItem[]>(generateActivity);
  const [tick, setTick] = useState(0);
  useEffect(()=>{const id=setInterval(()=>setTick(t=>t+1),5000);return()=>clearInterval(id);},[]);

  const timeStr = clock.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
  const dateStr = clock.toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"});

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center pb-16 px-4 sm:px-6"
      style={{background:"#06040f"}}>

      {/* blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div style={{position:"absolute",top:"-20%",left:"-10%",width:"55%",height:"55%",
          borderRadius:"50%",background:"hsl(280 100%60%/0.06)",filter:"blur(130px)"}}/>
        <div style={{position:"absolute",bottom:"-20%",right:"-10%",width:"50%",height:"50%",
          borderRadius:"50%",background:"hsl(142 72%45%/0.05)",filter:"blur(120px)"}}/>
      </div>

      <motion.div className="relative z-10 w-full max-w-xl flex flex-col gap-6 pt-10"
        variants={stagger} initial="hidden" animate="visible">

        {/* back */}
        <motion.div variants={fade}>
          <Link href="/">
            <button className="flex items-center gap-2 text-sm transition-colors duration-200"
              style={{color:"hsl(280 60%50%)"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.color="hsl(280 100%75%)"}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.color="hsl(280 60%50%)"}}>
              <ArrowLeft className="w-4 h-4"/>
              Back to Home
            </button>
          </Link>
        </motion.div>

        {/* header */}
        <motion.div variants={fade} className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{background:"hsl(280 100%60%/0.08)",border:"1px solid hsl(280 100%60%/0.25)"}}>
            <Activity className="w-3.5 h-3.5" style={{color:"hsl(280 100%75%)"}}/>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{background:"hsl(142 72%55%)"}}/>
            <span className="text-[10px] font-display tracking-[0.3em] uppercase"
              style={{color:"hsl(280 100%75%)"}}>Real-Time Stats</span>
          </div>
          <h1 className="font-display font-black uppercase"
            style={{fontSize:"clamp(1.8rem,7vw,2.6rem)",
              background:"linear-gradient(135deg,#fff 0%,hsl(280,100%,80%) 50%,hsl(280,100%,60%) 100%)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              filter:"drop-shadow(0 0 28px hsl(280 100%70%/0.35))"}}>
            VARNOX STATS
          </h1>

          {/* live clock */}
          <div className="flex flex-col items-center gap-1">
            <p className="font-mono text-3xl font-bold text-white tracking-wider">{timeStr}</p>
            <p className="text-[10px] tracking-widest" style={{color:"rgba(255,255,255,0.3)"}}>{dateStr.toUpperCase()}</p>
          </div>
        </motion.div>

        {/* stats grid */}
        <motion.div variants={fade} className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Shield className="w-5 h-5" style={{color:"hsl(280 100%75%)"}}/>}
            label="Reports Sent"
            value={fmt(reports,"+")}
            sub="Total spam ban requests"
            accent="hsl(280 100%70%)"
            delay={0}
          />
          <StatCard
            icon={<Zap className="w-5 h-5" style={{color:"hsl(142 72%55%)"}}/>}
            label="Recoveries"
            value={fmt(recovered,"+")}
            sub="Accounts appealed"
            accent="hsl(142 72%55%)"
            delay={100}
          />
          <StatCard
            icon={<Globe className="w-5 h-5" style={{color:"hsl(220 80%65%)"}}/>}
            label="Countries Reached"
            value={fmt(countries,"+")}
            sub="Global coverage"
            accent="hsl(220 80%65%)"
            delay={200}
          />
          <StatCard
            icon={<Mail className="w-5 h-5" style={{color:"hsl(40 90%60%)"}}/>}
            label="Email Channels"
            value={fmt(channels)}
            sub="Official WA & Meta"
            accent="hsl(40 90%60%)"
            delay={300}
          />
          <StatCard
            icon={<FileText className="w-5 h-5" style={{color:"hsl(190 100%65%)"}}/>}
            label="Scripts Available"
            value={fmt(scripts)}
            sub="Ban + Recovery"
            accent="hsl(190 100%65%)"
            delay={400}
          />
          <StatCard
            icon={<Users className="w-5 h-5" style={{color:"hsl(320 80%65%)"}}/>}
            label="Uptime"
            value={`${fmt(uptime)}%`}
            sub="Service availability"
            accent="hsl(320 80%65%)"
            delay={500}
          />
        </motion.div>

        {/* live activity feed */}
        <motion.div variants={fade} className="w-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 rounded-full" style={{background:"hsl(280 100%70%)"}}/>
              <span className="font-display text-[11px] tracking-[0.3em] uppercase font-semibold"
                style={{color:"hsl(280 100%75%)"}}>Live Activity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:"hsl(142 72%55%)"}}/>
              <span className="text-[9px] font-mono" style={{color:"rgba(255,255,255,0.35)"}}>UPDATING</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden"
            style={{border:"1px solid rgba(255,255,255,0.06)",
              background:"rgba(255,255,255,0.018)",backdropFilter:"blur(16px)"}}>
            {activity.map((a,i)=>(
              <motion.div key={`${tick}-${i}`}
                initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
                transition={{delay:i*0.03,duration:0.4}}
                className="flex items-center gap-3 px-4 py-2.5"
                style={{borderBottom:i<activity.length-1?"1px solid rgba(255,255,255,0.04)":"none"}}>
                <span className="text-base flex-shrink-0">{a.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/60 font-mono truncate">{a.number}</p>
                  <p className="text-[9px] truncate" style={{color:"rgba(255,255,255,0.25)"}}>{a.country}</p>
                </div>
                <span className="text-[8px] font-display font-bold tracking-wider uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: a.type==="report"?"hsl(0 80%50%/0.15)":"hsl(142 72%45%/0.15)",
                    color: a.type==="report"?"hsl(0 80%65%)":"hsl(142 72%60%)",
                    border: `1px solid ${a.type==="report"?"hsl(0 80%50%/0.3)":"hsl(142 72%45%/0.3)"}`,
                  }}>
                  {a.type==="report"?"BAN":"RECOVER"}
                </span>
                <span className="text-[9px] font-mono flex-shrink-0" style={{color:"rgba(255,255,255,0.2)"}}>
                  {a.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* uptime bar */}
        <motion.div variants={fade} className="w-full rounded-2xl p-4"
          style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)"}}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" style={{color:"hsl(142 72%55%)"}}/>
              <span className="text-[10px] font-display tracking-[0.2em] uppercase"
                style={{color:"rgba(255,255,255,0.4)"}}>System Status</span>
            </div>
            <span className="text-[9px] font-display tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{background:"hsl(142 72%45%/0.15)",color:"hsl(142 72%60%)",
                border:"1px solid hsl(142 72%45%/0.3)"}}>
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
          <div className="space-y-2">
            {[
              {label:"Report Engine",  pct:100, color:"hsl(142 72%55%)"},
              {label:"Recovery Engine",pct:100, color:"hsl(142 72%55%)"},
              {label:"Email Dispatch", pct:100, color:"hsl(142 72%55%)"},
              {label:"Script Server",  pct:100, color:"hsl(142 72%55%)"},
            ].map(s=>(
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-[9px] font-mono w-32 flex-shrink-0" style={{color:"rgba(255,255,255,0.35)"}}>
                  {s.label}
                </span>
                <div className="flex-1 h-1 rounded-full" style={{background:"rgba(255,255,255,0.06)"}}>
                  <motion.div className="h-full rounded-full"
                    style={{background:s.color,width:"0%"}}
                    animate={{width:`${s.pct}%`}}
                    transition={{duration:1.5,ease:[.22,1,.36,1]}}/>
                </div>
                <span className="text-[9px] font-mono" style={{color:s.color}}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* footer */}
        <motion.footer variants={fade} className="flex flex-col items-center gap-2 pt-2">
          <p className="text-[10px] tracking-[0.2em]" style={{color:"rgba(255,255,255,0.12)"}}>
            © 2025 VARNOX WA REPORT — Stats Dashboard
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
