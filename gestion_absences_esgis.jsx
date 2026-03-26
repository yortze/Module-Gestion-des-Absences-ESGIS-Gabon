import { useState, useEffect } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const FILIERES = {
  "L1-TC-INFO": { label: "Licence 1 – Tronc Commun Informatique", dept: "Sciences & Technologies" },
  "L2-DEVWEB":  { label: "Licence 2 – Développement Web",         dept: "Sciences & Technologies" },
  "L3-GL":      { label: "Licence 3 – Génie Logiciel",             dept: "Sciences & Technologies" },
  "L3-SRS":     { label: "Licence 3 – Systèmes Réseaux & Sécurité",dept: "Sciences & Technologies" },
  "M1-MSI":     { label: "Master 1 – Management SI",               dept: "Sciences & Technologies" },
  "M2-IABD":    { label: "Master 2 – IA & Big Data",               dept: "Sciences & Technologies" },
  "L2-GRH":     { label: "Licence 2 – Gestion des RH",             dept: "Sciences de Gestion" },
  "L3-MDA":     { label: "Licence 3 – Management & Droit des Affaires", dept: "Sciences Juridiques" },
};

const USERS = {
  admin:        { password:"admin123",  role:"admin", name:"PARAISO Isaac Damien",   avatar:"PI", profId:null },
  "prof.lawson":{ password:"prof123",   role:"prof",  name:"Marcel LAWSON",           avatar:"ML", profId:"P001" },
  "prof.boukar":{ password:"prof123",   role:"prof",  name:"Dr. Boukar Moussa",       avatar:"BM", profId:"P002" },
  "prof.eya":   { password:"prof123",   role:"prof",  name:"Mme Eya Nze Christine",   avatar:"EC", profId:"P003" },
};

const PLANNING = {
  P001:[
    { id:"C001", jour:"Lundi",    heure:"08h00–10h00", matiere:"Algorithmes & Structures de données", filiereId:"L1-TC-INFO", salle:"Salle 12" },
    { id:"C002", jour:"Lundi",    heure:"10h00–12h00", matiere:"Base de données SQL",                 filiereId:"L2-DEVWEB",  salle:"Labo Info" },
    { id:"C003", jour:"Mercredi", heure:"14h00–16h00", matiere:"Algorithmes & Structures de données", filiereId:"L1-TC-INFO", salle:"Salle 12" },
    { id:"C004", jour:"Vendredi", heure:"08h00–10h00", matiere:"Base de données SQL",                 filiereId:"L3-GL",      salle:"Labo Info" },
  ],
  P002:[
    { id:"C005", jour:"Mardi",    heure:"08h00–10h00", matiere:"Réseaux & Sécurité",     filiereId:"L3-SRS",  salle:"Salle 8" },
    { id:"C006", jour:"Mardi",    heure:"10h00–12h00", matiere:"Administration Système", filiereId:"M1-MSI",  salle:"Salle 8" },
    { id:"C007", jour:"Jeudi",    heure:"14h00–18h00", matiere:"Cybersécurité avancée",  filiereId:"M2-IABD", salle:"Labo Réseau" },
  ],
  P003:[
    { id:"C008", jour:"Lundi",    heure:"14h00–16h00", matiere:"Droit des affaires",  filiereId:"L3-MDA", salle:"Amphi A" },
    { id:"C009", jour:"Mercredi", heure:"08h00–10h00", matiere:"GRH & Management",    filiereId:"L2-GRH", salle:"Salle 5" },
    { id:"C010", jour:"Vendredi", heure:"10h00–12h00", matiere:"Droit des affaires",  filiereId:"L3-MDA", salle:"Amphi A" },
  ],
};
const ALL_COURS = Object.values(PLANNING).flat();

const ALL_STUDENTS = [
  { id:1,  name:"Abaha Abaha Christopher", mat:"0774-001", filiereId:"L1-TC-INFO", genre:"M", email:"abaha@esgis.ga" },
  { id:2,  name:"Mouamba Reine Sylvie",    mat:"0774-002", filiereId:"L2-DEVWEB",  genre:"F", email:"mouamba@esgis.ga" },
  { id:3,  name:"Ondo Nguema Patrick",     mat:"0774-003", filiereId:"L3-GL",      genre:"M", email:"ondo@esgis.ga" },
  { id:4,  name:"Nzigou Célia Flore",      mat:"0774-004", filiereId:"L3-SRS",     genre:"F", email:"nzigou@esgis.ga" },
  { id:5,  name:"Biyogho Emmanuel",        mat:"0774-005", filiereId:"L2-DEVWEB",  genre:"M", email:"biyogho@esgis.ga" },
  { id:6,  name:"Mba Ella Estelle",        mat:"0774-006", filiereId:"L1-TC-INFO", genre:"F", email:"mba@esgis.ga" },
  { id:7,  name:"Obame Rodrigue",          mat:"0774-007", filiereId:"M2-IABD",    genre:"M", email:"obame@esgis.ga" },
  { id:8,  name:"Koumba Faustine",         mat:"0774-008", filiereId:"L3-GL",      genre:"F", email:"koumba@esgis.ga" },
  { id:9,  name:"Nkoghe Serge",            mat:"0774-009", filiereId:"L3-SRS",     genre:"M", email:"nkoghe@esgis.ga" },
  { id:10, name:"Ayi Mbaye Christelle",    mat:"0774-010", filiereId:"M1-MSI",     genre:"F", email:"ayi@esgis.ga" },
  { id:11, name:"Bekale Joël",             mat:"0774-011", filiereId:"L3-MDA",     genre:"M", email:"bekale@esgis.ga" },
  { id:12, name:"Moubamba Tatiana",        mat:"0774-012", filiereId:"L2-GRH",     genre:"F", email:"moubamba@esgis.ga" },
];
const byFiliere = (fId) => ALL_STUDENTS.filter(s => s.filiereId === fId);

