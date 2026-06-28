"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Shield,
  Cpu,
  Layers,
  FolderTree,
  Database,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Sliders,
  Settings,
  Key,
  RefreshCw,
  Play,
  Code,
  Lock,
  AlertTriangle,
  Workflow,
  ChevronRight,
  ChevronDown,
  Info,
  Server,
  FileCode,
  CheckCircle2,
  Download,
  Menu,
  X
} from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
    className={props.className}
    {...props}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

// Types & Config Data
interface FileNode {
  name: string;
  type: "file" | "dir";
  children?: FileNode[];
  size?: string;
}

const codebaseTree: FileNode = {
  name: "cliq-code",
  type: "dir",
  children: [
    {
      name: "src_cpp",
      type: "dir",
      children: [
        { name: "CMakeLists.txt", type: "file", size: "1.2 KB" },
        {
          name: "include/cliq-code",
          type: "dir",
          children: [
            { name: "file_ops.hpp", type: "file", size: "4.1 KB" },
            { name: "permission_enforcer.hpp", type: "file", size: "3.8 KB" },
            { name: "bash_validation.hpp", type: "file", size: "5.2 KB" },
            { name: "compact.hpp", type: "file", size: "2.9 KB" },
            { name: "sandbox.hpp", type: "file", size: "2.1 KB" }
          ]
        },
        { name: "engine", type: "dir", children: [
          { name: "file_ops.cpp", type: "file", size: "12 KB" },
          { name: "permission_enforcer.cpp", type: "file", size: "15 KB" }
        ]}
      ]
    },
    {
      name: "src_python",
      type: "dir",
      children: [
        { name: "main.py", type: "file", size: "8.5 KB" },
        { name: "brain.py", type: "file", size: "6.2 KB" },
        { name: "safety.py", type: "file", size: "4.8 KB" },
        { name: "ui.py", type: "file", size: "5.5 KB" }
      ]
    },
    { name: "pyproject.toml", type: "file", size: "840 B" },
    { name: "README.md", type: "file", size: "4.8 KB" }
  ]
};

const cppModulesList = [
  { name: "file_ops.hpp", desc: "File read, write, edit, glob & grep with boundary enforcement" },
  { name: "command_exec.hpp", desc: "Win32/POSIX shell execution engine" },
  { name: "permission_enforcer.hpp", desc: "5-mode active permission system" },
  { name: "bash_validation.hpp", desc: "Validates commands against validation pipelines" },
  { name: "permissions.hpp", desc: "Rule-based security policy parser" },
  { name: "session.hpp", desc: "Conversation state serialization & JSONL persistence" },
  { name: "compact.hpp", desc: "AI session context management & auto-compaction" },
  { name: "usage.hpp", desc: "Token tracking and dynamic API cost estimation" },
  { name: "json.hpp", desc: "High-performance, zero-dependency JSON parser" },
  { name: "sse.hpp", desc: "Server-Sent Events streaming response parser" },
  { name: "hooks.hpp", desc: "Pre/post tool-use and validation interceptor hooks" },
  { name: "config.hpp", desc: "Multi-source config loader (Global, Project, Local overrides)" },
  { name: "bootstrap.hpp", desc: "Startup sequence, diagnostic & compiler checks" },
  { name: "task_registry.hpp", desc: "Sub-agent execution registries" },
  { name: "team_cron_registry.hpp", desc: "Team coordination & cron task scheduling" },
  { name: "sandbox.hpp", desc: "Containerized environment detection (Docker/K8s/CI)" },
  { name: "directory_walker.hpp", desc: "Extremely fast multi-threaded file system crawler" }
];

const securityModes = [
  {
    key: "read-only",
    name: "Read-Only",
    level: "Safest",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
    accentColor: "#34d399",
    desc: "Strictly forbids writing or command execution. Only allows ls, cat, grep, and traversal.",
    json: `{
  "permissionMode": "read-only",
  "permissions": {
    "allow": ["Read(*)", "Grep(*)"],
    "deny": ["Bash(*)", "Write(*)"]
  }
}`
  },
  {
    key: "workspace-write",
    name: "Workspace-Write",
    level: "Default",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/5",
    accentColor: "#60a5fa",
    desc: "Enables read-write permissions, but only within the initialized project boundaries.",
    json: `{
  "permissionMode": "workspace-write",
  "permissions": {
    "allow": ["Read(*)", "Write(workspace/*)"],
    "deny": ["Bash(rm -rf *)", "Write(outside_workspace/*)"],
    "ask": ["Bash(*)"]
  }
}`
  },
  {
    key: "prompt",
    name: "Prompt",
    level: "Interactive",
    color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/5",
    accentColor: "#facc15",
    desc: "Asks for user confirmation via the CLIQ console before executing any file write or shell utility.",
    json: `{
  "permissionMode": "prompt",
  "permissions": {
    "allow": ["Read(*)"],
    "ask": ["Write(*)", "Bash(*)"]
  }
}`
  },
  {
    key: "allow",
    name: "Allow",
    level: "Trusting",
    color: "text-orange-400 border-orange-500/30 bg-orange-500/5",
    accentColor: "#fb923c",
    desc: "Performs workspace writes and general command executions seamlessly without prompting.",
    json: `{
  "permissionMode": "allow",
  "permissions": {
    "allow": ["*"],
    "deny": []
  }
}`
  },
  {
    key: "danger-full-access",
    name: "Danger-Full-Access",
    level: "Full Access",
    color: "text-[#FF3366] border-[#FF3366]/30 bg-[#FF3366]/5",
    accentColor: "#FF3366",
    desc: "Unrestricted engine permissions. Disables sandbox checks and bounds enforcement. WARNING: Use with caution.",
    json: `{
  "permissionMode": "danger-full-access",
  "permissions": {
    "allow": ["*"],
    "deny": [],
    "sandbox": "disabled"
  }
}`
  }
];

