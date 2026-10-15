import React, { useState } from "react";
import { Volume2, BookA, Sparkles, ArrowRight, Lightbulb } from "lucide-react";
import { audioPlayer } from "../utils/audioPlayer";

interface SandhiRule {
  id: string;
  category: "phonology" | "sandhi" | "particles" | "verbs";
  title: string;
  ruleExplanation: string;
  source: string;
  literary: string;
  spoken: string;
  english: string;
  tip: string;
}

export const SandhiGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const rules: SandhiRule[] = [
    {
      id: "r1",
      category: "phonology",
      title: "Diphthong -ai to -e Shift",
      ruleExplanation: "In colloquial Tamil, all word-final '-ai' sounds become a relaxed, open '-e'.",
      source: "Dr. Renganathan (Conversion L1)",
      literary: "illai, veḷai, mazhai, ennai",
      spoken: "ille, vele, mazhe, yenne",
      english: "not/no, work, rain, oil",
      tip: "Never say 'illai' in casual conversation. Saying 'ille' immediately sounds like a native speaker.",
    },
    {
      id: "r2",
      category: "phonology",
      title: "Loss of Final -l and -r with Vowel Epenthesis",
      ruleExplanation: "Final consonants either drop (e.g. 'avaḷ' -> 'ava') or take an epenthetic '-u' (e.g. 'avar' -> 'avaru', 'yār' -> 'yāru').",
      source: "Prof. Shanmugam Pillai & Renganathan",
      literary: "avar, ivar, avaḷ, yār",
      spoken: "avaru, ivaru, ava, yāru",
      english: "he (polite), this person, she, who",
      tip: "'Avaru' and 'ivaru' are polite and friendly without sounding overly formal.",
    },
    {
      id: "r3",
      category: "sandhi",
      title: "Plosive Doubling (Gemination of k, c, t, p)",
      ruleExplanation: "When an infinitive or adverbial form ending in '-a' is followed by a word starting with k, c, t, or p, the consonant doubles.",
      source: "Dr. Renganathan (Sandhi Rules L1, L2)",
      literary: "pārkka + col = pārkkaccol",
      spoken: "pākka + sol = pākkas-sol / pākkaccol",
      english: "Tell to see / Look and tell",
      tip: "This doubling gives spoken Tamil its characteristic rhythmic cadence.",
    },
    {
      id: "r4",
      category: "verbs",
      title: "Present Tense Contraction (-kkiṟēn to -ṟēn / -rēn)",
      ruleExplanation: "The weak verb present suffix '-kiṟ-' contracts into a single flapped '-r-' or '-ṟ-'.",
      source: "Dr. Renganathan & CIIL Mysore",
      literary: "pōkiṟēn, varukiṟēn, seykiṟēn",
      spoken: "pōṟēn, varrēn, seyrēn",
      english: "I am going, I am coming, I am doing",
      tip: "Notice 'pōkiṟēn' drops to two syllables 'pō-ṟēn'.",
    },
    {
      id: "r5",
      category: "particles",
      title: "Quotative & Reportive Particle (-nnu from enṟu)",
      ruleExplanation: "Reported speech, intentions, thoughts, and reasons are wrapped with the suffix '-nnu' instead of formal 'enṟu'.",
      source: "Prof. Shanmugam Pillai (Lessons 15, 20)",
      literary: "varuvān enṟu connān",
      spoken: "varuvān-nu sonnān",
      english: "He said that he would come",
      tip: "'-nnu' connects seamlessly: 'varrēn-nu sonnāru' (He said he's coming).",
    },
    {
      id: "r6",
      category: "verbs",
      title: "The Completive Aspect (-aaccu from āyiṟṟu)",
      ruleExplanation: "The classical past completive 'āyiṟṟu' (it has become) transforms into the ubiquitous spoken suffix '-aaccu'.",
      source: "Dr. Renganathan (L7) & Shanmugam Pillai",
      literary: "purappaṭṭāyiṟṟu, muṭintuvittathu",
      spoken: "porappaṭṭāccu, muḍinjāccu",
      english: "Started / Finished completely",
      tip: "Saying 'muḍinjāccu!' is the everyday native way of announcing 'It's all done!'.",
    },
    {
      id: "r7",
      category: "particles",
      title: "The Definitive Auxiliary (-viṭṭu to -ṭṭu)",
      ruleExplanation: "The auxiliary verb 'viṭṭu' denotes certainty or completion of an action, contracting to '-ṭṭu'.",
      source: "Prof. Shanmugam Pillai (Lessons 6, 8)",
      literary: "vantuvittārgaḷ, koṭuttuvittān",
      spoken: "vantiṭṭānga, koṭuttiṭṭān",
      english: "They have definitely arrived, He gave it away",
      tip: "Used constantly to emphasize that an action is firmly executed.",
    },
    {
      id: "r8",
      category: "sandhi",
      title: "Nasal Assimilation (n to ng before k)",
      ruleExplanation: "A nasal 'n' shifts to velar 'ng' when preceding a velar consonant 'k'.",
      source: "Dr. Renganathan (Sandhi L1)",
      literary: "en-kūṭa",
      spoken: "engkūṭa / enkūda",
      english: "with me",
      tip: "Flow smoothly into the 'k' without pausing after 'en'.",
    },
  ];

  const filteredRules =
    activeCategory === "all"
      ? rules
      : rules.filter((r) => r.category === activeCategory);

  const handlePlayRule = async (id: string, text: string) => {
    try {
      setPlayingId(id);
      await audioPlayer.speakPhrase(text);
    } catch (e) {
      await audioPlayer.speakFallback(text);
    } finally {
      setPlayingId(null);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 to-amber-950 text-white rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
          <BookA className="w-4 h-4" />
          <span>Linguistic Phonology &amp; Colloquial Transformations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display">
          Spoken Tamil Sandhi &amp; Grammar Rules
        </h1>
        <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
          Why native Tamil sounds so different from written books. Master the 
          phonological shifts, contractions, and aspectual particles that unlock natural speech.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "all", label: "All Rules" },
          { id: "phonology", label: "Sound Shifts" },
          { id: "sandhi", label: "Consonant Doubling" },
          { id: "verbs", label: "Verb Contractions" },
          { id: "particles", label: "Colloquial Particles" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 border ${
              activeCategory === tab.id
                ? "bg-amber-800 text-white border-amber-800 shadow-2xs"
                : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRules.map((r) => {
          const isPlaying = playingId === r.id;
          return (
            <div
              key={r.id}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between hover:border-amber-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    {r.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded font-semibold shrink-0">
                    {r.category}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {r.ruleExplanation}
                </p>

                {/* Comparison Card */}
                <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-lg border border-stone-200/80 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 block mb-0.5">
                      LITERARY TAMIL
                    </span>
                    <span className="font-semibold text-stone-700 line-through decoration-stone-400">
                      {r.literary}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-700 block mb-0.5">
                      SPOKEN SOUTH INDIAN
                    </span>
                    <span className="font-bold text-amber-900">
                      {r.spoken}
                    </span>
                  </div>
                </div>

                {/* Practical Tip */}
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/60 text-xs text-amber-950 border border-amber-200/40">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{r.tip}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                <span className="text-[11px] font-mono text-stone-400">
                  {r.source}
                </span>

                <button
                  onClick={() => handlePlayRule(r.id, r.spoken)}
                  disabled={isPlaying}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlaying ? "Playing..." : "Hear Spoken"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
