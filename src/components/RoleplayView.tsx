import React, { useState, useRef, useEffect } from "react";
import { MODULES } from "../data/curriculum";
import { audioPlayer } from "../utils/audioPlayer";
import { AudioRecorder } from "../utils/audioRecorder";
import {
  MessageSquare,
  Volume2,
  Mic,
  Square,
  Send,
  Sparkles,
  Lightbulb,
  RotateCcw,
  User,
  Bot,
} from "lucide-react";

interface RoleplayMessage {
  id: string;
  sender: "partner" | "user";
  tamil: string;
  english?: string;
  culturalNote?: string;
}

export const RoleplayView: React.FC = () => {
  const scenarios = [
    {
      id: "sc-market",
      title: "Bargaining at Koyambedu Market",
      partnerRole: "Muthu (Fruit Seller)",
      userRole: "Customer buying mangoes",
      context: "A bustling South Indian street market. You want 1 kg of fresh mangoes.",
      initialTamil: "Vāṅga thambi! Nalla Alphonso māmbazham irukku. Oru kīlō eṇbadhu rūbā. Ettaṇe kīlō vēṇum?",
      initialEnglish: "Welcome brother! Good Alphonso mangoes are here. Eighty rupees a kilo. How many kilos do you want?",
      suggestedReplies: [
        { tamil: "Vele konjam adhigamā irukku. Aṟubadhu rūbāykku tharīngalā?", english: "The price is a bit high. Will you give for sixty rupees?" },
        { tamil: "Enakku oru kīlō mattum pōtum. Nallā tippaani pazhamā pōṭunga!", english: "One kilo is enough for me. Please pack nice sweet ones!" },
      ],
    },
    {
      id: "sc-auto",
      title: "Hiring an Auto to Central Station",
      partnerRole: "Ravi (Chennai Auto Driver)",
      userRole: "Passenger in a rush",
      context: "You need an auto-rickshaw to Chennai Central for a train.",
      initialTamil: "Yov saami! Engē pōkaṇum? Central-aa? Vāṅga ulla ukkaarunga!",
      initialEnglish: "Hey sir! Where do you need to go? Central? Come sit inside!",
      suggestedReplies: [
        { tamil: "Aamānga, Central Railway Station-ukku. Meter pōḍuvīngalā?", english: "Yes sir, to Central Station. Will you put the meter?" },
        { tamil: "Train-ukku innum ara maṇitān irukku. Seekkiramā pōka mudiyumā?", english: "Only half an hour left for the train. Can you go quickly?" },
      ],
    },
    {
      id: "sc-hotel",
      title: "Ordering Breakfast at a Tiffin Hotel",
      partnerRole: "Server (South Indian Mess Waiter)",
      userRole: "Hungry customer",
      initialTamil: "Vānga sār! Tiffin enna irukku theriyumā? Idli, meḍu vaḍai, masala dōsai, pūri ellaam suuḍā irukku. Enna koṇḍu varaṭṭum?",
      initialEnglish: "Welcome sir! Do you know what tiffin we have? Idli, medu vada, masala dosa, puri all piping hot. What shall I bring?",
      suggestedReplies: [
        { tamil: "Enakku reṇḍu idli, oru vaḍai, kūḍavē kaapi koṇḍu vānga.", english: "Bring me two idlis, one vada, and coffee as well." },
        { tamil: "Masala dōsai suuḍā irukkumā? Sambar konjam jāshtiyā vēṇum.", english: "Will the masala dosa be hot? I want a little extra sambar." },
      ],
    },
    {
      id: "sc-doctor",
      title: "Clinic Visit with Headache & Fever",
      partnerRole: "Dr. Selvam (Neighborhood Doctor)",
      userRole: "Patient seeking consultation",
      initialTamil: "Vānga! Ukkāndhukkōnga. Enna aachu? Uḍambule enna kastam?",
      initialEnglish: "Welcome! Please sit down. What happened? What trouble do you have in your body?",
      suggestedReplies: [
        { tamil: "Nēttu rāttiriyilerundhu romba thalevali ṭākṭar. Kūḍavē joram irukku.", english: "Severe headache since last night, doctor. Along with fever." },
        { tamil: "Uḍambu muzhukkā valikkutu. Sāppāṭu kūḍa saapḍa mudiyale.", english: "My whole body aches. I cannot even eat food." },
      ],
    },
  ];

  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [messages, setMessages] = useState<RoleplayMessage[]>([
    {
      id: "m-init",
      sender: "partner",
      tamil: scenarios[0].initialTamil,
      english: scenarios[0].initialEnglish,
    },
  ]);
  const [suggestedReplies, setSuggestedReplies] = useState(
    scenarios[0].suggestedReplies
  );
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectScenario = (sc: typeof scenarios[0]) => {
    setSelectedScenario(sc);
    setMessages([
      {
        id: "m-init-" + sc.id,
        sender: "partner",
        tamil: sc.initialTamil,
        english: sc.initialEnglish,
      },
    ]);
    setSuggestedReplies(sc.suggestedReplies);
    setInputText("");
  };

  const handlePlayAudio = async (msgId: string, text: string) => {
    try {
      setPlayingMsgId(msgId);
      await audioPlayer.speakPhrase(text);
    } catch (e) {
      console.warn("Fallback speech for roleplay line");
      await audioPlayer.speakFallback(text);
    } finally {
      setPlayingMsgId(null);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isSending) return;

    const userMsg: RoleplayMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      tamil: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsSending(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        text: m.tamil,
      }));

      const res = await fetch("/api/roleplay-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: selectedScenario.id,
          scenarioTitle: selectedScenario.title,
          partnerRole: selectedScenario.partnerRole,
          userRole: selectedScenario.userRole,
          history: historyPayload,
          message: textToSend,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get partner response");
      }

      const data = await res.json();
      const partnerMsg: RoleplayMessage = {
        id: "partner-" + Date.now(),
        sender: "partner",
        tamil: data.tamilSpoken,
        english: data.englishTranslation,
        culturalNote: data.culturalNote,
      };

      setMessages((prev) => [...prev, partnerMsg]);
      if (data.suggestedReplies && data.suggestedReplies.length > 0) {
        setSuggestedReplies(data.suggestedReplies);
      }
    } catch (err: any) {
      console.error("Roleplay turn failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "partner",
          tamil: "Cari thambi, thirumba solluṅga! (Please say that again!)",
          english: "Alright brother, could you say that again?",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 to-amber-950 text-white rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
          <MessageSquare className="w-4 h-4" />
          <span>Real-World Scenario Simulator</span>
          <span>·</span>
          <span>Spoken Tamil AI Roleplay</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display">
          Conversational Roleplay
        </h1>
        <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
          Practice dynamic, unscripted spoken Tamil in typical everyday settings with full audio feedback and cultural insights.
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {scenarios.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 border ${
                isSelected
                  ? "bg-amber-800 border-amber-800 text-white shadow-xs"
                  : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
              }`}
            >
              {sc.title}
            </button>
          );
        })}
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col h-[580px] overflow-hidden">
        {/* Scenario Header */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-800">
              Scenario: {selectedScenario.title}
            </div>
            <div className="text-xs text-stone-500">
              Partner: <span className="font-medium text-stone-800">{selectedScenario.partnerRole}</span> · You: {selectedScenario.userRole}
            </div>
          </div>
          <button
            onClick={() => handleSelectScenario(selectedScenario)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isPartner = msg.sender === "partner";
            const isPlaying = playingMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${
                  isPartner ? "mr-auto" : "ml-auto flex-row-reverse"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs ${
                    isPartner ? "bg-amber-800" : "bg-stone-800"
                  }`}
                >
                  {isPartner ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className="space-y-1.5">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isPartner
                        ? "bg-stone-100 text-stone-900 rounded-tl-xs"
                        : "bg-amber-800 text-white rounded-tr-xs"
                    }`}
                  >
                    <div className="font-semibold text-base font-display">
                      {msg.tamil}
                    </div>

                    {msg.english && (
                      <div
                        className={`text-xs mt-1 italic ${
                          isPartner ? "text-stone-600" : "text-amber-100"
                        }`}
                      >
                        {msg.english}
                      </div>
                    )}
                  </div>

                  {/* Audio Playback button for partner */}
                  {isPartner && (
                    <div className="flex items-center gap-3 pl-1">
                      <button
                        onClick={() => handlePlayAudio(msg.id, msg.tamil)}
                        disabled={isPlaying}
                        className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-950 font-medium transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isPlaying ? "Speaking..." : "Listen"}</span>
                      </button>

                      {msg.culturalNote && (
                        <span className="text-[11px] text-stone-500 flex items-center gap-1">
                          <Lightbulb className="w-3 h-3 text-amber-600" />
                          <span>{msg.culturalNote}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isSending && (
            <div className="flex items-center gap-2 text-xs text-stone-500 italic pl-11">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              <span>{selectedScenario.partnerRole} is thinking in Tamil...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Replies */}
        {suggestedReplies.length > 0 && (
          <div className="px-4 py-2.5 bg-stone-50/90 border-t border-stone-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider shrink-0">
              Suggestions:
            </span>
            {suggestedReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(reply.tamil)}
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-amber-400 text-xs text-stone-800 hover:text-amber-950 font-medium transition-colors whitespace-nowrap shrink-0 shadow-2xs"
                title={reply.english}
              >
                <span>{reply.tamil}</span>
              </button>
            ))}
          </div>
        )}

        {/* Text Input Row */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your spoken Tamil reply (e.g. 'Enakku idli vēṇum')..."
              className="flex-1 h-11 px-4 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className="h-11 px-5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-40"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
