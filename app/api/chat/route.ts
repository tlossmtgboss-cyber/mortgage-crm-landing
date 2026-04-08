import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

const ARIA_SYSTEM_PROMPT = `You are Aria, the AI loan officer assistant built by Perennia AI. You are chatting with a visitor on the Perennia AI website (www.perenniaai.com). Your job is to answer their questions about the platform, explain your capabilities, and encourage them to start a free trial.

WHO YOU ARE:
- You are Aria, an AI assistant that runs the entire mortgage lead engagement pipeline for loan officers
- You are NOT a chatbot — you are a fleet of 22 specialized AI agents orchestrated by LangGraph
- You work across 5 channels: AI voice calls, two-way SMS, email (via Microsoft Graph from the LO's own Outlook), ringless voicemail drops, and live warm transfers

WHAT YOU DO:
- Speed-to-lead: Call every new lead within 60 seconds of entering the system
- Qualify borrowers in natural conversation by asking about loan type, timeline, credit range, employment, and price range
- Live transfer: When a borrower is ready, place them on hold, dial the LO, play a whisper briefing (name, credit, loan type, timeline, property), then bridge both into a conference. Average transfer time: 8 seconds.
- Voicemail drops: AMD detection triggers ringless voicemail, followed by automatic SMS 15 minutes later
- 12-month adaptive drip campaigns with 3 phases (daily for week 1, weekly for months 2-3, monthly for months 4-12). Drip pauses the moment a lead responds.
- AI email sent from the LO's actual Outlook address via Microsoft Graph. Open/click tracking updates lead scores.
- Cross-channel intelligence: qualification data from calls is available in SMS and email. Never asks the same question twice.
- Engagement orchestrator: 15 trigger events, intelligent channel selection based on time/preference/stage, fatigue prevention (max 5/day, 30-min same-channel dedup)
- Appointment booking with real-time calendar availability via Microsoft Graph
- Deal Breaker Radar: identifies disqualifying factors and routes to alternatives (credit repair referral, alternative loan programs) instead of dead-ending

YOUR 22 AGENTS:
Receptionist, Lead Qualifier, Pipeline Analyst, Document Tracker, Rate Monitor, Compliance Checker, Email Processor, SLA Tracker, Content Creator, Team Coach, Scheduler, Voice Agent, Turn Down Agent, Estimate Advisor, Deal Breaker Radar, Lead Nurturer, Referral Partner, Recruiting Agent, Call Intelligence, SMS Intelligence, Workflow Engine, Post-Close Agent

COMPLIANCE (built into every interaction):
- TCPA: Quiet hours 8am-9pm borrower local time, prior express consent required
- ECOA: Never asks about race, sex, religion, national origin, marital status, or age
- DNC: Registry checked before every dial, stale data blocks the call entirely (fail-closed)
- A2P 10DLC: STOP/HELP instant handling, full audit trail
- NMLS disclosures in every email
- You never quote specific interest rates, APRs, or fees

TECH STACK:
- Backend: FastAPI (Python), PostgreSQL, Redis
- AI: Claude (Anthropic) via LangGraph orchestration
- Voice: Vapi with Deepgram asteria voice
- Telephony: Telnyx for SMS/calls, Slybroadcast for ringless voicemail
- Email: Microsoft Graph (send from LO's Outlook)
- Integrations: Encompass LOS, Salesforce CRM sync

FREE TRIAL:
- All features included, no per-seat fees, no channel add-ons
- Sign up at app.perenniaai.com/register

CONVERSATION RULES:
- Be conversational, warm, and concise. 2-4 sentences per response unless they ask for detail.
- NEVER repeat information you already said earlier in this conversation. If asked "what else do you do?", talk about capabilities you haven't mentioned yet.
- If asked something unrelated to Perennia AI or mortgage (like "what's today's date"), give a brief helpful answer and then steer back: "Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}. But enough about calendars — want to hear how I manage yours automatically?"
- If asked about pricing, mention the free trial
- If asked about competitors, don't compare — just explain what makes Perennia AI unique
- End responses with a question or invitation to learn more when appropriate
- Use first person ("I call leads", "I qualify borrowers") since you ARE Aria`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversation_history, session_id } = body;

    if (!message || typeof message !== 'string' || message.length > 1000) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    // Build messages array for Claude
    const messages: Array<{ role: string; content: string }> = [];

    // Add conversation history
    if (Array.isArray(conversation_history)) {
      for (const msg of conversation_history.slice(-20)) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message.slice(0, 1000) });

    // Try Anthropic API directly
    if (ANTHROPIC_API_KEY) {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 300,
            system: ARIA_SYSTEM_PROMPT,
            messages,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.content?.[0]?.text || '';
          if (text) {
            return NextResponse.json({
              success: true,
              response: text,
              session_id: session_id || crypto.randomUUID(),
            });
          }
        }
      } catch {
        // Fall through to local response
      }
    }

    // Local AI-like response when no API key available
    const response = getContextAwareResponse(message, conversation_history || []);
    return NextResponse.json({
      success: true,
      response,
      session_id: session_id || crypto.randomUUID(),
    });
  } catch {
    return NextResponse.json({
      success: true,
      response: "Sorry, I had a brief hiccup. Ask me anything about how I help loan officers — voice calls, SMS, email, live transfers, or compliance.",
      session_id: crypto.randomUUID(),
    });
  }
}

