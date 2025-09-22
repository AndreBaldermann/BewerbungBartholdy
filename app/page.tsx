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
      { label: "Start-up-Inkubator", correct: false },
      { label: "Beratung ohne Lehre", correct: false },
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
    title: "Studiengang praxisnäher gestalten",
    steps: [
      "Ist-Analyse & Stakeholder-Interviews",
      "Challenge-Based-Module entwickeln",
      "Pilot durchführen & Feedback auswerten",
      "Qualitätsschleife etablieren (PDSA)",
    ],
  },
  {
    title: "Digitales Lernformat aufbauen",
    steps: [
      "Use-Cases & Lernziele schärfen",
      "Micro-Learning + KI-Coach prototypen",
      "Learning Analytics definieren",
      "Skalierung & Governance klären",
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

  // 👉 Fix: es gibt 6 Screens (0–5)
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
          <h1 className="text-2xl font-semibold">Bewerbungs-Lernapp</h1>
          <Badge variant="secondary" className="ml-2 rounded-2xl">
            Prototyp
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
                <div className="flex justify-center">
                  <img
                    src="/bewerberfoto.jpg"
                    alt="Bewerberfoto"
                    className="rounded-2xl shadow-md w-40 h-40 object-cover"
                  />
                </div>

                <ul className="grid md:grid-cols-3 gap-3 text-slate-700">
                  <li className="p-3 rounded-2xl bg-white border">
                    Quiz: Wer bin ich?
                  </li>
                  <li className="p-3 rounded-2xl bg-white border">
                    Matching: Kompetenzen zu Projekten
                  </li>
                  <li className="p-3 rounded-2xl bg-white border">
                    Mini-Case: Vorgehensweise live
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Button onClick={next} className="rounded-2xl">
                    Los geht’s <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => goto(3)}
                    className="rounded-2xl"
                  >
                    Motivation zuerst
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Screen>
        )}

        {/* Step 1 – Quiz */}
        {step === 1 && (
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
                          if (chosen?.correct)
                            setQuizScore((s) => s + 1);
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

        {/* TODO: Step 2, 3, 4, 5 bleiben gleich wie bei dir */}
        {/* ich habe nur totalScreens & Progress angepasst */}
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
  a.download = "bewerbung-profile-notizen.json";
  a.click();
  URL.revokeObjectURL(url);
}

