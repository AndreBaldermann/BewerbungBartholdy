"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Check,
  ChevronRight,
  Mail,
  Download,
  Sparkles,
  Trophy,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// --- App Data ---------------------------------------------------------------
const QUIZ = [
  {
    q: "Wo habe ich die meiste Zeit gearbeitet?",
    options: [
      { label: "Hochschule/Universität", correct: true },
      { label: "Industrie", correct: false },
      { label: "KMU", correct: false },
    ],
    explain:
      "Schwerpunkt in Lehre & Programmentwicklung – Verbindung von Wissenschaft & Praxis.",
  },
  {
    q: "Welches Thema prägt meine Arbeit besonders?",
    options: [
      { label: "Prozess- & Qualitätsmanagement", correct: true },
      { label: "Event-Marketing", correct: false },
      { label: "Finanzprüfung", correct: false },
    ],
    explain:
      "Praxisorientierte Qualität & kontinuierliche Verbesserung in Bildungsprogrammen.",
  },
  {
    q: "Welche Kompetenz ist meine Stärke?",
    options: [
      { label: "Didaktik", correct: true },
      { label: "Finanzen", correct: false },
      { label: "Event-Planung", correct: false },
    ],
    explain: "Didaktik prägt meine Lehrkonzepte und Programme.",
  },
  {
    q: "Wo setze ich KI ein?",
    options: [
      { label: "Lernassistenz & Analytics", correct: true },
      { label: "Reisekostenabrechnung", correct: false },
      { label: "Event-Tickets", correct: false },
    ],
    explain: "Ich nutze KI in EdTech-Prototypen zur Lernunterstützung.",
  },
];

const SKILLS = [
  { name: "Didaktik", target: "Projekt Lehrkonzepte" },
  { name: "Digitalisierung", target: "EdTech/AI Piloten" },
  { name: "Qualitätsmanagement", target: "Akkreditierung/QM" },
  { name: "Prozessmanagement", target: "Curriculum-Redesign" },
  { name: "KI", target: "Lernassistent/Analytics" },
];

const CASES = [
  {
    title: "Flexibles, bausteinartiges Curriculum",
    steps: [
      "Recherche – internationale Modelle, Microcredentials, rechtliche Vorgaben",
      "Analyse – Schnittstellen zwischen Studiengängen, Modulen, Weiterbildungen",
      "Konzeptentwicklung – Bausteinmodell (Module ↔ Microcredentials ↔ Weiterbildung)",
      "Pilotierung – Test in ausgewähltem Fachbereich, Feedback einholen",
      "Transfer & Skalierung – Anpassung, hochschulweite Einführung",
    ],
  },
  {
    title: "Schnittstellenmanagement",
    steps: [
      "Schnittstellen identifizieren",
      "Bedarfe analysieren (Studierende, Lernbegleitung)",
      "Koordination mit Projekten/Fachbereichen",
      "Integration von Curricula & Lernbegleitung",
      "Evaluation & Anpassung",
    ],
  },
];



// --- Helper -----------------------------------------------------------------
const Screen = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="w-full max-w-4xl mx-auto"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

