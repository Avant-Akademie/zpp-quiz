
import React, { useState, useEffect, useRef } from 'react';

const COLORS = {
  bg: 'bg-[#FCFBF8]', // Edler, BetterMe-artiger Off-White Hintergrund
  primary: '#112A46', // ZPP Dunkelblau
  accent: '#65B345',  // ZPP Grün
  accentHover: '#549A39',
};

const QUESTIONS = [
  {
    id: 'q1',
    question: 'Welche Qualifikation bringst du aktuell mit?',
    options: [
      'Studium im Sportbereich',
      'Physiotherapeut',
      'Trainerlizenz (A-, B- oder C-Lizenz)',
      'Pilatestrainer',
      'Noch keine Ausbildung im Sportbereich'
    ]
  },
  {
    id: 'q2',
    question: 'Warum interessierst du dich für krankenkassenbezuschusste Kurse?',
    options: [
      'Mehr Teilnehmer gewinnen',
      'Höheren Stundenlohn erzielen',
      'Weniger Kundenakquise',
      'Beruflich neu orientieren',
      'Mein Angebot erweitern'
    ]
  },
  {
    id: 'q3',
    question: 'Arbeitest du aktuell bereits mit Kunden oder Teilnehmern?',
    options: [
      'Ja, regelmäßig',
      'Gelegentlich',
      'Noch nicht'
    ]
  },
  {
    id: 'q4',
    question: 'Wie bietest du deine Leistungen aktuell an?',
    options: [
      'Vor Ort',
      'Online',
      'Hybrid',
      'Noch gar nicht'
    ]
  },
  {
    id: 'q5',
    question: 'Was wäre für dich der größte Vorteil?',
    options: [
      'Mehr Teilnehmer',
      'Höhere Einnahmen',
      'Mehr Planungssicherheit',
      'Berufliche Neuorientierung',
      'Mein bestehendes Angebot aufwerten'
    ]
  }
];

const TAG_MAP = {
  q1: {
    'Studium im Sportbereich': 'QUALIFIKATION_STUDIUM',
    'Physiotherapeut': 'QUALIFIKATION_PHYSIO',
    'Trainerlizenz (A-, B- oder C-Lizenz)': 'QUALIFIKATION_TRAINERLIZENZ',
    'Pilatestrainer': 'QUALIFIKATION_YOGA_PILATES',
    'Noch keine Ausbildung im Sportbereich': 'QUALIFIKATION_QUEREINSTEIGER'
  },
  q2: {
    'Mehr Teilnehmer gewinnen': 'ZIEL_MEHR_TEILNEHMER',
    'Höheren Stundenlohn erzielen': 'ZIEL_HOEHERER_STUNDENLOHN',
    'Weniger Kundenakquise': 'ZIEL_WENIGER_AKQUISE',
    'Beruflich neu orientieren': 'ZIEL_BERUFLICHE_NEUORIENTIERUNG',
    'Mein Angebot erweitern': 'ZIEL_ANGEBOT_ERWEITERN'
  },
  q3: {
    'Ja, regelmäßig': 'HAT_KUNDEN_JA',
    'Gelegentlich': 'HAT_KUNDEN_GELEGENLICH',
    'Noch nicht': 'HAT_KUNDEN_NEIN'
  },
  q4: {
    'Vor Ort': 'ANGEBOT_VOR_ORT',
    'Online': 'ANGEBOT_ONLINE',
    'Hybrid': 'ANGEBOT_HYBRID',
    'Noch gar nicht': 'ANGEBOT_NOCH_NICHT'
  },
  q5: {
    'Mehr Teilnehmer': 'VORTEIL_MEHR_TEILNEHMER',
    'Höhere Einnahmen': 'VORTEIL_HOEHERE_EINNAHMEN',
    'Mehr Planungssicherheit': 'VORTEIL_PLANUNGSSICHERHEIT',
    'Berufliche Neuorientierung': 'VORTEIL_NEUORIENTIERUNG',
    'Mein bestehendes Angebot aufwerten': 'VORTEIL_ANGEBOT_AUFWERTEN'
  }
};

