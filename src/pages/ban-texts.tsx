import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText, ShieldAlert } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const BAN_FILES = [
  {
    id: 1,
    name: "Ban Method #1",
    description: "Portuguese ban script — automated message method",
    filename: "ban-method-1.txt",
    size: "~1 KB",
  },
  {
    id: 2,
    name: "Ban Script #2",
    description: "Multi-language ban script — advanced report method",
    filename: "ban-script-2.txt",
    size: "~3 KB",
  },
  {
    id: 3,
    name: "Ban Text #3",
    description: "French ban text — direct report message",
    filename: "ban-text-3.txt",
    size: "~1 KB",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function BanTexts() {
  return (
    <div className="min-h-[100dvh] w-full bg-background relative overflow-hidden flex flex-col items-center justify-start pt-10 pb-12 px-4 sm:px-6 md:px-8 selection:bg-primary/30">
      <div className="absolute inset-0 bg-grid pointer-events-none z-0" />
      <div className="absolute top-[-15%] left-[-8%] w-[45%] h-[45%] bg-primary/8 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[45%] h-[45%] bg-secondary/8 blur-[140px] rounded-full pointer-events-none z-0" />

      <motion.div
        className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back button */}
        <motion.div variants={itemVariants} className="w-full">
          <Link href="/">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors duration-200 group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Report
            </button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header variants={itemVariants} className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-1">
            <ShieldAlert
              className="w-7 h-7 text-primary"
              style={{ filter: "drop-shadow(0 0 8px hsl(280 100% 70% / 0.7))" }}
            />
            <h1
              className="font-display text-3xl sm:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white via-primary/80 to-primary uppercase"
              style={{ textShadow: "0 0 30px hsl(280 100% 70% / 0.25)" }}
            >
              BAN TEXTS
            </h1>
          </div>
          <p className="text-sm text-secondary/70 tracking-wide font-medium">
            Download ready-to-use ban request scripts
          </p>
        </motion.header>

        {/* File cards */}
        <motion.div variants={containerVariants} className="w-full flex flex-col gap-4">
          {BAN_FILES.map((file) => (
            <motion.div key={file.id} variants={itemVariants}>
              <div
                className="w-full rounded-xl p-5 flex items-center justify-between gap-4 transition-all duration-300 group"
                style={{
                  background: "hsl(265 15% 10% / 0.6)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid hsl(280 100% 70% / 0.18)",
                  boxShadow: "0 0 20px -8px hsl(280 100% 70% / 0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = "1px solid hsl(280 100% 70% / 0.4)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 28px -6px hsl(280 100% 70% / 0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.border = "1px solid hsl(280 100% 70% / 0.18)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px -8px hsl(280 100% 70% / 0.2)";
                }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "hsl(280 100% 70% / 0.1)",
                      border: "1px solid hsl(280 100% 70% / 0.25)",
                    }}
                  >
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold text-white tracking-wider truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {file.description}
                    </p>
                    <p className="text-[10px] text-secondary/50 mt-1 font-mono">
                      {file.filename} · {file.size}
                    </p>
                  </div>
                </div>

                <a
                  href={`/${file.filename}`}
                  download={file.filename}
                  data-testid={`button-download-${file.id}`}
                >
                  <Button
                    size="sm"
                    className="flex-shrink-0 h-9 px-4 bg-primary hover:bg-primary/85 text-primary-foreground font-display tracking-widest text-[10px] uppercase transition-all duration-300"
                    style={{ boxShadow: "0 0 14px -4px hsl(280 100% 70% / 0.5)" }}
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Download
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          variants={itemVariants}
          className="text-[11px] text-muted-foreground/40 text-center tracking-wide max-w-sm leading-relaxed"
        >
          More ban scripts will be added in future updates.
        </motion.p>

        {/* Footer credit */}
        <motion.p variants={itemVariants} className="text-[10px] text-muted-foreground/30 tracking-widest text-center">
          Developed by{" "}
          <span className="text-secondary/40">
            𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮 𝚸𝚪𝚰𝚳𝚵𝚵𝚵𝚵𝚵𝚵
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