/* ─── Context-aware local fallback (no API key) ─── */

interface HistoryMsg {
  role: string;
  content: string;
}

const TOPIC_RESPONSES: Array<{
  id: string;
  match: (msg: string) => boolean;
  response: string;
}> = [
  {
    id: 'how_it_works',
    match: (m) => /how.*(work|does|do you)/i.test(m),
    response: "When a new lead enters the system, I place an AI voice call within 60 seconds. If they don't answer, I drop a voicemail and follow up via SMS 15 minutes later. I qualify borrowers by asking about loan type, timeline, credit range, and employment — then either transfer them live to the LO with a whisper briefing, book an appointment, or enroll them in a 12-month drip campaign.",
  },
  {
    id: 'channels',
    match: (m) => /channel|sms|email|text|call|voice/i.test(m),
    response: "I work across 5 channels: AI voice calls, two-way SMS, personalized email (sent from the LO's own Outlook via Microsoft Graph), ringless voicemail drops, and live warm transfers. Every interaction shares context — if a borrower tells me their credit score on a call, I won't ask again over text.",
  },
  {
    id: 'agents',
    match: (m) => /agent|fleet|how many|22|twenty/i.test(m),
    response: "I'm actually a fleet of 22 specialized agents orchestrated by LangGraph. There's a Receptionist for inbound calls, a Lead Qualifier, Pipeline Analyst, Document Tracker, Rate Monitor, Compliance Checker, Email Processor, SLA Tracker, and 14 more — each an expert in its domain, sharing context in real time. Want to hear about a specific one?",
  },
  {
    id: 'transfer',
    match: (m) => /transfer|live|bridge|whisper/i.test(m),
    response: "When I qualify a borrower who's ready, I place them on a brief hold, dial the loan officer, play a whisper briefing with their details (name, credit, loan type, timeline, property state), then bridge both into a live conference. Average transfer time: 8 seconds. If the LO is unavailable, I create a priority callback task and text them immediately.",
  },
  {
    id: 'drip',
    match: (m) => /drip|nurture|follow.?up|sequence|12.?month/i.test(m),
    response: "I run 12-month adaptive drip campaigns with three phases: daily contact in week 1, weekly nurture for months 2-3, and monthly touchpoints through month 12. The moment a lead responds to any message, the drip pauses and I start a live conversation. Everything is timezone-aware and channel-rotated to prevent fatigue.",
  },
  {
    id: 'compliance',
    match: (m) => /complian|tcpa|ecoa|dnc|legal|regulat/i.test(m),
    response: "Compliance is built into every interaction. I enforce TCPA quiet hours (8am-9pm borrower local time), check the DNC registry before every dial, never ask ECOA-prohibited questions, handle STOP/HELP keywords instantly, and include NMLS disclosures in every email footer. It's not an add-on — it's the foundation.",
  },
  {
    id: 'rates',
    match: (m) => /rate|interest|apr/i.test(m),
    response: "I don't quote specific rates — that's between the borrower and their loan officer. But I monitor rates in real time and automatically alert borrowers when rates drop into their target range. That's one of the 15 trigger events in the engagement orchestrator. Want to know about the other triggers?",
  },
  {
    id: 'pricing',
    match: (m) => /price|cost|free|pay|subscription|trial/i.test(m),
    response: "Perennia AI offers a free trial with every feature included — voice calls, SMS, email, live transfers, drip campaigns, all 22 AI agents. No per-seat fees, no channel add-ons. You can sign up at app.perenniaai.com/register. Want me to walk you through what happens after you sign up?",
  },
  {
    id: 'voicemail',
    match: (m) => /voicemail|vm|ringless|amd/i.test(m),
    response: "When my outbound call goes unanswered, AMD (Answering Machine Detection) identifies it, and I deliver a ringless voicemail via Slybroadcast — it appears in the borrower's inbox without their phone ringing. Then 15 minutes later, an automatic SMS follow-up goes out. There's also a circuit breaker: if Slybroadcast has 5 consecutive failures, I fall back to SMS-only for 60 seconds.",
  },
  {
    id: 'appointment',
    match: (m) => /appoint|book|calendar|schedul|meeting/i.test(m),
    response: "I check the loan officer's real-time calendar availability via Microsoft Graph and book consultations directly. The borrower gets a confirmation SMS and a prep sequence before the call — including a document checklist so they come prepared. No back-and-forth scheduling emails needed.",
  },
  {
    id: 'qualification',
    match: (m) => /qualif|question|ask|credit|income|loan type/i.test(m),
    response: "I qualify borrowers by asking five key questions: loan purpose (purchase, refi, HELOC), target price range, estimated credit score range, employment type (W-2, self-employed, retired), and timeline. I ask one at a time, adapt based on answers, and merge data across channels so I never repeat a question the borrower already answered.",
  },
  {
    id: 'orchestrator',
    match: (m) => /orchestrat|trigger|brain|decision|engine/i.test(m),
    response: "The Engagement Orchestrator is my decision engine. It handles 15 trigger events (new_lead, no_answer, email_opened, rate_drop, etc.) and selects the optimal channel based on time of day, borrower preference, pipeline stage, and recent activity. It also enforces fatigue limits — max 5 contacts per day, 30-minute same-channel dedup, and 60-second trigger dedup.",
  },
  {
    id: 'deal_breaker',
    match: (m) => /deal.?break|disqualif|turn.?down|reject|denied/i.test(m),
    response: "The Deal Breaker Radar catches disqualifying factors early — credit below 580, recent bankruptcy, self-employment under 2 years. But I never dead-end a conversation. Instead, the Turn Down Agent provides ECOA-compliant alternatives: credit repair referrals, bank statement loan options, waiting period timelines. Every borrower gets a path forward.",
  },
  {
    id: 'tech',
    match: (m) => /tech|stack|built|api|database|infra/i.test(m),
    response: "I'm built on FastAPI (Python) with PostgreSQL and Redis. My AI runs on Claude by Anthropic, orchestrated by LangGraph. Voice is powered by Vapi with Deepgram's asteria voice, telephony runs through Telnyx, ringless voicemail via Slybroadcast, and email through Microsoft Graph. I integrate with Encompass LOS and Salesforce for CRM sync.",
  },
];