const Logo = () => (
  <div className="flex items-center justify-center space-x-3">
    {/* Vektor-Nachbau des ZPP Logos */}
    <svg className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0" viewBox="0 0 100 100" fill="none">
      {/* Grüner Außenkreis */}
      <path 
        d="M 50 5 A 45 45 0 1 1 10 70" 
        stroke={COLORS.accent} 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Blauer Kopf */}
      <circle cx="50" cy="30" r="9" fill={COLORS.primary} />
      {/* Blauer Körper/Arme (geschwungen) */}
      <path 
        d="M 15 45 Q 50 75 50 95 Q 50 75 85 45" 
        stroke={COLORS.primary} 
        strokeWidth="9" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </svg>
    <div className="flex items-baseline space-x-2 pt-1">
      <span className="font-bold text-2xl md:text-4xl tracking-tight" style={{ color: COLORS.primary }}>ZPP</span>
      <span className="font-normal text-lg md:text-2xl tracking-wide" style={{ color: COLORS.accent }}>ZERTIFIZIERUNG</span>
    </div>
  </div>
);

const Footer = () => (
  <footer className="w-full py-8 mt-auto text-center text-gray-400 text-sm flex flex-wrap justify-center gap-4 md:gap-8 px-6">

    <a
      href="https://www.avant-akademie.de/impressum"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-600 transition-colors"
    >
      Impressum
    </a>

    <a
      href="https://www.avant-akademie.de/cookies"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-600 transition-colors"
    >
      Datenschutz
    </a>

    <a
      href="https://www.avant-akademie.de/terms"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-600 transition-colors"
    >
      AGBs
    </a>

    <a
      href="https://www.avant-akademie.de/kontakt"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-600 transition-colors"
    >
      Kontakt
    </a>

  </footer>
);

