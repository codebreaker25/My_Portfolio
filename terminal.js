/* ============================================================
   Interactive terminal for the portfolio.
   Type `help` to list commands. Fully client-side.
   ============================================================ */
(function () {
  "use strict";

  const USER = "guest";
  const HOST = "codebreaker25";
  const PS1_HTML =
    `<span class="t-green t-bold">${USER}@${HOST}</span>` +
    `<span class="t-dim">:</span>` +
    `<span class="t-cyan">~</span>` +
    `<span class="t-dim">$</span> `;

  const body = document.getElementById("term-body");
  if (!body) return;

  const history = [];
  let histIdx = -1;

  /* ---------- content data ---------- */
  const DATA = {
    whoami: [
      { c: "t-green t-bold", t: "Akash Gupta" },
      { c: "t-dim", t: "Security Engineer · VAPT · Offensive Tooling · AI-in-Pentesting" },
      { c: "", t: "" },
      { c: "", t: "Security Engineer with hands-on experience in VAPT, security" },
      { c: "", t: "automation, and offensive tooling. Ranked 77th / 22,000+ in" },
      { c: "", t: "Pentathon 2025. CloudSEK CTF finalist and FamPay CTF full-board clear" },
      { c: "", t: "(6/6), with 130+ documented HackTheBox & CTF writeups on Medium." },
      { c: "", t: "Currently building AI-powered internal tooling at Sopra Banking Software." },
    ],
    skills: [
      { c: "t-green t-bold", t: "[+] Offensive Techniques" },
      { c: "", t: "    Web App Pentesting (OWASP Top 10), API Security (REST/GraphQL)," },
      { c: "", t: "    IDOR, Role Tampering, XSS, SQLi, JWT Attacks, SSTI, Active Directory," },
      { c: "", t: "    Privilege Escalation, Source Code Review" },
      { c: "", t: "" },
      { c: "t-green t-bold", t: "[+] Tools & Frameworks" },
      { c: "", t: "    Burp Suite, Nmap, Wireshark, Ghidra, GDB/pwndbg, BloodHound," },
      { c: "", t: "    Impacket, CrackMapExec, FFUF, Dirsearch, Exegol, OWASP ZAP, Docker" },
      { c: "", t: "" },
      { c: "t-green t-bold", t: "[+] Programming & Scripting" },
      { c: "", t: "    Python, Bash, JavaScript, SQL, C (RE), Assembly (learning)" },
      { c: "", t: "" },
      { c: "t-green t-bold", t: "[+] AI & Automation" },
      { c: "", t: "    MCP (Model Context Protocol), LLM tool integration," },
      { c: "", t: "    Microsoft Copilot Studio, RAG pipelines, Python/Bash automation" },
    ],
    projects: [
      { c: "t-amber t-bold", t: "AI-Powered Kali MCP Server" },
      { c: "", t: "  Docker-containerized Kali MCP server letting LLMs orchestrate 15+" },
      { c: "", t: "  pentest tools via natural language. FastMCP over stdio, OpenVPN for" },
      { c: "", t: "  HTB/THM labs, shlex sanitization + 300s timeouts for safe execution." },
      { c: "t-dim", t: "  stack: Docker · Kali · FastMCP · Python · OpenVPN · LLM" },
      { c: "", t: "" },
      { c: "t-amber t-bold", t: "Network Vulnerability Scanner" },
      { c: "", t: "  Python CLI: multi-threaded socket port scanning (100+ threads)," },
      { c: "", t: "  dual-mode version detection (banner + nmap -sV), and CVE correlation" },
      { c: "", t: "  via the NVD API with semver matching + CVSS scoring. JSON/CSV/TXT out." },
      { c: "t-dim", t: "  stack: Python · Multithreading · NVD API · python-nmap" },
      { c: "t-cyan", t: "  github.com/codebreaker25/network-vulnerability-scanner" },
      { c: "", t: "" },
      { c: "t-amber t-bold", t: "Secure College Companion (Android App)" },
      { c: "", t: "  Authenticated messaging + announcement app following secure SDLC" },
      { c: "", t: "  and OWASP MASVS principles." },
      { c: "t-dim", t: "  stack: Android · OWASP MASVS · Secure SDLC" },
    ],
    ctf: [
      { c: "t-green t-bold", t: "FLAG{full_board_clear}  FamPay Security CTF — 6/6, 1,850 pts, 100% solve rate" },
      { c: "", t: "" },
      { c: "t-amber t-bold", t: "77th / 22,000+  " , x: "Pentathon 2025 (national, individual)" },
      { c: "t-amber t-bold", t: "112 / 500     " , x: "CloudSEK CTF — Finalist (qualified from 2,500+)" },
      { c: "t-amber t-bold", t: "130+          " , x: "HackTheBox / CTF writeups documented & published" },
      { c: "t-amber t-bold", t: "60th / 600+   " , x: "CTF 1753" },
      { c: "t-amber t-bold", t: "~111th        " , x: "DownUnder CTF 2024" },
      { c: "", t: "" },
      { c: "t-dim", t: "Skills: Web Exploitation, API Security, JWT/SSTI/RCE chains," },
      { c: "t-dim", t: "        Binary Exploitation, Reverse Engineering, Recon Automation" },
    ],
    experience: [
      { c: "t-white t-bold", t: "Junior Engineer — Infrastructure Management" },
      { c: "t-cyan", t: "Sopra Banking Software · Mar 2026 – Present · Noida (Remote)" },
      { c: "", t: "" },
      { c: "", t: "  ▸ Built an internal AI Copilot assistant (Microsoft Copilot Studio +" },
      { c: "", t: "    SharePoint SOP docs) to query operational procedures in natural language." },
      { c: "", t: "  ▸ Developed automation scripts for infrastructure monitoring and workflows —" },
      { c: "", t: "    trusted with automation initiatives within months of joining." },
      { c: "", t: "  ▸ Manage batch operations and production incident response across shifts." },
    ],
    education: [
      { c: "t-white t-bold", t: "Bachelor of Computer Applications" },
      { c: "t-cyan", t: "JIMS Rohini Sector 5 · 2025" },
      { c: "t-dim", t: "Focus: Cybersecurity & Network Security" },
    ],
    contact: [
      { c: "", t: "email     ", l: "mailto:akash.gupta.contact@gmail.com", lt: "akash.gupta.contact@gmail.com" },
      { c: "", t: "github    ", l: "https://github.com/codebreaker25", lt: "github.com/codebreaker25" },
      { c: "", t: "linkedin  ", l: "https://www.linkedin.com/in/akash-gupta-codebreaker", lt: "linkedin.com/in/akash-gupta-codebreaker" },
      { c: "", t: "medium    ", l: "https://medium.com/@akash.gupta.contact", lt: "medium.com/@akash.gupta.contact" },
      { c: "", t: "phone     ", plain: "+91 9773865396" },
    ],
  };

  /* ---------- output helpers ---------- */
  function el(cls, html) {
    const d = document.createElement("div");
    d.className = "term-line " + (cls || "");
    d.innerHTML = html;
    return d;
  }
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function print(cls, text) {
    body.insertBefore(el(cls, text), inputLine);
  }
  function printData(rows) {
    rows.forEach((r) => {
      let html;
      if (r.l) {
        html = `<span class="t-green">${esc(r.t)}</span> <a href="${r.l}" target="_blank" rel="noopener">${esc(r.lt)}</a>`;
      } else if (r.plain) {
        html = `<span class="t-green">${esc(r.t)}</span> ${esc(r.plain)}`;
      } else if (r.x) {
        html = `<span class="${r.c}">${esc(r.t)}</span> <span class="t-dim">·</span> ${esc(r.x)}`;
      } else {
        html = `<span class="${r.c}">${esc(r.t) || "&nbsp;"}</span>`;
      }
      body.insertBefore(el("", html), inputLine);
    });
  }
  function blank() { print("", "&nbsp;"); }

  /* ---------- commands ---------- */
  const COMMANDS = {
    help() {
      const pairs = [
        ["whoami", "who is Akash?"],
        ["about", "the long version"],
        ["skills", "technical arsenal"],
        ["projects", "things I've built"],
        ["experience", "work history"],
        ["ctf", "CTF & competition record"],
        ["education", "academic background"],
        ["writeups", "blog / research"],
        ["contact", "reach out"],
        ["resume", "open the résumé view"],
        ["social", "all my links"],
        ["banner", "reprint the intro banner"],
        ["matrix", "🟢 you take the green pill..."],
        ["sudo", "try it"],
        ["clear", "wipe the screen"],
        ["gui / exit", "go to the visual portfolio"],
      ];
      blank();
      print("t-green t-bold", "Available commands:");
      pairs.forEach(([c, d]) => {
        print("", `  <span class="t-cyan">${c.padEnd(14)}</span><span class="t-dim">${d}</span>`);
      });
      blank();
      print("t-dim", "tip: use ↑/↓ for history, Tab to autocomplete.");
    },
    whoami() { blank(); printData(DATA.whoami); blank(); },
    about() {
      blank();
      printData(DATA.whoami);
      blank();
      print("", "I care about building things that make offensive work faster and");
      print("", "smarter — custom tooling, recon automation, and wiring LLMs into");
      print("", "real pentest workflows via MCP. Comfortable from binary internals");
      print("", "up to cloud & API security.");
      blank();
    },
    skills() { blank(); printData(DATA.skills); blank(); },
    projects() { blank(); printData(DATA.projects); blank(); },
    experience() { blank(); printData(DATA.experience); blank(); },
    exp() { this.experience(); },
    ctf() { blank(); printData(DATA.ctf); blank(); },
    education() { blank(); printData(DATA.education); blank(); },
    edu() { this.education(); },
    writeups() {
      blank();
      print("t-amber t-bold", "Writeups & Research");
      blank();
      print("", `<span class="t-green">▸</span> CloudSEK CTF_FINAL 2025 — Multi-step exploitation (JWT → SSTI → RCE)`);
      print("", `<span class="t-green">▸</span> CloudSEK CTF 2025 — Writeup`);
      print("", `<span class="t-green">▸</span> FamPay Security CTF — full board clear (Android · Firebase · AWS SSRF→IMDS) <span class="t-dim">[soon]</span>`);
      print("", `<span class="t-green">▸</span> AI-Powered Kali MCP appliance — architecture, WSL/Docker networking, threat model`);
      blank();
      print("", `<span class="t-green">medium  </span> <a href="https://medium.com/@akash.gupta.contact" target="_blank" rel="noopener">medium.com/@akash.gupta.contact</a>`);
      blank();
    },
    blog() { this.writeups(); },
    contact() {
      blank();
      print("t-green t-bold", "Get in touch:");
      printData(DATA.contact);
      blank();
    },
    social() { this.contact(); },
    links() { this.contact(); },
    resume() {
      blank();
      print("t-cyan", "Opening the visual résumé view...");
      document.getElementById("resume-anchor")?.scrollIntoView({ behavior: "smooth" });
    },
    gui() {
      blank();
      print("t-cyan", "Scrolling to the visual portfolio ↓");
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    },
    exit() { this.gui(); },
    banner() { printBanner(); },
    clear() {
      body.querySelectorAll(".term-line").forEach((n) => n.remove());
    },
    matrix() {
      blank();
      print("t-green", "Wake up, Neo... (press ESC or click to exit)");
      if (window.__startMatrix) window.__startMatrix();
    },
    sudo(args) {
      blank();
      const cmd = args.join(" ");
      if (cmd) {
        print("t-red", `[sudo] password for ${USER}: `);
        print("t-red", `${USER} is not in the sudoers file. This incident will be reported.`);
      } else {
        print("t-dim", "usage: sudo <command>  (spoiler: it won't help you here 😉)");
      }
    },
    ls() {
      blank();
      print("", `<span class="t-cyan">about.md</span>   <span class="t-cyan">skills.json</span>   <span class="t-cyan">projects/</span>   <span class="t-cyan">ctf.log</span>   <span class="t-cyan">contact.vcf</span>`);
      blank();
    },
    cat(args) {
      const f = (args[0] || "").replace(/\.\w+$/, "");
      const map = { about: "about", skills: "skills", projects: "projects", ctf: "ctf", contact: "contact" };
      if (map[f]) { COMMANDS[map[f]](); }
      else { blank(); print("t-red", `cat: ${args[0] || ""}: No such file or directory`); blank(); }
    },
    echo(args) { blank(); print("", esc(args.join(" "))); blank(); },
    pwd() { blank(); print("", "/home/codebreaker/portfolio"); blank(); },
    date() { blank(); print("", new Date().toString()); blank(); },
    history() {
      blank();
      history.forEach((h, i) => print("", `  <span class="t-dim">${String(i + 1).padStart(3)}</span>  ${esc(h)}`));
      blank();
    },
  };

  const HIDDEN = ["hack", "nmap", "flag", "id", "uname"];
  COMMANDS.hack = function () {
    blank();
    print("t-green", "Initializing exploit... [████████████] 100%");
    print("t-green", "Just kidding. Real hacking is 90% enumeration and reading docs. 🔍");
    blank();
  };
  COMMANDS.nmap = function () {
    blank();
    print("t-dim", "Starting Nmap scan against 127.0.0.1 ...");
    print("", "PORT     STATE  SERVICE");
    print("", `22/tcp   <span class="t-green">open</span>   ssh`);
    print("", `80/tcp   <span class="t-green">open</span>   http     <span class="t-dim">// this portfolio</span>`);
    print("", `1337/tcp <span class="t-green">open</span>   elite    <span class="t-amber">// hire-me service</span>`);
    blank();
  };
  COMMANDS.flag = function () {
    blank();
    print("t-green t-bold", "FLAG{y0u_f0und_th3_h1dd3n_c0mm4nd_n1c3_r3c0n}");
    print("t-dim", "You clearly read the source. That's the offensive mindset. 🚩");
    blank();
  };
  COMMANDS.id = function () {
    blank();
    print("", "uid=1337(akash) gid=1337(hackers) groups=1337(hackers),27(sudo_wannabe),100(ctf)");
    blank();
  };
  COMMANDS.uname = function () {
    blank();
    print("", "CodebreakerOS 6.6.6-offensive x86_64 GNU/Linux");
    blank();
  };

  /* ---------- banner ---------- */
  function printBanner() {
    const art = [
      "  ▄▀█ █▄▀ ▄▀█ █▀ █░█   █▀▀ █░█ █▀█ ▀█▀ ▄▀█",
      "  █▀█ █░█ █▀█ ▄█ █▀█   █▄█ █▄█ █▀▀ ░█░ █▀█",
    ];
    art.forEach((l) => print("t-green", esc(l)));
    print("t-dim", "  ── Security Engineer · Offensive Tooling · AI-in-Pentesting ──");
    blank();
    print("", `Type <span class="t-green t-bold">help</span> to list commands, or <span class="t-cyan">whoami</span> to start.`);
    blank();
  }

  /* ---------- input line ---------- */
  const inputLine = document.createElement("div");
  inputLine.className = "prompt-line";
  inputLine.innerHTML =
    `<span class="prompt-ps1">${PS1_HTML}</span>` +
    `<span class="term-input-wrap"><input class="term-input" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="terminal input" /></span>`;
  body.appendChild(inputLine);
  const input = inputLine.querySelector(".term-input");

  function run(raw) {
    const line = raw.trim();
    // echo the entered command as a static line
    const echo = el("prompt-line", `<span class="prompt-ps1">${PS1_HTML}</span><span>${esc(raw)}</span>`);
    body.insertBefore(echo, inputLine);

    if (line) { history.push(line); histIdx = history.length; }

    const [cmd, ...args] = line.split(/\s+/);
    if (!cmd) { /* empty */ }
    else if (COMMANDS[cmd]) {
      try { COMMANDS[cmd](args); } catch (e) { print("t-red", "error: " + esc(String(e))); }
    } else {
      blank();
      print("t-red", `command not found: ${esc(cmd)}`);
      print("t-dim", `type <span class="t-green">help</span> for a list of commands.`);
      blank();
    }
    body.scrollTop = body.scrollHeight;
  }

  function autocomplete(val) {
    const all = Object.keys(COMMANDS).concat(HIDDEN);
    const m = all.filter((c) => c.startsWith(val));
    if (m.length === 1) input.value = m[0];
    else if (m.length > 1) {
      blank();
      print("t-dim", m.join("   "));
      body.scrollTop = body.scrollHeight;
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const v = input.value;
      input.value = "";
      run(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = history[histIdx] || ""; }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx] || ""; }
      else { histIdx = history.length; input.value = ""; }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (input.value.trim()) autocomplete(input.value.trim());
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      COMMANDS.clear();
    }
  });

  // focus input when clicking anywhere in the terminal body
  body.addEventListener("click", (e) => {
    if (window.getSelection().toString()) return; // allow text selection
    input.focus();
  });

  /* ---------- maximize toggle ---------- */
  const maxBtn = document.getElementById("term-max");
  const terminal = document.getElementById("terminal");
  if (maxBtn && terminal) {
    maxBtn.addEventListener("click", () => {
      terminal.classList.toggle("maximized");
      maxBtn.textContent = terminal.classList.contains("maximized") ? "▢ restore" : "▢ max";
      input.focus();
    });
  }

  /* ---------- boot sequence ---------- */
  const boot = [
    { c: "t-dim", t: "Booting CodebreakerOS ..." },
    { c: "t-green", t: "[ OK ] mounting /home/codebreaker" },
    { c: "t-green", t: "[ OK ] loading offensive toolkit" },
    { c: "t-green", t: "[ OK ] establishing secure shell" },
  ];
  let bi = 0;
  function bootStep() {
    if (bi < boot.length) {
      print(boot[bi].c, esc(boot[bi].t));
      bi++;
      body.scrollTop = body.scrollHeight;
      setTimeout(bootStep, 230);
    } else {
      blank();
      printBanner();
      input.focus();
    }
  }
  bootStep();

  // keep focus reasonable but don't steal it from the rest of the page
  window.addEventListener("keydown", (e) => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag !== "input" && tag !== "textarea" && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const r = terminal.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0 && e.key.length === 1) {
        input.focus();
      }
    }
  });
})();

