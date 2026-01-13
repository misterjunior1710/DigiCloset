
import React, { useState, useMemo, useEffect } from 'react';

// --- UTILS & DATA ---

const playSound = (type: 'click' | 'message' | 'login') => {
  const sounds = {
    click: 'https://www.soundjay.com/buttons/button-16.mp3',
    message: 'https://www.soundjay.com/communication/beep-07.mp3',
    login: 'https://www.soundjay.com/communication/beep-09.mp3'
  };
  const audio = new Audio(sounds[type]);
  audio.volume = 0.2;
  audio.play().catch(() => {});
};

// Fit of the day rotation (7 days)
const FITS_OF_THE_WEEK = [
  { id: '1515886657613-9f3515b0c78f', title: 'Velour Vibes' },
  { id: '1539106732377-6c7df64a4af6', title: 'Denim Days' },
  { id: '1475181435457-fbc36262a623', title: 'Street Star' },
  { id: '1483985049302-d08920205ed4', title: 'Summer Glow' },
  { id: '1551488831-00ddcb6c603e', title: 'Grunge Gurl' },
  { id: '1506634572416-48cdfe532162', title: 'Casual Chic' },
  { id: '1520975954732-35ddbb6c3210', title: 'Retro Pop' }
];

const GET_YEAR_OFFSET = () => new Date().getFullYear() - 20;

// --- Sub-components ---

const Marquee = ({ text }: { text: string }) => (
  <div className="bg-black text-lime-400 py-1 font-mono border-y-2 border-white overflow-hidden whitespace-nowrap">
    <marquee scrollamount="4">{text}</marquee>
  </div>
);

const Header = () => (
  <table width="100%" cellPadding="0" cellSpacing="0" className="bg-gradient-to-b from-gray-300 to-gray-500 border-b-4 border-white">
    <tr>
      <td align="center" className="p-4">
        <h1 className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-pink-500 via-white to-pink-800 drop-shadow-lg">
          DIGI-CLOSET
        </h1>
        <p className="text-white text-[10px] font-bold tracking-[0.3em] mt-1 uppercase">
          ~* The Net's #1 Fashion & Story Community *~
        </p>
      </td>
    </tr>
  </table>
);

const Sidebar = ({ setPage, user, onLogout }: { setPage: (p: string) => void, user: any, onLogout: () => void }) => (
  <table width="150" cellPadding="5" cellSpacing="2" className="bg-gray-200 border-2 border-white h-full align-top text-black">
    <tr>
      <td className="bg-blue-800 text-white font-bold text-center text-xs p-1 uppercase">Main Menu</td>
    </tr>
    {[
      ['Home', 'home'],
      ['Digital Closet', 'closet'],
      ['Lex\'s Corner', 'lex'],
      ['Wishlist', 'wishlist'],
      ['Guestbook', 'guestbook'],
      ['TopSites', 'topsites']
    ].map(([label, id]) => (
      <tr key={id}>
        <td className="p-0">
          <button 
            onClick={() => { playSound('click'); setPage(id); }}
            className="w-full text-left px-2 py-1 text-[11px] hover:bg-pink-400 hover:text-white transition-colors uppercase font-bold border-b border-gray-400 text-black"
          >
            {label}
          </button>
        </td>
      </tr>
    ))}
    <tr>
      <td className="bg-pink-600 text-white font-bold text-center text-[10px] p-1 mt-4 uppercase">My Status</td>
    </tr>
    <tr>
      <td className="text-[10px] text-center p-2 bg-white border border-gray-300">
        {user ? (
          <div>
            <span className="font-bold text-blue-700">@{user.username}</span><br/>
            <button onClick={() => { playSound('click'); onLogout(); }} className="text-red-500 underline mt-1">Sign Out</button>
          </div>
        ) : (
          <span className="italic text-gray-500">Guest Access</span>
        )}
      </td>
    </tr>
  </table>
);

// --- Pages ---

