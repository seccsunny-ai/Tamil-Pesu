import React, { useState } from "react";
import { Volume2, Mic, Search, Bookmark, BookmarkCheck } from "lucide-react";
import { audioPlayer } from "../utils/audioPlayer";

interface PhraseItem {
  id: string;
  category: string;
  tamilPhonetic: string;
  english: string;
  breakdown: string;
  pronunciationNote: string;
}

interface PhrasebookProps {
  onOpenVoiceLab: (phrase: {
    tamilPhonetic: string;
    english: string;
    soundTip?: string;
    context?: string;
  }) => void;
}

export const PhrasebookView: React.FC<PhrasebookProps> = ({ onOpenVoiceLab }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("tamizh_bookmarked_phrases") || "[]");
    } catch {
      return [];
    }
  });

  const phrases: PhraseItem[] = [
    // Greetings & Social
    {
      id: "p1",
      category: "Greetings",
      tamilPhonetic: "Vaṇakkangga, eppadi irukkiinga?",
      english: "Hello sir/madam, how are you?",
      breakdown: "Vaṇakkam + polite suffix -gga, eppadi (how) + irukkiinga (are you?)",
      pronunciationNote: "Curve tongue backward for retroflex 'ṇ'.",
    },
    {
      id: "p2",
      category: "Greetings",
      tamilPhonetic: "Nallā irukkēn, romba nandri!",
      english: "I am fine, thank you very much!",
      breakdown: "Nallā (well) + irukkēn (I am) + romba (very) + nandri (thanks)",
      pronunciationNote: "Elongate the final 'ā' in 'nallā'.",
    },
    {
      id: "p3",
      category: "Greetings",
      tamilPhonetic: "Ungka pēru enna?",
      english: "What is your name? (polite)",
      breakdown: "Ungka (your) + pēru (name, spoken for peyar) + enna (what)",
      pronunciationNote: "'Pēru' uses a long 'ē'.",
    },
    {
      id: "p4",
      category: "Greetings",
      tamilPhonetic: "En pēru Suresh. Nān tamizh paḍikkiṟēn.",
      english: "My name is Suresh. I am learning Tamil.",
      breakdown: "En (my) + pēru + paḍikkiṟēn (I study)",
      pronunciationNote: "Retroflex 'ḍ' in 'paḍikkiṟēn'.",
    },
    // Shopping & Money
    {
      id: "p5",
      category: "Shopping",
      tamilPhonetic: "Idhōḍa vele evvaḷavu?",
      english: "How much is the price of this?",
      breakdown: "Idhu-ōḍa (genitive: of this) + vele (price) + evvaḷavu (how much?)",
      pronunciationNote: "'Vele' is colloquial for literary 'vilai'.",
    },
    {
      id: "p6",
      category: "Shopping",
      tamilPhonetic: "Konjam koracci koṭukka mudiyumā?",
      english: "Could you reduce the price a little bit?",
      breakdown: "Konjam (a little) + koracci (having reduced) + koṭukka (to give) + mudiyumā (can?)",
      pronunciationNote: "Double 'cc' in 'koracci'.",
    },
    {
      id: "p7",
      category: "Shopping",
      tamilPhonetic: "Enakku reṇṭu kīlō thakkāḷi vēṇum.",
      english: "I want two kilos of tomatoes.",
      breakdown: "Enakku (to me, dative) + reṇṭu (2) + kīlō + thakkāḷi + vēṇum (want)",
      pronunciationNote: "Needs always require dative 'enakku'.",
    },
    {
      id: "p8",
      category: "Shopping",
      tamilPhonetic: "Cillare irukkā? Pattu rūpā thānga.",
      english: "Do you have change? Please give ten rupees.",
      breakdown: "Cillare (loose change) + irukkā? (is there?) + pattu rūpā (10 rupees)",
      pronunciationNote: "Crisp 'll' in 'cillare'.",
    },
    // Food & Dining
    {
      id: "p9",
      category: "Food",
      tamilPhonetic: "Oru plate suuḍu idliyum vaḍaiyum thānga.",
      english: "Please give one plate of hot idli and vada.",
      breakdown: "Oru plate + suuḍu (hot) + idli-yum (idli and) + vaḍai-yum (vada and) + thānga",
      pronunciationNote: "'-yum' acts as 'and' connecting nouns.",
    },
    {
      id: "p10",
      category: "Food",
      tamilPhonetic: "Sambar konjam jāshtiyā pōṭunga.",
      english: "Please pour a little more sambar.",
      breakdown: "Sambar + konjam (little) + jāshtiyā (extra/more) + pōṭunga (put/pour polite)",
      pronunciationNote: "'Jāshtiyā' is common conversational South Indian for extra.",
    },
    {
      id: "p11",
      category: "Food",
      tamilPhonetic: "Kaapi romba piramaadham!",
      english: "The coffee is superb / extraordinary!",
      breakdown: "Kaapi (filter coffee) + romba (very) + piramaadham (excellent)",
      pronunciationNote: "'Piramaadham' is the classic Tamil praise for great food.",
    },
    // Transport & Directions
    {
      id: "p12",
      category: "Travel",
      tamilPhonetic: "Maduraikku enta passile pōkaṇum?",
      english: "Which bus should I take to go to Madurai?",
      breakdown: "Maduraikku (dative) + enta (which) + pass-ile (locative) + pōkaṇum (must go)",
      pronunciationNote: "Obligative modal '-ṇum' with nasal retroflex.",
    },
    {
      id: "p13",
      category: "Travel",
      tamilPhonetic: "Central Railway Station-ukku meter pōḍuvīngalā?",
      english: "Will you go by meter to Central Railway Station?",
      breakdown: "Station-ukku + meter + pōḍuvīngalā (will you put, polite question)",
      pronunciationNote: "Question marker '-ā' at end of polite future verb.",
    },
    {
      id: "p14",
      category: "Travel",
      tamilPhonetic: "Nērā pōyi valappakkatle thirumbunga.",
      english: "Go straight and turn right.",
      breakdown: "Nērā (straight) + pōyi (having gone) + valappakkatle (on right) + thirumbunga",
      pronunciationNote: "Right is 'valappakkam', Left is 'eṭappakkam'.",
    },
    // Health & Emergency
    {
      id: "p15",
      category: "Health",
      tamilPhonetic: "Enakku romba thalevali, joram aṭikkutu.",
      english: "I have a severe headache and fever is running high.",
      breakdown: "Enakku + thalevali (headache) + joram (fever) + aṭikkutu",
      pronunciationNote: "'Aṭikkutu' literally means striking/pulsing.",
    },
    {
      id: "p16",
      category: "Health",
      tamilPhonetic: "Inta māttireye sāppāṭṭukku appuṟam pōṭukkōnga.",
      english: "Take this tablet after having your meal.",
      breakdown: "Māttire (tablet) + sāppāṭṭukku appuṟam (after food) + pōṭukkōnga",
      pronunciationNote: "'Appuṟam' means afterwards.",
    },
    // Essential Idioms
    {
      id: "p17",
      category: "Idioms",
      tamilPhonetic: "Ellām muḍinjāccu, nām porappaṭalām!",
      english: "Everything is done, we can set off!",
      breakdown: "Ellām (all) + muḍinjāccu (completed) + porappaṭalām (we can start)",
      pronunciationNote: "Completive '-aaccu' indicates finality.",
    },
    {
      id: "p18",
      category: "Idioms",
      tamilPhonetic: "Kavalapadādheenga, ellām sariyā pōyidum.",
      english: "Don't worry, everything will turn out fine.",
      breakdown: "Kavalapadādheenga (don't worry polite) + ellām + sariyā (properly) + pōyidum",
      pronunciationNote: "Warm, reassuring native idiom.",
    },
  ];

  const categories = ["all", "Greetings", "Shopping", "Food", "Travel", "Health", "Idioms"];

  const toggleBookmark = (id: string) => {
    let next: string[];
    if (bookmarkedIds.includes(id)) {
      next = bookmarkedIds.filter((item) => item !== id);
    } else {
      next = [...bookmarkedIds, id];
    }
    setBookmarkedIds(next);
    localStorage.setItem("tamizh_bookmarked_phrases", JSON.stringify(next));
  };

  const filtered = phrases.filter((p) => {
    const matchesCat =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.tamilPhonetic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.english.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePlay = async (phrase: PhraseItem) => {
    try {
      setPlayingId(phrase.id);
      await audioPlayer.speakPhrase(phrase.tamilPhonetic);
    } catch {
      await audioPlayer.speakFallback(phrase.tamilPhonetic);
    } finally {
      setPlayingId(null);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 to-amber-950 text-white rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
          <Volume2 className="w-4 h-4" />
          <span>Curated Spoken Tamil Audio Lexicon</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display">
          Colloquial Phrasebook
        </h1>
        <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
          High-frequency everyday expressions with instant native audio playback and pronunciation notes.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Tamil phonetics or English meaning..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-all ${
                selectedCategory === cat
                  ? "bg-amber-800 text-white border-amber-800 shadow-2xs"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isPlaying = playingId === item.id;
          const isBookmarked = bookmarkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between hover:border-amber-300 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-mono uppercase bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded font-semibold">
                    {item.category}
                  </span>
                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className="text-stone-400 hover:text-amber-800 transition-colors"
                    title={isBookmarked ? "Remove bookmark" : "Bookmark phrase"}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-700 fill-amber-700/20" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="text-lg font-bold text-stone-900 font-display">
                  {item.tamilPhonetic}
                </div>

                <div className="text-xs text-stone-600 italic">
                  "{item.english}"
                </div>

                <div className="text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-100 font-mono">
                  {item.breakdown}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                <span className="text-[11px] text-amber-900/80 italic line-clamp-1 pr-2">
                  Tip: {item.pronunciationNote}
                </span>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handlePlay(item)}
                    disabled={isPlaying}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isPlaying ? "..." : "Listen"}</span>
                  </button>

                  <button
                    onClick={() =>
                      onOpenVoiceLab({
                        tamilPhonetic: item.tamilPhonetic,
                        english: item.english,
                        soundTip: item.pronunciationNote,
                        context: `${item.category} Phrase`,
                      })
                    }
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 transition-colors"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Practice</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
