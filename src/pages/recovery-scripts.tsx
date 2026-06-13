import { motion } from "framer-motion";
import { ArrowLeft, Download, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const G = {
  pri: "hsl(142 72%48%)",
  bri: "hsl(142 85%58%)",
  dim: "hsl(142 50%35%)",
  g08: "hsl(142 72%48%/0.08)",
  g15: "hsl(142 72%48%/0.15)",
  g25: "hsl(142 72%48%/0.25)",
  g40: "hsl(142 72%48%/0.40)",
  g60: "hsl(142 72%48%/0.60)",
};

const SCRIPTS = [
  {id:1,  flag:"🇬🇧",lang:"English",  name:"Standard Appeal",          file:"recovery-en-standard.txt",    type:"Standard"},
  {id:2,  flag:"🇫🇷",lang:"Français", name:"Appel Standard",           file:"recovery-fr-standard.txt",    type:"Standard"},
  {id:3,  flag:"🇸🇦",lang:"العربية",  name:"نموذج استرداد",             file:"recovery-ar-standard.txt",    type:"Standard"},
  {id:4,  flag:"🇪🇸",lang:"Español",  name:"Apelación Estándar",       file:"recovery-es-standard.txt",    type:"Standard"},
  {id:5,  flag:"🇧🇷",lang:"Português",name:"Apelo Padrão",             file:"recovery-pt-standard.txt",    type:"Standard"},
  {id:6,  flag:"🇩🇪",lang:"Deutsch",  name:"Standard-Einspruch",       file:"recovery-de-standard.txt",    type:"Standard"},
  {id:7,  flag:"🇮🇹",lang:"Italiano", name:"Appello Standard",         file:"recovery-it-standard.txt",    type:"Standard"},
  {id:8,  flag:"🇷🇺",lang:"Русский",  name:"Стандартная апелляция",    file:"recovery-ru-standard.txt",    type:"Standard"},
  {id:9,  flag:"🇹🇷",lang:"Türkçe",   name:"Standart İtiraz",          file:"recovery-tr-standard.txt",    type:"Standard"},
  {id:10, flag:"🇬🇧",lang:"English",  name:"URGENT Appeal",            file:"recovery-en-urgent.txt",      type:"Urgent"},
  {id:11, flag:"🇫🇷",lang:"Français", name:"Appel URGENT",             file:"recovery-fr-urgent.txt",      type:"Urgent"},
  {id:12, flag:"🇪🇸",lang:"Español",  name:"Apelación URGENTE",        file:"recovery-es-urgent.txt",      type:"Urgent"},
  {id:13, flag:"🇧🇷",lang:"Português",name:"Apelo URGENTE",            file:"recovery-pt-urgent.txt",      type:"Urgent"},
  {id:14, flag:"🇸🇦",lang:"العربية",  name:"طلب عاجل",                 file:"recovery-ar-urgent.txt",      type:"Urgent"},
  {id:15, flag:"🇬🇧",lang:"English",  name:"Business Account",         file:"recovery-en-business.txt",    type:"Business"},
  {id:16, flag:"🇫🇷",lang:"Français", name:"Compte Business",          file:"recovery-fr-business.txt",    type:"Business"},
  {id:17, flag:"🇬🇧",lang:"English",  name:"Wrongful Ban",             file:"recovery-en-wrongful.txt",    type:"Special"},
  {id:18, flag:"🇬🇧",lang:"English",  name:"Spam Ban Appeal",          file:"recovery-en-spam-appeal.txt", type:"Special"},
  {id:19, flag:"🇬🇧",lang:"English",  name:"Formal Legal",             file:"recovery-en-formal.txt",      type:"Special"},
  {id:20, flag:"🇬🇧",lang:"English",  name:"Technical Issue",          file:"recovery-en-technical.txt",   type:"Special"},
  {id:21, flag:"🇬🇧",lang:"English",  name:"FINAL Appeal",             file:"recovery-en-final.txt",       type:"Special"},
  {id:22, flag:"🇬🇧",lang:"English",  name:"Detailed (Full)",          file:"recovery-en-detailed.txt",    type:"Special"},
  {id:23, flag:"🇬🇧",lang:"English",  name:"Quick Short",              file:"recovery-en-short.txt",       type:"Standard"},
  {id:24, flag:"🇬🇧",lang:"English",  name:"Mod App Disclosure",       file:"recovery-en-mod-appeal.txt",  type:"Special"},
  {id:25, flag:"🇬🇧",lang:"English",  name:"Number Change",            file:"recovery-en-number-change.txt",type:"Special"},
];

const TYPE_COLORS: Record<string,{bg:string,text:string}> = {
  Standard: {bg:"hsl(142 72%48%/0.1)",  text:"hsl(142 72%65%)"},
  Urgent:   {bg:"hsl(15 100%50%/0.12)", text:"hsl(15 100%65%)"},
  Business: {bg:"hsl(220 80%60%/0.12)", text:"hsl(220 80%70%)"},
  Special:  {bg:"hsl(280 80%60%/0.1)",  text:"hsl(280 80%75%)"},
};

const fade    = {hidden:{opacity:0,y:18},visible:{opacity:1,y:0,transition:{duration:.5,ease:[.22,1,.36,1]}}};
const stagger = {hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.04}}};

