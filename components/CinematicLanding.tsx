'use client';

import { useEffect } from 'react';

export default function CinematicLanding() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Load GSAP, then ScrollTrigger, then initialize all animations
    const s1 = document.createElement('script');
    s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    document.head.appendChild(s1);

    s1.onload = () => {
      const s2 = document.createElement('script');
      s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      document.head.appendChild(s2);

      s2.onload = () => {
        cleanup = initPage();
      };
    };

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return <div className="cinematic-landing" dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}

/* =========================================================================
   PAGE INITIALIZATION — All GSAP animations, cursor, waveform, orbit, timer
   ========================================================================= */
function initPage(): () => void {
  const gsap = (window as any).gsap;
  const ScrollTrigger = (window as any).ScrollTrigger;
  if (!gsap || !ScrollTrigger) return () => {};

  gsap.registerPlugin(ScrollTrigger);

  // ── Cursor ──
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  const onMouseMove = (e: MouseEvent) => {
    if (cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }
    setTimeout(() => {
      if (cursorRing) { cursorRing.style.left = e.clientX + 'px'; cursorRing.style.top = e.clientY + 'px'; }
    }, 80);
  };
  document.addEventListener('mousemove', onMouseMove);

  const hoverEnterHandlers: Array<[Element, EventListener]> = [];
  const hoverLeaveHandlers: Array<[Element, EventListener]> = [];

  document.querySelectorAll('button, a').forEach(el => {
    const enter = () => {
      if (cursor) { cursor.style.width = '16px'; cursor.style.height = '16px'; }
      if (cursorRing) { cursorRing.style.width = '52px'; cursorRing.style.height = '52px'; }
    };
    const leave = () => {
      if (cursor) { cursor.style.width = '8px'; cursor.style.height = '8px'; }
      if (cursorRing) { cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; }
    };
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    hoverEnterHandlers.push([el, enter as EventListener]);
    hoverLeaveHandlers.push([el, leave as EventListener]);
  });

  // ── Progress bar + Scroll indicator ──
  const progressBar = document.getElementById('progressBar');
  const scrollIndicator = document.getElementById('scrollIndicator');

  const onScroll = () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    if (progressBar) progressBar.style.width = pct + '%';
    if (scrollIndicator) scrollIndicator.classList.toggle('visible', window.scrollY < 200);
  };
  window.addEventListener('scroll', onScroll);
  if (scrollIndicator) scrollIndicator.classList.add('visible');

  // ── GSAP: Hero ──
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('.hero-eyebrow', { opacity: 1, duration: 0.7, delay: 0.3 })
    .to('.hero-title', { opacity: 1, y: 0, duration: 1.0 }, '-=0.3')
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .to('.hero-pipeline-preview', { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=0.4');

  // ── GSAP: Category ──
  gsap.timeline({
    scrollTrigger: { trigger: '#category', start: 'top 70%', end: 'bottom 20%', scrub: false, once: true }
  })
    .to('.category-strike', { opacity: 1, duration: 0.5 })
    .to('.category-headline', { opacity: 1, y: 0, duration: 0.9 }, '-=0.2')
    .to('.category-sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');

  // ── GSAP: Pipeline ──
  gsap.timeline({
    scrollTrigger: { trigger: '#pipeline', start: 'top 70%', once: true }
  })
    .to('#pipeline .scene-label', { opacity: 1, duration: 0.5 })
    .to('#pipeline .scene-headline .line', { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.2')
    .to('.pipeline-board', { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power2.out' }, '-=0.3')
    .to('.pipeline-ai-strip', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

  // ── GSAP: Document portal ──
  gsap.timeline({
    scrollTrigger: { trigger: '#documents', start: 'top 65%', once: true }
  })
    .to('#documents .scene-label', { opacity: 1, duration: 0.5 })
    .to('#documents .scene-headline .line', { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.2')
    .to('.doc-sub-text', { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
    .to('.doc-portal-card', { opacity: 1, x: 0, scale: 1, duration: 1.0, ease: 'power2.out' }, '-=0.5')
    .to('.doc-item', { opacity: 1, x: 0, duration: 0.4, stagger: 0.1 }, '-=0.4')
    .to('#docFill', { width: '96%', duration: 0, onComplete: () => {
      const fill = document.getElementById('docFill');
      if (fill) fill.style.width = '96%';
    } }, '-=0.3')
    .to('.ai-insight-card', { opacity: 1, y: 0, duration: 0.6 }, '-=0.1');

  ScrollTrigger.create({
    trigger: '#documents',
    start: 'top 65%',
    once: true,
    onEnter: () => {
      setTimeout(() => {
        const fill = document.getElementById('docFill');
        if (fill) fill.style.width = '96%';
      }, 900);
    }
  });

  // ── GSAP: Call intelligence ──
  gsap.timeline({
    scrollTrigger: { trigger: '#call', start: 'top 65%', once: true }
  })
    .to('#call .scene-label', { opacity: 1, duration: 0.5 })
    .to('#call .scene-headline .line', { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.2')
    .to('.call-layout', { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '-=0.2')
    .to('#ciPanel', { opacity: 1, x: 0, duration: 0.8 }, '-=0.6');

  ScrollTrigger.create({
    trigger: '#call',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      [1,2,3,4].forEach((i, idx) => {
        setTimeout(() => {
          const el = document.getElementById('t' + i);
          if (el) el.classList.add('visible');
        }, 600 + idx * 800);
      });
      [1,2,3,4].forEach((i, idx) => {
        setTimeout(() => {
          const el = document.getElementById('ci' + i);
          if (el) el.classList.add('visible');
        }, 800 + idx * 700);
      });
      setTimeout(() => {
        const meter = document.getElementById('confMeter');
        if (meter) meter.classList.add('visible');
        setTimeout(() => {
          const fill = document.getElementById('confFill');
          if (fill) fill.style.width = '82%';
        }, 200);
      }, 3200);
    }
  });

  // ── Waveform bars ──
  const waveform = document.getElementById('waveform');
  if (waveform) {
    for (let i = 0; i < 48; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar';
      const h = 12 + Math.random() * 32;
      bar.style.height = h + 'px';
      bar.style.animationDelay = (Math.random() * 1.4) + 's';
      bar.style.animationDuration = (0.8 + Math.random() * 0.8) + 's';
      waveform.appendChild(bar);
    }
  }

  // ── Call timer ──
  let callSeconds = 272;
  const timerInterval = setInterval(() => {
    callSeconds++;
    const m = Math.floor(callSeconds / 60).toString().padStart(2, '0');
    const s = (callSeconds % 60).toString().padStart(2, '0');
    const t = document.getElementById('callTimer');
    if (t) t.textContent = m + ':' + s;
  }, 1000);

  // ── GSAP: Command center ──
  gsap.timeline({
    scrollTrigger: { trigger: '#command', start: 'top 65%', once: true }
  })
    .to('#command .scene-label', { opacity: 1, duration: 0.5 })
    .to('#command .scene-headline .line', { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.2')
    .to('#commandGrid', { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power2.out' }, '-=0.2');

  ScrollTrigger.create({
    trigger: '#command',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      [1,2,3,4,5].forEach((i, idx) => {
        setTimeout(() => {
          const el = document.getElementById('cf' + i);
          if (el) el.classList.add('visible');
        }, 800 + idx * 200);
      });
    }
  });

  // ── GSAP: Workflow ──
  gsap.timeline({
    scrollTrigger: { trigger: '#workflow', start: 'top 65%', once: true }
  })
    .to('#workflow .scene-label', { opacity: 1, duration: 0.5 })
    .to('#workflow .scene-headline .line', { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.2')
    .to('.workflow-sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
    .to('.workflow-card', { opacity: 1, x: 0, scale: 1, duration: 1.0, ease: 'power2.out' }, '-=0.4');

  ScrollTrigger.create({
    trigger: '#workflow',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      [1,2,3,4,5].forEach((i, idx) => {
        setTimeout(() => {
          const el = document.getElementById('wf' + i);
          if (el) el.classList.add('visible');
        }, 700 + idx * 220);
      });
    }
  });

  // ── GSAP: System orbit ──
  gsap.timeline({
    scrollTrigger: { trigger: '#system', start: 'top 65%', once: true }
  })
    .to('#system .scene-label', { opacity: 1, duration: 0.5 })
    .to('#system .scene-headline .line', { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.2')
    .to('#systemOrbit', { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' }, '-=0.4');

  // Build orbit nodes
  const orbitNodes = document.getElementById('orbitNodes');
  if (orbitNodes) {
    const nodes = [
      { name: 'Borrower', role: 'Client Portal', angle: 90, ring: 150 },
      { name: 'Loan Officer', role: 'Pipeline', angle: 210, ring: 150 },
      { name: 'Processor', role: 'Documents', angle: 330, ring: 150 },
      { name: 'Realtor', role: 'Partner Portal', angle: 0, ring: 250 },
      { name: 'Underwriter', role: 'Risk Engine', angle: 72, ring: 250 },
      { name: 'Call AI', role: 'Intelligence', angle: 144, ring: 250 },
      { name: 'Workflow', role: 'Engine', angle: 216, ring: 250 },
      { name: 'Doc Portal', role: 'Smart Docs', angle: 288, ring: 250 },
    ];

    nodes.forEach(node => {
      const rad = (node.angle - 90) * Math.PI / 180;
      const x = node.ring * Math.cos(rad);
      const y = node.ring * Math.sin(rad);

      const line = document.createElement('div');
      line.className = 'orbit-line';
      const lineAngle = node.angle - 90;
      line.style.width = node.ring + 'px';
      line.style.transform = `rotate(${lineAngle}deg)`;
      line.style.animationDelay = Math.random() * 3 + 's';
      orbitNodes.appendChild(line);

      const nodeEl = document.createElement('div');
      nodeEl.style.cssText = `
        position: absolute;
        left: calc(50% + ${x}px);
        top: calc(50% + ${y}px);
        transform: translate(-50%, -50%);
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 8px 12px;
        backdrop-filter: blur(16px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04);
        white-space: nowrap;
        text-align: center;
      `;
      nodeEl.innerHTML = `
        <div style="font-size:.78rem;font-weight:500;color:var(--text-primary)">${node.name}</div>
        <div style="font-family:var(--font-mono);font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim)">${node.role}</div>
      `;
      orbitNodes.appendChild(nodeEl);
    });
  }

  // ── GSAP: Closing ──
  gsap.timeline({
    scrollTrigger: { trigger: '#closing', start: 'top 65%', once: true }
  })
    .to('.closing-title', { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' })
    .to('.closing-sub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .to('.closing-ctas', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .to('.closing-tagline', { opacity: 1, duration: 0.8 }, '-=0.2');

  // ── Hero parallax ──
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self: any) => {
      const p = self.progress;
      const title = document.querySelector('.hero-title') as HTMLElement;
      const sub = document.querySelector('.hero-sub') as HTMLElement;
      if (title) title.style.transform = `translateY(${p * 60}px)`;
      if (sub) sub.style.transform = `translateY(${p * 40}px)`;
    }
  });

  // Reset scene labels (GSAP animates them individually)
  document.querySelectorAll('.scene-label').forEach(el => {
    gsap.set(el, { opacity: 0 });
  });

  // ── Smooth scroll for nav ──
  const scrollClickHandlers: Array<[Element, EventListener]> = [];
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const handler = (e: Event) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    };
    link.addEventListener('click', handler);
    scrollClickHandlers.push([link, handler]);
  });

  // ── CTA button handlers ──
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      const pipeline = document.getElementById('pipeline');
      if (pipeline) pipeline.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Cleanup function ──
  return () => {
    clearInterval(timerInterval);
    document.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('scroll', onScroll);
    hoverEnterHandlers.forEach(([el, fn]) => el.removeEventListener('mouseenter', fn));
    hoverLeaveHandlers.forEach(([el, fn]) => el.removeEventListener('mouseleave', fn));
    scrollClickHandlers.forEach(([el, fn]) => el.removeEventListener('click', fn));
    try { ScrollTrigger.getAll().forEach((t: any) => t.kill()); } catch {}
  };
}

/* =========================================================================
   BODY HTML — Static content rendered via dangerouslySetInnerHTML
   ========================================================================= */
const BODY_HTML = `
<div class="noise"></div>
<div class="ambient-tl"></div>
<div class="ambient-br"></div>
<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursorRing"></div>
<div class="progress-bar" id="progressBar"></div>
<div class="scroll-indicator" id="scrollIndicator">
  <span class="scroll-text">Scroll</span>
  <div class="scroll-line"></div>
</div>

<!-- NAV -->
<nav>
  <div class="nav-logo">
    <div class="nav-logo-dot"></div>
    Perennia
  </div>
  <div class="nav-links">
    <a href="#pipeline">Pipeline</a>
    <a href="#documents">Documents</a>
    <a href="#call">Intelligence</a>
    <a href="#workflow">Workflow</a>
  </div>
  <div style="display:flex;align-items:center;gap:12px">
    <a href="https://app.perenniaai.com/login" class="nav-login">Log In</a>
    <a href="https://app.perenniaai.com/register" class="nav-cta">Book a Demo</a>
  </div>
</nav>

<!-- SCENE 1: HERO -->
<section id="hero">
  <div class="hero-eyebrow">Introducing Perennia AI</div>
  <h1 class="hero-title">The Mortgage<br><em>Operating System</em></h1>
  <p class="hero-sub">Everything connected. Everything visible.<br>Everything moving forward.</p>
  <div class="hero-ctas">
    <button class="btn-primary">Watch the System Work</button>
    <a href="https://app.perenniaai.com/register" class="btn-ghost">Book a Strategy Session</a>
  </div>
  <div class="hero-pipeline-preview">
    <div class="pipeline-strip">
      <div class="p-stage">
        <div class="p-stage-label">Leads</div>
        <div class="p-stage-count">24</div>
      </div>
      <div class="p-connector"></div><div class="p-connector-arrow"></div>
      <div class="p-stage active">
        <div class="p-stage-label">Processing</div>
        <div class="p-stage-count">18</div>
      </div>
      <div class="p-connector"></div><div class="p-connector-arrow"></div>
      <div class="p-stage">
        <div class="p-stage-label">Underwriting</div>
        <div class="p-stage-count">11</div>
      </div>
      <div class="p-connector"></div><div class="p-connector-arrow"></div>
      <div class="p-stage">
        <div class="p-stage-label">CTC</div>
        <div class="p-stage-count">7</div>
      </div>
      <div class="p-connector"></div><div class="p-connector-arrow"></div>
      <div class="p-stage">
        <div class="p-stage-label">Closing</div>
        <div class="p-stage-count">4</div>
      </div>
    </div>
    <div class="hero-glow"></div>
  </div>
</section>

<!-- SCENE 2: CATEGORY REFRAME -->
<section id="category">
  <div class="category-inner">
    <div class="category-strike">Another mortgage CRM</div>
    <h2 class="category-headline">Most software tracks files.<br><span>Perennia runs the process.</span></h2>
    <p class="category-sub">Your pipeline shouldn't sit still. With 20+ specialized AI agents, every stage has intelligence, every file has ownership, and every deadline has a system watching it.</p>
  </div>
</section>

<!-- SCENE 3: PIPELINE INTELLIGENCE -->
<section id="pipeline">
  <div class="scene-label">Pipeline Intelligence</div>
  <h2 class="scene-headline">
    <span class="line">Every file has structure.</span>
    <span class="line">Every stage has ownership.</span>
    <span class="line">Every deadline has intelligence.</span>
  </h2>

  <div class="pipeline-board glass-card">
    <div style="padding: 24px 24px 0; display: flex; gap: 8px; margin-bottom: 16px;">
      <div style="width:12px;height:12px;border-radius:50%;background:rgba(255,107,107,0.5)"></div>
      <div style="width:12px;height:12px;border-radius:50%;background:rgba(255,184,77,0.5)"></div>
      <div style="width:12px;height:12px;border-radius:50%;background:rgba(61,255,160,0.5)"></div>
      <div style="flex:1;height:12px;border-radius:6px;background:rgba(255,255,255,0.04);margin-left:8px"></div>
    </div>
    <div style="display:flex; gap:0; padding:0 16px 24px">

      <div class="pipeline-col">
        <div class="pipeline-col-header"><div class="col-dot"></div>Leads</div>
        <div class="loan-card status-active">
          <div class="loan-card-name">Daniel Rivera</div>
          <div class="loan-card-type">Purchase &middot; Conventional</div>
          <div class="loan-card-tags">
            <span class="tag tag-blue">Income Verified</span>
            <span class="tag tag-dim">Assets Pending</span>
          </div>
        </div>
        <div class="loan-card">
          <div class="loan-card-name">Sofia Martinez</div>
          <div class="loan-card-type">Refinance &middot; FHA</div>
          <div class="loan-card-tags">
            <span class="tag tag-dim">Contacted</span>
          </div>
        </div>
      </div>

      <div class="pipeline-col">
        <div class="pipeline-col-header"><div class="col-dot blue"></div>Processing</div>
        <div class="loan-card status-active">
          <div class="loan-card-name">Ashley Chen</div>
          <div class="loan-card-type">Purchase &middot; Jumbo</div>
          <div class="loan-card-tags">
            <span class="tag tag-blue">Docs 96%</span>
            <span class="tag tag-green">VOE Received</span>
          </div>
        </div>
        <div class="loan-card status-warning">
          <div class="loan-card-name">Marcus Bennett</div>
          <div class="loan-card-type">Purchase &middot; VA</div>
          <div class="loan-card-tags">
            <span class="tag tag-amber">Lock: 6 days</span>
            <span class="tag tag-dim">Title Pending</span>
          </div>
        </div>
        <div class="loan-card">
          <div class="loan-card-name">Taylor Brooks</div>
          <div class="loan-card-type">Purchase &middot; USDA</div>
          <div class="loan-card-tags">
            <span class="tag tag-blue">Conditions Cleared</span>
          </div>
        </div>
      </div>

      <div class="pipeline-col">
        <div class="pipeline-col-header"><div class="col-dot amber"></div>Underwriting</div>
        <div class="loan-card status-warning">
          <div class="loan-card-name">Jordan Patel</div>
          <div class="loan-card-type">Refinance &middot; Conventional</div>
          <div class="loan-card-tags">
            <span class="tag tag-amber">3 Conditions</span>
            <span class="tag tag-dim">Appraisal In</span>
          </div>
        </div>
        <div class="loan-card">
          <div class="loan-card-name">Elena Reyes</div>
          <div class="loan-card-type">Purchase &middot; FHA</div>
          <div class="loan-card-tags">
            <span class="tag tag-blue">UW Review</span>
          </div>
        </div>
      </div>

      <div class="pipeline-col">
        <div class="pipeline-col-header"><div class="col-dot green"></div>Clear to Close</div>
        <div class="loan-card status-clear">
          <div class="loan-card-name">Michael Torres</div>
          <div class="loan-card-type">Purchase &middot; Conventional</div>
          <div class="loan-card-tags">
            <span class="tag tag-green">CTC Ready</span>
            <span class="tag tag-green">CD Sent</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="pipeline-ai-strip">
    <div class="ai-metric glass-card">
      <div class="ai-metric-label">Active Files</div>
      <div class="ai-metric-value">42 <span>loans</span></div>
    </div>
    <div class="ai-metric glass-card">
      <div class="ai-metric-label">Conditions Detected Early</div>
      <div class="ai-metric-value">18 <span>this week</span></div>
    </div>
    <div class="ai-metric glass-card">
      <div class="ai-metric-label">At-Risk Files</div>
      <div class="ai-metric-value" style="color:var(--amber)">6 <span style="color:var(--text-dim)">flagged</span></div>
    </div>
    <div class="ai-metric glass-card">
      <div class="ai-metric-label">Pipeline Health</div>
      <div class="ai-metric-value" style="color:var(--green)">84<span>%</span></div>
    </div>
  </div>
</section>

<!-- SCENE 4: DOCUMENT PORTAL -->
<section id="documents">
  <div class="doc-text-block section-left">
    <div class="scene-label">Document Intelligence</div>
    <h2 class="scene-headline">
      <span class="line">The document portal</span>
      <span class="line">builds itself.</span>
    </h2>
    <p style="margin-top:24px; font-size:.95rem; color:var(--text-secondary); line-height:1.7; opacity:0; transform:translateY(12px)" class="doc-sub-text">
      No chasing. No guessing. No surprises in underwriting.
      One upload updates the entire file.
      Conditions appear before underwriting asks.
    </p>
  </div>

  <div class="doc-portal-card glass-card">
    <div class="doc-portal-header">
      <div class="doc-portal-title">Ashley Chen &middot; Document Portal</div>
      <div class="completion-badge" id="completionVal">96%</div>
    </div>
    <div class="doc-completion-bar">
      <div class="doc-completion-fill" id="docFill"></div>
    </div>

    <div class="doc-item" id="di1">
      <div class="doc-status-icon done">&check;</div>
      <div class="doc-item-label done">Driver's License</div>
      <div class="doc-item-sub">Verified</div>
    </div>
    <div class="doc-item" id="di2">
      <div class="doc-status-icon done">&check;</div>
      <div class="doc-item-label done">Paystub &times; 2</div>
      <div class="doc-item-sub">Current</div>
    </div>
    <div class="doc-item" id="di3">
      <div class="doc-status-icon done">&check;</div>
      <div class="doc-item-label done">W-2 &times; 2 Years</div>
      <div class="doc-item-sub">2022 &middot; 2023</div>
    </div>
    <div class="doc-item" id="di4">
      <div class="doc-status-icon pending">&#8987;</div>
      <div class="doc-item-label">Bank Statement</div>
      <div class="doc-item-sub" style="color:var(--amber)">Expiring &middot; Refresh</div>
    </div>
    <div class="doc-item" id="di5">
      <div class="doc-status-icon needed">!</div>
      <div class="doc-item-label">Insurance Binder</div>
      <div class="doc-item-sub">Requested</div>
    </div>
    <div class="doc-item" id="di6">
      <div class="doc-status-icon ai">AI</div>
      <div class="doc-item-label">Written VOE</div>
      <div class="doc-item-sub">AI Detected &middot; Auto-Requested</div>
    </div>

    <div class="ai-insight-card" id="aiInsight">
      <div class="ai-insight-label">
        <div class="ai-pulse"></div>
        AI Condition Intelligence
      </div>
      <div class="ai-insight-text">Bonus income pattern detected. VOE and bonus history verification automatically added to needs list. Underwriting risk score reduced.</div>
    </div>
  </div>
</section>

<!-- SCENE 5: CALL INTELLIGENCE -->
<section id="call">
  <div class="scene-label">Call Intelligence</div>
  <h2 class="scene-headline" style="text-align:center; max-width:680px">
    <span class="line">AI listens during the call.</span>
    <span class="line">So underwriting doesn't</span>
    <span class="line">surprise you later.</span>
  </h2>

  <div class="call-layout">
    <div class="call-panel glass-card">
      <div class="call-info-bar">
        <div class="call-borrower">Daniel Rivera</div>
        <div style="display:flex;align-items:center;gap:16px">
          <div class="call-rec"><div class="rec-dot"></div> REC</div>
          <div class="call-timer" id="callTimer">04:32</div>
        </div>
      </div>

      <div class="waveform" id="waveform"></div>

      <div class="transcript-block">
        <div class="transcript-line" id="t1">
          <span style="color:var(--text-dim);font-family:var(--font-mono);font-size:.7rem">DANIEL:</span>&nbsp;
          I recently <span class="transcript-highlight">changed jobs last year</span>, but I've been in the same industry for about eight years.
        </div>
        <div class="transcript-line" id="t2">
          <span style="color:var(--text-dim);font-family:var(--font-mono);font-size:.7rem">DANIEL:</span>&nbsp;
          My base income is around <span class="transcript-highlight">$135,000 plus a performance bonus</span>. Maybe around $22k last year.
        </div>
        <div class="transcript-line" id="t3">
          <span style="color:var(--text-dim);font-family:var(--font-mono);font-size:.7rem">DANIEL:</span>&nbsp;
          I also have about <span class="transcript-highlight">$40,000 saved</span> for the down payment across two accounts.
        </div>
        <div class="transcript-line" id="t4">
          <span style="color:var(--text-dim);font-family:var(--font-mono);font-size:.7rem">DANIEL:</span>&nbsp;
          My wife has a student loan, around $28k remaining<span class="transcript-cursor"></span>
        </div>
      </div>
    </div>

    <div class="call-intelligence-panel glass-card" id="ciPanel">
      <div class="ci-panel-header">
        <div class="ai-pulse"></div>
        Live Intelligence
      </div>

      <div class="ci-item" id="ci1">
        <div class="ci-icon flag">&#9888;</div>
        <div class="ci-text"><strong>Employment Gap Detected</strong><br>Recent job change flagged. Written VOE recommended.</div>
      </div>
      <div class="ci-item" id="ci2">
        <div class="ci-icon info">&#128202;</div>
        <div class="ci-text"><strong>Bonus Income Structure</strong><br>2-year bonus history required. Paystub refresh triggered.</div>
      </div>
      <div class="ci-item" id="ci3">
        <div class="ci-icon check">&check;</div>
        <div class="ci-text"><strong>Asset Documentation</strong><br>Two accounts noted. Bank statements requested from both.</div>
      </div>
      <div class="ci-item" id="ci4">
        <div class="ci-icon flag">&#9888;</div>
        <div class="ci-text"><strong>Student Loan &mdash; DTI Impact</strong><br>Spouse liability identified. DTI recalculated automatically.</div>
      </div>

      <div class="confidence-meter" id="confMeter">
        <div class="cm-label">
          <span>Borrower Readiness</span>
          <span class="cm-value" id="confValue">82</span>
        </div>
        <div class="cm-bar"><div class="cm-fill" id="confFill"></div></div>
      </div>
    </div>
  </div>
</section>

<!-- SCENE 6: COMMAND CENTER -->
<section id="command">
  <div class="scene-label">Pipeline Command Center</div>
  <h2 class="scene-headline" style="text-align:center; max-width:640px">
    <span class="line">Your pipeline becomes visible.</span>
    <span class="line">Risk surfaces automatically.</span>
  </h2>

  <div class="command-grid" id="commandGrid">

    <!-- Top overview -->
    <div class="cmd-card glass-card" style="grid-column:1 / -1">
      <div class="cmd-title">
        Pipeline Overview
        <div class="live-badge">Live</div>
      </div>
      <div class="cmd-metric-row">
        <div class="cmd-metric">
          <div class="cmd-metric-val highlight">42</div>
          <div class="cmd-metric-lbl">Active Files</div>
        </div>
        <div class="cmd-metric">
          <div class="cmd-metric-val warn">6</div>
          <div class="cmd-metric-lbl">At Risk</div>
        </div>
        <div class="cmd-metric">
          <div class="cmd-metric-val">9</div>
          <div class="cmd-metric-lbl">Due Today</div>
        </div>
        <div class="cmd-metric">
          <div class="cmd-metric-val alert">3</div>
          <div class="cmd-metric-lbl">Silent Files</div>
        </div>
        <div class="cmd-metric">
          <div class="cmd-metric-val">2</div>
          <div class="cmd-metric-lbl">Partner Alerts</div>
        </div>
        <div class="cmd-metric">
          <div class="cmd-metric-val" style="color:var(--green)">84%</div>
          <div class="cmd-metric-lbl">Pipeline Health</div>
        </div>
      </div>
    </div>

    <!-- Risk alerts -->
    <div class="cmd-card glass-card">
      <div class="cmd-title">Risk Alerts</div>
      <ul class="cmd-file-list">
        <li class="cmd-file-item" id="cf1"><div class="cmd-file-dot" style="background:var(--red)"></div>Smith &mdash; Docs Missing</li>
        <li class="cmd-file-item" id="cf2"><div class="cmd-file-dot" style="background:var(--amber)"></div>Jones &mdash; Lock: 6 Days</li>
        <li class="cmd-file-item" id="cf3"><div class="cmd-file-dot" style="background:var(--amber)"></div>Meyer &mdash; Appraisal Delay</li>
        <li class="cmd-file-item" id="cf4"><div class="cmd-file-dot" style="background:var(--accent-blue)"></div>Chen &mdash; Bank Stmt Refresh</li>
        <li class="cmd-file-item" id="cf5"><div class="cmd-file-dot" style="background:var(--accent-blue)"></div>Rivera &mdash; VOE Pending</li>
      </ul>
    </div>

    <!-- Active file detail -->
    <div class="cmd-card glass-card">
      <div class="cmd-title">Active File &middot; Smith</div>
      <div style="margin-bottom:16px">
        <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:300;color:var(--text-primary);margin-bottom:4px">Jennifer Smith</div>
        <div style="font-family:var(--font-mono);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim)">Purchase &middot; Conventional &middot; Underwriting</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;font-size:.8rem">
          <span style="color:var(--text-dim)">Missing Docs</span>
          <span style="color:var(--red)">Updated Paystub</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:.8rem">
          <span style="color:var(--text-dim)">Deadline</span>
          <span style="color:var(--amber)">Tomorrow 2:00 PM</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:.8rem">
          <span style="color:var(--text-dim)">Assistant</span>
          <span style="color:var(--accent-blue)">Monitoring Active</span>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <button style="flex:1;background:rgba(77,163,255,0.12);border:1px solid rgba(77,163,255,0.25);color:var(--accent-blue);font-family:var(--font-mono);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;padding:8px;border-radius:8px;cursor:pointer">Request Docs</button>
        <button style="flex:1;background:rgba(255,255,255,0.04);border:1px solid var(--glass-border);color:var(--text-secondary);font-family:var(--font-mono);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;padding:8px;border-radius:8px;cursor:pointer">Call Borrower</button>
      </div>
    </div>

    <!-- Today's Tasks -->
    <div class="cmd-card glass-card">
      <div class="cmd-title">
        Today's Priority
        <div class="live-badge">AI Sorted</div>
      </div>
      <div class="cmd-task-item">
        <div class="cmd-task-checkbox done">&check;</div>
        <span style="font-size:.82rem;color:var(--text-dim);text-decoration:line-through">Send pre-approval &mdash; Chen</span>
      </div>
      <div class="cmd-task-item">
        <div class="cmd-task-checkbox"></div>
        <span style="font-size:.82rem;color:var(--text-primary)">Lock decision &mdash; Jones File</span>
        <span class="cmd-priority-badge" style="background:rgba(255,107,107,0.1);color:var(--red);border:1px solid rgba(255,107,107,0.2)">Urgent</span>
      </div>
      <div class="cmd-task-item">
        <div class="cmd-task-checkbox"></div>
        <span style="font-size:.82rem;color:var(--text-primary)">Call Amanda &middot; Oak Realty</span>
        <span class="cmd-priority-badge" style="background:rgba(255,184,77,0.08);color:var(--amber);border:1px solid rgba(255,184,77,0.2)">Partner</span>
      </div>
      <div class="cmd-task-item">
        <div class="cmd-task-checkbox"></div>
        <span style="font-size:.82rem;color:var(--text-secondary)">Review income docs &mdash; Rivera</span>
        <span class="cmd-priority-badge" style="background:rgba(77,163,255,0.08);color:var(--accent-blue);border:1px solid rgba(77,163,255,0.2)">High</span>
      </div>
      <div class="cmd-task-item">
        <div class="cmd-task-checkbox"></div>
        <span style="font-size:.82rem;color:var(--text-secondary)">Save the Williams Loan</span>
        <span class="cmd-priority-badge" style="background:rgba(255,107,107,0.1);color:var(--red);border:1px solid rgba(255,107,107,0.2)">Rescue</span>
      </div>
    </div>

  </div>
</section>

<!-- SCENE 7: DAILY WORKFLOW -->
<section id="workflow">
  <div class="workflow-text section-left">
    <div class="scene-label">Daily Workflow Engine</div>
    <h2 class="scene-headline">
      <span class="line">You always know</span>
      <span class="line">what matters next.</span>
    </h2>
    <p style="margin-top:24px;font-size:.95rem;color:var(--text-secondary);line-height:1.7;opacity:0;transform:translateY(12px)" class="workflow-sub">Your pipeline starts managing itself. Tasks appear in the order that moves loans forward fastest. Your calendar aligns with your pipeline automatically.</p>
  </div>

  <div class="workflow-card glass-card">
    <div class="workflow-morning">Wednesday, March 25</div>
    <div class="workflow-greeting">Good morning, Tim.</div>

    <div class="workflow-item" id="wf1">
      <div class="workflow-rank">1</div>
      <div class="workflow-item-content">
        <div class="workflow-item-name">Lock Decision &mdash; Jones File</div>
        <div class="workflow-item-sub">Rate lock &middot; Expires in 6 days</div>
      </div>
      <div class="workflow-item-badge" style="background:rgba(255,107,107,0.1);color:var(--red);border:1px solid rgba(255,107,107,0.2)">Critical</div>
    </div>
    <div class="workflow-item" id="wf2">
      <div class="workflow-rank">2</div>
      <div class="workflow-item-content">
        <div class="workflow-item-name">Call Daniel Rivera</div>
        <div class="workflow-item-sub">Pre-approval call &middot; 10:00 AM</div>
      </div>
      <div class="workflow-item-badge" style="background:rgba(77,163,255,0.08);color:var(--accent-blue);border:1px solid rgba(77,163,255,0.2)">Scheduled</div>
    </div>
    <div class="workflow-item" id="wf3">
      <div class="workflow-rank">3</div>
      <div class="workflow-item-content">
        <div class="workflow-item-name">Review Income Docs &mdash; Rivera</div>
        <div class="workflow-item-sub">Bonus structure &middot; VOE pending</div>
      </div>
      <div class="workflow-item-badge" style="background:rgba(255,184,77,0.08);color:var(--amber);border:1px solid rgba(255,184,77,0.2)">High</div>
    </div>
    <div class="workflow-item" id="wf4">
      <div class="workflow-rank">4</div>
      <div class="workflow-item-content">
        <div class="workflow-item-name">Confirm Appraisal &mdash; Bennett</div>
        <div class="workflow-item-sub">VA purchase &middot; Appraisal ordered</div>
      </div>
      <div class="workflow-item-badge" style="background:rgba(100,130,170,0.08);color:var(--text-dim);border:1px solid rgba(100,130,170,0.15)">Normal</div>
    </div>
    <div class="workflow-item" id="wf5">
      <div class="workflow-rank">5</div>
      <div class="workflow-item-content">
        <div class="workflow-item-name">Partner Update &mdash; Oak Realty</div>
        <div class="workflow-item-sub">Auto-generated &middot; 3 files synced</div>
      </div>
      <div class="workflow-item-badge" style="background:rgba(61,255,160,0.08);color:var(--green);border:1px solid rgba(61,255,160,0.2)">Auto</div>
    </div>
  </div>
</section>

<!-- SCENE 8: SYSTEM REVEAL -->
<section id="system">
  <div class="scene-label" style="text-align:center">The Complete System</div>
  <h2 class="scene-headline" style="text-align:center; max-width:680px">
    <span class="line">One system.</span>
    <span class="line">One workflow.</span>
    <span class="line">One source of truth.</span>
  </h2>

  <div class="system-orbit" id="systemOrbit">
    <div class="orbit-ring orbit-ring-1"></div>
    <div class="orbit-ring orbit-ring-2"></div>
    <div class="orbit-center">
      <div class="orbit-center-label">Perennia<br>AI</div>
      <div class="orbit-center-sub">Operating System</div>
    </div>
    <div id="orbitNodes"></div>
  </div>
</section>

<!-- SCENE 9: CLOSING -->
<section id="closing">
  <h2 class="closing-title">Relationships don't<br>end at closing.<br><em>They compound.</em></h2>
  <p class="closing-sub">From first contact to mortgage under management. Post-closing refinance opportunities, equity alerts, and annual reviews &mdash; all automated, all connected.</p>
  <div class="closing-ctas">
    <button class="btn-primary" style="font-size:.9rem;padding:16px 40px">Watch the System Work</button>
    <a href="https://app.perenniaai.com/register" class="btn-ghost" style="font-size:.9rem;padding:16px 40px">Book a Strategy Session</a>
    <a href="https://app.perenniaai.com/register" class="btn-ghost" style="font-size:.9rem;padding:16px 40px">Join the Pilot Group</a>
  </div>
  <div class="closing-tagline">Perennia AI &middot; The Relationship Operating System for Mortgage Teams</div>
</section>
`;
