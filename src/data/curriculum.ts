export interface DialogueLine {
  id: string;
  speaker: string;
  avatar: string;
  tamilPhonetic: string;
  english: string;
  breakdown?: string;
  pronunciationTip?: string;
}

export interface DrillItem {
  id: string;
  type: "substitution" | "transformation" | "buildup" | "fillin";
  instruction: string;
  baseSentence: string;
  promptCue?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  englishMeaning: string;
}

export interface SpokenConversionRule {
  literaryForm: string;
  spokenForm: string;
  ruleName: string;
  explanation: string;
  exampleSentence: string;
  englishMeaning: string;
}

export interface VoicePracticeItem {
  id: string;
  tamilPhonetic: string;
  english: string;
  phoneticBreakdown: string;
  keyPhonemes: string[]; // e.g. ["zh (ழ)", "Geminate kk", "Long aa"]
  soundTip: string;
  context: string;
}

export interface ModuleData {
  id: string;
  number: number;
  title: string;
  tagline: string;
  badge: string;
  textbookRef: string;
  description: string;
  dialogueTitle: string;
  dialogueContext: string;
  dialogue: DialogueLine[];
  conversions: SpokenConversionRule[];
  drills: DrillItem[];
  voicePractice: VoicePracticeItem[];
  roleplayScenario: {
    title: string;
    description: string;
    partnerRole: string;
    userRole: string;
    initialMessage: string;
    initialEnglish: string;
    suggestedReplies: { tamil: string; english: string }[];
  };
}

