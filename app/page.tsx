"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languages = {
  en: {
    title: "Mind Reader 3000",
    inputPlaceholder: "Enter text or number",
    submitButton: "Read My Mind",
    resultTitle: "Mind Reading Result:",
    loadingMessages: [
      "Initializing mind-reading protocols...",
      "Scanning brainwaves...",
      "Decoding neural patterns...",
      "Analyzing thought structures...",
      "Extracting mental data...",
      "Processing cognitive information...",
      "Finalizing mind-reading process...",
    ],
  },
  es: {
    title: "Lector Mental 3000",
    inputPlaceholder: "Ingrese texto o número",
    submitButton: "Leer Mi Mente",
    resultTitle: "Resultado de la Lectura Mental:",
    loadingMessages: [
      "Inicializando protocolos de lectura mental...",
      "Escaneando ondas cerebrales...",
      "Decodificando patrones neuronales...",
      "Analizando estructuras de pensamiento...",
      "Extrayendo datos mentales...",
      "Procesando información cognitiva...",
      "Finalizando proceso de lectura mental...",
    ],
  },
  it: {
    title: "Lettore Mentale 3000",
    inputPlaceholder: "Inserisci testo o numero",
    submitButton: "Leggi la Mia Mente",
    resultTitle: "Risultato della Lettura Mentale:",
    loadingMessages: [
      "Inizializzazione dei protocolli di lettura mentale...",
      "Scansione delle onde cerebrali...",
      "Decodifica dei modelli neurali...",
      "Analisi delle strutture di pensiero...",
      "Estrazione dei dati mentali...",
      "Elaborazione delle informazioni cognitive...",
      "Finalizzazione del processo di lettura mentale...",
    ],
  },
};

type LanguageKey = keyof typeof languages;

export default function MultilingualMindReader() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState<LanguageKey>("en");

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0] as LanguageKey;
    setLanguage(languages[browserLang] ? browserLang : "en");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setResult("");

    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        setResult(input);
        setMessage("");
      } else {
        currentProgress += 10;
        setProgress(currentProgress);
        setMessage(
          languages[language].loadingMessages[
            Math.floor((currentProgress / 100) * languages[language].loadingMessages.length)
          ]
        );
      }
    }, 500);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="absolute top-4 right-4">
        <Select value={language} onValueChange={(value: LanguageKey) => setLanguage(value)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="it">Italiano</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">{languages[language].title}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={languages[language].inputPlaceholder}
            disabled={isLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoading || !input}>
            {languages[language].submitButton}
          </Button>
        </form>
        {isLoading && (
          <div className="mt-6 space-y-4">
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-gray-600">{message}</p>
          </div>
        )}
        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">{languages[language].resultTitle}</h2>
            <p className="text-lg text-center p-4 bg-gray-100 rounded">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