// Partikel-Feuerwerk für den Lead-Screen
const FireworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = [COLORS.accent, COLORS.primary, '#FFD700', '#FF6B6B', '#4ECDC4'];

    // Explosion erzeugen
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2 + 50, // Leicht unterhalb der Mitte starten
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20 - 5, // Tendenz nach oben
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: Math.random() * 0.015 + 0.01
      });
    }

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;
      particles.forEach(p => {
        if (p.life > 0) {
          active = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.3; // Schwerkraft
          p.life -= p.decay;
          
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      if (active) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
};

const GlobalStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
      opacity: 0;
    }
  `}</style>
);


export default function App() {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState({});
  const [userInfo, setUserInfo] = useState({ firstName: '', email: '' });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Helper to determine the result group based on Q1
  const getResultGroup = () => {
    const q1Answer = answers.q1;
    if (['Studium im Sportbereich', 'Physiotherapeut'].includes(q1Answer)) {
      return 'ERGEBNIS_A';
    } else if (['Trainerlizenz (A-, B- oder C-Lizenz)', 'Pilatestrainer'].includes(q1Answer)) {
      return 'ERGEBNIS_B';
    } else {
      return 'ERGEBNIS_C';
    }
  };

  const handleAnswer = (questionId, answer) => {
    setSelectedAnswer(answer);
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    setTimeout(() => {
      setSelectedAnswer(null);
      if (step < QUESTIONS.length) {
        setStep(step + 1);
      } else {
        setStep(6);
      }
    }, 500); // 500ms delay to show the selected animation
  };

  const restartQuiz = () => {
    setStep(0);
    setAnswers({});
    setUserInfo({ firstName: '', email: '' });
    setLoadingProgress(0);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    if (step === 6) {
      const progressSteps = [0, 25, 57, 83, 100];
      let currentStepIndex = 0;

      // Smooth percentage counter
      const interval = setInterval(() => {
        currentStepIndex++;
        if (currentStepIndex < progressSteps.length) {
          setLoadingProgress(progressSteps[currentStepIndex]);
        }
        
        if (currentStepIndex >= progressSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setStep(7), 500);
        }
      }, 750); // 3 seconds total

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.firstName || !userInfo.email) return;

    setIsSubmitting(true);

    const resultGroup = getResultGroup();
    const tags = [];
    
    if (TAG_MAP.q1[answers.q1]) tags.push(TAG_MAP.q1[answers.q1]);
    if (TAG_MAP.q2[answers.q2]) tags.push(TAG_MAP.q2[answers.q2]);
    if (TAG_MAP.q3[answers.q3]) tags.push(TAG_MAP.q3[answers.q3]);
    if (TAG_MAP.q4[answers.q4]) tags.push(TAG_MAP.q4[answers.q4]);
    if (TAG_MAP.q5[answers.q5]) tags.push(TAG_MAP.q5[answers.q5]);
    tags.push(resultGroup);

    // Saubere Struktur für Kit (ConvertKit) API
    // Nutzt email, first_name, array für tags und fields für Custom Fields
    const kitPayload = {
      api_key: "DEIN_KIT_API_KEY", // Platzhalter für dein Backend
      email: userInfo.email,
      first_name: userInfo.firstName,
      tags: tags,
      fields: {
        ergebnis_gruppe: resultGroup,
        antwort_q1: answers.q1,
        antwort_q2: answers.q2,
        antwort_q3: answers.q3,
        antwort_q4: answers.q4,
        antwort_q5: answers.q5
      }
    };

    console.log("🚀 ~ BEREIT FÜR KIT INTEGRATION PAYLOAD:", kitPayload);

    // Hier würde dein fetch() Call an Kit/ConvertKit oder Zapier/Make stattfinden
    // fetch('https://api.convertkit.com/v3/subscribe', { ... })

    await fetch(
  "https://hook.eu1.make.com/ie42oixa3c9fjeojs9trtbod6hlvxdqq",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(kitPayload)
  }
);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(8);
    }, 1200);
  };

  const Logo = ({ onClick }) => (
    <button onClick={onClick} className="flex items-center justify-center space-x-2 md:space-x-3 cursor-pointer focus:outline-none hover:opacity-90 transition-opacity">
      {/* Vektor-Nachbau des ZPP Logos */}
      <svg className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" viewBox="0 0 100 100" fill="none">
        {/* Grüner Außenkreis */}
        <path 
          d="M 50 5 A 45 45 0 1 1 10 70" 
          stroke={COLORS.accent} 
          strokeWidth="6" 
          strokeLinecap="round" 
          fill="none" 
        />
        {/* Blauer Kopf */}
        <circle cx="50" cy="30" r="9" fill={COLORS.primary} />
        {/* Blauer Körper/Arme (geschwungen) */}
        <path 
          d="M 15 45 Q 50 75 50 95 Q 50 75 85 45" 
          stroke={COLORS.primary} 
          strokeWidth="9" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
      </svg>
      <div className="flex items-baseline space-x-1.5 md:space-x-2 pt-1">
        <span className="font-bold text-xl md:text-3xl tracking-tight" style={{ color: COLORS.primary }}>ZPP</span>
        <span className="font-normal text-base md:text-xl tracking-wide" style={{ color: COLORS.accent }}>ZERTIFIZIERUNG</span>
      </div>
    </button>
  );

  const Header = ({ onLogoClick }) => (
    <header className="w-full bg-transparent py-4 px-6 flex justify-center items-center z-40 shrink-0">
      <Logo onClick={onLogoClick} />
    </header>
  );

  const ProgressBar = () => {
    if (step < 1 || step > 5) return null;
    const progress = (step / QUESTIONS.length) * 100;
    
    return (
      <div className="w-full max-w-2xl mx-auto px-4 md:px-6 mb-4 md:mb-8 mt-2 shrink-0">
        <div className="w-full bg-gray-200 h-1.5 md:h-2.5 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%`, backgroundColor: COLORS.accent }}
          />
        </div>
      </div>
    );
  };

  if (step === 0) {
    return (
      <div className={`min-h-[100dvh] ${COLORS.bg} flex flex-col font-sans text-gray-900 selection:bg-green-100`}>
        <GlobalStyles />
        <Header onLogoClick={restartQuiz} />
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 w-full animate-fade-in">
          
          <div className="max-w-4xl w-full text-center mt-[-2vh] md:mt-[-4vh]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 leading-tight" style={{ color: COLORS.primary }}>
              Finde in 60 Sekunden heraus, ob du krankenkassenbezuschusste Sportkurse anbieten kannst.
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 md:mb-10 font-light max-w-2xl mx-auto">
              Kostenloser Eignungstest für Trainer, Coaches und Quereinsteiger.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-10 mb-8 md:mb-12 text-sm sm:text-base md:text-lg text-gray-700 font-medium">
              <div className="flex items-center space-x-2 md:space-x-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full text-white flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span>Kostenlos</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full text-white flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span>Sofortiges Ergebnis</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full text-white flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span>Individuelle Auswertung</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button 
                onClick={() => setStep(1)}
                className="w-full sm:w-auto sm:min-w-[320px] py-4 px-8 md:py-5 md:px-10 rounded-full text-white font-bold text-base md:text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all active:scale-95 block"
                style={{ backgroundColor: COLORS.accent }}
              >
                👉🏼 Jetzt Test starten
              </button>
              
              <div className="mt-8 md:mt-12 text-xs sm:text-sm text-gray-400 font-medium animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                Über 1.000 Trainer, Coaches und Quereinsteiger haben diesen Test bereits absolviert. ✔
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (step >= 1 && step <= 5) {
    const currentQuestion = QUESTIONS[step - 1];
    
    return (
      <div className={`min-h-[100dvh] ${COLORS.bg} flex flex-col font-sans overflow-hidden`}>
        <GlobalStyles />
        <Header onLogoClick={restartQuiz} />
        <ProgressBar />
        <main className="flex-1 flex flex-col items-center justify-start md:justify-center pt-2 md:pt-0 p-4 max-w-4xl mx-auto w-full animate-fade-in pb-8">
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-4 sm:mb-6 md:mb-10 leading-tight max-w-3xl px-1 sm:px-2" style={{ color: COLORS.primary }}>
            {currentQuestion.question}
          </h2>
          
          <div className="w-full flex flex-col gap-2.5 sm:gap-3 max-w-2xl px-1 sm:px-2">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                  className={`group flex justify-between items-center w-full p-3.5 sm:p-4 md:p-5 bg-white border rounded-2xl shadow-sm text-sm sm:text-base md:text-lg font-medium text-gray-700 transition-all duration-300 focus:outline-none
                    ${isSelected 
                      ? 'border-transparent shadow-md scale-[1.02] text-green-900' 
                      : 'border-gray-100 hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200'
                    }
                  `}
                  style={{ 
                    backgroundColor: isSelected ? 'rgba(101, 179, 69, 0.15)' : 'white',
                    borderColor: isSelected ? COLORS.accent : '' 
                  }}
                >
                  <span className="text-left pr-4 leading-snug">{option}</span>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300
                    ${isSelected ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600'}`}>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  if (step === 6) {
    return (
      <div className={`min-h-screen ${COLORS.bg} flex flex-col items-center justify-center font-sans p-6`}>
        <div className="max-w-md w-full text-center flex flex-col items-center">
          
          {/* Weicher, fließender animierter Kreis */}
          <div className="relative w-40 h-40 mb-10">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="6" />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke={COLORS.accent}
                strokeWidth="6" 
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * loadingProgress) / 100}
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold" style={{ color: COLORS.primary }}>{loadingProgress}%</span>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold mb-4" style={{ color: COLORS.primary }}>Wir analysieren deine Angaben...</h2>
          <p className="text-xl text-gray-500 font-light">Bitte einen Moment Geduld.</p>
        </div>
      </div>
    );
  }

  if (step === 7) {
    return (
      <div className={`min-h-[100dvh] ${COLORS.bg} flex flex-col font-sans`}>
        <FireworkCanvas /> {/* Canvas wird auf Mount gezeichnet */}
        <Header onLogoClick={restartQuiz} />
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 max-w-2xl mx-auto w-full animate-fade-in z-10 pb-8">
          <div className="bg-white rounded-[2rem] shadow-xl p-6 sm:p-10 md:p-14 w-full">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 md:mb-4" style={{ color: COLORS.primary }}>Dein Ergebnis ist fertig! 🥳</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-500 font-light leading-relaxed">Gib deinen Vornamen und deine E-Mail-Adresse ein und erhalte dein persönliches Ergebnis.</p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 uppercase tracking-wide">Vorname</label>
                <input 
                  type="text" 
                  required
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:border-transparent outline-none transition-all text-base sm:text-lg"
                  style={{ '--tw-ring-color': COLORS.accent }}
                  placeholder="Dein Vorname"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 uppercase tracking-wide">E-Mail</label>
                <input 
                  type="email" 
                  required
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:border-transparent outline-none transition-all text-base sm:text-lg"
                  style={{ '--tw-ring-color': COLORS.accent }}
                  placeholder="deine@email.de"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 px-6 mt-2 sm:mt-4 rounded-full text-white font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all active:scale-95 disabled:opacity-70 disabled:transform-none flex justify-center items-center"
                style={{ backgroundColor: COLORS.accent }}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  "Ergebnis anzeigen"
                )}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (step === 8) {
    const resultGroup = getResultGroup();

    return (
      <div className={`min-h-[100dvh] ${COLORS.bg} flex flex-col font-sans`}>
        <Header onLogoClick={restartQuiz} />
        <main className="flex-1 flex flex-col items-center p-4 sm:p-6 pt-6 sm:pt-10 max-w-4xl mx-auto w-full animate-fade-in">
          
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden w-full text-center border-t-8" style={{ borderColor: COLORS.accent }}>
            <div className="p-6 sm:p-10 md:p-16">
              <h3 className="font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4" style={{ color: COLORS.accent }}>
                Dein Ergebnis
              </h3>
              
              {/* GRUPPE A */}
              {resultGroup === 'ERGEBNIS_A' && (
                <>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 sm:mb-8 leading-tight" style={{ color: COLORS.primary }}>
                    Sehr gute Ausgangslage, {userInfo.firstName}!
                  </h2>
                  <div className="text-gray-600 space-y-4 sm:space-y-6 text-left md:text-center text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto">
                    <p>Nach deinen Angaben erfüllst du vermutlich bereits die Voraussetzungen für eine Zertifizierung bei der Zentralen Prüfstelle Prävention (ZPP).</p>
                    <p>Dein nächster Schritt besteht nun darin, deine Qualifikationen direkt bei der ZPP prüfen zu lassen.</p>
                    <p>Sollte die ZPP im Rahmen der Prüfung zusätzliche Inhalte oder ECTS-Punkte verlangen, können wir dich dabei unterstützen, die fehlenden Module gezielt nachzuqualifizieren und anschließend erneuert bei der ZPP einzureichen. </p>
                  </div>
                  <div className="space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 flex flex-col sm:flex-row justify-center">
                    <a 
                      href="https://www.zentrale-pruefstelle-praevention.de/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full sm:w-auto py-4 sm:py-5 px-6 sm:px-10 rounded-full text-white font-bold text-base sm:text-lg shadow-lg hover:-translate-y-1 transition-all inline-block" 
                      style={{ backgroundColor: COLORS.accent }}
                    >
                      Qualifikation bei der ZPP prüfen 🔎
                    </a>
                    <a 
                      href="https://calendly.com/hallo-avant-akademie/30min" 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full sm:w-auto py-4 sm:py-5 px-6 sm:px-10 rounded-full font-bold text-base sm:text-lg border-2 hover:-translate-y-1 transition-all inline-block" 
                      style={{ borderColor: COLORS.accent, color: COLORS.accent }}
                    >
                      Module nachholen 🎓
                    </a>
                  </div>
                </>
              )}

              {/* GRUPPE B */}
              {resultGroup === 'ERGEBNIS_B' && (
                <>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 sm:mb-8 leading-tight" style={{ color: COLORS.primary }}>
                    Du bringst eine gute Grundlage mit, {userInfo.firstName}! 🥳
                  </h2>
                  <div className="text-gray-600 space-y-4 sm:space-y-6 text-left md:text-center text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
                    <p>Als Trainer verfügst du bereits über wertvolle Vorkenntnisse und praktische Erfahrung. </p>
                    <p>Damit du später Kurse anbieten kannst, die von den gesetzlichen Krankenkassen bis zu 100 % bezuschusst werden, benötigst du zusätzlich eine Qualifikation nach dem GKV-Leitfaden Prävention.</p>
                    <p>Genau dafür wurde unsere Ausbildung zum Präventionstrainer entwickelt.</p>
                    
                    {answers.q5 === 'Mehr Teilnehmer' && (
                      <div className="p-4 sm:p-6 bg-green-50 rounded-2xl mt-6 sm:mt-8 border border-green-100">
                        <p className="font-semibold" style={{ color: COLORS.primary }}>Viele Trainer nutzen die Ausbildung, um ihre Kurse für deutlich mehr Teilnehmer attraktiv zu machen.</p>
                      </div>
                    )}
                    {answers.q5 === 'Höhere Einnahmen' && (
                      <div className="p-4 sm:p-6 bg-green-50 rounded-2xl mt-6 sm:mt-8 border border-green-100">
                        <p className="font-semibold" style={{ color: COLORS.primary }}>Viele Präventionstrainer erzielen durch Gruppenkurse deutlich höhere Einnahmen pro Stunde.</p>
                      </div>
                    )}
                    {answers.q5 === 'Mein bestehendes Angebot aufwerten' && (
                      <div className="p-4 sm:p-6 bg-green-50 rounded-2xl mt-6 sm:mt-8 border border-green-100">
                        <p className="font-semibold" style={{ color: COLORS.primary }}>Die Ausbildung ergänzt dein bestehendes Angebot optimal. ✔</p>
                      </div>
                    )}

                    <div className="bg-gray-50 p-5 rounded-2xl mt-8">
                      <p className="font-medium text-base sm:text-lg text-gray-800">
                        In unserem kostenlosen Webinar erfährst du Schritt für Schritt, wie du dieses Ziel erreichen kannst.
                      </p>
                    </div>
                  </div>
                  <a
  href="https://www.avant-akademie.de/praeventionstrainer-webinar"
  target="_blank"
  rel="noreferrer"
  className="w-full md:w-auto py-4 sm:py-5 px-6 sm:px-10 rounded-full text-white font-bold text-lg sm:text-xl shadow-xl hover:-translate-y-1 transition-all inline-block"
  style={{ backgroundColor: COLORS.accent }}
>
  Jetzt kostenloses Webinar ansehen 🎥
</a>
                </>
              )}

              {/* GRUPPE C */}
              {resultGroup === 'ERGEBNIS_C' && (
                <>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 sm:mb-8 leading-tight" style={{ color: COLORS.primary }}>
                    Gute Nachrichten, {userInfo.firstName}!
                  </h2>
                  <div className="text-gray-600 space-y-4 sm:space-y-6 text-left md:text-center text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto">
                    <p>Viele Menschen glauben, dass man für krankenkassenbezuschusste Kurse zwingend ein Sportstudium benötigt. Doch das stimmt heute nicht mehr. Tatsächlich können seit 2020 auch motivierte Quereinsteiger über eine staatlich zugelassene Ausbildung die Qualifikationen erwerben.</p>
                    <p>Nach erfolgreichem Abschluss unserer <strong className="font-semibold text-gray-900">12-monatigen Ausbildung zum Präventionstrainer</strong>, erfüllst du alle fachlichen Vorausetzungen, um den nächsten Schritt in Richtung krankenkassenbezuschusste Kurse zu gehen. </p>
                    <p>Dazu zählen beispielsweise Rückenkurse, Functional Training, Lauftraining, Beweglichkeitskurse, Pilates, Beckenbodentraining und vielem mehr!</p>

                    <div className="p-4 sm:p-6 bg-yellow-50 rounded-2xl mt-6 sm:mt-8 border border-yellow-100 flex items-start text-left space-x-3 sm:space-x-4 shadow-sm">
                      <span className="text-2xl sm:text-3xl leading-none pt-0.5">💡</span>
                      <p className="font-semibold text-gray-800 text-base sm:text-lg m-0 leading-snug">
                        In unserem kostenlosen Webinar erfährst du Schritt für Schritt, wie du auch ohne Sportstudium später eigene Kurse anbieten kannst, die von den Krankenkassen bezuschusst werden.
                      </p>
                    </div>
                  </div>
                  <a
  href="https://www.avant-akademie.de/praeventionstrainer-webinar"
  target="_blank"
  rel="noreferrer"
  className="w-full md:w-auto py-4 sm:py-5 px-6 sm:px-10 rounded-full text-white font-bold text-lg sm:text-xl shadow-xl hover:-translate-y-1 transition-all inline-block"
  style={{ backgroundColor: COLORS.accent }}
>
  Jetzt kostenloses Webinar ansehen 🎥
</a>
                </>
              )}
            </div>
          </div>
          
          {/* Quiz wiederholen Button */}
          <button 
            onClick={restartQuiz}
            className="mt-8 sm:mt-12 mb-6 sm:mb-8 text-gray-400 hover:text-gray-600 font-medium flex items-center space-x-2 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span>Quiz wiederholen</span>
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
}