export const MODULES: ModuleData[] = [
  {
    id: "module-1",
    number: 1,
    title: "Vanakkam & Identity",
    tagline: "Greetings, Pronouns, and Social Respect",
    badge: "Foundation",
    textbookRef: "Dr. Renganathan (L1) & S. Rajaram (CIIL Unit 1)",
    description:
      "Master essential introductions, honorific address ('nīnga' vs 'nī'), polite greeting forms, and equational sentences without copula ('is/are'). Learn how literary 'peyar' becomes spoken 'pēru' and 'illai' becomes 'ille'.",
    dialogueTitle: "Nanpar Varukai (A Friend's Arrival)",
    dialogueContext: "Suresh meets Sundaram at the university gate in Chennai.",
    dialogue: [
      {
        id: "d1-1",
        speaker: "Sundaram",
        avatar: "👨‍🏫",
        tamilPhonetic: "Vaṇakkam, nīnga yāru?",
        english: "Hello / Greetings, who are you?",
        breakdown: "Vaṇakkam (greetings) + nīnga (you, polite) + yāru (who?)",
        pronunciationTip: "Retroflex 'ṇ' in 'vaṇakkam' requires resting the tip of your tongue against the roof of the mouth.",
      },
      {
        id: "d1-2",
        speaker: "Suresh",
        avatar: "👨‍🎓",
        tamilPhonetic: "Vaṇakkangga. En pēru Surēsh. Nān tamizh māṇavan.",
        english: "Greetings sir. My name is Suresh. I am a Tamil student.",
        breakdown: "Vaṇakkam-gga (honorific suffix -nga) + En (my) + pēru (name) + nān (I) + tamizh (Tamil) + māṇavan (male student)",
        pronunciationTip: "Notice 'pēru' is spoken for literary 'peyar'. In South Indian speech, '-gga' is added for politeness.",
      },
      {
        id: "d1-3",
        speaker: "Sundaram",
        avatar: "👨‍🏫",
        tamilPhonetic: "Avaru yāru? Avarum tamizh māṇavarā?",
        english: "Who is he? Is he also a Tamil student?",
        breakdown: "Avaru (he, polite) + yāru (who) + avarum (he also) + māṇavar-ā? (question marker -ā)",
        pronunciationTip: "The vowel 'ā' at the end of 'māṇavarā' turns the statement into a question with rising intonation.",
      },
      {
        id: "d1-4",
        speaker: "Suresh",
        avatar: "👨‍🎓",
        tamilPhonetic: "Ille, avaru kannada māṇavaru. Avar pēru Kumār.",
        english: "No, he is a Kannada student. His name is Kumar.",
        breakdown: "Ille (spoken for 'illai') + avaru (he) + kannada māṇavaru + avar pēru (his name)",
        pronunciationTip: "Always pronounce 'ille' with a short crisp 'e', not the written diphthong 'ai'.",
      },
      {
        id: "d1-5",
        speaker: "Sundaram",
        avatar: "👨‍🏫",
        tamilPhonetic: "Romba nallatu! Ungka sondha ūru yedu?",
        english: "Very good! Which is your native town?",
        breakdown: "Romba (very) + nallatu (good) + ungka (your, polite) + sondha ūru (native town) + yedu (which?)",
        pronunciationTip: "'ūru' has a rolled 'r'. In conversational Tamil, initial 'e' often takes a slight glide 'y' ('yedu').",
      },
      {
        id: "d1-6",
        speaker: "Suresh",
        avatar: "👨‍🎓",
        tamilPhonetic: "En ūru Madurai. Nīnga Cennayilēyē irukkiingalā?",
        english: "My hometown is Madurai. Do you stay in Chennai itself?",
        breakdown: "En ūru Madurai + Nīnga (you) + Cennayil-ēyē (locative -le + emphatic -ēyē) + irukkiingalā (are you present?)",
        pronunciationTip: "The suffix '-ilēyē' means 'right in / itself'.",
      },
    ],
    conversions: [
      {
        ruleName: "Final diphthong -ai becomes -e",
        literaryForm: "illai, cennaiyil, mazhai",
        spokenForm: "ille, cennayile, mazhe",
        explanation: "In natural colloquial Tamil, all final '-ai' endings shift to a relaxed '-e'.",
        exampleSentence: "Enakku nēram ille (I have no time).",
        englishMeaning: "Literary 'illai' becomes conversational 'ille'.",
      },
      {
        ruleName: "Honorific third person -r becomes -ru",
        literaryForm: "avar, ivar, yār",
        spokenForm: "avaru, ivaru, yāru",
        explanation: "Final consonantal endings receive an epenthetic '-u' in speech to ease pronunciation flow.",
        exampleSentence: "Avaru en āciriyaru (He is my teacher).",
        englishMeaning: "Polite pronoun 'avar' becomes 'avaru'.",
      },
      {
        ruleName: "Noun 'peyar' shifts to 'pēru'",
        literaryForm: "enathu peyar",
        spokenForm: "en pēru",
        explanation: "The classical word 'peyar' contracts to 'pēru' with long 'ē'.",
        exampleSentence: "Ungka pēru enna? (What is your name?)",
        englishMeaning: "Asking someone's name naturally.",
      },
    ],
    drills: [
      {
        id: "dr1-1",
        type: "substitution",
        instruction: "Substitute the pronoun to address a respected elder ('You polite'):",
        baseSentence: "Nī māṇavan (You are a student - informal)",
        promptCue: "Nīnga (You, polite)",
        options: ["Nīnga māṇavan", "Nīnga māṇavaru", "Nīnga māṇavargalā"],
        correctAnswer: "Nīnga māṇavaru",
        explanation: "With polite 'nīnga', the predicate takes honorific '-ru': 'Nīnga māṇavaru'.",
        englishMeaning: "You (polite) are a student.",
      },
      {
        id: "dr1-2",
        type: "transformation",
        instruction: "Convert literary written Tamil into natural spoken Tamil:",
        baseSentence: "Enathu peyar Valluvan, avar enathu nanpar.",
        options: [
          "En pēru Valluvan, avaru en nanparu.",
          "En peyar Valluvan, avar enathu nanpar.",
          "En pēru Valluvan, avar en nanpan.",
        ],
        correctAnswer: "En pēru Valluvan, avaru en nanparu.",
        explanation: "'enathu peyar' becomes 'en pēru', and 'avar/nanpar' take colloquial '-u' ('avaru en nanparu').",
        englishMeaning: "My name is Valluvan, he is my friend.",
      },
      {
        id: "dr1-3",
        type: "fillin",
        instruction: "Complete the polite question asking someone's native town:",
        baseSentence: "Ungka sondha ūru ________?",
        options: ["enna", "yedu", "yāru"],
        correctAnswer: "yedu",
        explanation: "For places and inanimate options, 'yedu' (which) or 'enta ūru' is used rather than 'yāru' (who).",
        englishMeaning: "Which is your native place?",
      },
    ],
    voicePractice: [
      {
        id: "vp1-1",
        tamilPhonetic: "Vaṇakkangga, eppadi irukkiinga?",
        english: "Hello sir/madam, how are you?",
        phoneticBreakdown: "Va-ṇak-kang-ga, ep-pa-di i-ruk-kiiñ-ga?",
        keyPhonemes: ["Retroflex ṇ", "Geminate kk", "Long ii in irukkiinga"],
        soundTip: "Keep the 'ṇ' nasal with tongue curved back. Double the 'pp' in 'eppadi'.",
        context: "Polite greeting when meeting anyone in Tamil Nadu.",
      },
      {
        id: "vp1-2",
        tamilPhonetic: "En pēru Suresh, nān tamizh paḍikkiṟēn.",
        english: "My name is Suresh, I am studying Tamil.",
        phoneticBreakdown: "En pē-ru Su-resh, nān ta-mizh pa-ḍik-ki-ṟēn.",
        keyPhonemes: ["Retroflex zh (ழ)", "Alveolar ṟ (ற)", "Long ē"],
        soundTip: "Curling tongue upward toward palate for 'zh' in 'Tamizh' produces the authentic South Indian sound.",
        context: "Introducing yourself to a Tamil speaker.",
      },
      {
        id: "vp1-3",
        tamilPhonetic: "Nallā irukkēn, romba nandri!",
        english: "I am doing well, thank you very much!",
        phoneticBreakdown: "Nal-lā i-ruk-kēn, rom-ba nan-dri!",
        keyPhonemes: ["Geminate ll", "Long ā", "Nasal ndr"],
        soundTip: "Elongate 'lā' in 'nallā'. Don't swallow the ending 'kēn'.",
        context: "Replying to a polite wellbeing enquiry.",
      },
    ],
    roleplayScenario: {
      title: "First Meeting at Chennai Airport / Central",
      description: "You just landed in Chennai and are introducing yourself to your host, Mr. Sundaram.",
      partnerRole: "Mr. Sundaram (Warm local host & academic)",
      userRole: "Visiting language learner",
      initialMessage: "Vaṇakkangga! Cennaykku nallā vantuchēntiingalā? Prayāṇam eppadi irundatu?",
      initialEnglish: "Hello sir! Did you reach Chennai comfortably? How was the journey?",
      suggestedReplies: [
        {
          tamil: "Vaṇakkam aiya! Prayāṇam romba nallā irundatu.",
          english: "Greetings sir! The journey was very good.",
        },
        {
          tamil: "Romba nandri! Konjam kalappā irukku, aanaa nallā vantuchēntēn.",
          english: "Thank you very much! A bit tiring, but I reached well.",
        },
      ],
    },
  },
  {
    id: "module-2",
    number: 2,
    title: "At the Shop & Market",
    tagline: "Wants, Prices, Numbers, and Bargaining",
    badge: "Everyday Survival",
    textbookRef: "Dr. Renganathan (L2, L8) & S. Rajaram (CIIL Unit 3, 25)",
    description:
      "Learn the high-frequency dative case marker '-kku' with 'vēṇum' (want/need), 'vēṇṭām' (don't want), prices, bargaining, counting numbers, and fruits/vegetables like in Chennai and Madurai markets.",
    dialogueTitle: "Kaṭaikkuc Cellal (At the Fruit & Vegetable Stall)",
    dialogueContext: "Kamala is buying fruits and provisions at a Mylapore neighborhood shop.",
    dialogue: [
      {
        id: "d2-1",
        speaker: "Shopkeeper",
        avatar: "🧔🏽",
        tamilPhonetic: "Vānga ammā, ungaḷukku enna vēṇum?",
        english: "Welcome madam, what do you need?",
        breakdown: "Vānga (come, polite) + ammā (respectful address) + ungaḷukku (to you, dative) + enna (what) + vēṇum (need/want)",
        pronunciationTip: "Notice how 'ungaḷukku' ends in '-kku' representing the dative case 'to you'.",
      },
      {
        id: "d2-2",
        speaker: "Kamala",
        avatar: "👩🏽",
        tamilPhonetic: "Enakku oru kīlō nalla māmbazham vēṇum. Vele evvaḷavu?",
        english: "I want one kilo of good mangoes. How much is the price?",
        breakdown: "Enakku (to me, dative) + oru (one) + kīlō + nalla (good) + māmbazham (mango) + vele (price) + evvaḷavu (how much?)",
        pronunciationTip: "The 'zh' in 'māmbazham' is the signature retroflex liquid. 'Vele' is the spoken form of literary 'vilai'.",
      },
      {
        id: "d2-3",
        speaker: "Shopkeeper",
        avatar: "🧔🏽",
        tamilPhonetic: "Kīlō aṟupatu rūpāynga. Romba tippaani pazham!",
        english: "Sixty rupees a kilo, madam. Very sweet fruit!",
        breakdown: "Kīlō aṟupatu (60) + rūpāy (rupees) + -nga (polite) + tippaani (sweet, tasty)",
        pronunciationTip: "In spoken Tamil 'aṟupatu' is sixty. Note the polite trailing '-nga'.",
      },
      {
        id: "d2-4",
        speaker: "Kamala",
        avatar: "👩🏽",
        tamilPhonetic: "Ammāmā, vele konjam adigamā irukku. Aimbatu rūpāykkuk koṭukka mudiyumā?",
        english: "Oh my, the price is a bit high. Can you give it for fifty rupees?",
        breakdown: "Ammāmā (exclamation) + konjam (a little) + adigamā (high/excessive) + aimbatu (50) + rūpāykku (for 50 rs) + koṭukka mudiyumā (can you give?)",
        pronunciationTip: "The suffix '-ā' on 'mudiyumā' signals possibility question 'is it possible?'.",
      },
      {
        id: "d2-5",
        speaker: "Shopkeeper",
        avatar: "🧔🏽",
        tamilPhonetic: "Cari, ungaḷukkāka aimbattanjikku tharēn. Vēṟe enna vēṇum?",
        english: "Alright, for your sake I will give for fifty-five. What else do you need?",
        breakdown: "Cari (alright) + ungaḷukkāka (purposive: for your sake) + aimbattanji (55, spoken) + tharēn (I will give) + vēṟe (other)",
        pronunciationTip: "'Aimbattanji' is the spoken sandhi contraction for fifty-five ('aimbattu + añcu').",
      },
      {
        id: "d2-6",
        speaker: "Kamala",
        avatar: "👩🏽",
        tamilPhonetic: "Pōtum! Ithō paṇam eṭuttukkōnga.",
        english: "That is enough! Here, please take the money.",
        breakdown: "Pōtum (sufficient/enough) + Ithō (here it is) + paṇam (money) + eṭuttukkōnga (take it for yourself, reflexive polite)",
        pronunciationTip: "'Eṭuttukkōnga' uses the reflexive auxiliary '-kō' indicating taking for oneself.",
      },
    ],
    conversions: [
      {
        ruleName: "Dative Case Marker -kku",
        literaryForm: "enakku vēṇṭum",
        spokenForm: "enakku vēṇum",
        explanation: "The written modal 'vēṇṭum' simplifies to colloquial 'vēṇum'. Subject must be in dative case ('enakku').",
        exampleSentence: "Enakku kāpi vēṇum (I want coffee).",
        englishMeaning: "Expressing wants and needs.",
      },
      {
        ruleName: "Numbers in Colloquial Sandhi",
        literaryForm: "ainthu, ainthu rūpāi",
        spokenForm: "añcu, añcu rūpā",
        explanation: "Numbers five ('ainthu' -> 'añcu') and compounds like 'aimbattanji' (55) contract naturally.",
        exampleSentence: "Añcu rūpā cillare thānga (Give five rupees change).",
        englishMeaning: "Colloquial number pronunciations.",
      },
      {
        ruleName: "Reflexive Auxiliary -koḷ / -kō",
        literaryForm: "eṭuttukkoḷḷuṅgaḷ",
        spokenForm: "eṭuttukkōnga",
        explanation: "The auxiliary '-koḷ' (action for oneself) becomes '-kō' in spoken imperative.",
        exampleSentence: "Ukkāndukkōnga (Please take a seat).",
        englishMeaning: "Self-benefactive polite commands.",
      },
    ],
    drills: [
      {
        id: "dr2-1",
        type: "substitution",
        instruction: "Express that you need coffee using the dative case:",
        baseSentence: "Kamalāvukku pazham vēṇum",
        promptCue: "Nān (I) + Kāpi (Coffee)",
        options: ["Nān kāpi vēṇum", "Enakku kāpi vēṇum", "Ennōḍa kāpi vēṇum"],
        correctAnswer: "Enakku kāpi vēṇum",
        explanation: "Needs always require the dative pronoun: 'Enakku' (to me), not 'nān' (I).",
        englishMeaning: "I want coffee.",
      },
      {
        id: "dr2-2",
        type: "transformation",
        instruction: "Change from affirmative 'I want' to negative 'I do not want':",
        baseSentence: "Enakku thakkāḷi vēṇum.",
        options: [
          "Enakku thakkāḷi vēṇṭām.",
          "Enakku thakkāḷi ille.",
          "Enakku thakkāḷi pōkātu.",
        ],
        correctAnswer: "Enakku thakkāḷi vēṇṭām.",
        explanation: "The negative of 'vēṇum' (want) is 'vēṇṭām' (don't want / not needed).",
        englishMeaning: "I do not want tomatoes.",
      },
      {
        id: "dr2-3",
        type: "fillin",
        instruction: "Fill in the blank with the appropriate word for 'how much':",
        baseSentence: "Inta vāzhappazham vele ________?",
        options: ["ettaṇe", "evvaḷavu", "yāru"],
        correctAnswer: "evvaḷavu",
        explanation: "'Evvaḷavu' is used for quantity/price ('how much'), while 'ettaṇe' is for countable count ('how many').",
        englishMeaning: "How much is the price of these bananas?",
      },
    ],
    voicePractice: [
      {
        id: "vp2-1",
        tamilPhonetic: "Inta māmbazham vele evvaḷavu?",
        english: "How much does this mango cost?",
        phoneticBreakdown: "In-ta mām-ba-zham ve-le ev-va-ḷa-vu?",
        keyPhonemes: ["Retroflex zh (ழ)", "Geminate vv", "Flapped ḷ"],
        soundTip: "Pronounce 'ev-va-ḷa-vu' crisply with the tongue touching the mid-palate on 'ḷ'.",
        context: "Bargaining at any street vendor or shop.",
      },
      {
        id: "vp2-2",
        tamilPhonetic: "Enakku reṇṭu kīlō thakkāḷi vēṇum.",
        english: "I want two kilograms of tomatoes.",
        phoneticBreakdown: "E-nak-ku reṇ-ṭu kī-lō thak-kā-ḷi vē-ṇum.",
        keyPhonemes: ["Dative kku", "Retroflex ṇṭ", "Geminate kk"],
        soundTip: "Curl your tongue backward for 'reṇ-ṭu'. Emphasize the doubled 'kk' in 'thakkāḷi'.",
        context: "Ordering quantities at a vegetable stall.",
      },
      {
        id: "vp2-3",
        tamilPhonetic: "Konjam koracci koṭukka mudiyumā?",
        english: "Could you reduce the price a little bit?",
        phoneticBreakdown: "Kon-jam ko-rac-ci ko-ṭuk-ka mu-di-yu-mā?",
        keyPhonemes: ["Nasal nj", "Geminate cc", "Question mā"],
        soundTip: "'koracci' has a strong double 'c' like 'ch'. End with an inquisitive rise on 'mā'.",
        context: "Friendly bargaining with fruit or clothes vendors.",
      },
    ],
    roleplayScenario: {
      title: "Bargaining at Koyambedu / Mylapore Market",
      description: "You are picking up fresh produce and bargaining friendly-style with a local fruit vendor.",
      partnerRole: "Pazham Viyāpāri (Street fruit seller)",
      userRole: "Customer",
      initialMessage: "Vāṅgō saami! Pudhu mampazham vantirukku. Oru kīlō eṇbadhu rūbā. Ettaṇe kīlō pōṭaṭṭumā?",
      initialEnglish: "Welcome sir! Fresh mangoes have arrived. Eighty rupees a kilo. How many kilos shall I pack?",
      suggestedReplies: [
        {
          tamil: "Enakku oru kīlō pōtum. Vele konjam koracci koṭuṅga!",
          english: "One kilo is enough for me. Please reduce the price a little!",
        },
        {
          tamil: "Eṇbadhu rūbā romba jāshti. Aṟupadhu rūbāykku tharīngalā?",
          english: "Eighty rupees is too much. Will you give for sixty rupees?",
        },
      ],
    },
  },
  {
    id: "module-3",
    number: 3,
    title: "Daily Life & Routines",
    tagline: "Clock Time, Habitual Actions, and Household Life",
    badge: "Fluency Builder",
    textbookRef: "Prof. M. Shanmugam Pillai (Lesson 2) & CIIL Unit 13",
    description:
      "A cornerstone lesson from Prof. Shanmugam Pillai: 'Yēē Tenesari Vaazhkai' (My Daily Routine). Learn why spoken Tamil uses the future tense for habitual actions ('ezundirippēn', 'kulīppēn'), telling time, and talking about family routines.",
    dialogueTitle: "Yēē Tenesari Vaazhkai (My Daily Routine)",
    dialogueContext: "A professor shares his family's typical day at home in Chidambaram.",
    dialogue: [
      {
        id: "d3-1",
        speaker: "Professor",
        avatar: "👨🏽‍🏫",
        tamilPhonetic: "Nān kaaleyile añjare maṇikku yezundirippēn.",
        english: "I wake up at five-thirty in the morning.",
        breakdown: "Nān (I) + kaaleyile (in morning) + añjare (5:30) + maṇikku (at o'clock) + yezundirippēn (habitual: I get up)",
        pronunciationTip: "Notice the future suffix '-pp-' used for daily habitual action ('yezundirippēn').",
      },
      {
        id: "d3-2",
        speaker: "Friend",
        avatar: "🧔🏽",
        tamilPhonetic: "Ungka manaviyum appaditān yezundirippāṅgaḷā?",
        english: "Does your wife also wake up at that time?",
        breakdown: "Ungka manavi (your wife) + -yum (also) + appaditān (just like that) + yezundirippāṅgaḷā? (habitual question)",
        pronunciationTip: "'-āṅgaḷā' indicates respectful third-person feminine inquiry.",
      },
      {
        id: "d3-3",
        speaker: "Professor",
        avatar: "👨🏽‍🏫",
        tamilPhonetic: "Āmā. Yezundirichu kaapi pōṭṭu tharuvā. Piḷḷeyo yēḻu maṇikkitān yezundirikkum.",
        english: "Yes. Having gotten up she makes and gives coffee. The children wake up only at seven.",
        breakdown: "Yezundirichu (verbal participle: having woken up) + pōṭṭu (having made) + tharuvā (she gives) + yēḻu maṇikkitān (only at 7)",
        pronunciationTip: "'Yezundirichu' connects two verbs in a chain. The particle '-tān' means 'only / specifically'.",
      },
      {
        id: "d3-4",
        speaker: "Friend",
        avatar: "🧔🏽",
        tamilPhonetic: "Matiyaanam saappāṭṭukku yellaarum vīṭṭukku varuvīngalā?",
        english: "Do you all return home for afternoon lunch?",
        breakdown: "Matiyaanam (noon) + saappāṭṭukku (for meal) + yellaarum (all of us) + vīṭṭukku (to house) + varuvīngalā (do you come?)",
        pronunciationTip: "There is no single noun for lunch; spoken Tamil uses 'matiyaana saappāḍu'.",
      },
      {
        id: "d3-5",
        speaker: "Professor",
        avatar: "👨🏽‍🏫",
        tamilPhonetic: "Āmā, oru maṇikku onnā ukkāndu saapḍuvōm. Romba sawriyamaa irukku.",
        english: "Yes, at one o'clock we sit together and eat. It is very convenient.",
        breakdown: "Oru maṇikku (at 1:00) + onnā (together) + ukkāndu (seated) + saapḍuvōm (we eat) + sawriyam (convenient)",
        pronunciationTip: "'Sawriyam' is an everyday South Indian loan word meaning convenience/comfort.",
      },
    ],
    conversions: [
      {
        ruleName: "Future Tense used for Habitual Truth",
        literaryForm: "nān eḻuntirukkiṟēn",
        spokenForm: "nān yezundirippēn / yezundirikkirēn",
        explanation: "Spoken Tamil regularly uses future verb morphology ('-v-', '-p-', '-pp-') to denote regular daily habits.",
        exampleSentence: "Nān rāttiri pattu maṇikku thūnguvēn (I go to sleep at 10 PM).",
        englishMeaning: "Habitual daily action.",
      },
      {
        ruleName: "Time & Fraction Combinations",
        literaryForm: "aintu arai maṇi",
        spokenForm: "añjare maṇi",
        explanation: "Fractions merge into numerals: 'onnu + arai' -> 'oṇṇare' (1:30), 'añcu + arai' -> 'añjare' (5:30).",
        exampleSentence: "Treyn añjare maṇikku varum (The train comes at 5:30).",
        englishMeaning: "Colloquial time expressions.",
      },
      {
        ruleName: "Verbal Participle Linking (-ttu / -ccu)",
        literaryForm: "ceytu viṭṭu",
        spokenForm: "senjittu / ceytuttu",
        explanation: "Actions in sequence use verbal participles: 'eat and go' becomes 'saapṭuṭṭu pō'.",
        exampleSentence: "Kāpi kuṭiccittu vānga (Drink coffee and then come).",
        englishMeaning: "Sequential action chain.",
      },
    ],
    drills: [
      {
        id: "dr3-1",
        type: "substitution",
        instruction: "Change the time to 'seven thirty' (7:30):",
        baseSentence: "Nān añjare maṇikku kulīppēn (I bathe at 5:30)",
        promptCue: "7:30 (ēḻu + arai)",
        options: ["ēḻu maṇikku", "ēzharē maṇikku", "yēḻare maṇikku"],
        correctAnswer: "yēḻare maṇikku",
        explanation: "7 (yēḻu) + half (are) joins with sandhi to form 'yēḻare maṇikku'.",
        englishMeaning: "I bathe at seven-thirty.",
      },
      {
        id: "dr3-2",
        type: "transformation",
        instruction: "Transform two sentences into one using a verbal participle chain:",
        baseSentence: "Nān kāpi kuṭittēn. Nān vakuppukku pōnēn.",
        options: [
          "Nān kāpi kuṭiccittu vakuppukku pōnēn.",
          "Nān kāpi kuṭittu vakuppukku pōkēn.",
          "Nān kāpi kuṭikkira vakuppukku pōrēn.",
        ],
        correctAnswer: "Nān kāpi kuṭiccittu vakuppukku pōnēn.",
        explanation: "'kuṭiccu + viṭṭu' becomes spoken 'kuṭiccittu' ('having drunk coffee, I went to class').",
        englishMeaning: "Having drunk coffee, I went to class.",
      },
      {
        id: "dr3-3",
        type: "fillin",
        instruction: "Complete the sentence expressing lunch time:",
        baseSentence: "Matiyaanam oru maṇikku nām ellārum ________ saapḍuvōm.",
        options: ["onnā", "tanitaniyā", "ippatān"],
        correctAnswer: "onnā",
        explanation: "'Onnā' is the spoken form of 'onṟāka' (together as one).",
        englishMeaning: "In the afternoon at 1 o'clock, we will all eat together.",
      },
    ],
    voicePractice: [
      {
        id: "vp3-1",
        tamilPhonetic: "Nān kaaleyile yēḻu maṇikku yezundirippēn.",
        english: "I wake up at seven o'clock in the morning.",
        phoneticBreakdown: "Nān kaa-le-yi-le yē-ḻu ma-ṇik-ku ye-zun-di-rip-pēn.",
        keyPhonemes: ["Retroflex ḻ (ழ்)", "Retroflex ṇ (ண்)", "Habitual ppēn"],
        soundTip: "Curling tongue gently backwards on 'yēḻu' (seven) gives the classic Tamil retroflex.",
        context: "Describing your morning schedule.",
      },
      {
        id: "vp3-2",
        tamilPhonetic: "Kāpi kuṭicciṭṭu vēlēkku porappaṭuvēn.",
        english: "After drinking coffee, I head out to work.",
        phoneticBreakdown: "Kā-pi ku-ṭic-ciṭ-ṭu vē-lēk-ku po-rap-pa-ṭu-vēn.",
        keyPhonemes: ["Verbal participle ciṭṭu", "Double ṭṭ", "Future vēn"],
        soundTip: "Pronounce 'ku-ṭic-ciṭ-ṭu' with snappy doubled 'cc' and 'ṭṭ'.",
        context: "Describing sequence of daily actions.",
      },
      {
        id: "vp3-3",
        tamilPhonetic: "Ungka vīṭṭile ellārum cokantānē?",
        english: "Everyone at your home is doing well, right?",
        phoneticBreakdown: "Ung-ka vīṭ-ṭi-le el-lā-rum co-kan-tā-nē?",
        keyPhonemes: ["Retroflex ṭṭ", "Tag -tānē", "cokan (sound health)"],
        soundTip: "'Cokantānē' is the standard spoken Tamil inquiry for 'all well, right?'.",
        context: "Warm greeting inquiry about someone's family.",
      },
    ],
    roleplayScenario: {
      title: "Chatting Over Morning Coffee at a Hotel",
      description: "You are seated at an Anandha Bhavan tiffin hotel in Chennai chatting with a fellow customer.",
      partnerRole: "Murugan (Friendly local resident)",
      userRole: "Learner having breakfast",
      initialMessage: "Vaṇakkam thambi! Kaapi suuḍā irukku. Nīnga dhesari ingēdhaan saapduvīṅgalā?",
      initialEnglish: "Hello brother! The coffee is piping hot. Do you eat here every day?",
      suggestedReplies: [
        {
          tamil: "Aamānga, dhesari kaaleyile ingē vandhu idli saapduvēn.",
          english: "Yes sir, every morning I come here and eat idli.",
        },
        {
          tamil: "Ille, innekidhaan modhal mura varrēn. Tiffin romba piramaadham!",
          english: "No, today is my first time coming. The tiffin is extraordinary!",
        },
      ],
    },
  },
  {
    id: "module-4",
    number: 4,
    title: "Travel & Transportation",
    tagline: "Buses, Trains, Auto Rickshaws, and Directions",
    badge: "Navigating the City",
    textbookRef: "Dr. Renganathan (L5, L10) & CIIL Unit 4 & 19",
    description:
      "Master directions, boarding buses, railway station encounters, finding tickets, auto negotiations, and spatial ablative cases ('-ileruntu' = from, '-ukku' = towards).",
    dialogueTitle: "Rayil Nilaiyattil (At the Railway Station)",
    dialogueContext: "Suresh is at Chennai Central checking on the Madurai Express.",
    dialogue: [
      {
        id: "d4-1",
        speaker: "Passenger",
        avatar: "🧳",
        tamilPhonetic: "Sār, Maduraikku pōṟa rayil enta pḷāṭpāratle nikkutu?",
        english: "Sir, on which platform is the train going to Madurai standing?",
        breakdown: "Maduraikku (to Madurai) + pōṟa (relative participle: going) + rayil (train) + enta (which) + pḷāṭpāratle (locative: on platform) + nikkutu (standing)",
        pronunciationTip: "Notice 'pōṟa' is the relative participle before 'rayil' (the train that goes).",
      },
      {
        id: "d4-2",
        speaker: "Station Staff",
        avatar: "👨‍✈️",
        tamilPhonetic: "Mūṇāvatu pḷāṭpāratle nikkutu. Innum pattu nimishattile porappaṭṭuṭum.",
        english: "It is standing on platform number three. It will depart in ten minutes.",
        breakdown: "Mūṇāvatu (third, ordinal) + pḷāṭpāratle (on platform) + pattu nimishattile (in 10 mins) + porappaṭṭuṭum (definitive future: will definitely start)",
        pronunciationTip: "'Porappaṭṭuṭum' conveys guaranteed, imminent departure.",
      },
      {
        id: "d4-3",
        speaker: "Passenger",
        avatar: "🧳",
        tamilPhonetic: "Ṭikkeṭṭu kauntari engē irukku? Nān ippadān vanten.",
        english: "Where is the ticket counter? I just arrived now.",
        breakdown: "Ṭikkeṭṭu kauntari (ticket counter) + engē (where) + irukku (is) + ippadān (only just now) + vanten (I came)",
        pronunciationTip: "The particle '-dān' emphasizes 'only just now' ('ippadān').",
      },
      {
        id: "d4-4",
        speaker: "Station Staff",
        avatar: "👨‍✈️",
        tamilPhonetic: "Nērā pōnga. Valappakkatle pōsṭāpīs pakkattile irukku.",
        english: "Go straight. It is on the right side next to the post office.",
        breakdown: "Nērā (straight) + pōnga (go, polite) + valappakkatle (on the right) + pakkattile (near/next to)",
        pronunciationTip: "Opposite of 'valappakkam' (right) is 'eṭappakkam' (left).",
      },
      {
        id: "d4-5",
        speaker: "Passenger",
        avatar: "🧳",
        tamilPhonetic: "Romba nandri sār, nān ōḍi pōyi vāngikkirēn!",
        english: "Thank you very much sir, I will run and buy it quickly!",
        breakdown: "Romba nandri + nān ōḍi (running) + pōyi (having gone) + vāngikkirēn (I will buy for myself)",
        pronunciationTip: "Chained verbs: 'ōḍi pōyi vāngikkirēn' = run, go, buy.",
      },
    ],
    conversions: [
      {
        ruleName: "Relative Participle before Nouns",
        literaryForm: "pōkiṟa rayil",
        spokenForm: "pōṟa rayil",
        explanation: "Literary present relative participle '-kiṟa' simplifies to spoken '-ṟa'.",
        exampleSentence: "Varrra pas enta pas? (Which bus is the one coming?)",
        englishMeaning: "The modifying verbal adjective.",
      },
      {
        ruleName: "Ablative of Motion (-ileruntu)",
        literaryForm: "ūriliruntu",
        spokenForm: "ūrileyiruntu / ūrleruntu",
        explanation: "Indicates origin 'from': 'Maduraiyileruntu' (from Madurai).",
        exampleSentence: "Nān vīṭṭuleruntu varrēn (I am coming from home).",
        englishMeaning: "Coming from a location.",
      },
      {
        ruleName: "Ordinal Numbers with -āvatu",
        literaryForm: "mūnṟām",
        spokenForm: "mūṇāvatu",
        explanation: "Cardinals become ordinals by appending '-āvatu' ('onṇāvatu/modal', 'reṇṭāvatu', 'mūṇāvatu').",
        exampleSentence: "Mūṇāvatu theruvile nillunga (Stop at the third street).",
        englishMeaning: "First, second, third, etc.",
      },
    ],
    drills: [
      {
        id: "dr4-1",
        type: "substitution",
        instruction: "Change direction to 'on the left side' (eṭappakkam):",
        baseSentence: "Valappakkatle pōsṭāpīs irukku",
        promptCue: "Left side (eṭappakkam)",
        options: ["Nērā pōsṭāpīs irukku", "Eṭappakkatle pōsṭāpīs irukku", "Uḷḷē pōsṭāpīs irukku"],
        correctAnswer: "Eṭappakkatle pōsṭāpīs irukku",
        explanation: "'Eṭappakkam' means left side, while 'valappakkam' means right side.",
        englishMeaning: "On the left side is the post office.",
      },
      {
        id: "dr4-2",
        type: "transformation",
        instruction: "Change from 'coming from Chennai' to 'coming from Madurai':",
        baseSentence: "Rayil Cennayileruntu varutu.",
        options: [
          "Rayil Maduraikku varutu.",
          "Rayil Maduraiyileruntu varutu.",
          "Rayil Maduraile nikkutu.",
        ],
        correctAnswer: "Rayil Maduraiyileruntu varutu.",
        explanation: "Ablative suffix '-ileruntu' indicates origin ('from Madurai').",
        englishMeaning: "The train comes from Madurai.",
      },
      {
        id: "dr4-3",
        type: "fillin",
        instruction: "Select the verbal adjective for 'the bus that goes to airport':",
        baseSentence: "Vimānanilaiyattukku ________ pas yedu?",
        options: ["pōra", "pōnatu", "pōkutu"],
        correctAnswer: "pōra",
        explanation: "'Pōra' is the relative participle qualifying the noun 'pas'.",
        englishMeaning: "Which is the bus that goes to the airport?",
      },
    ],
    voicePractice: [
      {
        id: "vp4-1",
        tamilPhonetic: "Maduraikku enta passile pōkaṇum?",
        english: "Which bus should I take to go to Madurai?",
        phoneticBreakdown: "Ma-du-raik-ku en-ta pas-si-le pō-ka-ṇum?",
        keyPhonemes: ["Dative kku", "Locative le", "Obligative ṇum"],
        soundTip: "End 'pōkaṇum' with the nasal retroflex 'ṇum', feeling vibration in your palate.",
        context: "Asking directions at a bus terminus.",
      },
      {
        id: "vp4-2",
        tamilPhonetic: "Tiruchi vandi eppo porappaṭum?",
        english: "When will the Trichy vehicle/train depart?",
        phoneticBreakdown: "Ti-ru-chi van-ḍi ep-po po-rap-pa-ṭum?",
        keyPhonemes: ["Short eppo", "Retroflex ṭum", "Double pp"],
        soundTip: "Make the 'ppo' in 'eppo' punchy and crisp. Don't drawl.",
        context: "Asking train departure time.",
      },
      {
        id: "vp4-3",
        tamilPhonetic: "Nērā pōyi valappakkatle thirumbunga.",
        english: "Go straight and turn to the right side.",
        phoneticBreakdown: "Nē-rā pō-yi va-lap-pak-kat-le thi-rum-bun-ga.",
        keyPhonemes: ["Long ē", "Geminate kk", "Imperative ga"],
        soundTip: "Clear elongation on 'Nē-rā', followed by soft 'thirumbunga'.",
        context: "Giving or confirming street directions.",
      },
    ],
    roleplayScenario: {
      title: "Hiring an Auto-Rickshaw in T. Nagar",
      description: "You need to take an auto from Pondy Bazaar to Central Railway Station.",
      partnerRole: "Auto Driver (Local Chennai auto-karan)",
      userRole: "Passenger with luggage",
      initialMessage: "Yov thambi! Engē pōkaṇum? Central-aa? Meter pōṭṭu kooṭṭi pōṟēn, vānga!",
      initialEnglish: "Hey brother! Where do you want to go? Central? I'll take you by meter, come!",
      suggestedReplies: [
        {
          tamil: "Aamānga, Central Railway Station-ukku pōkaṇum. Evvaḷavu nēram aagum?",
          english: "Yes sir, I need to go to Central Station. How long will it take?",
        },
        {
          tamil: "Sari, vandiye edukkuṅga. Enakku train-ukku nēram aayiduchu!",
          english: "Alright, start the auto. I'm running short on time for the train!",
        },
      ],
    },
  },
  {
    id: "module-5",
    number: 5,
    title: "Health & Visiting the Doctor",
    tagline: "Symptoms, Body Sensations, and Medical Advice",
    badge: "Essential Care",
    textbookRef: "Dr. Renganathan (L6, L12) & CIIL Unit 18",
    description:
      "Learn how to describe physical symptoms in spoken Tamil. In Tamil, physical pain is an experience that 'happens to you' using the dative ('enakku talevali irukku') rather than 'I have'. Master medical vocabulary, fever, and dosage instructions.",
    dialogueTitle: "Ṭākṭarkiṭṭe (Consulting the Doctor)",
    dialogueContext: "Mani visits Dr. Raman's clinic in Chennai with a fever and headache.",
    dialogue: [
      {
        id: "d5-1",
        speaker: "Doctor",
        avatar: "🩺",
        tamilPhonetic: "Vānga Maṇi, uṭambukku enna ceyyutu?",
        english: "Come in Mani, what is wrong with your body/health?",
        breakdown: "Vānga (welcome) + uṭambukku (dative: to body) + enna ceyyutu (what is it doing / what's troubling?)",
        pronunciationTip: "Tamil expresses symptoms as 'what does it do to the body?'.",
      },
      {
        id: "d5-2",
        speaker: "Mani",
        avatar: "🤒",
        tamilPhonetic: "Ṭākṭar, nēttileruntu romba talevali. Kūḍavē joram aṭikkutu.",
        english: "Doctor, severe headache since yesterday. Along with that, fever is raging.",
        breakdown: "Nēttileruntu (since yesterday) + romba (very) + talevali (headache) + kūḍavē (along with) + joram (fever) + aṭikkutu (striking/beating)",
        pronunciationTip: "'Joram aṭikkutu' is the natural South Indian idiom for having high fever.",
      },
      {
        id: "d5-3",
        speaker: "Doctor",
        avatar: "🩺",
        tamilPhonetic: "Vayiru valikkutā? Nēttu rāttiri enna sāppiṭṭa?",
        english: "Does your stomach ache? What did you eat last night?",
        breakdown: "Vayiru (stomach) + valikkutā (aches?) + nēttu rāttiri (yesterday night) + enna sāppiṭṭa (what did you eat?)",
        pronunciationTip: "Notice the difference between 'vali' (pain) and 'valikkutu' (it is aching).",
      },
      {
        id: "d5-4",
        speaker: "Mani",
        avatar: "🤒",
        tamilPhonetic: "Vayittuvali onnum ille. Aanaa uṭambu muzhukkā valikkutu.",
        english: "No stomach pain at all. But the entire body aches.",
        breakdown: "Vayittuvali (stomach ache) + onnum ille (nothing at all) + aanaa (but) + uṭambu muzhukkā (whole body) + valikkutu",
        pronunciationTip: "'Muzhukkā' has the deep retroflex 'zh'.",
      },
      {
        id: "d5-5",
        speaker: "Doctor",
        avatar: "🩺",
        tamilPhonetic: "Payappaṭātē. Idhō inta māttireye kāleyilēyum rāttiriyilēyum sāppiṭu. Nallā ōyvu edu.",
        english: "Don't be afraid. Take this tablet in the morning and at night. Rest well.",
        breakdown: "Payappaṭātē (don't fear) + inta māttire (this tablet) + kāleyilēyum (in morning also) + rāttiriyilēyum (at night also) + ōyvu edu (take rest)",
        pronunciationTip: "'Payappaṭātē' is a negative imperative ('-ātē' = do not).",
      },
    ],
    conversions: [
      {
        ruleName: "Experiential Dative for Physical States",
        literaryForm: "enakku thalaivali ullatu",
        spokenForm: "enakku talevali irukku",
        explanation: "Sensations, ailments, and feelings use dative ('enakku', 'avanukku') rather than nominative.",
        exampleSentence: "Avarukku joram irukku (He has fever).",
        englishMeaning: "Experiencing health conditions.",
      },
      {
        ruleName: "Negative Singular Imperative (-ātē)",
        literaryForm: "bhayappadātīrkaḷ",
        spokenForm: "payappaṭātē (informal) / payappaṭātīngo (polite)",
        explanation: "Prohibitions attach '-ātē' to verb root ('varātē' = don't come, 'sāppiṭātē' = don't eat).",
        exampleSentence: "Kavalappaṭātē (Don't worry).",
        englishMeaning: "Prohibitive commands.",
      },
      {
        ruleName: "Symptom Verbs (valikkutu / aṭikkutu)",
        literaryForm: "valikkiṟatu",
        spokenForm: "valikkutu / valikkidu",
        explanation: "Neuter 3rd person singular '-kiṟatu' becomes spoken '-kutu' / '-utu'.",
        exampleSentence: "Kālu valikkutu (My leg is hurting).",
        englishMeaning: "Describing where it hurts.",
      },
    ],
    drills: [
      {
        id: "dr5-1",
        type: "substitution",
        instruction: "Change symptom from headache ('talevali') to stomach ache ('vayittuvali'):",
        baseSentence: "Enakku talevali irukku.",
        promptCue: "Vayittuvali (Stomach ache)",
        options: ["Enakku vayiru irukku.", "Enakku vayittuvali irukku.", "Nān vayittuvali."],
        correctAnswer: "Enakku vayittuvali irukku.",
        explanation: "'Vayittuvali' is the compound for stomach ache.",
        englishMeaning: "I have stomach pain.",
      },
      {
        id: "dr5-2",
        type: "transformation",
        instruction: "Formulate a negative command ('Do not drink cold water'):",
        baseSentence: "Nī kuḷirndha taṇṇīr kuṭi.",
        options: [
          "Nī jillunnu taṇṇi kuṭikkātē.",
          "Nī taṇṇi kuṭikka māṭṭē.",
          "Nī taṇṇi kuṭikka vēṇṭām.",
        ],
        correctAnswer: "Nī jillunnu taṇṇi kuṭikkātē.",
        explanation: "The direct negative imperative uses '-ātē': 'kuṭikkātē' (do not drink).",
        englishMeaning: "Do not drink chilled water.",
      },
      {
        id: "dr5-3",
        type: "fillin",
        instruction: "Select the word to say 'Take this medicine':",
        baseSentence: "Inta maruntē nallā ________.",
        options: ["sāppiṭu", "pōṭu", "vāngu"],
        correctAnswer: "sāppiṭu",
        explanation: "In Tamil, taking oral medicine or pills uses the verb 'sāppiṭu' (consume/eat).",
        englishMeaning: "Take (consume) this medicine properly.",
      },
    ],
    voicePractice: [
      {
        id: "vp5-1",
        tamilPhonetic: "Enakku romba talevaliyā irukku.",
        english: "I have a very bad headache.",
        phoneticBreakdown: "E-nak-ku rom-ba ta-le-va-li-yā i-ruk-ku.",
        keyPhonemes: ["Dative enakku", "Retroflex ḷ in vali", "Geminate kk"],
        soundTip: "Make sure 'tale' has a light dental 't' and 'vali' has a soft alveolar 'l'.",
        context: "Explaining how you feel to a pharmacist or doctor.",
      },
      {
        id: "vp5-2",
        tamilPhonetic: "Inta māttireye eppo sāppiṭaṇum?",
        english: "When should I take this tablet?",
        phoneticBreakdown: "In-ta māt-ti-re-ye ep-po sāp-pi-ṭa-ṇum?",
        keyPhonemes: ["Geminate tt in māttire", "Short eppo", "Retroflex ṭaṇum"],
        soundTip: "Distinct pause on the doubled 'tt' in 'māt-ti-re'.",
        context: "Asking for dosage instructions.",
      },
      {
        id: "vp5-3",
        tamilPhonetic: "Ippo uṭambu konjam thēvalayā irukku.",
        english: "Now my health/body feels somewhat better.",
        phoneticBreakdown: "Ip-po u-ṭam-bu kon-jam thē-va-la-yā i-ruk-ku.",
        keyPhonemes: ["Short ippo", "Nasal nj", "Long ē in thēvale"],
        soundTip: "'Thēvale' is the colloquial South Indian expression for 'better / improved'.",
        context: "Reporting recovery progress to family or friends.",
      },
    ],
    roleplayScenario: {
      title: "Visiting the Neighborhood Clinic",
      description: "You have a cold and mild fever and are consulting the local doctor.",
      partnerRole: "Doctor Senkuttuvan",
      userRole: "Patient",
      initialMessage: "Vāṅga! Ukaandhukkōṅga. Eppo-lerundhu uḍambu mudiyale? Joram irukkudhaa?",
      initialEnglish: "Welcome! Please sit down. Since when have you been unwell? Do you have fever?",
      suggestedReplies: [
        {
          tamil: "Nēttu rāttiri-lerundhu joram adikkudhu ṭākṭar. Kūḍavē irumal irukku.",
          english: "I have had fever since last night, doctor. Along with that I have a cough.",
        },
        {
          tamil: "Reṇḍu nāḷā oree thalevali. Sāppāḍu kūḍa saapda mudiyale.",
          english: "Severe headache for two days. I can't even eat food.",
        },
      ],
    },
  },
  {
    id: "module-6",
    number: 6,
    title: "Sandhi Secrets & Tenali Raman Tales",
    tagline: "Definitives, Reportives, and Colloquial Storytelling",
    badge: "Mastery Level",
    textbookRef: "Prof. M. Shanmugam Pillai (Lessons 16–22: Vigadagavi & Kaṇṇāḍi)",
    description:
      "Dive into authentic South Indian colloquial storytelling with Tenali Raman tales. Master the aspectual definitives ('-viṭṭu' -> '-ṭṭu', '-aaccu'), colloquial quotatives ('-nnu' / 'appadīnnā'), and how native speakers weave jokes and narratives effortlessly.",
    dialogueTitle: "Tenali Raman & The Magic Mirror (Kaṇṇāḍi)",
    dialogueContext: "Adapted directly from Prof. Shanmugam Pillai Lesson 16.",
    dialogue: [
      {
        id: "d6-1",
        speaker: "Narrator",
        avatar: "📖",
        tamilPhonetic: "Pazhangaalatle kaṇṇāḍi keṭeyātu. Aalinge yārum thanga mogatte paattadē ille.",
        english: "In olden days there was no mirror. People had never seen their own faces.",
        breakdown: "Pazhangaalatle (in old days) + kaṇṇāḍi (mirror) + keṭeyātu (was not available) + aalinge (people) + mogam (face) + paattadē ille (never seen)",
        pronunciationTip: "Notice how 'mugam' becomes spoken 'mogam', and 'āṭkaḷ' becomes colloquial 'aalinge'.",
      },
      {
        id: "d6-2",
        speaker: "Karikannan",
        avatar: "🧔",
        tamilPhonetic: "Aahaa! Enakku oru kaṇṇāḍi keṭeccurukku! Adile en settuppōna appātān irukkiṟāru!",
        english: "Aha! I found a mirror! In it, only my deceased father is present!",
        breakdown: "Keṭeccurukku (present perfect: has been obtained) + settuppōna (who passed away) + appātān (father himself)",
        pronunciationTip: "The definitive past '-tuppōna' comes from 'ceytu + pōna'.",
      },
      {
        id: "d6-3",
        speaker: "Wife",
        avatar: "👩",
        tamilPhonetic: "Illē illē! Nīnga poy solṟīnga! Adile oru poṇṇu irukkā!",
        english: "No no! You are telling a lie! In it, another woman is standing!",
        breakdown: "Poy (lie) + solṟīnga (you are saying) + adile (in it) + oru poṇṇu (a girl) + irukkā (she is there)",
        pronunciationTip: "'Poṇṇu' is colloquial spoken Tamil for female / girl (literary 'peṇ').",
      },
      {
        id: "d6-4",
        speaker: "Tenali Raman",
        avatar: "🧙‍♂️",
        tamilPhonetic: "Rendu pērum saṇḍe pōḍātīnga! Kaṇṇāḍiye kīzhe pōṭṭu oṭeccuṭṭā ellaam sariyā pōyidum!",
        english: "Both of you do not quarrel! If you drop the mirror and break it, everything will be fine!",
        breakdown: "Saṇḍe (quarrel) + pōḍātīnga (don't make) + pōṭṭu (having dropped) + oṭeccuṭṭā (conditional definitive: if broken) + pōyidum (will become)",
        pronunciationTip: "Notice 'oṭeccuṭṭā' combines the verbal participle 'oṭeccu' + definitive 'viṭṭu' + conditional '-aa'.",
      },
    ],
    conversions: [
      {
        ruleName: "The Quotative Particle -nnu (from 'enṟu')",
        literaryForm: "varuvēn enṟu sonnān",
        spokenForm: "varuvēn-nu sonnān",
        explanation: "In spoken Tamil, direct quotes and intentions are wrapped with '-nnu' rather than 'enṟu'.",
        exampleSentence: "Avaru nāḷekki varrēn-nu sonnāru (He said he would come tomorrow).",
        englishMeaning: "Saying that...",
      },
      {
        ruleName: "Completive Suffix -aaccu",
        literaryForm: "purappaṭṭāyirru / mudinthuvittathu",
        spokenForm: "porappaṭṭāccu / muḍinjāccu",
        explanation: "Indicates complete, irreversible finality: 'Done and dusted'.",
        exampleSentence: "Sāppāḍu muḍinjāccu (Dinner is finished).",
        englishMeaning: "Completed action.",
      },
      {
        ruleName: "Conditional Suffix -nnaa / -aa",
        literaryForm: "vantāl",
        spokenForm: "vandā / vandā-nnaa",
        explanation: "'If' clauses take '-aa' on past stems or '-nnaa' after finite verbs.",
        exampleSentence: "Mazhe peñjā nallā irukkum (If it rains, it will be nice).",
        englishMeaning: "If condition.",
      },
    ],
    drills: [
      {
        id: "dr6-1",
        type: "transformation",
        instruction: "Use the quotative '-nnu' to report what was said:",
        baseSentence: "Avaru 'nān varuvēn' enṟu sonnāru.",
        options: [
          "Avaru varuvēnnnu sonnāru.",
          "Avaru varuvēnaaccu sonnāru.",
          "Avaru varuvēnōḍa sonnāru.",
        ],
        correctAnswer: "Avaru varuvēnnnu sonnāru.",
        explanation: "'enṟu' transforms directly to the quotative particle '-nnu' in speech.",
        englishMeaning: "He said that he would come.",
      },
      {
        id: "dr6-2",
        type: "substitution",
        instruction: "Express that all work is completed using '-aaccu':",
        baseSentence: "Vēlē muḍinjāccu.",
        promptCue: "Sāppāḍu (Meal)",
        options: ["Sāppāḍu pōkaṇum.", "Sāppāḍu sāppiṭṭāccu.", "Sāppāḍu vēṇum."],
        correctAnswer: "Sāppāḍu sāppiṭṭāccu.",
        explanation: "Past verbal participle 'sāppiṭṭu' + '-aaccu' = 'sāppiṭṭāccu' (eating is done).",
        englishMeaning: "Eating the meal is completed.",
      },
      {
        id: "dr6-3",
        type: "fillin",
        instruction: "Complete the conditional sentence ('If you come tomorrow, we can go'):",
        baseSentence: "Nīnga nāḷekki ________, nām cinimāvukku pōkalām.",
        options: ["vandā", "varutu", "vantirukku"],
        correctAnswer: "vandā",
        explanation: "'Vandā' is the conditional form of 'vā' (if you come).",
        englishMeaning: "If you come tomorrow, we can go to the cinema.",
      },
    ],
    voicePractice: [
      {
        id: "vp6-1",
        tamilPhonetic: "Avaru nāḷekki varrēnnnu sonnāru.",
        english: "He said that he will come tomorrow.",
        phoneticBreakdown: "A-va-ru nā-ḷek-ki var-rēn-nnu son-nā-ru.",
        keyPhonemes: ["Nasal nn in sonnāru", "Quotative nnu", "Long ā"],
        soundTip: "Glide smoothly from 'varrēn' into '-nnu' as one joined colloquial word.",
        context: "Reporting what someone told you.",
      },
      {
        id: "vp6-2",
        tamilPhonetic: "Ellām muḍinjāccu, nām porappaṭalām!",
        english: "Everything is finished, we can set off!",
        phoneticBreakdown: "El-lām mu-ḍin-jāc-cu, nām po-rap-pa-ṭa-lām!",
        keyPhonemes: ["Completive aaccu", "Double ṭṭ", "Modal lām"],
        soundTip: "Deliver 'mu-ḍin-jāc-cu' with confident cadence like a true native speaker.",
        context: "Announcing completion and readiness to depart.",
      },
      {
        id: "vp6-3",
        tamilPhonetic: "Mazhe peñjā nallā jillunnu irukkum.",
        english: "If it rains, it will be pleasantly cool.",
        phoneticBreakdown: "Ma-zhe peñ-jā nal-lā jil-lun-nu i-ruk-kum.",
        keyPhonemes: ["Retroflex zh (ழ)", "Palatal ñj", "Onomatopoeic jillunnu"],
        soundTip: "'Jillunnu' is an authentic Tamil descriptive word for refreshingly cold/cool.",
        context: "Casual weather commentary in South India.",
      },
    ],
    roleplayScenario: {
      title: "Storytelling Evening with Friends",
      description: "You are discussing a classic Tenali Raman joke with a Tamil friend over evening snacks.",
      partnerRole: "Annamalai (Enthusiastic folklore enthusiast)",
      userRole: "Friend sharing a story",
      initialMessage: "Ada! Tenali Raman kadhe kēṭṭirukkiingalā? Avanga arasanukku eppadi paadam kathu koduthaaru theriyumaa?",
      initialEnglish: "Oh! Have you heard Tenali Raman's story? Do you know how he taught the king a lesson?",
      suggestedReplies: [
        {
          tamil: "Aamānga! Kannāḍi kadhe dhāne? Romba nagaichuvaiyāna kadhe!",
          english: "Yes sir! The mirror story right? Very humorous tale!",
        },
        {
          tamil: "Theriyum! Tenali Raman romba puthisaali, ellaarayum sirippa vechitaaru.",
          english: "I know! Tenali Raman is very clever, he made everyone laugh.",
        },
      ],
    },
  },
];