const INIT_ABS = [
  { id:1, studentId:2,  coursId:"C002", profId:"P001", date:"2025-01-13", type:"absent",  justifie:false, motif:"",          notif:true  },
  { id:2, studentId:3,  coursId:"C004", profId:"P001", date:"2025-01-10", type:"retard",  justifie:true,  motif:"Transport", notif:true  },
  { id:3, studentId:5,  coursId:"C002", profId:"P001", date:"2025-01-13", type:"absent",  justifie:false, motif:"",          notif:true  },
  { id:4, studentId:4,  coursId:"C005", profId:"P002", date:"2025-01-14", type:"retard",  justifie:false, motif:"",          notif:false },
  { id:5, studentId:9,  coursId:"C005", profId:"P002", date:"2025-01-14", type:"absent",  justifie:false, motif:"",          notif:false },
  { id:6, studentId:11, coursId:"C008", profId:"P003", date:"2025-01-12", type:"absent",  justifie:true,  motif:"Maladie",   notif:true  },
];
const JOURS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];

// ─── ICON ─────────────────────────────────────────────────────────────────────
const Svg = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const IcDash  = () => <Svg><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></Svg>;
const IcCal   = () => <Svg><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Svg>;
const IcAbs   = () => <Svg><circle cx="12" cy="12" r="10"/><line x1="4.9" y1="4.9" x2="19.1" y2="19.1"/></Svg>;
const IcRep   = () => <Svg><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></Svg>;
const IcBell  = () => <Svg><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Svg>;
const IcOut   = () => <Svg><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Svg>;
const IcChk   = () => <Svg><polyline points="20 6 9 17 4 12"/></Svg>;
const IcX     = () => <Svg><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>;
const IcPlus  = () => <Svg><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>;
const IcDl    = () => <Svg><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Svg>;
const IcMail  = () => <Svg><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></Svg>;
const IcTrash = () => <Svg><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></Svg>;
const IcMenu  = () => <Svg><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></Svg>;
const IcSrch  = () => <Svg><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Svg>;
const IcClk   = () => <Svg><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>;
const IcUsr   = () => <Svg><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>;

// ─── HOOKS ────────────────────────────────────────────────────────────────────
const useBreak = () => {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return { mobile: w < 640, tablet: w < 900 };
};