// --- Main App ---------------------------------------------------------------
export default function App() {
  const [step, setStep] = useState(0);

  // Recruiter Eingaben
  const [recruiterScores, setRecruiterScores] = useState<Record<string, number>>({});

  // Bewerber Selbsteinschätzung (fix)
  const applicantScores: Record<string, number> = {
    Didaktik: 80,
    Digitalisierung: 70,
    Qualitätsmanagement: 85,
    Prozessmanagement: 75,
    KI: 95,
  };

  // Prüfen, ob alle Slider mindestens einmal bewegt wurden
  const allAdjusted = SKILLS.every(
    (s) => recruiterScores[s.name] !== undefined && recruiterScores[s.name] > 0
  );


  // Fix: 6 Screens (0–5)
  const totalScreens = 6;
  const progress = Math.round((step / (totalScreens - 1)) * 100);

  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const [matches, setMatches] = useState<Record<string, string>>({});
  const [focusCase, setFocusCase] = useState<number | null>(null);

  const goto = (n: number) => setStep(n);
  const next = () => setStep((s) => Math.min(s + 1, totalScreens - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-2xl font-semibold">Bewerbung</h1>
          <Badge variant="secondary" className="ml-2 rounded-2xl">
            
          </Badge>
        </div>
        <div className="w-64">
          <Progress value={progress} />
          <p className="text-xs text-slate-500 mt-1">
            Fortschritt: {progress}%
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
{/* Step 0 – Start */}
{step === 0 && (
  <Screen key="start">
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Willkommen! 👋</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-slate-700">
          Schön, dass Sie da sind. In dieser kleinen App entdecken Sie
          meine Fähigkeiten, Motivation und Arbeitsweise – spielerisch
          und kompakt.
        </p>

        {/* Bewerberfoto */}
        <div className="flex flex-col items-center">
          <img
            src="/bewerberfoto.jpg"
            alt="Bewerberfoto"
            className="rounded-2xl shadow-md w-40 h-40 object-cover"
          />
<p className="mt-4 text-lg font-semibold text-slate-800 text-center">
  Tanja Bartholdy <br />
  Tel.: 0178 514 608 95 <br />
  Email: mail@bartholdy-qm.de
</p>

        </div>

        <div className="flex gap-3">
          <Button onClick={next} className="rounded-2xl">
            Los geht’s <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </Screen>
)}


        {/* Step 1 – Quiz */}
        {step === 2 && (
          <Screen key="quiz">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Level 1 – Wer bin ich?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Bewerberfoto */}
                <div className="flex justify-center">
                  <img
                    src="/bewerberfoto.jpg"
                    alt="Bewerberfoto"
                    className="rounded-2xl shadow-md w-32 h-32 object-cover mb-4"
                  />
                </div>

                <p className="text-slate-700">{QUIZ[quizIdx].q}</p>
                <div className="grid gap-3">
                  {QUIZ[quizIdx].options.map((o, i) => {
                    const chosen = selected === o.label;
                    const correctChoice = selected && o.correct && chosen;
                    const wrongChoice = selected && !o.correct && chosen;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelected(o.label)}
                        className={`text-left p-3 rounded-2xl border bg-white transition ${
                          chosen
                            ? o.correct
                              ? "border-emerald-400"
                              : "border-rose-300"
                            : "hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{o.label}</span>
                          {correctChoice && (
                            <Check className="w-5 h-5 text-emerald-600" />
                          )}
                          {wrongChoice && (
                            <span className="text-rose-500 text-sm">Nope</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selected && (
                  <div className="space-y-4">
                    <p className="text-slate-600">{QUIZ[quizIdx].explain}</p>
                    <div className="flex gap-3">
                      <Button
                        className="rounded-2xl"
                        onClick={() => {
                          const chosen = QUIZ[quizIdx].options.find(
                            (o) => o.label === selected
                          );
                          if (chosen?.correct) setQuizScore((s) => s + 1);
                          setSelected(null);
                          if (quizIdx < QUIZ.length - 1)
                            setQuizIdx((i) => i + 1);
                          else next();
                        }}
                      >
                        Weiter
                      </Button>
                      <Button
                        variant="ghost"
                        className="rounded-2xl"
                        onClick={prev}
                      >
                        Zurück
                      </Button>
                    </div>
                  </div>
                )}

                <div className="text-xs text-slate-500">
                  Punktestand: {quizScore} / {QUIZ.length}
                </div>
              </CardContent>
            </Card>
          </Screen>
        )}

{/* Step 2 – Matching */}
{step === 3 && (
  <Screen key="match">
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Level 2 – Kompetenzen matchen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-slate-700">
          Bitte schätzen Sie die Ausprägung der folgenden Kompetenzen auf einer Skala von 0 bis 100 ein.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Linke Seite – Recruiter Input */}
          <div className="space-y-6">
            {SKILLS.map((s) => (
              <div key={s.name} className="p-4 rounded-2xl bg-white border">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-sm text-slate-500">
                    {recruiterScores[s.name] ?? 0}/100
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={recruiterScores[s.name] ?? 0}
                  onChange={(e) =>
                    setRecruiterScores({
                      ...recruiterScores,
                      [s.name]: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Rechte Seite – Radar Chart */}
          <div className="p-4 rounded-2xl bg-white border">
            <div className="text-sm text-slate-500 mb-2">
              Kompetenz-Radar
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  outerRadius="80%"
                  data={SKILLS.map((s) => ({
                    subject: s.name,
                    Bewerber: applicantScores[s.name],
                    Recruiter: recruiterScores[s.name] ?? 0,
                  }))}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  

                  {/* Recruiter-Kurve – immer sichtbar */}
                  <Radar
                    name="Recruiter"
                    dataKey="Recruiter"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.2}
                  />

                  {/* Bewerber-Kurve – erst wenn alle Slider benutzt */}
                  {allAdjusted && (
                    <Radar
                      name="Bewerber"
                      dataKey="Bewerber"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.3}
                    />
                  )}
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Orange = Recruiter-Einschätzung. Blau = Bewerber (wird sichtbar, sobald alle Kompetenzen bewertet sind).
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="rounded-2xl" onClick={next}>
            <ChevronRight className="mr-2 w-4 h-4" />
            Weiter
          </Button>
          <Button variant="ghost" className="rounded-2xl" onClick={prev}>
            Zurück
          </Button>
        </div>
      </CardContent>
    </Card>
  </Screen>
)}


        {/* Step 3 – Motivation */}
        {step === 1 && (
          <Screen key="motivation">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Motivation – Warum Bielefeld?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-700">
                  Mit dem Schritt aus der Selbstständigkeit an die Hochschule Bielefeld möchte ich meine Expertise in ein innovatives Umfeld einbringen und im Team die praxisnahe Weiterentwicklung von Studienangeboten aktiv mitgestalten.
                </p>
                <ul className="grid md:grid-cols-3 gap-3">
                  {[
                    "Praxisnahe Curricula",
                    "Innovative Lehrformate",
                    "Qualität & Wirkung",
                  ].map((t) => (
                    <li
                      key={t}
                      className="p-3 rounded-2xl bg-white border flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Button className="rounded-2xl" onClick={next}>
                    Weiter
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-2xl"
                    onClick={prev}
                  >
                    Zurück
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Screen>
        )}

        {/* Step 4 – Case */}
        {step === 4 && (
          <Screen key="case">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Mini-Case – So gehe ich vor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {CASES.map((c, i) => (
                      <button
                        key={c.title}
                        onClick={() => setFocusCase(i)}
                        className={`w-full text-left p-4 rounded-2xl border bg-white ${
                          focusCase === i
                            ? "border-slate-800"
                            : "hover:border-slate-300"
                        }`}
                      >
                        <div className="font-medium">{c.title}</div>
                        <div className="text-xs text-slate-500">
                          Klicken zum Anzeigen der Schritte
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-4 rounded-2xl bg-white border min-h-[220px]">
                    {focusCase === null ? (
                      <p className="text-slate-500">
                        Bitte links einen Case wählen.
                      </p>
                    ) : (
                      <ol className="list-decimal ml-5 space-y-2">
                        {CASES[focusCase].steps.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="rounded-2xl" onClick={next}>
                    Abschließen <Trophy className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-2xl"
                    onClick={prev}
                  >
                    Zurück
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Screen>
        )}

        {/* Step 5 – Finish */}
        {step === 5 && (
          <Screen key="finish">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Vielen Dank! 🎉</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-700">
                  Sie haben alle Level abgeschlossen. Falls Sie mögen, können
                  Sie meine Kurzdaten exportieren oder mich direkt kontaktieren.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    className="rounded-2xl"
                    onClick={() => exportProfile(matches, quizScore)}
                  >
                    <Download className="mr-2 w-4 h-4" /> Profil-Notizen
                    exportieren (JSON)
                  </Button>
                  <a href="mailto:mail@bartholdy-qm.de" className="inline-flex">
                    <Button variant="secondary" className="rounded-2xl">
                      <Mail className="mr-2 w-4 h-4" /> Kontakt aufnehmen
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </Screen>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Utilities --------------------------------------------------------------
function exportProfile(matches: Record<string, string>, quizScore: number) {
  const data = {
    quizScore,
    matches,
    timestamp: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bewerbung-profile-notizen.json"; // 👈 fehlte in deinem Code
  a.click();
  URL.revokeObjectURL(url);
}