const HomePage = ({ onLogin, setPage }: { onLogin: (u: string, p: string) => boolean, setPage: (p: string) => void }) => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const dayIndex = new Date().getDay();
  const todayFit = FITS_OF_THE_WEEK[dayIndex];

  const handleLogin = () => {
    if (onLogin(u, p)) {
      setErr('');
    } else {
      setErr('Invalid Username/Pass!');
    }
  };

  return (
    <table width="100%" className="main-layout text-black">
      <tr>
        <td width="30%" className="td-content p-4 align-top">
          <h3 className="text-pink-600 font-bold border-b-2 border-pink-200 mb-2 underline text-sm uppercase">Site Purpose</h3>
          <p className="text-[11px] leading-tight">
            DigiCloset is a sanctuary for lovers of 2000s fashion. Share your mirror selfies, tell your style stories, and get advice from Lex, our resident fashion guru. We are a community of real people with real outfits.
          </p>
          <h3 className="text-blue-600 font-bold border-b-2 border-blue-200 mb-2 mt-4 underline text-sm uppercase">Hot News</h3>
          <ul className="text-[10px] space-y-2 list-disc ml-4">
            <li>New "Y2K Grunge" category added to Closet!</li>
            <li>Lex's advice updated for Summer '0{GET_YEAR_OFFSET() % 10} trends.</li>
            <li>Check our TopSites for cool links!</li>
          </ul>
        </td>
        
        <td width="40%" className="td-content p-3 align-top">
          <div className="bg-white p-2 border-2 border-gray-400 mb-4 shadow-sm">
            <img src={`https://images.unsplash.com/photo-${todayFit.id}?auto=format&fit=crop&w=300&h=400`} alt="Fit of the Day" className="w-full low-res-photo h-[300px] object-cover" />
            <p className="text-center font-bold text-xs mt-2 italic uppercase">~* FIT OF THE DAY: "{todayFit.title}" *~</p>
          </div>
          <p className="text-sm">
            Hey guys! I'm so stoked you found my page. DigiCloset is about being yourself. Upload your <strong>mirror selfies</strong> and let's make 200{GET_YEAR_OFFSET() % 10} the best fashion year ever!
          </p>
          <p className="text-[10px] mt-4 font-bold text-gray-500 text-center">Created by Jason</p>
        </td>
        
        <td width="30%" className="td-content p-4 align-top">
          <h3 className="text-blue-600 font-bold border-b-2 border-blue-200 mb-2 underline text-sm uppercase">Member Area</h3>
          <table width="100%" className="text-xs">
            <tr><td>User:</td><td><input value={u} onChange={e => setU(e.target.value)} type="text" className="w-full border p-0.5 text-black" /></td></tr>
            <tr><td>Pass:</td><td><input value={p} onChange={e => setP(e.target.value)} type="password" className="w-full border p-0.5 mt-1 text-black" /></td></tr>
            {err && <tr><td colSpan={2} className="text-red-600 font-bold pt-1">{err}</td></tr>}
            <tr><td colSpan={2} align="right"><button onClick={handleLogin} className="glossy-button px-3 py-1 mt-2 font-bold text-black uppercase text-[10px]">Log In</button></td></tr>
          </table>
          <p className="text-[10px] mt-4 text-center">
            New here? <button onClick={() => setPage('signup')} className="text-blue-600 underline font-bold uppercase">Sign Up Now!</button>
          </p>
        </td>
      </tr>
    </table>
  );
};

const SignupPage = ({ onSignup }: { onSignup: (u: string, p: string) => void }) => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  return (
    <div className="td-content p-8 text-black">
      <h2 className="text-2xl font-black text-pink-600 mb-4 border-b-2 border-pink-200 uppercase italic">Join the Community!</h2>
      <table cellPadding="5">
        <tr><td>Choose Username:</td><td><input value={u} onChange={e => setU(e.target.value)} className="border p-1 text-black" /></td></tr>
        <tr><td>Choose Password:</td><td><input value={p} onChange={e => setP(e.target.value)} type="password" className="border p-1 text-black" /></td></tr>
        <tr><td>Favorite Brand:</td><td><input className="border p-1 text-black" placeholder="Von Dutch, Juicy..." /></td></tr>
        <tr><td colSpan={2}><button onClick={() => onSignup(u, p)} className="glossy-button px-10 py-2 font-bold uppercase">Create My Account!</button></td></tr>
      </table>
    </div>
  );
};