export default function RecoveryScripts() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center pb-16 px-4 sm:px-6"
      style={{background:"#040d07"}}>

      {/* ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div style={{position:"absolute",top:"-20%",left:"-10%",width:"55%",height:"55%",
          borderRadius:"50%",background:G.g08,filter:"blur(120px)"}}/>
        <div style={{position:"absolute",bottom:"-20%",right:"-10%",width:"45%",height:"45%",
          borderRadius:"50%",background:"hsl(160 80%40%/0.04)",filter:"blur(100px)"}}/>
      </div>

      <motion.div className="relative z-10 w-full max-w-xl flex flex-col gap-6 pt-10"
        variants={stagger} initial="hidden" animate="visible">

        {/* back */}
        <motion.div variants={fade}>
          <Link href="/recovery">
            <button className="flex items-center gap-2 text-sm transition-colors duration-200"
              style={{color:G.dim}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.color=G.pri}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.color=G.dim}}>
              <ArrowLeft className="w-4 h-4"/>
              Back to Recovery
            </button>
          </Link>
        </motion.div>

        {/* header */}
        <motion.div variants={fade} className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{background:G.g08,border:`1px solid ${G.g25}`}}>
            <ShieldCheck className="w-3.5 h-3.5" style={{color:G.pri}}/>
            <span className="text-[10px] font-display tracking-[0.3em] uppercase" style={{color:G.pri}}>
              Recovery Scripts
            </span>
          </div>
          <h1 className="font-display font-black uppercase"
            style={{fontSize:"clamp(1.8rem,7vw,2.6rem)",
              background:`linear-gradient(135deg,#fff 0%,${G.bri} 55%,${G.dim} 100%)`,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              filter:`drop-shadow(0 0 28px ${G.g40})`}}>
            DOWNLOAD SCRIPTS
          </h1>
          <p className="text-xs" style={{color:`${G.dim}`,letterSpacing:"0.06em"}}>
            {SCRIPTS.length} professional appeal templates · 9 languages
          </p>
        </motion.div>

        {/* download all button */}
        <motion.div variants={fade} className="w-full">
          <div className="rounded-2xl p-4 flex items-center justify-between"
            style={{background:G.g08,border:`1px solid ${G.g25}`,
              boxShadow:`0 0 30px -10px ${G.g40}`}}>
            <div>
              <p className="font-display text-xs font-bold tracking-[0.2em] uppercase" style={{color:G.bri}}>
                All {SCRIPTS.length} scripts available below
              </p>
              <p className="text-[10px] mt-0.5" style={{color:G.dim}}>Click any Download button to save a template</p>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{background:G.g15,border:`1px solid ${G.g40}`}}>
              <Download className="w-4 h-4" style={{color:G.bri}}/>
            </div>
          </div>
        </motion.div>

        {/* scripts list */}
        <motion.div variants={fade} className="w-full rounded-2xl overflow-hidden"
          style={{border:`1px solid ${G.g15}`,background:"rgba(255,255,255,0.018)",backdropFilter:"blur(16px)"}}>
          {SCRIPTS.map((s,i)=>(
            <motion.div key={s.id}
              variants={fade}
              className="flex items-center gap-3 px-4 py-3.5 transition-all duration-150"
              style={{borderBottom:i<SCRIPTS.length-1?`1px solid ${G.g08}`:"none"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background=G.g08}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="transparent"}}>

              {/* number */}
              <span className="text-[9px] font-mono w-5 flex-shrink-0 text-right"
                style={{color:`${G.g40}`}}>{String(s.id).padStart(2,"0")}</span>

              {/* flag */}
              <span className="text-base leading-none flex-shrink-0">{s.flag}</span>

              {/* name */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-white/75 font-mono truncate">{s.name}</p>
                <p className="text-[9px] truncate" style={{color:`${G.dim}`}}>{s.lang}</p>
              </div>

              {/* type badge */}
              <span className="text-[8px] font-display font-bold tracking-widest uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: TYPE_COLORS[s.type].bg,
                  color: TYPE_COLORS[s.type].text,
                  border:`1px solid ${TYPE_COLORS[s.type].text}33`,
                }}>
                {s.type}
              </span>

              {/* download */}
              <a href={`/${s.file}`} download={s.file} className="flex-shrink-0">
                <button
                  className="h-8 px-3 rounded-lg flex items-center gap-1.5 font-display text-[9px] tracking-widest uppercase font-bold transition-all duration-150"
                  style={{background:G.g15,border:`1px solid ${G.g25}`,color:G.bri}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=G.g25;(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 12px -4px ${G.g60}`}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=G.g15;(e.currentTarget as HTMLButtonElement).style.boxShadow="none"}}>
                  <Download className="w-3 h-3"/>
                  DL
                </button>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* footer */}
        <motion.footer variants={fade} className="flex flex-col items-center gap-2 pt-2">
          <p className="text-[10px] tracking-[0.2em]" style={{color:"rgba(255,255,255,0.12)"}}>
            © 2025 VARNOX.WA RECOVERY
          </p>
          <p className="text-[9px]" style={{color:"rgba(255,255,255,0.08)"}}>
            Developed by <span style={{color:"rgba(255,255,255,0.14)"}}>𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃</span>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
