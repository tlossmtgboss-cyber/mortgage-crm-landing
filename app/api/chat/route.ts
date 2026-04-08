import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://api.perenniaai.com';
const DEMO_SLUG = process.env.ARIA_DEMO_SLUG || 'aria-demo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversation_history, session_id } = body;

    if (!message || typeof message !== 'string' || message.length > 1000) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const res = await fetch(
      `${BACKEND_URL}/api/v1/public/themes/chat/${DEMO_SLUG}/message`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.slice(0, 1000),
          conversation_history: (conversation_history || []).slice(-20),
          session_id: session_id || '',
        }),
      }
    );

    if (!res.ok) {
      // Fallback: return a canned Aria response so the demo never feels broken
      return NextResponse.json({
        success: true,
        response: getAriaFallback(message),
        session_id: session_id || crypto.randomUUID(),
      });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    // Network error — use fallback so the demo always works
    return NextResponse.json({
      success: true,
      response:
        "Thanks for your interest! I'm Aria, the AI assistant for loan officers. I help contact, qualify, and nurture mortgage leads across voice, SMS, and email — all automatically. What would you like to know?",
      session_id: crypto.randomUUID(),
    });
  }
}

function getAriaFallback(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('rate') || lower.includes('interest')) {
    return "I don't quote specific rates — that's between you and your loan officer. But I can tell you that I monitor rates in real time and automatically alert borrowers when rates drop into their target range. That's one of the 15 trigger events in the engagement orchestrator.";
  }
  if (lower.includes('how') && (lower.includes('work') || lower.includes('does'))) {
    return "When a new lead enters the system, I place an AI voice call within 60 seconds. If they don't answer, I drop a voicemail and follow up via SMS 15 minutes later. I qualify borrowers by asking about loan type, timeline, credit range, and employment — then either transfer them live to the LO with a whisper briefing, book an appointment, or enroll them in a 12-month drip campaign.";
  }
  if (lower.includes('channel') || lower.includes('sms') || lower.includes('email') || lower.includes('call') || lower.includes('text')) {
    return "I work across 5 channels: AI voice calls, two-way SMS, personalized email (sent from the LO's own Outlook), ringless voicemail drops, and live warm transfers. Every interaction shares context — if a borrower tells me their credit score on a call, I won't ask again over text.";
  }
  if (lower.includes('complian') || lower.includes('tcpa') || lower.includes('ecoa')) {
    return "Compliance is built into every interaction. I enforce TCPA quiet hours (8am-9pm borrower local time), check the DNC registry before every dial, never ask ECOA-prohibited questions, handle STOP/HELP keywords instantly, and include NMLS disclosures in every email. It's not an add-on — it's the foundation.";
  }
  if (lower.includes('agent') || lower.includes('how many')) {
    return "I'm actually a fleet of 22 specialized agents orchestrated by LangGraph. There's a Receptionist for inbound calls, a Lead Qualifier, Pipeline Analyst, Document Tracker, Rate Monitor, Compliance Checker, and 16 more — each an expert in their domain, sharing context in real time.";
  }
  if (lower.includes('transfer') || lower.includes('live')) {
    return "When I qualify a borrower who's ready to proceed, I place them on a brief hold, dial the loan officer, play a whisper briefing with the borrower's details (name, credit, loan type, timeline), then bridge both into a live conference call. Average transfer time: 8 seconds. If the LO is unavailable, I create a priority callback task and text them immediately.";
  }
  if (lower.includes('drip') || lower.includes('nurture') || lower.includes('follow up')) {
    return "I run 12-month adaptive drip campaigns with three phases: high-frequency contact in the first week, weekly nurture for months 2-3, and monthly touchpoints for the rest of the year. The moment a lead responds to any message, the drip pauses and I start a live conversation. Everything is timezone-aware and channel-rotated to prevent fatigue.";
  }
  if (lower.includes('price') || lower.includes('cost') || lower.includes('free')) {
    return "Perennia AI offers a free trial so you can see Aria in action with your own pipeline. Every feature — voice calls, SMS, email, live transfers, drip campaigns, 22 AI agents — is included. No per-seat fees, no channel add-ons. Would you like to start a free trial?";
  }

  return "I'm Aria — the AI that runs your mortgage pipeline. I call every lead in 60 seconds, qualify borrowers in natural conversation across voice, SMS, and email, and transfer hot prospects live to you with a full briefing. I also run 12-month drip campaigns and enforce TCPA, ECOA, and DNC compliance automatically. What would you like to know more about?";
}