const ClosetPage = ({ communityFits, onAddFit }: { communityFits: any[], onAddFit: (img: string, user: string) => void }) => {
  return (
    <div className="td-content p-4 text-black">
      <h2 className="text-center font-black text-2xl chrome-text pb-4 uppercase italic">Latest Community Fits</h2>
      
      <div className="bg-gray-100 p-3 mb-6 border border-gray-300">
        <p className="text-xs font-bold mb-2 uppercase">Submit Your Fit (URL):</p>
        <table width="100%">
          <tr>
            <td><input id="fitUrl" placeholder="Image URL (Unsplash works best!)" className="w-full border p-1 text-xs text-black" /></td>
            <td width="100"><button onClick={() => {
              const url = (document.getElementById('fitUrl') as HTMLInputElement).value;
              if(url) onAddFit(url, 'New_Member_06');
              (document.getElementById('fitUrl') as HTMLInputElement).value = '';
              playSound('click');
            }} className="glossy-button px-4 py-1 text-xs font-bold uppercase ml-2">Upload</button></td>
          </tr>
        </table>
      </div>

      <table width="100%">
        {Array.from({ length: Math.ceil(communityFits.length / 3) }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {communityFits.slice(rowIndex * 3, rowIndex * 3 + 3).map((fit, colIndex) => (
              <td key={colIndex} width="33%" className="p-2">
                <div className="bg-white p-1 border-2 border-gray-400 shadow-md">
                  <img src={fit.img} className="w-full low-res-photo h-[200px] object-cover" alt="outfit" />
                  <div className="text-[10px] mt-1 text-center font-bold">
                    User: <span className="text-pink-600">{fit.user}</span><br/>
                    Posted: {fit.date}
                  </div>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

const LexsCorner = ({ messages, onSend }: { messages: any[], onSend: (t: string) => void }) => {
  const [input, setInput] = useState('');
  return (
    <div className="flex justify-center p-4">
      <table width="350" cellPadding="0" cellSpacing="0" className="border-2 border-blue-800 bg-white shadow-2xl text-black">
        <tr className="aim-header">
          <td className="p-1 px-2 font-bold text-xs flex justify-between items-center text-white">
            <span>Lexi - Instant Message</span>
            <div className="flex gap-1 text-[8px]">
              <button className="bg-gray-200 text-black px-1 border border-white">_</button>
              <button className="bg-gray-200 text-black px-1 border border-white">X</button>
            </div>
          </td>
        </tr>
        <tr>
          <td className="p-2 h-72 overflow-y-auto align-top bg-white border-b border-gray-300">
            <div className="text-xs space-y-1">
              <p className="text-[10px] text-gray-400 italic mb-2">AOL IM Session Started: {new Date().toLocaleTimeString()}</p>
              <p><span className="text-red-600 font-bold">Lexi:</span> hiiii! im Lexi, ur personal stylist!! ask me anything about your outfit or trends!</p>
              {messages.map((m, i) => (
                <p key={i}>
                  <span className={`${m.from === 'You' ? 'text-blue-600' : 'text-red-600'} font-bold`}>{m.from}:</span> {m.text}
                </p>
              ))}
            </div>
          </td>
        </tr>
        <tr>
          <td className="p-2 bg-gray-100">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && (onSend(input), setInput(''), playSound('message'))}
              className="w-full border border-gray-400 p-1 text-xs text-black" 
              placeholder="Type message here..." 
            />
            <div className="flex justify-end mt-2">
              <button onClick={() => { onSend(input); setInput(''); playSound('message'); }} className="glossy-button px-6 py-1 text-xs font-bold uppercase">Send</button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

const WishlistPage = ({ items, onAdd, onRemove }: { items: any[], onAdd: (n: string, d: string, p: string) => void, onRemove: (id: number) => void }) => {
  const [q, setQ] = useState('');
  const [n, setN] = useState('');
  const [d, setD] = useState('');
  const [pr, setPr] = useState('');

  const filtered = items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <table width="100%" className="td-content p-4 text-black">
      <tr>
        <td className="font-bold text-xl text-pink-600 border-b-2 border-pink-600 pb-2 mb-4 uppercase italic">
          ~* My Ultimate Wishlist *~
        </td>
      </tr>
      <tr>
        <td className="py-2">
          <div className="bg-blue-100 p-2 border border-blue-300 flex items-center gap-2">
            <span className="text-xs font-bold">Filter My List:</span>
            <input value={q} onChange={e => setQ(e.target.value)} className="border p-0.5 text-xs flex-1 text-black" />
          </div>
        </td>
      </tr>
      {filtered.map(item => (
        <tr key={item.id}>
          <td className="py-3 border-b border-gray-300">
            <table width="100%">
              <tr>
                <td><span className="font-bold text-blue-700">{item.name}</span><br/><span className="text-[11px]">{item.desc}</span></td>
                <td align="right">
                  <span className="font-mono text-sm mr-4">{item.price}</span>
                  <button onClick={() => { playSound('click'); onRemove(item.id); }} className="text-[9px] bg-red-500 text-white px-2 border border-black font-bold uppercase">Remove</button>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      ))}
      <tr>
        <td className="pt-6">
          <div className="bg-gray-100 border p-3">
            <p className="text-xs font-bold uppercase mb-2">Save New Style To Wishlist:</p>
            <input value={n} onChange={e => setN(e.target.value)} placeholder="Item Name" className="border p-1 text-xs w-full mb-1 text-black" />
            <input value={d} onChange={e => setD(e.target.value)} placeholder="Description" className="border p-1 text-xs w-full mb-1 text-black" />
            <input value={pr} onChange={e => setPr(e.target.value)} placeholder="Price e.g. $40" className="border p-1 text-xs w-1/2 mb-1 text-black" />
            <button onClick={() => { onAdd(n, d, pr); setN(''); setD(''); setPr(''); playSound('click'); }} className="glossy-button px-4 py-1 text-xs font-bold uppercase block mt-2">Save To List</button>
          </div>
        </td>
      </tr>
    </table>
  );
};

const TopSitesPage = () => {
  const sites = [
    { name: "MySpace - xO_Lexi_xO", desc: "Add me for more outfits!", url: "https://myspace.com" },
    { name: "LiveJournal: Style Diaries", desc: "Long fashion rants and outfit checks.", url: "https://livejournal.com" },
    { name: "Neopets: Rainbow Gurl", desc: "Visit my shop for pet items!", url: "https://neopets.com" },
    { name: "Y2K Fashion Ring", desc: "A collection of the best 2000s blogs.", url: "#" },
    { name: "Juicy Couture Official", desc: "Browse the latest tracksuits.", url: "https://juicycouture.com" },
    { name: "Stardoll", desc: "Dress up virtual dolls!", url: "https://stardoll.com" }
  ];
  return (
    <table width="100%" className="td-content p-4 text-black">
      <tr><td className="font-black text-xl text-blue-700 border-b-2 border-blue-400 mb-4 uppercase italic">Cool Links & TopSites Ring</td></tr>
      {sites.map((s, i) => (
        <tr key={i}>
          <td className="py-2 border-b border-gray-200">
            <a href={s.url} target="_blank" rel="noreferrer" className="font-bold text-pink-600 underline">~ {s.name} ~</a>
            <p className="text-[11px] italic">{s.desc}</p>
          </td>
        </tr>
      ))}
    </table>
  );
};

const GuestbookPage = ({ entries, onAdd }: { entries: any[], onAdd: (n: string, c: string) => void }) => {
  const [n, setN] = useState('');
  const [c, setC] = useState('');
  return (
    <div className="td-content p-4 text-black">
      <h2 className="text-xl font-black text-pink-600 mb-4 border-b border-pink-200 uppercase">Digi-Guestbook</h2>
      <div className="bg-white p-4 border border-gray-300 mb-6">
        <p className="text-xs font-bold mb-2 uppercase">Leave a Note:</p>
        <input value={n} onChange={e => setN(e.target.value)} placeholder="Your Name" className="w-full border p-1 text-xs mb-1 text-black" />
        <textarea value={c} onChange={e => setC(e.target.value)} placeholder="Message..." className="w-full border p-1 text-xs h-16 text-black" />
        <button onClick={() => { onAdd(n, c); setN(''); setC(''); playSound('click'); }} className="glossy-button px-6 py-1 text-xs font-bold uppercase mt-1">Submit Note</button>
      </div>
      <div className="space-y-4">
        {entries.map((e, i) => (
          <div key={i} className="bg-blue-50 border border-blue-100 p-2">
            <p className="text-[10px] font-bold text-blue-700 uppercase">{e.name} @ {e.date}</p>
            <p className="text-xs mt-1">{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- App Container ---

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState([{ username: 'Lexi', password: '123' }]);
  const [vHits, setVHits] = useState(5821);
  
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('dc_wishlist');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Juicy Couture Tracksuit", desc: "The pink velour one!", price: "$180" },
      { id: 2, name: "Von Dutch Trucker Hat", desc: "Paris Hilton vibes.", price: "$40" }
    ];
  });

  const [guestEntries, setGuestEntries] = useState(() => {
    const saved = localStorage.getItem('dc_guestbook');
    return saved ? JSON.parse(saved) : [
      { name: 'Fashion_Lover', date: `04/05/0${GET_YEAR_OFFSET() % 10}`, text: 'This site is like, totally amazing!! Love Lexi.' },
      { name: 'Sk8r_Boi', date: `03/12/0${GET_YEAR_OFFSET() % 10}`, text: 'Sick layout dude.' }
    ];
  });

  const [communityFits, setCommunityFits] = useState(() => {
    const saved = localStorage.getItem('dc_fits');
    return saved ? JSON.parse(saved) : [
      { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&h=200', user: 'Miss_Juicy_06', date: `05/20/0${GET_YEAR_OFFSET() % 10}` },
      { img: 'https://images.unsplash.com/photo-1529139572765-3974d8453289?auto=format&fit=crop&w=200&h=200', user: 'Sk8r_Gurl', date: `05/20/0${GET_YEAR_OFFSET() % 10}` },
      { img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=200&h=200', user: 'VonDutch_Vibes', date: `05/20/0${GET_YEAR_OFFSET() % 10}` },
      { img: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=200&h=200', user: 'BabyPink_88', date: `05/20/0${GET_YEAR_OFFSET() % 10}` },
      { img: 'https://images.unsplash.com/photo-1539106732377-6c7df64a4af6?auto=format&fit=crop&w=200&h=200', user: 'ChunkyBelt_Lover', date: `05/20/0${GET_YEAR_OFFSET() % 10}` },
      { img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c603e?auto=format&fit=crop&w=200&h=200', user: 'Glitter_Kween', date: `05/20/0${GET_YEAR_OFFSET() % 10}` }
    ];
  });

  const [messages, setMessages] = useState<any[]>([]);

  // Local Storage Persistence
  useEffect(() => localStorage.setItem('dc_wishlist', JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem('dc_guestbook', JSON.stringify(guestEntries)), [guestEntries]);
  useEffect(() => localStorage.setItem('dc_fits', JSON.stringify(communityFits)), [communityFits]);

  // Hit Counter logic
  useEffect(() => {
    const saved = localStorage.getItem('dc_vhits');
    const count = saved ? parseInt(saved) + 1 : 5821;
    setVHits(count);
    localStorage.setItem('dc_vhits', count.toString());
  }, []);

  // Simulate new fit every 2 hours (scaled for demo: every 2 minutes or just add one on mount)
  useEffect(() => {
    const interval = setInterval(() => {
      const newFit = {
        img: `https://images.unsplash.com/photo-${FITS_OF_THE_WEEK[Math.floor(Math.random()*7)].id}?auto=format&fit=crop&w=200&h=200`,
        user: `Guest_${Math.floor(Math.random()*900)+100}`,
        date: `05/21/0${GET_YEAR_OFFSET() % 10}`
      };
      setCommunityFits(prev => [newFit, ...prev.slice(0, 11)]);
    }, 120000); // 2 minutes for demo feel
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (u: string, p: string) => {
    const found = users.find(usr => usr.username === u && usr.password === p);
    if (found) {
      setUser(found);
      playSound('login');
      setPage('home');
      return true;
    }
    return false;
  };

  const handleSignup = (u: string, p: string) => {
    if (!u || !p) return alert('Enter info!!');
    setUsers([...users, { username: u, password: p }]);
    alert('Account Created! Log in now.');
    playSound('login');
    setPage('home');
  };

  const handleLexChat = (text: string) => {
    if (!text.trim()) return;
    const newMsgs = [...messages, { from: 'You', text }];
    setMessages(newMsgs);
    
    setTimeout(() => {
      let reply = "omg totally! i love that.";
      const lower = text.toLowerCase();
      
      const responses: Record<string, string[]> = {
        'blue': ["blue denim is essential for the boardwalk!", "light blue tracksuits are so in right now."],
        'pink': ["pink is literally my life.", "u can never have too much pink sparkle."],
        'belt': ["chunky belts are the move!! wear it over a long tank top.", "studded belts? so punk rock, love it."],
        'razr': ["im saving up for the pink razr, it's so chic.", "everyone at school has one, i need it!"],
        'skirt': ["denim mini skirts with uggs? classic.", "layered skirts are so cute for summer."],
        'hi': ["heyyy girl!!", "omg hiii! u look like u have great taste."],
        'hello': ["hey there! welcome to my corner!", "hiii! what's the fashion tea today?"],
        'story': ["omg i once wore a trucker hat to a wedding, my mom was SO mad lol.", "last week i found a juicy tracksuit for 10 bucks at the thrift, literal luck!!"],
        'outfit': ["u should definitely try layering two polo shirts, it's so preppy.", "oversized sunglasses are a MUST for your fit."],
        'jason': ["jason is the coolest webmaster ever, he built this whole site!", "jason? oh he's the one who makes sure the closet stays fresh!"]
      };

      for (const key in responses) {
        if (lower.includes(key)) {
          const options = responses[key];
          reply = options[Math.floor(Math.random() * options.length)];
          break;
        }
      }
      
      setMessages(prev => [...prev, { from: 'Lexi', text: reply }]);
      playSound('message');
    }, 800);
  };

  return (
    <div className="min-h-screen p-4 flex justify-center text-black">
      <table width="800" cellPadding="0" cellSpacing="0" className="bg-white border-4 border-white shadow-[10px_10px_20px_rgba(0,0,0,0.5)] h-fit">
        <tr>
          <td colSpan={2}>
            <Header />
            <Marquee text={`*~* WELCOME TO DIGICLOSET *~* YEAR: 0${GET_YEAR_OFFSET() % 10} *~* NEW WISHLIST UPDATES *~* JOIN OUR TOP SITES RING *~* SIGN THE GUESTBOOK *~* XOXO LEXI *~* NO FAKES ALLOWED HERE *~*`} />
          </td>
        </tr>
        <tr>
          <td valign="top" className="bg-gray-100 w-[150px]">
            <Sidebar setPage={setPage} user={user} onLogout={() => setUser(null)} />
          </td>
          <td valign="top" className="p-4 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] min-h-[550px]">
            {page === 'home' && <HomePage onLogin={handleLogin} setPage={setPage} />}
            {page === 'signup' && <SignupPage onSignup={handleSignup} />}
            {page === 'closet' && <ClosetPage communityFits={communityFits} onAddFit={(img, user) => setCommunityFits([{ img, user, date: `05/21/0${GET_YEAR_OFFSET() % 10}` }, ...communityFits])} />}
            {page === 'lex' && <LexsCorner messages={messages} onSend={handleLexChat} />}
            {page === 'wishlist' && <WishlistPage items={wishlist} onRemove={id => setWishlist(wishlist.filter((i: any) => i.id !== id))} onAdd={(n, d, p) => setWishlist([...wishlist, { id: Date.now(), name: n, desc: d, price: p }])} />}
            {page === 'guestbook' && <GuestbookPage entries={guestEntries} onAdd={(n, t) => setGuestEntries([{ name: n, date: `05/21/0${GET_YEAR_OFFSET() % 10}`, text: t }, ...guestEntries])} />}
            {page === 'topsites' && <TopSitesPage />}
            {page === 'legal' && (
              <div className="td-content p-4 text-black">
                <h2 className="text-xl font-bold border-b border-gray-400 mb-2 uppercase">Legal Disclaimer</h2>
                <p className="text-xs">DigiCloset is a fan community. All mirror selfies are property of their respective owners. We are not responsible for your fashion choices. Under Section 107 of the Copyright Act 1976, allowance is made for "fair use".</p>
                <button onClick={() => setPage('home')} className="mt-4 underline text-xs">Back</button>
              </div>
            )}
            {page === 'about' && (
              <div className="td-content p-4 text-black">
                <h2 className="text-xl font-bold border-b border-gray-400 mb-2 uppercase">About Webmaster</h2>
                <p className="text-xs">Jason is a 19-year-old developer who loves tables, gradients, and MySpace coding. He built DigiCloset to give Lexi a place to share her style genius with the world. Built with Notepad++ and lots of caffeine.</p>
                <button onClick={() => setPage('home')} className="mt-4 underline text-xs">Back</button>
              </div>
            )}
          </td>
        </tr>
        <tr>
          <td colSpan={2} align="center" className="bg-black text-white p-4 text-[10px] font-mono border-t-2 border-white">
            <div className="flex justify-center items-center gap-4">
              <span>&copy; 200{GET_YEAR_OFFSET() % 10} DigiCloset. Fashion is Forever.</span>
              <div className="bg-green-900 border border-green-400 p-1 px-2 font-mono text-green-400 flex items-center">
                V-HITS: <span className="ml-2 tracking-[0.2em] font-bold">{vHits.toString().padStart(7, '0')}</span>
              </div>
            </div>
            <div className="mt-2 text-gray-500 flex justify-center gap-4">
              <button onClick={() => setPage('legal')} className="underline">Legal</button>
              <button onClick={() => setPage('about')} className="underline">About Webmaster</button>
              <button onClick={() => setPage('lex')} className="underline">Contact Lexi</button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}
