# Recall.ai Integration Setup Guide

## ✅ What's Already Done

The Recall.ai integration has been fully implemented in your CRM:

### Backend (Completed)
- ✅ Database models for storing API keys and recordings
- ✅ API endpoints for connecting, starting recordings, and receiving webhooks
- ✅ Automatic transcript saving to Conversation Log
- ✅ Support for Zoom, Teams, and Google Meet

### Frontend (Completed)
- ✅ Settings page with Recall.ai connection UI
- ✅ "Start Recording" button on lead profiles
- ✅ Modal for entering meeting URLs
- ✅ Beautiful purple gradient styling

## 📋 Setup Instructions

### Step 1: Connect Recall.ai in the Frontend

1. **Open your CRM frontend**: http://localhost:3000
2. **Navigate to Settings** (click your profile → Settings)
3. **Go to Integrations tab**
4. **Click "Connect Recall.ai"** button
5. **Paste your API key** in the modal:
   ```
   2710d1a040a03295045e0ad6bb2535997da8acd0
   ```
6. **Click "Connect"**

You should see a green "Recall.ai Connected" status panel.

### Step 2: Configure Webhook in Recall.ai Dashboard

1. **Go to Recall.ai Dashboard**: https://app.recall.ai/
2. **Navigate to Settings → Webhooks**
3. **Add new webhook** with these settings:
   - **Webhook URL**:
     ```
     https://mortgage-crm-production-7a9a.up.railway.app/api/v1/recallai/webhook
     ```
   - **Webhook Secret**:
     ```
     whsec_suIiYYXb7fgjFjOtVWT0spOfalxNKtldS/MI13wAGV3thi5JbpPjpCUYU2Y0BcxN
     ```
   - **Events to subscribe to**:
     - `bot.status_change` (when bot status changes)
     - `transcript.ready` (when transcript is ready)

4. **Save the webhook**

### Step 3: Test the Integration

1. **Open any lead profile** in your CRM
2. **Look for the Quick Actions section**
3. **Click the "Start Recording" button** (purple button with 📹 icon)
4. **Enter a meeting URL**:
   - Example Zoom URL: `https://zoom.us/j/1234567890`
   - Example Teams URL: `https://teams.microsoft.com/l/meetup-join/...`
   - Example Google Meet URL: `https://meet.google.com/abc-defg-hij`
5. **Click "Start Recording"**

### What Happens Next

1. ✅ The Recall.ai bot joins the meeting
2. ✅ The bot records the meeting and transcribes it in real-time
3. ✅ When the meeting ends, the webhook sends the transcript to your CRM
4. ✅ The transcript automatically appears in the lead's **Conversation Log** with:
   - Speaker identification
   - Full transcript
   - Meeting duration
   - Participant list

## 🎯 Integration Features

### For Users
- **One-Click Recording**: Start recording any meeting from the lead profile
- **Auto-Save**: Transcripts automatically saved to Conversation Log
- **Speaker Diarization**: Know who said what in the meeting
- **Multi-Platform**: Works with Zoom, Teams, and Google Meet
- **No Manual Work**: Everything is automated

### For Admins
- **Secure**: API keys encrypted in database
- **Webhook Verification**: Secure webhook endpoint with secret verification
- **Per-User Settings**: Each user can connect their own Recall.ai account
- **Activity Tracking**: All recordings tracked in the database

## 🧪 Testing Checklist

- [ ] Connect Recall.ai in Settings
- [ ] See "Recall.ai Connected" status
- [ ] Open a lead profile
- [ ] Click "Start Recording" button
- [ ] Enter a test meeting URL
- [ ] Verify bot joins the meeting
- [ ] Wait for meeting to end
- [ ] Check Conversation Log for transcript

## 📝 API Reference

### Your Credentials

**API Key**: `2710d1a040a03295045e0ad6bb2535997da8acd0`
**Webhook Secret**: `whsec_suIiYYXb7fgjFjOtVWT0spOfalxNKtldS/MI13wAGV3thi5JbpPjpCUYU2Y0BcxN`

### Backend Endpoints

1. **POST** `/api/v1/recallai/connect` - Connect Recall.ai with API key
2. **GET** `/api/v1/recallai/status` - Check connection status
3. **POST** `/api/v1/recallai/start-recording` - Send bot to meeting
4. **POST** `/api/v1/recallai/webhook` - Receive webhooks from Recall.ai
5. **GET** `/api/v1/recallai/recordings` - List recordings for a lead

### Database Tables

1. **recallai_connections** - Stores API keys per user
2. **recallai_recordings** - Stores recording metadata and transcripts

## 🔧 Troubleshooting

### Bot doesn't join meeting
- ✓ Check meeting URL is correct
- ✓ Verify Recall.ai API key is connected
- ✓ Check meeting hasn't started yet (bot needs to join before or during)

### No transcript appears
- ✓ Verify webhook is configured in Recall.ai dashboard
- ✓ Check webhook URL is correct
- ✓ Ensure webhook secret matches
- ✓ Wait a few minutes after meeting ends

### "Failed to start recording" error
- ✓ Check Recall.ai API key is valid
- ✓ Verify you have Recall.ai credits
- ✓ Check internet connection

## 🎉 You're All Set!

Your Recall.ai integration is ready to use. Start recording meetings and let AI handle the transcription!

For questions or issues, check the Recall.ai documentation: https://docs.recall.ai/
