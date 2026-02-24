/* ============================================================
   1. CUSTOM CURSOR
============================================================ */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = (mx - 10) + 'px';
  cursor.style.top  = (my - 10) + 'px';
});
(function loop() {
  rx += (mx - rx - 16) * 0.9;
  ry += (my - ry - 16) * 0.9;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; ring.style.width = '54px'; ring.style.height = '54px'; ring.style.opacity = '.25'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)';   ring.style.width = '32px'; ring.style.height = '32px'; ring.style.opacity = '.5'; });
});

/* ============================================================
   2. TYPING ANIMATION
============================================================ */
const heroName  = document.getElementById('heroName');
const typeCaret = document.getElementById('typeCaret');
const line1 = 'Indira';
const line2 = 'Gundavarapu';
let idx = 0, phase = 1;
let line1El, line2El;

function typeNext() {
  if (phase === 1) {
    if (!line1El) { line1El = document.createElement('span'); heroName.insertBefore(line1El, typeCaret); }
    if (idx < line1.length) { line1El.textContent += line1[idx++]; setTimeout(typeNext, 75 + Math.random() * 40); }
    else { phase = 2; setTimeout(typeNext, 220); }
  } else if (phase === 2) {
    const br = document.createElement('br');
    heroName.insertBefore(br, typeCaret);
    line2El = document.createElement('span');
    line2El.className = 'glow';
    heroName.insertBefore(line2El, typeCaret);
    idx = 0; phase = 3;
    setTimeout(typeNext, 80);
  } else if (phase === 3) {
    if (idx < line2.length) { line2El.textContent += line2[idx++]; setTimeout(typeNext, 65 + Math.random() * 45); }
    else { setTimeout(() => { typeCaret.style.display = 'none'; heroName.classList.add('done'); }, 800); }
  }
}
setTimeout(typeNext, 600);

/* ============================================================
   3. MOUSE PARALLAX on hero code block
============================================================ */
const parallaxEl = document.getElementById('parallaxCode');
let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
const STRENGTH = 18;

document.addEventListener('mousemove', e => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  targetX = ((e.clientX - cx) / cx) * STRENGTH;
  targetY = ((e.clientY - cy) / cy) * STRENGTH;
});

(function parallaxLoop() {
  currentX += (targetX - currentX) * 0.06;
  currentY += (targetY - currentY) * 0.06;
  if (parallaxEl) parallaxEl.style.transform = `translate(${currentX}px, ${currentY}px)`;
  requestAnimationFrame(parallaxLoop);
})();

const eyebrow = document.querySelector('.hero-eyebrow');
document.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  if (eyebrow) eyebrow.style.transform = `translate(${((e.clientX - cx) / cx) * -5}px, ${((e.clientY - cy) / cy) * -5}px)`;
});

/* ============================================================
   4. EASTER EGG TERMINAL
============================================================ */
const overlay  = document.getElementById('etOverlay');
const etBody   = document.getElementById('etBody');
const etInput  = document.getElementById('etInput');
let termOpen   = false;
let cmdHistory = [];
let histIdx    = -1;

const navLogo = document.getElementById('navLogo');
setInterval(() => {
  navLogo.style.animation = 'glitchLogo 0.35s ease';
  setTimeout(() => { navLogo.style.animation = ''; }, 400);
}, 8000 + Math.random() * 4000);

