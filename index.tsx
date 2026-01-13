
import { GoogleGenAI } from "@google/genai";

// Initialize AI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Sound Utility
const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.2;
    audio.play().catch(() => {});
};

const CLICK_SOUND = 'https://www.soundjay.com/buttons/button-16.mp3';
const MESSAGE_SOUND = 'https://www.soundjay.com/communication/beep-07.mp3';

// NAVIGATION LOGIC
window.showPage = (pageId: string) => {
    playSound(CLICK_SOUND);
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    const target = document.getElementById(`page-${pageId}`);
    if (target) {
        target.classList.add('active');
    }
};

// LEXI CHAT LOGIC
const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input') as HTMLInputElement;
const sendBtn = document.getElementById('send-btn');

async function handleLexChat() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Append User Message
    const userP = document.createElement('p');
    userP.innerHTML = `<span style="color: blue; font-weight: bold;">You:</span> ${text}`;
    chatLog?.appendChild(userP);
    chatInput.value = '';
    chatLog?.scrollTo(0, chatLog.scrollHeight);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: text,
            config: {
                systemInstruction: "You are Lexi, a 19-year-old fashion stylist from 2006. You are talking on AOL Instant Messenger (AIM). Use 2006 slang like 'omg', 'totally', '<3', 'xoxo', 'gurl', 'rawr'. You love Juicy Couture tracksuits, Von Dutch hats, and Razr phones. Keep it high energy and short. Don't reveal you are an AI. Give fashion advice if asked.",
            }
        });

        const reply = response.text || "omg my internet is being so slow... hold on <3";
        
        // Append Lexi Message
        const lexiP = document.createElement('p');
        lexiP.innerHTML = `<span style="color: red; font-weight: bold;">Lexi:</span> ${reply}`;
        chatLog?.appendChild(lexiP);
        playSound(MESSAGE_SOUND);
        chatLog?.scrollTo(0, chatLog.scrollHeight);
    } catch (error) {
        console.error("Chat error:", error);
    }
}

sendBtn?.addEventListener('click', handleLexChat);
chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLexChat();
});

// GUESTBOOK LOGIC
const gbBtn = document.getElementById('gb-btn');
const gbEntries = document.getElementById('gb-entries');
const gbName = document.getElementById('gb-name') as HTMLInputElement;
const gbMsg = document.getElementById('gb-msg') as HTMLTextAreaElement;

gbBtn?.addEventListener('click', () => {
    const name = gbName.value.trim();
    const msg = gbMsg.value.trim();
    if (!name || !msg) return;

    const entry = document.createElement('div');
    entry.style.cssText = "background: #fff; padding: 5px; border: 1px solid #ccc; margin-bottom: 10px;";
    entry.innerHTML = `<b>${name}</b> said: "${msg}"`;
    
    gbEntries?.prepend(entry);
    gbName.value = '';
    gbMsg.value = '';
    playSound(CLICK_SOUND);
});

// HIT COUNTER
let count = 5821;
setInterval(() => {
    if (Math.random() > 0.8) {
        count++;
        const counter = document.getElementById('hit-count');
        if (counter) counter.innerText = count.toString().padStart(7, '0');
    }
}, 3000);

// GLOBAL EXPOSURE FOR HTML HANDLERS
declare global {
  interface Window {
    showPage: (id: string) => void;
  }
}