export default function Home() {
  const [copiedText, setCopiedText] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Terminal Simulation States
  const [terminalStep, setTerminalStep] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Bento File Tree States
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "cliq-code": true,
    "cliq-code/src_cpp": true,
    "cliq-code/src_python": true,
  });

  // Compaction Demo States
  const [compactionState, setCompactionState] = useState<"idle" | "compacting" | "compacted">("idle");

  // Selected Security Mode
  const [selectedSecurity, setSelectedSecurity] = useState(securityModes[1]); // workspace-write

  // Installation Tab States
  const [activeInstallTab, setActiveInstallTab] = useState<"exe" | "pip" | "developer">("exe");
  const [copiedInstallStep, setCopiedInstallStep] = useState<number | null>(null);

  // Architecture Selected Node
  const [activeArchNode, setActiveArchNode] = useState<"repl" | "python" | "pybind" | "cpp">("cpp");

  // Handle cursor glow movement
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateCursor);
    document.body.addEventListener("mouseenter", () => setIsHovering(true));
    document.body.addEventListener("mouseleave", () => setIsHovering(false));
    return () => {
      window.removeEventListener("mousemove", updateCursor);
    };
  }, []);

  // Terminal Simulation Engine
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const runSimulation = async () => {
      // Step 0: Initial prompt type
      if (terminalStep === 0) {
        let text = "python -m src_python.main";
        let current = "";
        for (let i = 0; i < text.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 60));
          current += text[i];
          setTerminalInput(current);
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
        setTerminalHistory((prev) => [
          ...prev,
          `$ ${text}`,
          "fliq v0.1.0 -- Lightning-fast AI coding agent",
          "Model: gemini/gemini-2.0-flash",
          "Workspace: C:\\users\\91931\\cliqcode",
          "Safety Catch: ACTIVE",
          "Type /help for commands, /quit to exit",
          ""
        ]);
        setTerminalInput("");
        setTerminalStep(1);
      }
      // Step 1: User types inquiry
      else if (terminalStep === 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let text = "help me refactor the login function in src/auth.py";
        let current = "";
        for (let i = 0; i < text.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          current += text[i];
          setTerminalInput(current);
        }
        await new Promise((resolve) => setTimeout(resolve, 600));
        setTerminalHistory((prev) => [...prev, `> ${text}`]);
        setTerminalInput("");
        setTerminalStep(2);
      }
      // Step 2: AI scanning and response
      else if (terminalStep === 2) {
        setTerminalHistory((prev) => [...prev, "🔍 Scanning workspace directories...", "⚙️ Compiling AST validation trees via C++ Engine..."]);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setTerminalHistory((prev) => [
          ...prev,
          "📄 Loaded src/auth.py (142 lines)",
          "🛠️ Detected login logic block. Formulating replacement chunk..."
        ]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTerminalHistory((prev) => [
          ...prev,
          "",
          "⚠️  [Safety Catch] CLIQ Code requests to modify: src/auth.py",
          "   Diff preview:",
          "   -  def login(user, pass):",
          "   -      if pass == 'admin123': return True",
          "   +  def login(user, hash_pass):",
          "   +      return secure_compare(hash_pass, get_stored_hash(user))",
          "",
          "   Do you want to apply this write operation? (Y/n): "
        ]);
        setTerminalStep(3);
      }
      // Step 3: User approves
      else if (terminalStep === 3) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        let text = "Y";
        setTerminalInput(text);
        await new Promise((resolve) => setTimeout(resolve, 400));
        setTerminalHistory((prev) => {
          const newHistory = [...prev];
          if (newHistory.length > 0) {
            newHistory[newHistory.length - 1] = newHistory[newHistory.length - 1] + "Y";
          }
          return [
            ...newHistory,
            "✓ Changes successfully written to src/auth.py via C++ File I/O module.",
            "✓ Session persistence logs updated.",
            ""
          ];
        });
        setTerminalInput("");
        setTerminalStep(4);
      }
    };

    runSimulation();
  }, [terminalStep]);

  // Autoscroll terminal container locally (doesn't yank page viewport scroll position)
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalHistory, terminalInput]);

  const resetTerminal = () => {
    setTerminalHistory([]);
    setTerminalInput("");
    setTerminalStep(0);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const copyStepCommand = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedInstallStep(index);
    setTimeout(() => setCopiedInstallStep(null), 2000);
  };

  const toggleNode = (path: string) => {
    setExpandedNodes((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderFileTree = (node: FileNode, currentPath: string = "") => {
    const path = currentPath ? `${currentPath}/${node.name}` : node.name;
    const isExpanded = expandedNodes[path];

    if (node.type === "dir") {
      return (
        <div key={path} className="pl-4 select-none">
          <div
            onClick={() => toggleNode(path)}
            className="flex items-center gap-1.5 py-1 px-1.5 rounded-sm hover:bg-[#1F1F24] cursor-pointer text-[#8B8B99] hover:text-[#F3F4F6] transition-colors text-xs font-mono"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <FolderTree className="w-3.5 h-3.5 text-[#00FFA2]" />
            <span>{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div className="border-l border-[#1F1F24]/60 ml-3">
              {node.children.map((child) => renderFileTree(child, path))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          key={path}
          className="flex items-center justify-between py-1 pl-8 pr-2 rounded-sm hover:bg-[#1F1F24] text-[#8B8B99] hover:text-[#00FFA2] transition-colors text-xs font-mono"
        >
          <div className="flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5" />
            <span>{node.name}</span>
          </div>
          <span className="text-[10px] text-[#8B8B99]/40">{node.size}</span>
        </div>
      );
    }
  };

  // Compaction Demo trigger
  const runCompaction = async () => {
    if (compactionState !== "idle") return;
    setCompactionState("compacting");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCompactionState("compacted");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative overflow-hidden bg-grid-matrix antialiased">
      {/* Background soft cursor radial glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(550px at ${cursorPos.x}px ${cursorPos.y}px, rgba(0, 255, 162, 0.07), transparent 85%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Floating Header Navigation */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="glass-panel w-full max-w-3xl rounded-full px-6 py-3 flex items-center justify-between shadow-2xl border-[#1F1F24]/80">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 bg-[#00FFA2] rounded-full shadow-[0_0_10px_rgba(0,255,162,0.6)] animate-pulse" />
            <span className="font-display font-extrabold text-sm tracking-tight text-white">
              CLIQ <span className="text-[#00FFA2]">CODE</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-[#8B8B99]">
            <a href="#architecture" className="hover:text-[#00FFA2] transition-colors">Architecture</a>
            <a href="#features" className="hover:text-[#00FFA2] transition-colors">Features</a>
            <a href="#security" className="hover:text-[#00FFA2] transition-colors">Security</a>
            <a href="#install" className="hover:text-[#00FFA2] transition-colors">Quick Start</a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/fliq-odd/cliq-code"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1F1F24] hover:bg-[#00FFA2] text-[#F3F4F6] hover:text-[#050505] transition-all duration-300 text-xs font-bold border border-[#1f1f24] hover:border-[#00ffa2] hover:shadow-[0_0_15px_rgba(0,255,162,0.35)]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full bg-[#1F1F24] hover:bg-[#00FFA2] text-[#8B8B99] hover:text-[#050505] transition-all duration-300 border border-[#1f1f24] hover:border-[#00ffa2] cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-4 right-4 glass-panel rounded-2xl p-6 shadow-2xl border-[#1F1F24]/90 flex flex-col gap-4 text-sm font-semibold md:hidden z-50 text-left"
            >
              <a
                href="#architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#1F1F24]/50 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
              >
                Architecture
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#1F1F24]/50 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
              >
                Features
              </a>
              <a
                href="#security"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#1F1F24]/50 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
              >
                Security
              </a>
              <a
                href="#install"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#1F1F24]/50 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
              >
                Quick Start
              </a>
              <a
                href="https://github.com/fliq-odd/cliq-code"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00FFA2] text-[#050505] font-bold text-center border border-[#00FFA2] hover:bg-transparent hover:text-white transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-24 max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Decorative ambient ring */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00FFA2]/3 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

        <div className="text-center max-w-4xl flex flex-col items-center">

          {/* Aggressive Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold uppercase leading-none tracking-tighter text-white select-none">
            {["Code", "at", "the", "Speed", "of", "Thought."].map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block mr-3 sm:mr-4 md:mr-6"
                initial={{ y: 60, opacity: 0, skewY: 7 }}
                animate={{ y: 0, opacity: 1, skewY: 0 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {word === "Thought." ? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA2] to-emerald-400 drop-shadow-[0_0_30px_rgba(0,255,162,0.15)]">{word}</span> : word}
              </motion.span>
            ))}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-xl text-[#8B8B99] mt-8 max-w-2xl font-sans font-medium leading-relaxed"
          >
            A model-agnostic AI coding assistant with a high-performance C++ engine and a Python-powered LLM brain. Right in your terminal.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full justify-center"
          >
            <a
              href="https://github.com/Fliq-Odd/cliq-code/releases/download/v0.1.0/cliq-code.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#00FFA2] hover:bg-[#050505] text-[#050505] hover:text-[#00FFA2] border border-[#00FFA2] transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,162,0.25)] hover:shadow-[0_0_35px_rgba(0,255,162,0.45)] group text-center"
            >
              <Download className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Download Standalone .exe</span>
            </a>

            <a
              href="#install"
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-transparent hover:bg-[#1F1F24]/50 text-white border border-[#1F1F24] hover:border-[#8B8B99]/30 transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2"
            >
              <span>Read the Docs</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Interactive Simulated Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-full max-w-4xl mt-16 glass-panel rounded-xl border border-[#1F1F24] shadow-2xl relative"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F1F24] bg-[#0c0c0e]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF3366]/40 border border-[#FF3366]/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-[#00FFA2]/40 border border-[#00FFA2]/60" />
            </div>
            <span className="font-mono text-[11px] font-semibold text-[#8B8B99]/60 tracking-wider">
              cliq-code — terminal session
            </span>
            <button
              onClick={resetTerminal}
              title="Reset Terminal Simulation"
              className="text-[#8B8B99] hover:text-[#00FFA2] transition-colors p-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Terminal body */}
          <div ref={terminalContainerRef} className="p-6 font-mono text-sm leading-relaxed min-h-[380px] max-h-[480px] overflow-y-auto text-left bg-[#050505]/90">
            {terminalHistory.map((line, index) => {
              if (line.startsWith("$ ")) {
                return (
                  <div key={index} className="text-[#8B8B99] font-bold mb-1">
                    {line}
                  </div>
                );
              } else if (line.startsWith("> ")) {
                return (
                  <div key={index} className="text-[#00FFA2] font-semibold mb-2">
                    {line}
                  </div>
                );
              } else if (line.startsWith("✓")) {
                return (
                  <div key={index} className="text-emerald-400 mb-1">
                    {line}
                  </div>
                );
              } else if (line.startsWith("⚠️")) {
                return (
                  <div key={index} className="text-[#FF3366] font-semibold my-2">
                    {line}
                  </div>
                );
              } else if (line.includes("-  ") && line.trim().startsWith("-")) {
                return (
                  <div key={index} className="text-red-400 bg-red-950/20 px-2 py-0.5 font-bold">
                    {line}
                  </div>
                );
              } else if (line.includes("+  ") && line.trim().startsWith("+")) {
                return (
                  <div key={index} className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 font-bold">
                    {line}
                  </div>
                );
              } else {
                return (
                  <div key={index} className="text-[#F3F4F6] mb-1">
                    {line}
                  </div>
                );
              }
            })}

            {/* Input simulator line */}
            <div className="flex items-center text-[#F3F4F6]">
              <span className="mr-2 text-[#8B8B99] font-bold">
                {terminalStep <= 0 ? "$" : terminalStep === 1 ? ">" : ""}
              </span>
              <span>{terminalInput}</span>
              <span className="terminal-cursor" />
            </div>
          </div>

          {/* Quick interactive shortcuts inside terminal */}
          <div className="absolute right-4 bottom-4 flex items-center gap-2 z-20">
            <span className="text-[10px] text-[#8B8B99] font-mono mr-1">Run:</span>
            <button
              onClick={() => {
                setTerminalHistory([
                  `$ python -m src_python.main --model ollama/llama3.1`,
                  "fliq v0.1.0 -- Lightning-fast AI coding agent",
                  "Model: ollama/llama3.1 (Local Mode)",
                  "Workspace: C:\\users\\91931\\cliqcode",
                  "Safety Catch: ACTIVE",
                  "",
                  "> grep secure_compare src/"
                ]);
                setTerminalStep(99);
                setTerminalInput("");
                setTimeout(() => {
                  setTerminalHistory((prev) => [
                    ...prev,
                    "🔍 Grepping workspace files for 'secure_compare'...",
                    "✓ Matches found:",
                    "  [1] src/auth.py:L142: return secure_compare(hash_pass, get_stored_hash(user))",
                    "  [2] src_cpp/include/cliq-code/bash_validation.hpp:L80: void secure_compare()",
                    ""
                  ]);
                }, 800);
              }}
              className="px-2 py-1 rounded bg-[#1F1F24] hover:bg-[#00FFA2] text-[#8B8B99] hover:text-[#050505] text-[11px] font-mono border border-[#1F1F24] transition-colors"
            >
              /grep
            </button>
            <button
              onClick={() => {
                setTerminalHistory([
                  `$ python -m src_python.main`,
                  "fliq v0.1.0 -- Lightning-fast AI coding agent",
                  "Model: gemini/gemini-2.0-flash",
                  "Workspace: C:\\users\\91931\\cliqcode",
                  "",
                  "> /safety"
                ]);
                setTerminalStep(99);
                setTerminalInput("");
                setTimeout(() => {
                  setTerminalHistory((prev) => [
                    ...prev,
                    "🛡️ [Safety Catch] Toggled OFF. Unsafe write permission requested.",
                    "⚠️  WARNING: System is now running in workspace-write mode without safety guards.",
                    ""
                  ]);
                }, 700);
              }}
              className="px-2 py-1 rounded bg-[#1F1F24] hover:bg-[#FF3366] text-[#8B8B99] hover:text-white text-[11px] font-mono border border-[#1F1F24] transition-colors"
            >
              /safety
            </button>
          </div>
        </motion.div>
      </section>

      {/* Bento Box Feature Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-left max-w-xl">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00FFA2] mb-3">Modular Engine</div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
            An Asymmetrical Bento Grid of Capabilities
          </h2>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Large - Any LLM Provider */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel glass-panel-hover rounded-xl p-8 md:col-span-2 relative overflow-hidden flex flex-col justify-between group min-h-[340px]"
          >
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#00FFA2]/5 rounded-full blur-3xl group-hover:bg-[#00FFA2]/10 transition-colors duration-500" />
            
            <div>
              <div className="inline-flex p-2.5 rounded-lg bg-[#00FFA2]/5 text-[#00FFA2] border border-[#00FFA2]/15 mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-extrabold uppercase text-white tracking-tight">Any LLM Provider</h3>
              <p className="text-sm text-[#8B8B99] mt-3 max-w-md leading-relaxed font-sans">
                Powered by LiteLLM. Hot-swap models on the fly without changing a single line of logic. Use Google Gemini, OpenAI, Anthropic Claude, Llama, DeepSeek, or run completely private local models via Ollama.
              </p>
            </div>

            {/* Simulated LLM Orbit display */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { name: "Google Gemini", active: true, badge: "Recommended" },
                { name: "OpenAI GPT-4o", active: false },
                { name: "Claude 3.5 Sonnet", active: false },
                { name: "Ollama Llama 3.1", active: false },
                { name: "DeepSeek Coder", active: false }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono border transition-all duration-300 ${
                    item.active
                      ? "bg-[#00FFA2]/10 border-[#00FFA2] text-[#00FFA2] font-semibold"
                      : "bg-[#0F0F11] border-[#1F1F24] text-[#8B8B99] hover:text-white hover:border-[#8B8B99]/40"
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-[#00FFA2]" : "bg-neutral-600"}`} />
                  <span>{item.name}</span>
                  {item.badge && <span className="text-[9px] uppercase px-1 py-0.2 bg-[#00FFA2]/20 text-[#00FFA2] rounded ml-1">{item.badge}</span>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Medium - File I/O & Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-panel glass-panel-hover rounded-xl p-8 flex flex-col justify-between group min-h-[340px]"
          >
            <div>
              <div className="inline-flex p-2.5 rounded-lg bg-[#00FFA2]/5 text-[#00FFA2] border border-[#00FFA2]/15 mb-6">
                <FolderTree className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-extrabold uppercase text-white tracking-tight">Codebase Explorer</h3>
              <p className="text-sm text-[#8B8B99] mt-3 leading-relaxed font-sans">
                Active directory scanning with safe file boundary traversal. Navigate, find keywords, grep, and locate code symbols instantly.
              </p>
            </div>

            {/* Interactive File Explorer Tree */}
            <div className="mt-6 p-4 rounded-lg bg-[#050505]/80 border border-[#1F1F24] overflow-hidden text-left max-h-[160px] overflow-y-auto">
              {renderFileTree(codebaseTree)}
            </div>
          </motion.div>

          {/* Card 3: Medium - Session Memory & Auto-Compaction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel glass-panel-hover rounded-xl p-8 flex flex-col justify-between group min-h-[360px]"
          >
            <div>
              <div className="inline-flex p-2.5 rounded-lg bg-[#00FFA2]/5 text-[#00FFA2] border border-[#00FFA2]/15 mb-6">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-extrabold uppercase text-white tracking-tight">Context Compactor</h3>
              <p className="text-sm text-[#8B8B99] mt-3 leading-relaxed font-sans">
                Tracks full session conversations in JSONL. Automatically compacts long discussions when context windows exceed limits, preserving key data.
              </p>
            </div>

            {/* Context Compactor Simulation Visual */}
            <div className="mt-6 p-4 rounded-lg bg-[#050505]/80 border border-[#1F1F24] relative text-left">
              <div className="flex items-center justify-between text-[10px] font-mono mb-2 text-[#8B8B99]">
                <span>CONTEXT CAPACITY</span>
                <span className={compactionState === "compacted" ? "text-emerald-400" : "text-[#FF3366] animate-pulse"}>
                  {compactionState === "idle" ? "95% (7,780/8,192 tokens)" : compactionState === "compacting" ? "Compacting..." : "18% (1,480/8,192 tokens)"}
                </span>
              </div>
              
              {/* Progress Gauge */}
              <div className="w-full h-2 bg-[#1F1F24] rounded-full overflow-hidden mb-4">
                <motion.div
                  className={`h-full ${compactionState === "compacted" ? "bg-emerald-400" : "bg-[#FF3366]"}`}
                  initial={{ width: "95%" }}
                  animate={{ width: compactionState === "compacted" ? "18%" : "95%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>

              <div className="space-y-1.5 h-16 overflow-hidden relative">
                {compactionState === "idle" && (
                  <>
                    <div className="text-[10px] font-mono text-[#8B8B99]/60 border-l border-[#FF3366]/40 pl-2">User: write login controller...</div>
                    <div className="text-[10px] font-mono text-[#8B8B99]/60 border-l border-[#FF3366]/40 pl-2">AI: created login controller...</div>
                    <div className="text-[10px] font-mono text-[#8B8B99]/60 border-l border-[#FF3366]/40 pl-2">User: mock test for that...</div>
                  </>
                )}
                {compactionState === "compacting" && (
                  <div className="flex items-center justify-center h-full text-xs font-mono text-[#00FFA2] gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing token embeddings...</span>
                  </div>
                )}
                {compactionState === "compacted" && (
                  <div className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/5 p-2 rounded-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Compacted 6,300 tokens to core semantic summary summary cards.</span>
                  </div>
                )}
              </div>

              {compactionState === "idle" && (
                <button
                  onClick={runCompaction}
                  className="mt-3 w-full py-1.5 rounded bg-[#FF3366] hover:bg-[#FF3366]/80 text-white font-mono text-xs font-bold transition-colors"
                >
                  Trigger Compaction
                </button>
              )}
            </div>
          </motion.div>

          {/* Card 4: Wide - C++ Engine Modules */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel glass-panel-hover rounded-xl p-8 md:col-span-2 relative overflow-hidden flex flex-col justify-between group min-h-[360px]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex p-2.5 rounded-lg bg-[#00FFA2]/5 text-[#00FFA2] border border-[#00FFA2]/15">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs text-[#00FFA2] font-semibold border border-[#00FFA2]/20 px-2 py-0.5 rounded">17 Core Modules</span>
              </div>
              
              <h3 className="text-2xl font-display font-extrabold uppercase text-white tracking-tight">C++ High-Performance Engine</h3>
              <p className="text-sm text-[#8B8B99] mt-3 max-w-xl leading-relaxed font-sans">
                A native C++20 engine running under the Python shell via pybind11 bindings. Ensures lightning-fast system calls, secure boundary validation pipelines, and system checks in milliseconds.
              </p>
            </div>

            {/* List of C++ headers */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {cppModulesList.map((mod, idx) => (
                <div
                  key={idx}
                  title={mod.desc}
                  className="p-2 rounded bg-[#050505] hover:bg-[#1F1F24] border border-[#1F1F24] hover:border-[#00FFA2]/30 transition-all duration-200 text-left group/chip"
                >
                  <div className="text-[11px] font-mono text-[#F3F4F6] font-bold group-hover/chip:text-[#00FFA2]">
                    {mod.name}
                  </div>
                  <div className="text-[9px] text-[#8B8B99] font-sans truncate mt-0.5">
                    {mod.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Architecture Diagram */}
      <section id="architecture" className="py-24 border-t border-[#1F1F24] relative z-10">
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00FFA2]/2 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-[#00FFA2] mb-3">System Design</div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              Interactive System Architecture
            </h2>
            <p className="text-sm text-[#8B8B99] mt-4 max-w-xl mx-auto font-sans leading-relaxed">
              CLIQ Code splits its responsibilities between a developer-friendly Python shell and a locked-down, high-performance C++ engine, linked via pybind11. Click on components to examine source file mappings.
            </p>
          </div>

          {/* Interactive Flowchart Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-5xl mx-auto relative mt-12">
            
            {/* Step 1: Terminal REPL */}
            <div
              onClick={() => setActiveArchNode("repl")}
              className={`p-6 rounded-xl border transition-all cursor-pointer relative ${
                activeArchNode === "repl"
                  ? "bg-[#00FFA2]/5 border-[#00FFA2] shadow-[0_0_25px_rgba(0,255,162,0.1)]"
                  : "bg-[#0F0F11] border-[#1F1F24] hover:border-[#8B8B99]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Terminal className={`w-5 h-5 ${activeArchNode === "repl" ? "text-[#00FFA2]" : "text-[#8B8B99]"}`} />
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-neutral-900 border border-[#1F1F24]">Layer 1</span>
              </div>
              <h4 className="font-display font-extrabold text-sm uppercase text-white">Your Terminal</h4>
              <p className="text-xs text-[#8B8B99] mt-2 font-sans leading-relaxed">
                Developer inputs natural queries. Outputs markdown-styled git diff previews and confirmation prompts.
              </p>
              {activeArchNode === "repl" && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#00FFA2]" />}
            </div>

            {/* Step 2: Python Frontend */}
            <div
              onClick={() => setActiveArchNode("python")}
              className={`p-6 rounded-xl border transition-all cursor-pointer relative ${
                activeArchNode === "python"
                  ? "bg-[#00FFA2]/5 border-[#00FFA2] shadow-[0_0_25px_rgba(0,255,162,0.1)]"
                  : "bg-[#0F0F11] border-[#1F1F24] hover:border-[#8B8B99]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Workflow className={`w-5 h-5 ${activeArchNode === "python" ? "text-[#00FFA2]" : "text-[#8B8B99]"}`} />
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-neutral-900 border border-[#1F1F24]">Layer 2</span>
              </div>
              <h4 className="font-display font-extrabold text-sm uppercase text-white">Python Frontend</h4>
              <p className="text-xs text-[#8B8B99] mt-2 font-sans leading-relaxed">
                LiteLLM brain routes prompts to Gemini/GPT/Claude. Manages REPL loops, interactive user input, and safety caches.
              </p>
              {activeArchNode === "python" && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#00FFA2]" />}
            </div>

            {/* Step 3: pybind11 Bridge */}
            <div
              onClick={() => setActiveArchNode("pybind")}
              className={`p-6 rounded-xl border transition-all cursor-pointer relative ${
                activeArchNode === "pybind"
                  ? "bg-[#00FFA2]/5 border-[#00FFA2] shadow-[0_0_25px_rgba(0,255,162,0.1)]"
                  : "bg-[#0F0F11] border-[#1F1F24] hover:border-[#8B8B99]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Code className={`w-5 h-5 ${activeArchNode === "pybind" ? "text-[#00FFA2]" : "text-[#8B8B99]"}`} />
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-neutral-900 border border-[#1F1F24]">Layer 3</span>
              </div>
              <h4 className="font-display font-extrabold text-sm uppercase text-white">pybind11 Bridge</h4>
              <p className="text-xs text-[#8B8B99] mt-2 font-sans leading-relaxed">
                Compiles C++ bindings natively into Python modules, offering zero-cost conversion overlays for system parameters.
              </p>
              {activeArchNode === "pybind" && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#00FFA2]" />}
            </div>

            {/* Step 4: C++ Core Engine */}
            <div
              onClick={() => setActiveArchNode("cpp")}
              className={`p-6 rounded-xl border transition-all cursor-pointer relative ${
                activeArchNode === "cpp"
                  ? "bg-[#00FFA2]/5 border-[#00FFA2] shadow-[0_0_25px_rgba(0,255,162,0.1)]"
                  : "bg-[#0F0F11] border-[#1F1F24] hover:border-[#8B8B99]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Cpu className={`w-5 h-5 ${activeArchNode === "cpp" ? "text-[#00FFA2]" : "text-[#8B8B99]"}`} />
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-neutral-900 border border-[#1F1F24]">Layer 4</span>
              </div>
              <h4 className="font-display font-extrabold text-sm uppercase text-white">C++ Engine</h4>
              <p className="text-xs text-[#8B8B99] mt-2 font-sans leading-relaxed">
                17 modules governing permission policies, Docker detection, bash command validators, context compaction, and JSONL logging.
              </p>
              {activeArchNode === "cpp" && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#00FFA2]" />}
            </div>

          </div>

          {/* Node detailed breakdown pane */}
          <div className="max-w-5xl mx-auto mt-10 p-6 rounded-xl bg-[#0F0F11] border border-[#1F1F24] text-left">
            <h4 className="text-sm font-mono text-[#00FFA2] uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>
                {activeArchNode === "repl" && "Terminal UI Configuration"}
                {activeArchNode === "python" && "Python Agent Frontend"}
                {activeArchNode === "pybind" && "pybind11 Binding Layer"}
                {activeArchNode === "cpp" && "C++ Core Modules Detail"}
              </span>
            </h4>

            {activeArchNode === "repl" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-[#8B8B99] leading-relaxed">
                    The command-line interface uses Python's <code>rich</code> library to print high-resolution diagnostic tables, syntax highlights, and markdown formats directly onto local TTY terminals.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-[#F3F4F6] font-mono">
                    <li>• Rich colors and markdown integration</li>
                    <li>• Spinners during long file generation</li>
                    <li>• Interactive confirmations using <code>InquirerPy</code></li>
                  </ul>
                </div>
                <div className="p-4 rounded bg-[#050505] border border-[#1F1F24] font-mono text-xs">
                  <div className="text-purple-400"># src_python/ui.py</div>
                  <div className="text-neutral-500 mt-2">from rich.console import Console</div>
                  <div className="text-neutral-500">from rich.panel import Panel</div>
                  <div className="text-neutral-500 mt-2">console = Console()</div>
                  <div className="text-[#00FFA2]">console.print(Panel("[bold green]Safety Catch: ACTIVE[/bold green]"))</div>
                </div>
              </div>
            )}

            {activeArchNode === "python" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-[#8B8B99] leading-relaxed">
                    Acts as the coordinator brain. It handles the LLM orchestrations, loading configuration priorities (global to local files), and checking safety filters before compiling native file operations.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-[#F3F4F6] font-mono">
                    <li>• <code>brain.py</code>: Manages LiteLLM requests routing</li>
                    <li>• <code>safety.py</code>: Performs path safety validation checks</li>
                    <li>• <code>main.py</code>: Holds the interactive REPL console loop</li>
                  </ul>
                </div>
                <div className="p-4 rounded bg-[#050505] border border-[#1F1F24] font-mono text-xs">
                  <div className="text-purple-400"># src_python/brain.py</div>
                  <div className="text-neutral-500">import litellm</div>
                  <div className="text-neutral-500">def route_request(prompt, model):</div>
                  <div className="text-neutral-500 font-semibold text-[#00FFA2]">    response = litellm.completion(model=model, messages=...)</div>
                  <div className="text-neutral-500">    return response</div>
                </div>
              </div>
            )}

            {activeArchNode === "pybind" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-[#8B8B99] leading-relaxed">
                    Translates data types seamlessly between Python's standard types (dicts, strings, lists) and C++'s native formats (std::string, std::vector, std::map) with zero latency overhead.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-[#F3F4F6] font-mono">
                    <li>• Bindings declared in <code>src_cpp/bindings/pybind_module.cpp</code></li>
                    <li>• Exposes functions like <code>read_file()</code>, <code>validate_command()</code>, <code>compact_context()</code></li>
                  </ul>
                </div>
                <div className="p-4 rounded bg-[#050505] border border-[#1F1F24] font-mono text-xs">
                  <div className="text-purple-400">// src_cpp/bindings/pybind_module.cpp</div>
                  <div className="text-neutral-500">#include &lt;pybind11/pybind11.h&gt;</div>
                  <div className="text-neutral-500">PYBIND11_MODULE(cliq_engine, m) &#123;</div>
                  <div className="text-neutral-500">    m.def("enforce_permission", &amp;enforce_permission);</div>
                  <div className="text-neutral-500">    m.def("validate_bash", &amp;validate_bash);</div>
                  <div className="text-[#00FFA2]">&#125;</div>
                </div>
              </div>
            )}

            {activeArchNode === "cpp" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-[#8B8B99] leading-relaxed">
                    The core engine handles physical operations. Compiling to native binary guarantees memory boundaries, lightning-fast regex traversing for grep commands, and strict permission sandboxing.
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-[#F3F4F6] font-mono">
                    <li>• 17 modules for compartmentalized tasks</li>
                    <li>• Boundary safety filters prevent directory escapes (<code>../</code>)</li>
                    <li>• Docker sandbox detection triggers automated restricted read-only levels</li>
                  </ul>
                </div>
                <div className="p-4 rounded bg-[#050505] border border-[#1F1F24] font-mono text-xs">
                  <div className="text-purple-400">// src_cpp/include/cliq-code/permission_enforcer.hpp</div>
                  <div className="text-neutral-500">enum class PermissionMode &#123;</div>
                  <div className="text-neutral-500">    READ_ONLY, WORKSPACE_WRITE, PROMPT, ALLOW, DANGER_FULL</div>
                  <div className="text-neutral-500">&#125;;</div>
                  <div className="text-neutral-500">bool enforce(const std::string&amp; operation, PermissionMode mode);</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5-Layered Security Catch */}
      <section id="security" className="py-24 border-t border-[#1F1F24] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-left max-w-xl">
            <div className="font-mono text-xs uppercase tracking-widest text-[#FF3366] mb-3">Security Guard</div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              The 5-Layered Security Catch
            </h2>
            <p className="text-sm text-[#8B8B99] mt-4 font-sans leading-relaxed">
              Safety is paramount when giving AI agents console access. Select a permission level below to check how the C++ Engine intercepts and restricts operations in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Level Selector buttons */}
            <div className="lg:col-span-1 space-y-3">
              {securityModes.map((mode) => (
                <button
                  key={mode.key}
                  onClick={() => setSelectedSecurity(mode)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    selectedSecurity.key === mode.key
                      ? `border-opacity-100 ${mode.color} shadow-lg`
                      : "bg-[#0F0F11] border-[#1F1F24] text-[#8B8B99] hover:bg-[#141417] hover:border-[#1F1F24]"
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B8B99]/60">
                      {mode.level}
                    </div>
                    <div className={`text-base font-display font-extrabold uppercase mt-1 ${selectedSecurity.key === mode.key ? "" : "text-white"}`}>
                      {mode.name}
                    </div>
                  </div>
                  <Lock className={`w-4 h-4 ${selectedSecurity.key === mode.key ? "" : "opacity-30"}`} />
                </button>
              ))}
            </div>

            {/* Level details / configuration panel */}
            <div className="lg:col-span-2 glass-panel rounded-xl p-8 border border-[#1F1F24] relative">
              <div
                className="absolute top-4 right-4 w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: selectedSecurity.accentColor }}
              />
              
              <h3 className="text-xl font-display font-extrabold uppercase text-white tracking-tight flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: selectedSecurity.accentColor }} />
                <span>Selected: {selectedSecurity.name}</span>
              </h3>

              <p className="text-sm text-[#8B8B99] mt-3 font-sans leading-relaxed">
                {selectedSecurity.desc}
              </p>

              {/* Dynamic JSON file configuration rendering */}
              <div className="mt-6 text-left">
                <div className="flex items-center justify-between px-4 py-2 bg-[#050505] rounded-t-lg border-t border-l border-r border-[#1F1F24] text-xs font-mono text-[#8B8B99]">
                  <div className="flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5" />
                    <span>.fliq/settings.json</span>
                  </div>
                  <span className="text-[10px] text-[#8B8B99]/40">Active Settings</span>
                </div>
                <div className="p-4 bg-[#050505] rounded-b-lg border-b border-l border-r border-[#1F1F24] font-mono text-xs text-[#F3F4F6] overflow-x-auto whitespace-pre">
                  {selectedSecurity.json}
                </div>
              </div>

              {/* Engine enforcement notification toast simulation */}
              <div className="mt-6 p-4 rounded-lg bg-[#0F0F11]/60 border border-[#1F1F24] flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#FF3366] shrink-0 mt-0.5" />
                <div className="text-xs text-left">
                  <div className="font-bold text-[#F3F4F6]">C++ Boundary Interceptor</div>
                  <p className="text-[#8B8B99] mt-1 leading-relaxed">
                    {selectedSecurity.key === "read-only" && "Engine blocks all writes and execute calls immediately at compile boundary level. Lowers execution risk to 0%."}
                    {selectedSecurity.key === "workspace-write" && "Requests modifying files outside active workspace are filtered and rejected. Execution of destructive bash triggers safety catch."}
                    {selectedSecurity.key === "prompt" && "Every single system-altering tool-call triggers a terminal modal popup block. Pauses operations until approval."}
                    {selectedSecurity.key === "allow" && "Permissions are pre-loaded. Writes and shell scripts run with zero user prompt interaction. Requires workspace trust."}
                    {selectedSecurity.key === "danger-full-access" && "WARNING: Sandbox restrictions disabled. Commands can modify system folders, hosts files, and critical OS directories. Use only inside isolated virtual systems."}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Installation & Quick Start */}
      <section id="install" className="py-24 border-t border-[#1F1F24] relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-[#00FFA2] mb-3">Get Started</div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              Installation & Setup
            </h2>
            <p className="text-sm text-[#8B8B99] mt-4 font-sans leading-relaxed">
              Launch CLIQ Code in less than 2 minutes. Install Python prerequisites, set your AI environment keys, and run the agent script directly.
            </p>
          </div>

          {/* IDE style tabbed installer card */}
          <div className="glass-panel rounded-xl border border-[#1F1F24] overflow-hidden">
            {/* Terminal header tabs */}
            <div className="flex items-center justify-between border-b border-[#1F1F24] bg-[#0c0c0e] px-4">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveInstallTab("exe")}
                  className={`px-4 py-3 font-mono text-xs font-semibold tracking-wider transition-colors border-b-2 uppercase ${
                    activeInstallTab === "exe"
                      ? "text-[#00FFA2] border-[#00FFA2] bg-[#050505]/50"
                      : "text-[#8B8B99] border-transparent hover:text-white"
                  }`}
                >
                  Standalone (Path A)
                </button>
                <button
                  onClick={() => setActiveInstallTab("pip")}
                  className={`px-4 py-3 font-mono text-xs font-semibold tracking-wider transition-colors border-b-2 uppercase ${
                    activeInstallTab === "pip"
                      ? "text-[#00FFA2] border-[#00FFA2] bg-[#050505]/50"
                      : "text-[#8B8B99] border-transparent hover:text-white"
                  }`}
                >
                  Pip Install (Path B)
                </button>
                <button
                  onClick={() => setActiveInstallTab("developer")}
                  className={`px-4 py-3 font-mono text-xs font-semibold tracking-wider transition-colors border-b-2 uppercase ${
                    activeInstallTab === "developer"
                      ? "text-[#00FFA2] border-[#00FFA2] bg-[#050505]/50"
                      : "text-[#8B8B99] border-transparent hover:text-white"
                  }`}
                >
                  Developer Setup (Path C)
                </button>
              </div>
              <Terminal className="w-4 h-4 text-[#8B8B99]/40" />
            </div>

            {/* Tab installation content */}
            <div className="p-6 text-left">
              {activeInstallTab === "exe" && (
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono text-[#00FFA2] uppercase tracking-wider font-bold">Step 1: Download Pre-compiled Binary</h4>
                      <a
                        href="https://github.com/Fliq-Odd/cliq-code/releases/download/v0.1.0/cliq-code.exe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded bg-[#1F1F24] hover:bg-[#00FFA2] text-[#8B8B99] hover:text-[#050505] text-[11px] font-mono border border-[#1F1F24] transition-all duration-300 flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(0,255,162,0.3)]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download cliq-code.exe</span>
                      </a>
                    </div>
                    <p className="text-xs text-[#8B8B99] mt-1 leading-relaxed">
                      Download the standalone binary directly. Move it to an installation folder (e.g. <code className="text-white">C:\Program Files\cliq-code</code>) and append that directory path to your system's <code className="text-white">PATH</code> environment variable.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono text-[#00FFA2] uppercase tracking-wider font-bold">Step 2: Configure Environment Keys</h4>
                      <button
                        onClick={() => copyStepCommand('[System.Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your-api-key-here", "User")', 2)}
                        className="p-1 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
                      >
                        {copiedInstallStep === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="p-3 bg-[#050505] rounded border border-[#1F1F24] font-mono text-xs text-[#F3F4F6] overflow-x-auto">
                      {`# Windows (PowerShell - permanent user profile setting):\n[System.Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your-api-key-here", "User")\n\n# macOS/Linux (Bash - append to ~/.bashrc):\nexport GEMINI_API_KEY="your-api-key-here"`}
                    </pre>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono text-[#00FFA2] uppercase tracking-wider font-bold">Step 3: Launch CLIQ Code</h4>
                      <button
                        onClick={() => copyStepCommand("cliq-code", 3)}
                        className="p-1 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
                      >
                        {copiedInstallStep === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="p-3 bg-[#050505] rounded border border-[#1F1F24] font-mono text-xs text-[#F3F4F6] overflow-x-auto">
                      {`cliq-code`}
                    </pre>
                  </div>
                </div>
              )}

              {activeInstallTab === "pip" && (
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono text-[#00FFA2] uppercase tracking-wider font-bold">Step 1: Install via git and pip</h4>
                      <button
                        onClick={() => copyStepCommand("pip install git+https://github.com/fliq-odd/cliq-code.git", 11)}
                        className="p-1 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
                      >
                        {copiedInstallStep === 11 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="p-3 bg-[#050505] rounded border border-[#1F1F24] font-mono text-xs text-[#F3F4F6] overflow-x-auto">
                      {`pip install git+https://github.com/fliq-odd/cliq-code.git`}
                    </pre>
                  </div>

                  {/* Step 2 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono text-[#00FFA2] uppercase tracking-wider font-bold">Step 2: Configure Environment Keys</h4>
                      <button
                        onClick={() => copyStepCommand('$env:GEMINI_API_KEY = "your-api-key-here"', 12)}
                        className="p-1 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
                      >
                        {copiedInstallStep === 12 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="p-3 bg-[#050505] rounded border border-[#1F1F24] font-mono text-xs text-[#F3F4F6] overflow-x-auto">
                      {`$env:GEMINI_API_KEY = "your-api-key-here"`}
                    </pre>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono text-[#00FFA2] uppercase tracking-wider font-bold">Step 3: Run cliq-code</h4>
                      <button
                        onClick={() => copyStepCommand("cliq-code", 13)}
                        className="p-1 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
                      >
                        {copiedInstallStep === 13 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="p-3 bg-[#050505] rounded border border-[#1F1F24] font-mono text-xs text-[#F3F4F6] overflow-x-auto">
                      {`cliq-code`}
                    </pre>
                  </div>
                </div>
              )}

              {activeInstallTab === "developer" && (
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono text-[#00FFA2] uppercase tracking-wider font-bold">Step 1: Clone Repository</h4>
                      <button
                        onClick={() => copyStepCommand("git clone https://github.com/fliq-odd/cliq-code.git\ncd cliq-code", 21)}
                        className="p-1 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
                      >
                        {copiedInstallStep === 21 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="p-3 bg-[#050505] rounded border border-[#1F1F24] font-mono text-xs text-[#F3F4F6] overflow-x-auto">
                      {`git clone https://github.com/fliq-odd/cliq-code.git\ncd cliq-code`}
                    </pre>
                  </div>

                  {/* Step 2 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono text-[#00FFA2] uppercase tracking-wider font-bold">Step 2: Install editable mode</h4>
                      <button
                        onClick={() => copyStepCommand("pip install -e .[dev]", 22)}
                        className="p-1 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
                      >
                        {copiedInstallStep === 22 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="p-3 bg-[#050505] rounded border border-[#1F1F24] font-mono text-xs text-[#F3F4F6] overflow-x-auto">
                      {`pip install -e .[dev]`}
                    </pre>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono text-[#00FFA2] uppercase tracking-wider font-bold">Step 3: Optional C++ Compilations</h4>
                      <button
                        onClick={() => copyStepCommand("cmake -B build -S src_cpp\ncmake --build build --config Release", 23)}
                        className="p-1 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
                      >
                        {copiedInstallStep === 23 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="p-3 bg-[#050505] rounded border border-[#1F1F24] font-mono text-xs text-[#F3F4F6] overflow-x-auto">
                      {`cmake -B build -S src_cpp\ncmake --build build --config Release`}
                    </pre>
                  </div>

                  {/* Step 4 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono text-[#00FFA2] uppercase tracking-wider font-bold">Step 4: Launch Main Module</h4>
                      <button
                        onClick={() => copyStepCommand("python -m src_python.main", 24)}
                        className="p-1 text-[#8B8B99] hover:text-[#00FFA2] transition-colors"
                      >
                        {copiedInstallStep === 24 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="p-3 bg-[#050505] rounded border border-[#1F1F24] font-mono text-xs text-[#F3F4F6] overflow-x-auto">
                      {`python -m src_python.main`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Codebase statistics list */}
      <section className="py-16 border-t border-[#1F1F24] relative z-10 max-w-5xl mx-auto px-6">
        <div className="glass-panel rounded-xl p-8 border border-[#1F1F24] text-left">
          <h3 className="text-lg font-display font-extrabold uppercase text-white tracking-tight mb-6">
            Codebase Audit Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "C++ Headers", files: 17, size: "~37 KB" },
              { label: "C++ Implementations", files: 17, size: "~122 KB" },
              { label: "C++ Test Suite", files: 1, size: "~6 KB" },
              { label: "pybind11 Bridge", files: 1, size: "~5 KB" },
              { label: "Python Frontend", files: 6, size: "~25 KB" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[#050505] border border-[#1F1F24] text-center">
                <div className="font-mono text-xl font-extrabold text-[#00FFA2]">{stat.files}</div>
                <div className="text-[11px] text-[#8B8B99] uppercase font-bold tracking-wider mt-1">{stat.label}</div>
                <div className="text-[10px] text-[#8B8B99]/50 font-mono mt-1">{stat.size}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center text-xs font-mono text-[#8B8B99]/60">
            <span>Aggregated footprint: 42 Files / ~195 KB native payload</span>
            <span>Tested with MSVC, GCC 10+, Clang 10+</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#1F1F24] relative z-10 bg-[#070709]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00FFA2] rounded-full shadow-[0_0_8px_rgba(0,255,162,0.6)]" />
              <span className="font-display font-extrabold text-sm uppercase tracking-tight text-white">
                CLIQ <span className="text-[#00FFA2]">CODE</span>
              </span>
            </div>
            <p className="text-xs text-[#8B8B99] mt-2 font-medium">
              Lightning-fast AI coding agent with a C++ performance engine.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-[#8B8B99]">
            <a href="https://github.com/fliq-odd/cliq-code" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Github className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
            <span className="text-[#1F1F24]">|</span>
            <span>MIT License</span>
            <span className="text-[#1F1F24]">|</span>
            <span>© 2026 Fliq-Odd Team</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