/* ============================================================
   Extras: typing hero, matrix rain, reveal-on-scroll
   ============================================================ */
(function () {
  "use strict";

  /* hero typing effect */
  const typed = document.getElementById("typed");
  if (typed) {
    const phrases = [
      "whoami",
      "Security Engineer @ Sopra Banking Software",
      "VAPT · Offensive Tooling · AI-in-Pentesting",
      "77th / 22,000+ · Pentathon 2025",
      "building LLM-driven pentest workflows",
    ];
    let pi = 0, ci = 0, deleting = false;
    function tick() {
      const p = phrases[pi];
      typed.textContent = deleting ? p.slice(0, ci--) : p.slice(0, ci++);
      let delay = deleting ? 34 : 68;
      if (!deleting && ci > p.length) { deleting = true; delay = 1500; }
      else if (deleting && ci < 0) { deleting = false; ci = 0; pi = (pi + 1) % phrases.length; delay = 320; }
      setTimeout(tick, delay);
    }
    tick();
  }

  /* matrix rain easter egg */
  const canvas = document.getElementById("matrix-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let anim = null, drops = [];
    const chars = "01ｱｶｻﾀﾅﾊﾏﾔﾗﾜﾝ日本ｦｱ<>#@$%".split("");
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / 16);
      drops = new Array(cols).fill(1);
    }
    function draw() {
      ctx.fillStyle = "rgba(10, 14, 20, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#2fe886";
      ctx.font = "15px monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      anim = requestAnimationFrame(draw);
    }
    function stop() {
      canvas.style.display = "none";
      if (anim) cancelAnimationFrame(anim);
      anim = null;
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("click", stop);
    }
    function onKey(e) { if (e.key === "Escape") stop(); }
    window.__startMatrix = function () {
      resize();
      canvas.style.display = "block";
      window.addEventListener("resize", resize);
      window.addEventListener("keydown", onKey);
      canvas.addEventListener("click", stop);
      if (!anim) draw();
    };
  }

  /* reveal on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.style.opacity = "1";
        en.target.style.transform = "none";
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll("[data-reveal]").forEach((n) => {
    n.style.opacity = "0";
    n.style.transform = "translateY(18px)";
    n.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    io.observe(n);
  });
})();