const COMMANDS = {
  help: () => [
    { t: 'info',    v: '─────────────────────────────────────' },
    { t: 'success', v: '  Available commands' },
    { t: 'info',    v: '─────────────────────────────────────' },
    { t: 'output',  v: '  <span style="color:var(--cyan)">whoami</span>          → about Indira' },
    { t: 'output',  v: '  <span style="color:var(--cyan)">ls projects</span>     → list all projects' },
    { t: 'output',  v: '  <span style="color:var(--cyan)">cat skills.txt</span>  → view skill stack' },
    { t: 'output',  v: '  <span style="color:var(--cyan)">cat llm.txt</span>     → LLM project status' },
    { t: 'output',  v: '  <span style="color:var(--cyan)">open github</span>     → go to GitHub' },
    { t: 'output',  v: '  <span style="color:var(--cyan)">open linkedin</span>   → go to LinkedIn' },
    { t: 'output',  v: '  <span style="color:var(--cyan)">contact</span>         → get in touch' },
    { t: 'output',  v: '  <span style="color:var(--cyan)">coffee</span>          → critical utility' },
    { t: 'output',  v: '  <span style="color:var(--cyan)">sudo hire indira</span>→ best command' },
    { t: 'output',  v: '  <span style="color:var(--cyan)">clear</span>           → clear terminal' },
    { t: 'info',    v: '─────────────────────────────────────' },
  ],
  whoami: () => [
    { t: 'success', v: 'Indira Gundavarapu' },
    { t: 'output',  v: 'Role      : Software Development Engineer' },
    { t: 'output',  v: 'Domains   : Full-Stack, Backend, ML / AI' },
    { t: 'output',  v: 'Location  : United States' },
    { t: 'output',  v: 'Status    : <span style="color:var(--green)">● open to roles</span>' },
    { t: 'output',  v: 'Fun fact  : currently training an LLM 🤖' },
  ],
  'ls projects': () => [
    { t: 'info',    v: 'total 5 projects' },
    { t: 'output',  v: '<span style="color:var(--cyan)">drwxr-xr-x</span>  DevPulse        <span style="color:var(--muted)">// Issue Tracker · Full-Stack</span>' },
    { t: 'output',  v: '<span style="color:var(--cyan)">drwxr-xr-x</span>  SpendWise       <span style="color:var(--muted)">// Budget App · Full-Stack</span>' },
    { t: 'output',  v: '<span style="color:var(--cyan)">drwxr-xr-x</span>  CoRead          <span style="color:var(--muted)">// Book Club App · Full-Stack</span>' },
    { t: 'purple',  v: '<span style="color:var(--purple)">drwxr-xr-x</span>  SmartResume     <span style="color:var(--muted)">// JD Matcher · ML + NLP</span>' },
    { t: 'purple',  v: '<span style="color:var(--purple)">drwxr-xr-x</span>  SentimentStream <span style="color:var(--muted)">// Live NLP · ML + SSE</span>' },
    { t: 'warn',    v: '<span style="color:var(--orange)">drwxr-xr-x</span>  CustomLLM       <span style="color:var(--muted)">// From Scratch · In Progress 🔧</span>' },
  ],
  'cat skills.txt': () => [
    { t: 'info',    v: '── Languages ──' },
    { t: 'output',  v: 'Python [■■■■■■■■■░] 93%   Java [■■■■■■■■░░] 88%' },
    { t: 'output',  v: 'TypeScript [■■■■■■■■░░] 82%   SQL [■■■■■■■■░░] 80%' },
    { t: 'info',    v: '── ML / AI ──' },
    { t: 'purple',  v: 'PyTorch [■■■■■■■■░░] 82%   HuggingFace [■■■■■■■░░░] 78%' },
    { t: 'purple',  v: 'Fine-tuning [■■■■■■■░░░] 70%   Embeddings [■■■■■■■░░░] 75%' },
    { t: 'info',    v: '── Backend ──' },
    { t: 'output',  v: 'FastAPI [■■■■■■■■■░] 87%   Node [■■■■■■■■░░] 80%' },
    { t: 'output',  v: 'PostgreSQL [■■■■■■■░░░] 78%   Redis [■■■■■■■░░░] 78%' },
  ],
  'cat llm.txt': () => [
    { t: 'warn',    v: '🤖 Custom LLM — Status: IN PROGRESS' },
    { t: 'info',    v: '──────────────────────────────────' },
    { t: 'output',  v: '[✓] BPE Tokenizer implemented' },
    { t: 'output',  v: '[✓] Positional encoding done' },
    { t: 'output',  v: '[✓] Multi-head self-attention done' },
    { t: 'output',  v: '[✓] Transformer block complete' },
    { t: 'output',  v: '[~] Training loop in progress...' },
    { t: 'output',  v: '[~] Dataset prep ongoing...' },
    { t: 'output',  v: '[ ] Evaluation TBD' },
    { t: 'info',    v: '──────────────────────────────────' },
    { t: 'success', v: 'Upload coming soon. Stay tuned ✦' },
  ],
  'open github': () => { setTimeout(() => window.open('https://github.com/gundavarapuindira25-max', '_blank'), 300); return [{ t: 'success', v: 'Opening GitHub... 🚀' }]; },
  'open linkedin': () => { setTimeout(() => window.open('https://linkedin.com/in/indira-gundavarapu', '_blank'), 300); return [{ t: 'success', v: 'Opening LinkedIn... 🔗' }]; },
  contact: () => [
    { t: 'output',  v: 'Email   : gundavarapuindira25@gmail.com' },
    { t: 'output',  v: 'GitHub  : github.com/gundavarapuindira25-max' },
    { t: 'output',  v: 'LinkedIn: linkedin.com/in/indira-gundavarapu' },
    { t: 'success', v: "Let's build something great 🛠️" },
  ],
  coffee: () => [
    { t: 'warn',    v: '☕  Initiating coffee protocol...' },
    { t: 'output',  v: 'Checking cup... [FULL]' },
    { t: 'output',  v: 'Caffeine level: ∞ mg/dL' },
    { t: 'success', v: 'System optimal. Ready to ship. 🚀' },
  ],
  'sudo hire indira': () => [
    { t: 'success', v: '[sudo] Password accepted ✓' },
    { t: 'success', v: '──────────────────────────────────' },
    { t: 'success', v: ' 🎉 Excellent choice! ' },
    { t: 'success', v: '──────────────────────────────────' },
    { t: 'output',  v: 'Sending offer letter...' },
    { t: 'output',  v: 'Calendly invite incoming...' },
    { t: 'info',    v: '→ Contact: gundavarapuindira25@gmail.com' },
  ],
  clear: () => '__clear__',
};