// ─── TINY COMPONENTS ─────────────────────────────────────────────────────────
const Badge = ({ text, color }) => (
  <span style={{ fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:20, background:`${color}20`, color, border:`1px solid ${color}40`, whiteSpace:"nowrap" }}>{text}</span>
);
const Input = ({ style, ...p }) => (
  <input {...p} style={{ padding:"10px 13px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:9, color:"#e2e8f0", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif", width:"100%", boxSizing:"border-box", ...style }} />
);
const Sel = ({ style, children, ...p }) => (
  <select {...p} style={{ padding:"10px 13px", background:"#111827", border:"1px solid rgba(255,255,255,0.09)", borderRadius:9, color:"#e2e8f0", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif", ...style }}>{children}</select>
);
const BtnPri = ({ children, ...p }) => (
  <button {...p} style={{ flex:2, padding:"11px", background:"linear-gradient(135deg,#6366f1,#4f46e5)", border:"none", borderRadius:9, color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>{children}</button>
);
const BtnSec = ({ children, ...p }) => (
  <button {...p} style={{ flex:1, padding:"11px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:9, color:"#94a3b8", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>{children}</button>
);

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════════════════
const Login = ({ onLogin }) => {
  const [id, setId] = useState(""); const [pw, setPw] = useState(""); const [err, setErr] = useState(""); const [ld, setLd] = useState(false);
  const submit = () => { setLd(true); setErr(""); setTimeout(() => { const u = USERS[id]; if (u && u.password === pw) onLogin({ ...u, login: id }); else { setErr("Identifiants incorrects"); setLd(false); } }, 700); };
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#080e1a 0%,#111827 60%,#080e1a 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif", padding:16, position:"relative", overflow:"hidden" }}>
      <style>{FONT}</style>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(99,102,241,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.04) 1px,transparent 1px)", backgroundSize:"44px 44px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"18%", left:"8%", width:360, height:360, background:"rgba(99,102,241,.1)", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"12%", right:"6%", width:280, height:280, background:"rgba(6,182,212,.07)", borderRadius:"50%", filter:"blur(60px)", pointerEvents:"none" }} />
      <div style={{ position:"relative", zIndex:1, background:"rgba(255,255,255,0.03)", backdropFilter:"blur(24px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:22, padding:"38px 34px", width:"100%", maxWidth:400, boxShadow:"0 32px 64px rgba(0,0,0,.5)" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:50, height:50, background:"linear-gradient(135deg,#6366f1,#06b6d4)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:22, color:"#fff" }}>E</div>
          <h1 style={{ margin:0, fontSize:19, fontWeight:800, color:"#f1f5f9", fontFamily:"'Syne',sans-serif" }}>ESGIS Gabon</h1>
          <p style={{ margin:"5px 0 0", color:"#475569", fontSize:12 }}>Gestion centralisée des absences</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
          <div><label style={{ fontSize:10, fontWeight:700, color:"#64748b", letterSpacing:".07em", display:"block", marginBottom:5 }}>IDENTIFIANT</label><Input value={id} onChange={e=>setId(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="ex: prof.lawson" /></div>
          <div><label style={{ fontSize:10, fontWeight:700, color:"#64748b", letterSpacing:".07em", display:"block", marginBottom:5 }}>MOT DE PASSE</label><Input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="••••••••" /></div>
          {err && <div style={{ background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.3)", borderRadius:8, padding:"9px 13px", color:"#f87171", fontSize:12 }}>{err}</div>}
          <button onClick={submit} style={{ padding:"12px", background:"linear-gradient(135deg,#6366f1,#4f46e5)", border:"none", borderRadius:9, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", marginTop:4, opacity:ld?.7:1 }}>{ld?"Connexion…":"SE CONNECTER →"}</button>
        </div>
        <div style={{ marginTop:20, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, padding:12 }}>
          <p style={{ margin:"0 0 7px", fontSize:10, fontWeight:700, color:"#475569", letterSpacing:".06em" }}>COMPTES DÉMO</p>
          {[["admin","admin123","Admin"],["prof.lawson","prof123","Enseignant – Lawson"],["prof.boukar","prof123","Enseignant – Boukar"],["prof.eya","prof123","Enseignante – Eya"]].map(([l,p,r])=>(
            <div key={l} style={{ display:"flex", gap:6, alignItems:"center", marginTop:4, flexWrap:"wrap" }}>
              <code style={{ fontSize:11, color:"#818cf8", background:"rgba(99,102,241,.1)", padding:"2px 7px", borderRadius:4 }}>{l}</code>
              <code style={{ fontSize:11, color:"#94a3b8" }}>{p}</code>
              <span style={{ fontSize:10, color:"#475569" }}>({r})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [user,   setUser]   = useState(null);
  const [page,   setPage]   = useState("dashboard");
  const [abs,    setAbs]    = useState(INIT_ABS);
  const [toast,  setToast]  = useState(null);
  const [drawer, setDrawer] = useState(false);
  const { mobile, tablet } = useBreak();

  // Modals
  const [modalSaisie, setModalSaisie] = useState(null); // cours object | null
  const [modalJust,   setModalJust]   = useState(null); // abs id | null
  const [justMotif,   setJustMotif]   = useState("");

  // Saisie state
  const [presMap,  setPresMap]  = useState({});
  const [motifMap, setMotifMap] = useState({});

  // Filters
  const [fFiliere, setFFiliere] = useState("all");
  const [fType,    setFType]    = useState("all");
  const [fSearch,  setFSearch]  = useState("");

  const toast$ = (msg, err) => { setToast({ msg, err }); setTimeout(() => setToast(null), 3000); };

  if (!user) return <Login onLogin={u => { setUser(u); setPage("dashboard"); }} />;

  const isAdmin = user.role === "admin";
  const myPlan  = isAdmin ? [] : (PLANNING[user.profId] || []);
  const myAbs   = isAdmin ? abs : abs.filter(a => a.profId === user.profId);

  // Stats
  const nAbs   = myAbs.filter(a => a.type === "absent").length;
  const nRet   = myAbs.filter(a => a.type === "retard").length;
  const nNonJ  = myAbs.filter(a => !a.justifie).length;
  const nStuds = isAdmin ? ALL_STUDENTS.length : [...new Set(myPlan.flatMap(c => byFiliere(c.filiereId).map(s => s.id)))].length;

  // Open saisie
  const openSaisie = (cours) => {
    const pm = {}; const mm = {};
    byFiliere(cours.filiereId).forEach(s => { pm[s.id] = "present"; mm[s.id] = ""; });
    setPresMap(pm); setMotifMap(mm); setModalSaisie(cours);
  };
  const saveSaisie = () => {
    const today = new Date().toISOString().split("T")[0];
    const news = Object.entries(presMap).filter(([,v]) => v !== "present").map(([sid, type]) => ({
      id: Date.now() + +sid, studentId: +sid, coursId: modalSaisie.id, profId: user.profId,
      date: today, type, justifie: false, motif: motifMap[sid] || "", notif: false,
    }));
    setAbs(p => [...news, ...p]);
    setModalSaisie(null);
    toast$(`Séance enregistrée — ${news.length} absence(s)/retard(s)`);
  };

  const doJustify = () => {
    setAbs(p => p.map(a => a.id === modalJust ? { ...a, justifie: true, motif: justMotif || "Justifié" } : a));
    setModalJust(null); setJustMotif(""); toast$("Justificatif enregistré");
  };
  const sendNotif = (id) => { setAbs(p => p.map(a => a.id === id ? { ...a, notif: true } : a)); toast$("Notification envoyée"); };
  const deleteAbs = (id) => { setAbs(p => p.filter(a => a.id !== id)); toast$("Supprimé"); };

  // Filtered abs
  const filtAbs = myAbs.filter(a => {
    const s = ALL_STUDENTS.find(st => st.id === a.studentId);
    const c = ALL_COURS.find(co => co.id === a.coursId);
    if (!s || !c) return false;
    if (fFiliere !== "all" && s.filiereId !== fFiliere) return false;
    if (fType    !== "all" && a.type !== fType) return false;
    if (fSearch && !s.name.toLowerCase().includes(fSearch.toLowerCase()) && !c.matiere.toLowerCase().includes(fSearch.toLowerCase())) return false;
    return true;
  });

  const NAV = [
    { id:"dashboard", label:"Tableau de bord",                      icon:<IcDash/> },
    { id:"planning",  label:isAdmin?"Emplois du temps":"Mon planning", icon:<IcCal/>  },
    { id:"absences",  label:isAdmin?"Toutes les absences":"Absences", icon:<IcAbs/>  },
    ...(isAdmin ? [{ id:"rapports", label:"Rapports", icon:<IcRep/> }] : []),
    { id:"notifs", label:"Notifications", icon:<IcBell/> },
  ];

  /* ── SIDEBAR ── */
  const Sidebar = () => (
    <>
      {mobile && drawer && <div onClick={()=>setDrawer(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.65)", zIndex:199 }} />}
      <aside style={{ width:224, background:"#080e1a", borderRight:"1px solid rgba(255,255,255,0.07)", display:"flex", flexDirection:"column", padding:"20px 12px", position:"fixed", top:0, bottom:0, left:mobile?(drawer?0:-240):0, zIndex:200, transition:"left .22s ease", overflowY:"auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:24, paddingLeft:4 }}>
          <div style={{ width:32, height:32, background:"linear-gradient(135deg,#6366f1,#06b6d4)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:14, color:"#fff", fontFamily:"'Syne',sans-serif", flexShrink:0 }}>E</div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:12, color:"#f1f5f9" }}>ESGIS Gabon</div>
            <div style={{ fontSize:9, color:"#475569", letterSpacing:".06em" }}>ABSENCES v2</div>
          </div>
          {mobile && <button onClick={()=>setDrawer(false)} style={{ marginLeft:"auto", background:"none", border:"none", color:"#64748b", cursor:"pointer", padding:4 }}><IcX/></button>}
        </div>
        {/* User */}
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:11, padding:"9px 11px", marginBottom:16, display:"flex", gap:9, alignItems:"center" }}>
          <div style={{ width:30, height:30, borderRadius:7, background:"linear-gradient(135deg,#6366f1,#06b6d4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:"#fff", flexShrink:0 }}>{user.avatar}</div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#e2e8f0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name}</div>
            <div style={{ fontSize:9, color:isAdmin?"#f59e0b":"#34d399" }}>{isAdmin?"Administrateur":"Enseignant"}</div>
          </div>
        </div>
        <nav style={{ flex:1 }}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>{setPage(n.id);setDrawer(false);}} style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:9, border:"none", cursor:"pointer", textAlign:"left", marginBottom:2, background:page===n.id?"rgba(99,102,241,0.15)":"transparent", color:page===n.id?"#a5b4fc":"#475569", borderLeft:`2px solid ${page===n.id?"#6366f1":"transparent"}`, fontWeight:page===n.id?600:400, fontSize:12, transition:"all .15s", fontFamily:"'DM Sans',sans-serif" }}>
              <span style={{ opacity:page===n.id?1:.55 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:10 }}>
          <button onClick={()=>setUser(null)} style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:9, border:"none", background:"transparent", color:"#ef4444", cursor:"pointer", fontSize:12, fontFamily:"'DM Sans',sans-serif" }}><IcOut/> Déconnexion</button>
        </div>
      </aside>
    </>
  );

  const pad = mobile ? "14px" : "22px 26px";
  const ml  = mobile ? 0 : 224;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#080e1a", fontFamily:"'DM Sans',sans-serif", color:"#e2e8f0" }}>
      <style>{FONT+`
        *{box-sizing:border-box}body{margin:0}
        select option{background:#111827}
        input[type="date"]::-webkit-calendar-picker-indicator{filter:invert(1);opacity:.4}
        ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:4px}
        @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .rh:hover{background:rgba(255,255,255,0.025)!important}
        .btn-icon:hover{opacity:.8}
      `}</style>

      <Sidebar />

      <div style={{ marginLeft:ml, flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        {/* TOP BAR */}
        <div style={{ padding:mobile?"12px 14px":"16px 26px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:10, background:"rgba(8,14,26,0.92)", backdropFilter:"blur(10px)", position:"sticky", top:0, zIndex:100 }}>
          {mobile && <button onClick={()=>setDrawer(true)} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:7, color:"#94a3b8", cursor:"pointer", display:"flex", alignItems:"center" }}><IcMenu/></button>}
          <div style={{ flex:1, minWidth:0 }}>
            <h2 style={{ margin:0, fontSize:mobile?15:18, fontWeight:800, color:"#f1f5f9", fontFamily:"'Syne',sans-serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{NAV.find(n=>n.id===page)?.label}</h2>
            {!mobile && <p style={{ margin:"2px 0 0", color:"#475569", fontSize:11 }}>{new Date().toLocaleDateString("fr-FR",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>}
          </div>
          <button onClick={()=>setPage("notifs")} style={{ position:"relative", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:9, padding:"8px 10px", color:"#94a3b8", cursor:"pointer", display:"flex", alignItems:"center" }}>
            <IcBell/>
            {myAbs.filter(a=>!a.notif).length > 0 && <span style={{ position:"absolute", top:5, right:5, width:7, height:7, background:"#ef4444", borderRadius:"50%", display:"block" }} />}
          </button>
          {!isAdmin && (
            <button onClick={()=>setPage("planning")} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", background:"linear-gradient(135deg,#6366f1,#4f46e5)", border:"none", borderRadius:9, color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer" }}><IcPlus/>{mobile?"":"Saisir"}</button>
          )}
        </div>

        {/* CONTENT */}
        <div style={{ flex:1, padding:pad, overflowY:"auto", overflowX:"hidden" }}>

          {/* ══ DASHBOARD ══ */}
          {page==="dashboard" && (
            <div style={{ animation:"up .3s ease" }}>
              <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr 1fr":"repeat(4,1fr)", gap:12, marginBottom:18 }}>
                {[[<IcUsr/>,nStuds,"Étudiants concernés","#6366f1"],[<IcAbs/>,nAbs,"Absences","#ef4444"],[<IcClk/>,nRet,"Retards","#f59e0b"],[<IcBell/>,nNonJ,"Non justifiés","#06b6d4"]].map(([ic,v,l,c],i)=>(
                  <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"18px 16px" }}>
                    <div style={{ background:`${c}18`, borderRadius:9, padding:8, color:c, display:"inline-flex", marginBottom:12 }}>{ic}</div>
                    <div style={{ fontSize:28, fontWeight:800, color:"#f1f5f9", fontFamily:"'Syne',sans-serif" }}>{v}</div>
                    <div style={{ fontSize:11, color:"#475569", marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, overflow:"hidden" }}>
                <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, color:"#f1f5f9" }}>Dernières saisies</span>
                  <button onClick={()=>setPage("absences")} style={{ fontSize:11, color:"#818cf8", background:"none", border:"none", cursor:"pointer", fontWeight:600 }}>Voir tout →</button>
                </div>
                {myAbs.slice(0,6).map(a=>{
                  const s=ALL_STUDENTS.find(st=>st.id===a.studentId); const c=ALL_COURS.find(co=>co.id===a.coursId);
                  if(!s||!c) return null;
                  return (
                    <div key={a.id} className="rh" style={{ display:"flex", alignItems:"center", gap:11, padding:"12px 18px", borderBottom:"1px solid rgba(255,255,255,0.04)", flexWrap:mobile?"wrap":"nowrap" }}>
                      <div style={{ width:34, height:34, borderRadius:9, background:a.type==="absent"?"rgba(239,68,68,0.1)":"rgba(245,158,11,0.1)", display:"flex", alignItems:"center", justifyContent:"center", color:a.type==="absent"?"#ef4444":"#f59e0b", flexShrink:0 }}>{a.type==="absent"?<IcAbs/>:<IcClk/>}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:600, color:"#e2e8f0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</div>
                        <div style={{ fontSize:10, color:"#475569" }}>{c.matiere} · {c.heure} · {c.salle} · {a.date}</div>
                        <div style={{ fontSize:10, color:"#6366f1", marginTop:1 }}>{FILIERES[s.filiereId]?.label}</div>
                      </div>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                        <Badge text={a.type==="absent"?"Absent":"Retard"} color={a.type==="absent"?"#ef4444":"#f59e0b"} />
                        <Badge text={a.justifie?"Justifié":"En attente"} color={a.justifie?"#10b981":"#6366f1"} />
                      </div>
                    </div>
                  );
                })}
                {myAbs.length===0&&<div style={{padding:32,textAlign:"center",color:"#475569",fontSize:12}}>Aucune saisie</div>}
              </div>
            </div>
          )}

          {/* ══ PLANNING ══ */}
          {page==="planning" && (
            <div style={{ animation:"up .3s ease" }}>
              {isAdmin ? (
                Object.entries(PLANNING).map(([profId,cours])=>{
                  const p=Object.values(USERS).find(u=>u.profId===profId);
                  return (
                    <div key={profId} style={{ marginBottom:28 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:14 }}>
                        <div style={{ width:30, height:30, borderRadius:8, background:"linear-gradient(135deg,#6366f1,#06b6d4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:"#fff" }}>{p?.avatar}</div>
                        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:"#f1f5f9" }}>{p?.name}</span>
                        <span style={{ fontSize:11, color:"#475569" }}>— {cours.length} cours</span>
                      </div>
                      <PlanGrid cours={cours} mobile={mobile} tablet={tablet} canSaisie={false} onSaisie={()=>{}} />
                    </div>
                  );
                })
              ) : (
                <>
                  <p style={{ color:"#64748b", fontSize:13, marginBottom:16 }}>Cliquez sur <strong style={{color:"#a5b4fc"}}>+ SAISIR PRÉSENCES</strong> pour enregistrer les présences d'une séance.</p>
                  <PlanGrid cours={myPlan} mobile={mobile} tablet={tablet} canSaisie={true} onSaisie={openSaisie} />
                </>
              )}
            </div>
          )}

          {/* ══ ABSENCES ══ */}
          {page==="absences" && (
            <div style={{ animation:"up .3s ease" }}>
              {/* Filters */}
              <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
                <div style={{ display:"flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:9, padding:"9px 13px", flex:1, minWidth:160 }}>
                  <IcSrch/><input value={fSearch} onChange={e=>setFSearch(e.target.value)} placeholder="Rechercher…" style={{ border:"none", background:"transparent", color:"#e2e8f0", fontSize:12, outline:"none", flex:1, minWidth:0, fontFamily:"'DM Sans',sans-serif" }} />
                </div>
                {isAdmin && <Sel value={fFiliere} onChange={e=>setFFiliere(e.target.value)} style={{ flex:mobile?1:"unset" }}><option value="all">Toutes filières</option>{Object.entries(FILIERES).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</Sel>}
                <Sel value={fType} onChange={e=>setFType(e.target.value)}><option value="all">Tous types</option><option value="absent">Absence</option><option value="retard">Retard</option></Sel>
                <button onClick={()=>toast$("Export en cours…")} style={{ display:"flex", alignItems:"center", gap:5, padding:"9px 13px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:9, color:"#94a3b8", cursor:"pointer", fontSize:12 }}><IcDl/>{!mobile&&" Exporter"}</button>
              </div>
              <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, overflow:"hidden" }}>
                {mobile ? (
                  filtAbs.map(a=>{
                    const s=ALL_STUDENTS.find(st=>st.id===a.studentId); const c=ALL_COURS.find(co=>co.id===a.coursId); if(!s||!c) return null;
                    return (
                      <div key={a.id} style={{ padding:"13px 15px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                          <span style={{ fontSize:13, fontWeight:700, color:"#e2e8f0" }}>{s.name}</span>
                          <Badge text={a.type==="absent"?"Absent":"Retard"} color={a.type==="absent"?"#ef4444":"#f59e0b"} />
                        </div>
                        <div style={{ fontSize:11, color:"#475569", marginBottom:2 }}>{FILIERES[s.filiereId]?.label}</div>
                        <div style={{ fontSize:11, color:"#64748b", marginBottom:8 }}>{c.matiere} · {c.heure} · {a.date}</div>
                        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                          <Badge text={a.justifie?"Justifié":"Non justifié"} color={a.justifie?"#10b981":"#6366f1"} />
                          {a.motif&&<Badge text={a.motif} color="#94a3b8" />}
                          {!a.justifie&&<button onClick={()=>{setModalJust(a.id);setJustMotif("");}} style={{ fontSize:11, padding:"3px 9px", borderRadius:20, background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", color:"#34d399", cursor:"pointer", fontWeight:600 }}>Justifier</button>}
                          {!a.notif&&<button onClick={()=>sendNotif(a.id)} style={{ fontSize:11, padding:"3px 9px", borderRadius:20, background:"rgba(6,182,212,.1)", border:"1px solid rgba(6,182,212,.2)", color:"#22d3ee", cursor:"pointer", fontWeight:600 }}>Notifier</button>}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ overflowX:"auto" }}>
                    <table style={{ width:"100%", borderCollapse:"collapse", minWidth:700 }}>
                      <thead><tr style={{ background:"rgba(255,255,255,0.03)" }}>
                        {["Étudiant","Filière","Cours · Horaire · Salle","Date","Type","Justifié","Motif","Actions"].map(h=>(
                          <th key={h} style={{ padding:"11px 13px", textAlign:"left", fontSize:10, fontWeight:700, color:"#475569", letterSpacing:".07em", borderBottom:"1px solid rgba(255,255,255,0.06)", whiteSpace:"nowrap" }}>{h.toUpperCase()}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {filtAbs.map(a=>{
                          const s=ALL_STUDENTS.find(st=>st.id===a.studentId); const c=ALL_COURS.find(co=>co.id===a.coursId); if(!s||!c) return null;
                          return (
                            <tr key={a.id} className="rh" style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                              <td style={{ padding:"10px 13px" }}>
                                <div style={{ fontSize:13, fontWeight:600, color:"#e2e8f0", whiteSpace:"nowrap" }}>{s.name}</div>
                                <div style={{ fontSize:10, color:"#475569", fontFamily:"monospace" }}>{s.mat}</div>
                              </td>
                              <td style={{ padding:"10px 13px", maxWidth:160 }}>
                                <div style={{ fontSize:11, color:"#64748b", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{FILIERES[s.filiereId]?.label}</div>
                              </td>
                              <td style={{ padding:"10px 13px" }}>
                                <div style={{ fontSize:12, fontWeight:500, color:"#c7d2fe", whiteSpace:"nowrap" }}>{c.matiere}</div>
                                <div style={{ fontSize:10, color:"#475569" }}>{c.heure} · {c.salle}</div>
                              </td>
                              <td style={{ padding:"10px 13px", fontSize:12, color:"#64748b", whiteSpace:"nowrap" }}>{a.date}</td>
                              <td style={{ padding:"10px 13px" }}><Badge text={a.type==="absent"?"Absent":"Retard"} color={a.type==="absent"?"#ef4444":"#f59e0b"} /></td>
                              <td style={{ padding:"10px 13px" }}><Badge text={a.justifie?"Oui":"Non"} color={a.justifie?"#10b981":"#6366f1"} /></td>
                              <td style={{ padding:"10px 13px", fontSize:11, color:"#64748b" }}>{a.motif||"—"}</td>
                              <td style={{ padding:"10px 13px" }}>
                                <div style={{ display:"flex", gap:5 }}>
                                  {!a.justifie&&<button className="btn-icon" onClick={()=>{setModalJust(a.id);setJustMotif("");}} title="Justifier" style={{ padding:5, background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", borderRadius:6, color:"#34d399", cursor:"pointer", display:"flex" }}><IcChk/></button>}
                                  {!a.notif&&<button className="btn-icon" onClick={()=>sendNotif(a.id)} title="Notifier" style={{ padding:5, background:"rgba(6,182,212,.1)", border:"1px solid rgba(6,182,212,.2)", borderRadius:6, color:"#22d3ee", cursor:"pointer", display:"flex" }}><IcMail/></button>}
                                  <button className="btn-icon" onClick={()=>deleteAbs(a.id)} title="Supprimer" style={{ padding:5, background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.2)", borderRadius:6, color:"#f87171", cursor:"pointer", display:"flex" }}><IcTrash/></button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                {filtAbs.length===0&&<div style={{padding:36,textAlign:"center",color:"#475569",fontSize:12}}>Aucun résultat</div>}
              </div>
            </div>
          )}

          {/* ══ RAPPORTS ══ */}
          {page==="rapports" && isAdmin && (
            <div style={{ animation:"up .3s ease" }}>
              <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1fr 1fr", gap:12, marginBottom:18 }}>
                {[["Rapport par étudiant","Absences & retards individuels","#6366f1"],["Rapport par filière","Tendances par classe","#06b6d4"],["Rapport par professeur","Assiduité par enseignant","#10b981"],["Export PDF / Excel","Télécharger tous les rapports","#f59e0b"]].map(([t,d,c])=>(
                  <button key={t} onClick={()=>toast$(`Génération : ${t}`)} style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:13, padding:"18px", cursor:"pointer", textAlign:"left", display:"flex", gap:13, alignItems:"flex-start" }}>
                    <div style={{ background:`${c}18`, borderRadius:9, padding:9, color:c, flexShrink:0 }}><IcRep/></div>
                    <div><div style={{ fontSize:13, fontWeight:700, color:"#f1f5f9", fontFamily:"'Syne',sans-serif", marginBottom:3 }}>{t}</div><div style={{ fontSize:11, color:"#475569" }}>{d}</div></div>
                  </button>
                ))}
              </div>
              <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, overflow:"hidden" }}>
                <div style={{ padding:"13px 18px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}><span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, color:"#f1f5f9" }}>Statistiques par filière</span></div>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", minWidth:500 }}>
                    <thead><tr style={{ background:"rgba(255,255,255,0.02)" }}>
                      {["Filière","Étudiants","Absences","Retards","Taux"].map(h=><th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:10, fontWeight:700, color:"#475569", letterSpacing:".07em", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{h.toUpperCase()}</th>)}
                    </tr></thead>
                    <tbody>
                      {Object.entries(FILIERES).map(([k,v])=>{
                        const ss=ALL_STUDENTS.filter(s=>s.filiereId===k);
                        const ac=abs.filter(a=>ss.some(s=>s.id===a.studentId)&&a.type==="absent").length;
                        const rc=abs.filter(a=>ss.some(s=>s.id===a.studentId)&&a.type==="retard").length;
                        const r=Math.max(55,100-ac*10-rc*4);
                        return (
                          <tr key={k} className="rh" style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                            <td style={{ padding:"11px 14px" }}><div style={{ fontSize:12, fontWeight:600, color:"#e2e8f0" }}>{v.label}</div><div style={{ fontSize:10, color:"#475569" }}>{v.dept}</div></td>
                            <td style={{ padding:"11px 14px", fontSize:12, color:"#94a3b8" }}>{ss.length}</td>
                            <td style={{ padding:"11px 14px", fontSize:12, color:"#f87171", fontWeight:600 }}>{ac}</td>
                            <td style={{ padding:"11px 14px", fontSize:12, color:"#fbbf24", fontWeight:600 }}>{rc}</td>
                            <td style={{ padding:"11px 14px" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                                <div style={{ flex:1, height:5, background:"rgba(255,255,255,0.06)", borderRadius:3, overflow:"hidden", minWidth:50 }}><div style={{ width:`${r}%`, height:"100%", background:r>=85?"#10b981":r>=70?"#f59e0b":"#ef4444", borderRadius:3 }} /></div>
                                <span style={{ fontSize:11, fontWeight:700, color:r>=85?"#34d399":r>=70?"#fbbf24":"#f87171", minWidth:30 }}>{r}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ NOTIFICATIONS ══ */}
          {page==="notifs" && (
            <div style={{ animation:"up .3s ease" }}>
              <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, overflow:"hidden" }}>
                {myAbs.map(a=>{
                  const s=ALL_STUDENTS.find(st=>st.id===a.studentId); const c=ALL_COURS.find(co=>co.id===a.coursId); if(!s||!c) return null;
                  return (
                    <div key={a.id} className="rh" style={{ display:"flex", alignItems:mobile?"flex-start":"center", gap:12, padding:"13px 18px", borderBottom:"1px solid rgba(255,255,255,0.04)", flexDirection:mobile?"column":"row" }}>
                      <div style={{ width:36, height:36, borderRadius:9, background:a.notif?"rgba(16,185,129,.1)":"rgba(239,68,68,.1)", display:"flex", alignItems:"center", justifyContent:"center", color:a.notif?"#34d399":"#f87171", flexShrink:0 }}>{a.notif?<IcChk/>:<IcBell/>}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:600, color:"#e2e8f0" }}>{s.name} — <span style={{ color:"#94a3b8", fontWeight:400 }}>{c.matiere}</span></div>
                        <div style={{ fontSize:10, color:"#475569", marginTop:2 }}>{FILIERES[s.filiereId]?.label} · {a.date} · {a.type==="absent"?"Absence":"Retard"}</div>
                        <div style={{ fontSize:10, color:"#6366f1" }}>✉ {s.email}</div>
                      </div>
                      <div style={{ display:"flex", gap:7, flexShrink:0 }}>
                        {!a.justifie&&<button onClick={()=>{setModalJust(a.id);setJustMotif("");}} style={{ padding:"6px 12px", background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", borderRadius:8, color:"#34d399", cursor:"pointer", fontSize:11, fontWeight:600 }}>Justifier</button>}
                        <button onClick={()=>sendNotif(a.id)} disabled={a.notif} style={{ padding:"6px 12px", background:a.notif?"rgba(255,255,255,0.03)":"rgba(6,182,212,.1)", border:`1px solid ${a.notif?"rgba(255,255,255,0.06)":"rgba(6,182,212,.2)"}`, borderRadius:8, color:a.notif?"#475569":"#22d3ee", cursor:a.notif?"default":"pointer", fontSize:11, fontWeight:600 }}>{a.notif?"Envoyée ✓":"Notifier"}</button>
                      </div>
                    </div>
                  );
                })}
                {myAbs.length===0&&<div style={{padding:36,textAlign:"center",color:"#475569",fontSize:12}}>Aucune notification</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ MODAL SAISIE PRÉSENCES ══ */}
      {modalSaisie && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.75)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:500, padding:16 }} onClick={e=>e.target===e.currentTarget&&setModalSaisie(null)}>
          <div style={{ background:"#111827", border:"1px solid rgba(255,255,255,0.1)", borderRadius:18, padding:"24px 22px", width:"100%", maxWidth:520, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 40px 80px rgba(0,0,0,.6)", animation:"up .22s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <h3 style={{ margin:0, fontSize:16, fontWeight:800, color:"#f1f5f9", fontFamily:"'Syne',sans-serif" }}>Saisie des présences</h3>
              <button onClick={()=>setModalSaisie(null)} style={{ background:"rgba(255,255,255,0.05)", border:"none", borderRadius:7, padding:6, color:"#64748b", cursor:"pointer", display:"flex" }}><IcX/></button>
            </div>
            {/* Info cours */}
            <div style={{ background:"rgba(99,102,241,.07)", border:"1px solid rgba(99,102,241,.2)", borderRadius:11, padding:"11px 14px", marginBottom:16 }}>
              <div style={{ fontWeight:700, color:"#c7d2fe", fontSize:13, marginBottom:5 }}>{modalSaisie.matiere}</div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {[["📅",modalSaisie.jour],["⏰",modalSaisie.heure],["🏛",modalSaisie.salle]].map(([e,v])=><span key={v} style={{ fontSize:11, color:"#94a3b8" }}>{e} {v}</span>)}
              </div>
              <div style={{ marginTop:6, fontSize:11, color:"#818cf8" }}>🎓 {FILIERES[modalSaisie.filiereId]?.label}</div>
            </div>
            {/* Students */}
            <div style={{ display:"flex", flexDirection:"column", gap:7, maxHeight:330, overflowY:"auto" }}>
              {byFiliere(modalSaisie.filiereId).map(s=>(
                <div key={s.id} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:9, padding:"10px 12px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:9, flexWrap:"wrap" }}>
                    <div style={{ width:30, height:30, borderRadius:7, background:"linear-gradient(135deg,#6366f1,#06b6d4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:"#fff", flexShrink:0 }}>{s.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
                    <div style={{ flex:1, minWidth:80 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:"#e2e8f0" }}>{s.name}</div>
                      <div style={{ fontSize:10, color:"#475569", fontFamily:"monospace" }}>{s.mat}</div>
                    </div>
                    <div style={{ display:"flex", gap:4 }}>
                      {[["present","Présent","#10b981"],["absent","Absent","#ef4444"],["retard","Retard","#f59e0b"]].map(([val,lbl,col])=>(
                        <button key={val} onClick={()=>setPresMap(p=>({...p,[s.id]:val}))} style={{ padding:"5px 8px", borderRadius:7, border:"1px solid", borderColor:presMap[s.id]===val?col:"rgba(255,255,255,0.1)", background:presMap[s.id]===val?`${col}20`:"transparent", color:presMap[s.id]===val?col:"#475569", cursor:"pointer", fontSize:10, fontWeight:700 }}>{lbl}</button>
                      ))}
                    </div>
                  </div>
                  {presMap[s.id]!=="present"&&(
                    <Input value={motifMap[s.id]||""} onChange={e=>setMotifMap(m=>({...m,[s.id]:e.target.value}))} placeholder="Motif (optionnel)…" style={{ marginTop:7, fontSize:11 }} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, marginTop:16 }}>
              <BtnSec onClick={()=>setModalSaisie(null)}>Annuler</BtnSec>
              <BtnPri onClick={saveSaisie}>✓ Valider la séance</BtnPri>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL JUSTIFICATIF ══ */}
      {modalJust && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.75)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:500, padding:16 }} onClick={e=>e.target===e.currentTarget&&setModalJust(null)}>
          <div style={{ background:"#111827", border:"1px solid rgba(255,255,255,0.1)", borderRadius:18, padding:"24px 22px", width:"100%", maxWidth:400, animation:"up .22s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <h3 style={{ margin:0, fontSize:16, fontWeight:800, color:"#f1f5f9", fontFamily:"'Syne',sans-serif" }}>Justificatif</h3>
              <button onClick={()=>setModalJust(null)} style={{ background:"rgba(255,255,255,0.05)", border:"none", borderRadius:7, padding:6, color:"#64748b", cursor:"pointer", display:"flex" }}><IcX/></button>
            </div>
            <label style={{ fontSize:10, fontWeight:700, color:"#64748b", letterSpacing:".07em", display:"block", marginBottom:7 }}>MOTIF / PIÈCE JUSTIFICATIVE</label>
            <textarea value={justMotif} onChange={e=>setJustMotif(e.target.value)} rows={4} placeholder="Certificat médical, transport, convocation…" style={{ width:"100%", padding:"10px 13px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:9, color:"#e2e8f0", fontSize:12, outline:"none", resize:"vertical", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }} />
            <div style={{ background:"rgba(245,158,11,.07)", border:"1px solid rgba(245,158,11,.2)", borderRadius:9, padding:"9px 12px", marginTop:10, fontSize:11, color:"#fbbf24" }}>📎 Pièce jointe (PDF/image) disponible via l'interface admin.</div>
            <div style={{ display:"flex", gap:8, marginTop:14 }}>
              <BtnSec onClick={()=>setModalJust(null)}>Annuler</BtnSec>
              <BtnPri onClick={doJustify}>Enregistrer</BtnPri>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast&&<div style={{ position:"fixed", bottom:18, right:18, zIndex:9999, background:toast.err?"#b91c1c":"#0f766e", color:"#fff", padding:"10px 16px", borderRadius:11, fontSize:12, fontWeight:600, boxShadow:"0 10px 30px rgba(0,0,0,.4)", display:"flex", alignItems:"center", gap:7, animation:"up .22s ease", maxWidth:"calc(100vw - 36px)" }}>{toast.err?<IcX/>:<IcChk/>}{toast.msg}</div>}
    </div>
  );
}

// ─── PLANNING GRID ────────────────────────────────────────────────────────────
function PlanGrid({ cours, mobile, tablet, canSaisie, onSaisie }) {
  if (mobile || tablet) {
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
        {cours.map(c=><CourseCard key={c.id} c={c} canSaisie={canSaisie} onSaisie={onSaisie} />)}
        {cours.length===0&&<div style={{ padding:32, textAlign:"center", color:"#475569", fontSize:12 }}>Aucun cours programmé</div>}
      </div>
    );
  }
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:9 }}>
      {JOURS.map(j=>(
        <div key={j}>
          <div style={{ fontSize:10, fontWeight:700, color:"#475569", letterSpacing:".07em", marginBottom:7, textAlign:"center", paddingBottom:7, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{j.toUpperCase()}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {cours.filter(c=>c.jour===j).map(c=><CourseCard key={c.id} c={c} canSaisie={canSaisie} onSaisie={onSaisie} />)}
            {cours.filter(c=>c.jour===j).length===0&&<div style={{ height:52, background:"rgba(255,255,255,0.01)", border:"1px dashed rgba(255,255,255,0.05)", borderRadius:10 }} />}
          </div>
        </div>
      ))}
    </div>
  );
}
function CourseCard({ c, canSaisie, onSaisie }) {
  return (
    <div style={{ background:"rgba(99,102,241,0.07)", border:"1px solid rgba(99,102,241,0.18)", borderRadius:11, padding:"11px 13px" }}>
      <div style={{ fontSize:11, fontWeight:700, color:"#c7d2fe", marginBottom:5, lineHeight:1.35 }}>{c.matiere}</div>
      <div style={{ fontSize:10, color:"#475569", marginBottom:2 }}>⏰ {c.heure}</div>
      <div style={{ fontSize:10, color:"#475569", marginBottom:2 }}>🏛 {c.salle}</div>
      <div style={{ fontSize:10, color:"#818cf8", marginBottom:canSaisie?9:0, lineHeight:1.3 }}>🎓 {FILIERES[c.filiereId]?.label}</div>
      {canSaisie&&<button onClick={()=>onSaisie(c)} style={{ width:"100%", padding:"6px", background:"rgba(99,102,241,0.18)", border:"1px solid rgba(99,102,241,0.28)", borderRadius:7, color:"#a5b4fc", cursor:"pointer", fontSize:10, fontWeight:800, letterSpacing:".04em" }}>+ SAISIR PRÉSENCES</button>}
    </div>
  );
}
