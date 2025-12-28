import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import FloatingCard from './components/FloatingCard';
import InsightBlock from './components/InsightBlock';
import MetroStrip from './components/MetroStrip';
import ChatInput from './components/ChatInput';
import { DelhiLocalAI } from './utils/aiAgent';
import { ContextLoader } from './utils/contextLoader';

function App() {
  const [selectedArea, setSelectedArea] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allAreas, setAllAreas] = useState([]);
  const [aiAgent, setAiAgent] = useState(null);
  const [viewMode, setViewMode] = useState('hero'); // 'hero' | 'detail'

  useEffect(() => {
    const initializeApp = async () => {
      const agent = new DelhiLocalAI();
      const contextLoader = new ContextLoader();
      await new Promise(resolve => setTimeout(resolve, 200));
      setAiAgent(agent);
      setAllAreas(contextLoader.getAllAreas());
    };

    initializeApp();
  }, []);

  const handleQuery = async (query) => {
    console.log("Submit Query:", query); // DEBUG
    if (!aiAgent) {
      console.error("AI Agent not initialized");
      return;
    }
    setIsLoading(true);
    setViewMode('detail');

    // Artificial Thinking Delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      const result = await aiAgent.processQuery(query, selectedArea);
      console.log("AI Response Received:", result); // DEBUG
      setResponse(result);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAreaSelect = (areaName) => {
    setSelectedArea(areaName);
    handleQuery(`How is ${areaName} right now?`);
  };

  const resetView = () => {
    setViewMode('hero');
    setResponse(null);
    setSelectedArea('');
  }

  return (
    <div className="min-h-screen relative font-outfit selection:bg-indigo-100 selection:text-indigo-900">

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-20 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 h-full flex flex-col">

        {/* Navigation / Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="text-2xl font-extrabold cursor-pointer z-50" onClick={resetView}>
            Delhi<span className="text-indigo-600">.AI</span>
          </div>
          {viewMode === 'detail' && (
            <button onClick={resetView} className="px-4 py-2 rounded-full glass text-sm font-bold text-gray-600 hover:bg-white transition-all">
              ← Back to Map
            </button>
          )}
        </div>

        {/* --- VIEW: HERO LANDING --- */}
        {viewMode === 'hero' && (
          <div className="flex-1 flex flex-col justify-center items-center animate-enter">

            {/* Hero Text */}
            <div className="text-center mb-16 relative z-10 w-full max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-4 leading-tight">
                Delhi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-indigo-600">Explained.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto">
                Crowds. Food. Metro. Festivals.
                <br />
                <span className="text-indigo-500 text-lg">Experience the city like a local.</span>
              </p>

              {/* Central Search */}
              <div className="mt-10 max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
                <ChatInput onSubmit={handleQuery} isLoading={isLoading} placeholder="Ask about routes, slang, or vibes..." />
              </div>
            </div>

            {/* Floating City Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
              {allAreas.slice(0, 4).map((area, index) => (
                <FloatingCard
                  key={area}
                  index={index}
                  name={area}
                  contextInfo={aiAgent?.contextLoader?.getAreaInfo(area)}
                  onClick={() => handleAreaSelect(area)}
                />
              ))}
              <FloatingCard
                index={5}
                name="South Campus"
                contextInfo={aiAgent?.contextLoader?.getAreaInfo("South Campus")}
                onClick={() => handleAreaSelect("South Campus")}
              />
            </div>
          </div>
        )}


        {/* --- VIEW: DETAIL EXPERIENCE --- */}
        {viewMode === 'detail' && (
          <div className="flex-1 w-full max-w-5xl mx-auto animate-enter">

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-gray-400 font-medium animate-pulse">Consulting Local Sources...</p>
              </div>
            )}

            {!isLoading && response && (
              <div className="space-y-8">

                {/* 1. Header Section */}
                <div className="text-center mb-10">
                  <span className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs tracking-wider uppercase mb-4 inline-block">
                    {response.type === 'metro' ? 'Metro Guide' : 'Live Area Context'}
                  </span>
                  <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-2">
                    {response.area || (response.type === 'metro' ? 'Route Found' : response.festival || 'Delhi Guide')}
                  </h2>
                  <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    {response.greeting || "Here is what you need to know."}
                  </p>
                </div>

                {/* 2. Metro Visual (If Metro Query) */}
                {response.type === 'metro' && (
                  <div className="mb-8">
                    <MetroStrip
                      source={response.source}
                      destination={response.destination}
                    />
                    <div className="mt-4 glass-card p-6 rounded-3xl text-center">
                      <p className="text-lg text-gray-700">{response.response}</p>
                    </div>
                  </div>
                )}

                {/* 2.5 Text Response (Slang / Food / General) */}
                {response.type !== 'area' && response.type !== 'metro' && (
                  <div className="glass-card p-8 rounded-3xl text-center shadow-lg transform transition-all hover:scale-[1.01]">
                    <div className="text-2xl font-serif-accent text-gray-800 leading-relaxed whitespace-pre-line">
                      {response.response}
                    </div>
                    {response.meaning && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Literal Meaning</span>
                        <p className="text-gray-600 mt-1">{response.meaning}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. The "3 Blocks" Layout (Area/General) */}
                {response.type === 'area' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-64">
                    {/* Column 1: Crowd */}
                    <InsightBlock
                      title="Crowd Vibe"
                      icon="🧍"
                      content={response.crowdVibe}
                      delay={0}
                      color="bg-blue-500"
                    />
                    {/* Column 2: Food */}
                    <InsightBlock
                      title="Food Mood"
                      icon="🍽️"
                      content={response.foodMood}
                      delay={100}
                      color="bg-orange-500"
                    />
                    {/* Column 3: Move */}
                    <InsightBlock
                      title="Traffic & Move"
                      icon="🚇"
                      content={response.travelTips}
                      delay={200}
                      color="bg-green-500"
                    />
                  </div>
                )}

                {/* 4. Map Reveal (Bottom Sheet Style) */}
                {(response.coordinates || response.type === 'metro') && (
                  <div className="mt-8 glass rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000">
                    <div className="h-64 md:h-80 w-full relative">
                      <MapView
                        coordinates={response.coordinates || [28.6139, 77.2090] /* Default to Delhi */}
                        areaName={response.area || "Delhi"}
                      />
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold shadow-lg z-[1000]">
                        Live Map View
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat Again */}
                <div className="mt-12 max-w-2xl mx-auto">
                  <ChatInput onSubmit={handleQuery} isLoading={isLoading} placeholder="Ask follow up..." />
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;