function print(lines) {
  if (lines === '__clear__') { etBody.innerHTML = ''; return; }
  lines.forEach(({ t, v }) => {
    const el = document.createElement('span');
    el.className = `et-line output ${t}`;
    el.innerHTML = v;
    etBody.appendChild(el);
  });
  const gap = document.createElement('span');
  gap.className = 'et-line gap';
  etBody.appendChild(gap);
  etBody.scrollTop = etBody.scrollHeight;
}

function printPromptLine(cmd) {
  const el = document.createElement('span');
  el.className = 'et-line prompt-line';
  el.innerHTML = `<span class="et-prompt">indira@portfolio:~$</span> <span class="et-cmd">${cmd}</span>`;
  etBody.appendChild(el);
}

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;
  cmdHistory.unshift(raw); histIdx = -1;
  printPromptLine(raw);
  if (COMMANDS[cmd]) { const res = COMMANDS[cmd](); if (res) print(res); }
  else print([{ t: 'err', v: `bash: ${cmd}: command not found. Try <span style="color:var(--white)">help</span>` }]);
}

function openTerminal() { overlay.classList.add('open'); termOpen = true; setTimeout(() => etInput.focus(), 100); }
function closeTerminal() { overlay.classList.remove('open'); termOpen = false; }
function handleOverlayClick(e) { if (e.target === overlay) closeTerminal(); }

etInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') { const val = etInput.value; etInput.value = ''; runCommand(val); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); if (histIdx < cmdHistory.length - 1) { histIdx++; etInput.value = cmdHistory[histIdx]; } }
  else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx > 0) { histIdx--; etInput.value = cmdHistory[histIdx]; } else { histIdx = -1; etInput.value = ''; } }
  else if (e.key === 'Escape') closeTerminal();
});

document.addEventListener('keydown', e => {
  if (e.key === '`' && !e.target.closest('input, textarea')) termOpen ? closeTerminal() : openTerminal();
  if (e.key === 'Escape' && termOpen) closeTerminal();
});