function getContextAwareResponse(message: string, history: HistoryMsg[]): string {
  const lower = message.toLowerCase();

  // Handle date/time questions
  if (/what.*(today|date|day|time)/i.test(lower) || /today.*(date|what)/i.test(lower)) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    return `Today is ${dateStr}. But enough about calendars — want to hear how I manage yours automatically? I book appointments directly on your calendar and send prep sequences to borrowers before the call.`;
  }

  // Handle greetings
  if (/^(hi|hello|hey|sup|yo|good morning|good afternoon)\b/i.test(lower)) {
    return "Hey! I'm Aria — the AI that runs mortgage pipelines. I call every lead in 60 seconds, qualify borrowers across 5 channels, and transfer hot prospects live to you. What would you like to know?";
  }

  // Handle "what else" / "more" / "anything else" by finding unused topics
  if (/what else|anything else|more|other|tell me more|what else do you/i.test(lower)) {
    const priorTexts = history
      .filter((m) => m.role === 'assistant')
      .map((m) => m.content.toLowerCase())
      .join(' ');

    for (const topic of TOPIC_RESPONSES) {
      const alreadyMentioned = priorTexts.includes(topic.response.slice(0, 40).toLowerCase());
      if (!alreadyMentioned) {
        return topic.response;
      }
    }
    return "We've covered a lot! Here's one more: after a loan funds, my Post-Close Agent starts a referral nurture sequence — anniversary check-ins, market updates, and ask-for-referral campaigns. It keeps you top-of-mind long after closing. Want to start a free trial and see it all in action? Sign up at app.perenniaai.com/register.";
  }

  // Handle thank you
  if (/^(thanks|thank you|thx|ty)\b/i.test(lower)) {
    return "Happy to help! If you want to see me in action with your own pipeline, start a free trial at app.perenniaai.com/register. Any other questions?";
  }

  // Handle yes/no/sure
  if (/^(yes|yeah|sure|yep|absolutely|ok|okay)\b/i.test(lower) && lower.length < 20) {
    const priorTexts = history
      .filter((m) => m.role === 'assistant')
      .map((m) => m.content.toLowerCase())
      .join(' ');

    for (const topic of TOPIC_RESPONSES) {
      const alreadyMentioned = priorTexts.includes(topic.response.slice(0, 40).toLowerCase());
      if (!alreadyMentioned) {
        return topic.response;
      }
    }
    return "Great! You can explore everything at app.perenniaai.com/register — the free trial includes all 22 agents, every channel, and full compliance automation. No credit card required.";
  }

  // Match specific topics
  for (const topic of TOPIC_RESPONSES) {
    if (topic.match(lower)) {
      return topic.response;
    }
  }

  // Default — but NOT the same every time. Pick something not yet mentioned.
  const priorTexts = history
    .filter((m) => m.role === 'assistant')
    .map((m) => m.content.toLowerCase())
    .join(' ');

  for (const topic of TOPIC_RESPONSES) {
    const alreadyMentioned = priorTexts.includes(topic.response.slice(0, 40).toLowerCase());
    if (!alreadyMentioned) {
      return `Good question! Here's something you might find interesting: ${topic.response}`;
    }
  }

  return "I've told you about most of my capabilities! The best way to experience everything is to start a free trial at app.perenniaai.com/register — you'll see voice calls, SMS, email, live transfers, 22 AI agents, and full compliance automation in action with your own pipeline. Anything specific I can clarify?";
}
