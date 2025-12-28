# Delhi Local Guide AI 🇮🇳

> **Kiro Heroes - Week 5 Challenge: The Local Guide**  
> *Agent Steering | Area-Wise Mood Engine | Festival Awareness*

![Delhi Local Guide Preview](./screenshots/preview.png)

## 🌆 Project Overview
This project mimics a real **Delhi Local** who knows the city inside out. It helps users:
1.  **Navigate Areas**: Tells you the "Vibe", "Food Mood", and "Traffic" for specific localities.
2.  **Understand Slang**: Translates concepts like "Jugaad" or "Scene kya hai".
3.  **Survive Festivals**: Warns about "Black Zones" during Diwali or traffic during Holi.

## 🧠 Agent Steering (Concept)
The core intelligence of this AI is **NOT hardcoded** in the JavaScript logic. Instead, it is "steered" entirely by a context file:

- **Source of Truth**: `.kiro/product.md`
- **Mechanism**: The application parses this Markdown file at runtime to understand:
    - How to speak ("Bhai-chara" tone).
    - What areas exist (CP, Karol Bagh, HKV).
    - What is "cool" right now.

If you edit `product.md` (e.g., change CP's vibe from "Busy" to "Relaxed"), the **Agent's behavior changes instantly** without touching the code.

## 🚀 Features

### 1️⃣ Area-Wise Mood Engine
Ask *"How is CP?"* and get a structured card:
- **Crowd Vibe**: Is it family-friendly or a party zone?
- **Food Mood**: Best street food vs. cafes.
- **Peak Times**: When to avoid.

### 2️⃣ Map & Directions
- Integrated **OpenStreetMap** (via Leaflet).
- Automatically focuses on the area you are discussing.
- Shows precise location pins.

### 3️⃣ Festival Awareness Mode
- The agent knows if it's **Diwali** or **Holi**.
- Responds with specific warnings (e.g., "Mithai shops are full", "Traffic blocked").

## 🛠️ Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS + Custom 3D CSS
- **Maps**: Leaflet.js
- **Logic**: Custom Markdown Parser (Agent Steering)

## 📥 How to Run

1.  **Clone & Install**
    ```bash
    npm install
    ```

2.  **Start Dev Server**
    ```bash
    npm run dev
    ```

3.  **Open in Browser**
    Visit `http://localhost:3000` (or the port shown in terminal).

## 📸 Screenshots & Proof
 *(Screenshots will be saved in the `screenshots/` folder)*
- **Area Guide**: Shows the 3D card layout.
- **Map View**: Shows the integrated map.
- **Slang**: Shows popup translations.

---
*Built with ❤️ for Kiro Heroes*