navLogo.addEventListener('click', openTerminal);

/* ============================================================
   5. SCROLL REVEAL
============================================================ */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), parseInt(e.target.dataset.d || 0)); ro.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el, i) => { el.dataset.d = (i % 5) * 80; ro.observe(el); });

/* ============================================================
   6. SKILL BARS
============================================================ */
const so = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(b => { setTimeout(() => { b.style.width = b.dataset.w + '%'; }, 200); });
      so.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-group').forEach(g => so.observe(g));

/* ============================================================
   7. SKILL PIE CHARTS
============================================================ */
function buildSkillPie(id, langs) {
  const wrap = document.getElementById(id);
  if (!wrap) return;
  const total = langs.reduce((s, l) => s + l.pct, 0);
  const cx = 100, cy = 100, R = 85;
  const NS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 200 200');
  svg.setAttribute('class', 'lang-pie-svg');

  let startAngle = -Math.PI / 2;
  langs.forEach(lang => {
    const angle = (lang.pct / total) * 2 * Math.PI;
    const x1 = cx + R * Math.cos(startAngle), y1 = cy + R * Math.sin(startAngle);
    startAngle += angle;
    const x2 = cx + R * Math.cos(startAngle), y2 = cy + R * Math.sin(startAngle);
    const large = angle > Math.PI ? 1 : 0;
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', `M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} Z`);
    path.setAttribute('fill', lang.color);
    path.classList.add('pie-slice');
    Object.assign(path.dataset, { name: lang.name, pct: lang.pct, fact: lang.fact, color: lang.color });
    svg.appendChild(path);
  });

  wrap.appendChild(svg);

  const factBox = document.createElement('div');
  factBox.className = 'pie-fact-box';
  factBox.innerHTML = '<span class="pie-fact-placeholder">hover a slice</span>';
  wrap.appendChild(factBox);

  const legend = document.createElement('div');
  legend.className = 'pie-legend';
  langs.forEach(l => {
    const item = document.createElement('div');
    item.className = 'pie-legend-item';
    item.innerHTML = `<span class="pie-legend-dot" style="background:${l.color}"></span><span class="pie-legend-name">${l.name}</span><span class="pie-legend-pct">${l.pct}%</span>`;
    legend.appendChild(item);
  });
  wrap.appendChild(legend);

  const allSlices = svg.querySelectorAll('.pie-slice');
  allSlices.forEach(slice => {
    slice.addEventListener('mouseenter', () => {
      const { fact, color } = slice.dataset;
      factBox.innerHTML = `<span class="pie-fact-dot" style="background:${color}"></span>${fact}`;
      allSlices.forEach(s => { s.style.opacity = s === slice ? '1' : '0.2'; });
      slice.style.filter = `drop-shadow(0 0 8px #fff) drop-shadow(0 0 20px rgba(255,255,255,0.75))`;
    });
    slice.addEventListener('mouseleave', () => {
      factBox.innerHTML = '<span class="pie-fact-placeholder">hover a slice</span>';
      allSlices.forEach(s => { s.style.opacity = '0.82'; s.style.filter = ''; });
    });
  });
}

// Languages — normals (classic vivid, scrambled order)
buildSkillPie('langPieWrap', [
  { name: 'Python',      pct: 93, color: '#364958', fact: 'Built ML pipelines that cut model inference latency by ~40%' },
  { name: 'Java',        pct: 88, color: '#3b6064', fact: 'Powered backend services processing 10k+ API requests/day' },
  { name: 'TypeScript',  pct: 82, color: '#55828b', fact: 'Shipped 3 production apps with real-time WebSocket features' },
  { name: 'SQL',         pct: 80, color: '#87bba2', fact: 'Optimised queries cutting page load by 60% across 5 projects' },
  { name: 'C / C++',     pct: 65, color: '#c9e4ca', fact: 'Implemented OS schedulers & custom data structures at uni' },
]);

