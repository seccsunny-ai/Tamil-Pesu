# Spoken Tamil Learning & Voice Practice Companion

An interactive, mobile-optimized Spoken Tamil learning web application based directly on the pedagogical methodologies of Dr. D. Renganathan (*Work Book - Spoken Tamil*), Prof. M. Shanmugam Pillai (*Spoken Tamil Part II*), and Dr. S. Rajaram (*An Intensive Course in Tamil* - CIIL Mysore). The application trains learners to speak natural, standard colloquial South Indian Tamil through progressive situational modules, interactive drills, conversational roleplay, and multimodal voice pronunciation feedback powered by Gemini audio models.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed based on your requirements:
> - **Curriculum Structure**: Progressive situational modules (Daily Life, Travel, Market & Shopping, Health & Doctor, Social & Festival, Folk Narratives) integrating conversation roleplays and systematic substitution/build-up drills from the textbooks.
> - **Display Mode**: Romanized phonetic script exclusively (e.g. *vaanga*, *eppadi irukkiinga?*, *saapda pōṟēn*, *kaṭaikkuc cellal*), prioritizing spoken fluency and phonological sandhi rules without script-reading friction.
> - **Voice & Audio Architecture**: Interactive voice recording in the browser with real-time AI pronunciation analysis and scoring (evaluating retroflex consonants, vowel elongation, and colloquial sandhi), paired with native TTS audio pronunciation using `gemini-3.8-flash-lite-tts`.

---

### 1. Overview & Core Concept

- **What It Does**: Transforms classical and academic Spoken Tamil textbook pedagogy into an engaging, gamified mobile web app. Learners master spoken Tamil step-by-step from zero to conversational fluency, practicing colloquial grammar (verb conjugations, case markers, definitives `-ṭṭu`/`-viṭṭu`, reportives `-nnu`, conditionals `-aa`/`-nnaa`) with speech recognition, audio playback, and instant pronunciation feedback.
- **Target Audience**: Beginners and intermediate learners wanting to converse comfortably with native speakers in Tamil Nadu and South India in everyday life, business, and travel.
- **Key Value**: Bridges the gap between literary written Tamil and actual colloquial street/conversational Tamil through authentic dialogues, structured drills, and audio-first pronunciation assessment.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Dashboard & Path View**: Visual module journey showing unlocked situational themes (e.g., *Greeting & Identity*, *At the Market*, *Railway Station & Travel*, *Doctor & Clinic*, *Hospitality & Home Meals*, *Tenali Raman Folk Tales*).
  2. **Lesson View**:
     - *Situational Dialogue*: Interactive conversation player between two native speakers with line-by-line audio and Romanized text.
     - *Pattern Drills*: Build-up, variation, expansion, and substitution drills with instant tap-to-complete practice.
     - *Colloquial Conversions & Sandhi Explorer*: Interactive breakdown of how formal Tamil transforms into spoken expressions (e.g., *peyar* $\to$ *pēru*, *illai* $\to$ *ille*, *purappaṭṭāyirru* $\to$ *porappaṭṭāccu*).
  3. **Voice Lab (Pronunciation & Roleplay)**:
     - User listens to native Tamil audio model pronunciation.
     - User holds mic to record their spoken Tamil response.
     - Gemini analyzes the audio recording, returning a score (0–100%), phoneme-level feedback (specifically checking retroflex `zh`/`l`, geminates `kk`/`tt`/`pp`, vowel lengths `aa`/`ee`/`oo`), and coaching tips.
  4. **Freeform Roleplay AI Chat**: Real-time spoken Tamil conversation scenario (e.g., bargaining with an auto driver or ordering at a Madurai mess) with text and audio responses.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Warm, authentic South Indian editorial modernism. Inspired by Chettinad architecture, temple terracotta, rich brass, and warm cream canvas.
  - *Color Palette*:
    - Canvas (60%): Warm clean ivory `#FBF9F5` / dark slate `#12161A`.
    - Surfaces (30%): Soft parchment cards `#F4F0E8` / dark charcoal `#1A2026`, hairline borders `#E6DFD3` / `#2D3748`.
    - Accents (10%): Deep terracotta `#C05621`, turmeric gold `#D97706`, and temple brass `#B45309`.
  - *Typography*:
    - Display / Headings: `Plus Jakarta Sans` (punchy, clean, modern weight).
    - Body / Phonetic Transcripts: `DM Sans` with high legibility and explicit diacritic support for standard Romanized Tamil (`ā`, `ē`, `ī`, `ō`, `ū`, `ṟ`, `ṭ`, `ṇ`, `ḻ`).
    - Scores & Metrics: `IBM Plex Mono` with `tabular-nums`.
  - *Mobile Touch Ergonomics*:
    - Natural thumb-zone primary action bar with floating recording button.
    - Large tactile touch targets ($\ge 48\text{px}$) for audio playback and recording.
    - Top sticky bar capped under 15% viewport height, with smooth sheet drawer for drill exercises.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Romanized Phonetic Script with Audio Guide**
  - *Chosen Approach*: Focus entirely on clear Romanized Tamil phonetics with syllable stresses and IPA/phonetic guides, based on the transcription systems in Shanmugam Pillai and CIIL.
  - *Why*: User specifically requested Romanized phonetic script for rapid speaking fluency without the barrier of learning Tamil orthography first.