// ML/AI — pastels (soft, washed out, scrambled order)
buildSkillPie('mlPieWrap', [
  { name: 'PyTorch',        pct: 82, color: '#fb6f92', fact: 'Trained transformer models end-to-end with custom PyTorch loops' },
  { name: 'HuggingFace',    pct: 78, color: '#ff8fab', fact: 'Used pre-trained models cutting NLP pipeline build time by 60%' },
  { name: 'Fine-tune/LoRA', pct: 70, color: '#ffb3c6', fact: 'LoRA fine-tuned LLMs on domain corpora with 4-bit quantisation' },
  { name: 'NLP/Embeddings', pct: 75, color: '#ffc2d1', fact: 'Built semantic search achieving 90%+ retrieval accuracy via FAISS' },
  { name: 'scikit-learn',   pct: 83, color: '#ffe5ec', fact: 'Shipped classification pipelines at 88%+ F1 across 3 ML projects' },
]);

// Backend — spicy darks (deep jewel tones, distinct hues from Languages)
buildSkillPie('backendPieWrap', [
  { name: 'FastAPI/Django',   pct: 87, color: '#5465ff', fact: 'Built REST APIs serving 10k+ req/day with sub-100ms p95 latency' },
  { name: 'Node/Express',     pct: 80, color: '#788bff', fact: 'WebSocket servers handling 500+ concurrent users in production' },
  { name: 'REST/GraphQL',     pct: 82, color: '#9bb1ff', fact: 'Typed GraphQL schemas reduced over-fetching by ~40%' },
  { name: 'PostgreSQL/Redis', pct: 78, color: '#bfd7ff', fact: 'Redis caching cut DB load by 55% across 3 projects' },
  { name: 'WebSockets/SSE',   pct: 72, color: '#e2fdff', fact: 'Streamed live NLP predictions over SSE with <50ms token latency' },
]);

// Frontend — neons (electric, scrambled order)
buildSkillPie('frontendPieWrap', [
  { name: 'React/Next.js', pct: 84, color: '#d0b8ac', fact: 'Delivered 3 production SPAs with SSR & dynamic code splitting' },
  { name: 'CSS/Tailwind',  pct: 80, color: '#f3d8c7', fact: 'Pixel-perfect responsive UIs across all breakpoints, zero libraries' },
  { name: 'Docker/CI/CD',  pct: 78, color: '#efe5dc', fact: 'Containerised 4 projects; automated deploys cut ship time by 70%' },
  { name: 'AWS/GCP',       pct: 68, color: '#fbfefb', fact: 'Deployed ML inference endpoints on GCP with auto-scaling configs' },
]);

/* ============================================================
   8. PROJECT FILTER
============================================================ */
function filterProjects(cat, btn) {
  document.querySelectorAll('.proj-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(c => { c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none'; });
}

/* ============================================================
   8. NAV ACTIVE
============================================================ */
window.addEventListener('scroll', () => {
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => { if (window.scrollY >= s.offsetTop - 220) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
});

/* ============================================================
   9. CONTACT FORM
============================================================ */
const FORMSPREE_ID = 'mwvnaqzr';

async function sendMsg(btn) {
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMsg').value.trim();

  if (!name || !email || !message) {
    btn.textContent = 'fill all fields'; btn.style.background = 'var(--orange)'; btn.style.color = '#000';
    setTimeout(() => { btn.textContent = 'send_message()'; btn.style.background = ''; btn.style.color = ''; }, 2000);
    return;
  }

  const orig = btn.textContent;
  btn.textContent = 'sending...'; btn.disabled = true; btn.style.opacity = '.7';

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    if (res.ok) {
      btn.textContent = 'sent ✓'; btn.style.background = 'var(--green)'; btn.style.color = '#000'; btn.style.opacity = '1';
      document.getElementById('contactName').value = '';
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactMsg').value = '';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; }, 3000);
    } else {
      throw new Error('failed');
    }
  } catch {
    btn.textContent = 'error — try again'; btn.style.background = 'var(--orange)'; btn.style.color = '#000'; btn.style.opacity = '1';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; }, 3000);
  }
}