- **Decision 2: Dual Audio Pipeline (TTS + Multimodal Voice Evaluation)**
  - *Chosen Approach*:
    - Native Audio Synthesis: Server-side TTS generation using `gemini-3.8-flash-lite-tts` for natural, accent-accurate Tamil pronunciation.
    - Pronunciation Evaluation: Server-side multimodal audio analysis with Gemini evaluating audio blobs directly against expected phonetic models.
  - *Why*: Provides immediate, feedback on pronunciation mistakes that simple text-based comparisons miss.
- **Decision 3: Offline-Resilient Local State & Module Progress**
  - *Chosen Approach*: Client-side `localStorage` state management for module completions, drill accuracy scores, streak counter, and recording history.
  - *Why*: Instant, zero-latency experience without requiring account creation or login hurdles.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser (React)                  │
│                                                             │
│  ┌───────────────────────┐      ┌────────────────────────┐  │
│  │    Module & Lessons   │      │   Interactive Drills   │  │
│  │   Situational Dialogs │      │ Substitution/Build-up  │  │
│  └───────────┬───────────┘      └───────────┬────────────┘  │
│              │                              │               │
│  ┌───────────▼──────────────────────────────▼────────────┐  │
│  │     Voice Practice Lab (Web Audio API Recorder)       │  │
│  │  MediaRecorder (PCM/WebM) ──► Audio Level Visualizer  │  │
│  └───────────────────────────┬───────────────────────────┘  │
└──────────────────────────────┼──────────────────────────────┘
                               │ Fetch (Audio / Prompts)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Express Server Backend (/api)               │
│                                                             │
│  ┌──────────────────────────┐   ┌────────────────────────┐  │
│  │ POST /api/evaluate-speech│   │   POST /api/speak-tts  │  │
│  │ (Gemini Multimodal Audio │   │ (gemini-3.8-flash-lite-│  │
│  │  Pronunciation Scorer)   │   │   tts Audio Engine)    │  │
│  └─────────────┬────────────┘   └───────────┬────────────┘  │
│                │                            │               │
│                ▼                            ▼               │
│      @google/genai SDK            @google/genai SDK         │
└─────────────────────────────────────────────────────────────┘
```

- **Curriculum Database (`src/data/curriculum.ts`)**:
  - **Module 1: Everyday Greetings & Introductions** (from Renganathan Lesson 1, Rajaram Unit 1): *Nanpar varukai*, personal pronouns, honorifics (*vaanga*, *pōnga*, *nīnga*, *ivaru*), equational sentences, and simple questions (*enna*, *yaaru*).
  - **Module 2: Asking & Needs - At the Bank & Shop** (from Renganathan Lesson 2 & 8, Rajaram Unit 3 & 6): Dative `-kku` (*enakku vēṇum*), negatives (*ille*, *vēṇṭām*), numerals and bargaining (*evvaḷavu*, *rūpā*, *kācu*).
  - **Module 3: Daily Habits & Time** (from Shanmugam Pillai Lesson 2, Rajaram Unit 13): *Yēē tenesari vaazhkai* (My daily routine), habitual future (*varuvēn*, *ezundirippēn*), clock time (*ettane maṇi*).
  - **Module 4: Travel, Bus & Railway Station** (from Renganathan Lesson 5 & 10, Shanmugam Pillai Lesson 8): Locative `-le`, ablative `-ileruntu`, directions, arriving/leaving (*porappaṭāccu*, *vantu sērutu*).
  - **Module 5: At the Doctor & Health** (from Renganathan Lesson 6 & 12, CIIL Unit 18): Symptoms (*talevali*, *vayittuvali*, *joram*), physical sensations, medicines (*māttire*).
  - **Module 6: Conversational Colloquial Transformations & Folk Stories** (from Shanmugam Pillai Lessons 16–22): The Tenali Raman tales (*Vigadagavi*, *Kannaadi*), colloquial reportives (*-nnu sonnāru*), definitives (*-viṭṭu* $\to$ *-ṭṭu*), and storytelling flow.

- **Audio API & Server Routes (`server.ts`)**:
  - `POST /api/speak-tts`: Generates spoken Tamil audio using `gemini-3.8-flash-lite-tts` with high naturalness.
  - `POST /api/evaluate-speech`: Accepts user audio input (base64 WebM/WAV) + target Spoken Tamil sentence; evaluates pronunciation accuracy, rhythm, phonetic precision, and returns structured feedback (Score 0–100%, Phoneme Checks, Encouragement, Correction Tips).

---

### Plan Verification Checklist
- [x] Based on the 3 attached books (Renganathan, Shanmugam Pillai, Rajaram).
- [x] Romanized phonetic format confirmed.
- [x] Progressive situational modules + conversational drills confirmed.
- [x] Gemini voice evaluation & TTS engine designed.
- [x] Mobile-first touch ergonomics and responsive layout.
