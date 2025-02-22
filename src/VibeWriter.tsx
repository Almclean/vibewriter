import { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { Palette } from 'lucide-react';
import { generateVibeText } from '@/services/ai';
import Buymeacoffee from '@/CoffeeButton';

const GRADIENTS = [
  { name: 'Classic Synthwave', from: 'from-purple-900', via: 'via-pink-800', to: 'to-purple-900', text: 'from-pink-500 via-purple-400 to-pink-500' },
  { name: 'Ocean Dream', from: 'from-blue-900', via: 'via-cyan-800', to: 'to-blue-900', text: 'from-cyan-500 via-blue-400 to-cyan-500' },
  { name: 'Neon Sunset', from: 'from-orange-900', via: 'via-pink-800', to: 'to-red-900', text: 'from-yellow-500 via-orange-400 to-red-500' },
  { name: 'Cyber Green', from: 'from-green-900', via: 'via-emerald-800', to: 'to-green-900', text: 'from-emerald-500 via-green-400 to-emerald-500' },
];

const VibeWriter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [currentGradient, setCurrentGradient] = useState(0);
  const [showPalette, setShowPalette] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const gradient = GRADIENTS[currentGradient];

  const generateText = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    setError('');

    try {
      const generatedText = await generateVibeText(inputText);
      setOutputText(generatedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-generate when input changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputText.trim()) {
        generateText();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [inputText]);

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br ${gradient.from} ${gradient.via} ${gradient.to} p-4 md:p-6 transition-colors duration-700 overflow-x-hidden`}>
        <div className="max-w-7xl mx-auto relative">
          {/* Enhanced Header */}
          <div className="text-center mb-6 md:mb-8 relative py-8 md:py-12">
            <div className="relative inline-block">
              {/* Triple-layered glow effect */}
              <div className={`absolute -inset-4 blur-3xl bg-gradient-to-r ${gradient.text} opacity-20`} />
              <div className={`absolute -inset-2 blur-2xl bg-gradient-to-r ${gradient.text} opacity-30 animate-pulse`} />
              <div className={`absolute -inset-1 blur-xl bg-gradient-to-r ${gradient.text} opacity-40`} />

              {/* Main title with Orbitron font */}
              <h1 className={`font-['Orbitron'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient.text} mb-2 relative tracking-wider`}>
                VIBE<span className="font-light">WRITER</span>
              </h1>

              {/* Enhanced scanlines effect */}
              <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                  backgroundSize: '100% 4px'
                }}
              />
            </div>

            {/* Enhanced subtitle section */}
            <div className="relative mt-6 md:mt-8">
              <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-widest text-pink-200">
                <span className="text-pink-400 animate-pulse">✧</span>
                <span className="px-4 font-['Orbitron'] uppercase text-sm md:text-base lg:text-lg">Transform your thoughts into flowing prose</span>
                <span className="text-pink-400 animate-pulse">✧</span>
              </p>

              {/* Decorative lines with enhanced glow */}
              <div className="relative mt-6 space-y-1.5">
                <div className={`h-px bg-gradient-to-r from-transparent ${gradient.via} to-transparent opacity-80`} />
                <div className={`h-px bg-gradient-to-r from-transparent ${gradient.to} to-transparent opacity-60`} />
                <div className={`absolute inset-0 blur-sm bg-gradient-to-r ${gradient.text} opacity-30`} />
              </div>
            </div>
          </div>

          {/* Gradient Picker */}
          <div className="fixed md:absolute top-2 right-2 sm:top-4 sm:right-4 z-50">
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="p-2 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors"
            >
              <Palette className="w-6 h-6 text-white" />
            </button>
            {showPalette && (
              <Card className="absolute right-0 mt-2 p-2 bg-white/10 backdrop-blur-lg border-none shadow-xl">
                <div className="flex flex-col gap-2">
                  {GRADIENTS.map((g, index) => (
                    <button
                      key={g.name}
                      onClick={() => {
                        setCurrentGradient(index);
                        setShowPalette(false);
                      }}
                      className={`w-full px-4 py-2 rounded-lg text-left text-white hover:bg-white/10 transition-colors ${currentGradient === index ? 'bg-white/20' : ''
                        }`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 min-h-[50vh] lg:min-h-[60vh]">
            {/* Input Panel */}
            <Card className="w-full lg:w-1/2 bg-white/10 backdrop-blur-lg border-pink-500/20 shadow-xl shadow-purple-900/30">
              <div className="h-full p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-pink-300 mb-4">Your Thoughts</h2>
                <textarea
                  className="w-full h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)] bg-transparent text-pink-100 placeholder-pink-300/50 border-0 focus:ring-2 focus:ring-pink-500/30 rounded-lg p-2 sm:p-4 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your stream of consciousness..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isGenerating}
                />
              </div>
            </Card>

            {/* Output Panel */}
            <Card className="w-full lg:w-1/2 bg-white/10 backdrop-blur-lg border-purple-500/20 shadow-xl shadow-purple-900/30">
              <div className="h-full p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-purple-300 mb-4">Composed Text</h2>
                <div className="h-[calc(100%-4rem)] overflow-auto p-4 text-purple-100">
                  {isGenerating ? (
                    <div className="flex items-center justify-center h-full space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-300"></div>
                      <span className="text-purple-300">Generating vibe...</span>
                    </div>
                  ) : error ? (
                    <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">
                      <p className="font-semibold mb-1">Error</p>
                      <p>{error}</p>
                    </div>
                  ) : (
                    outputText || (
                      <span className="text-purple-300/50 italic">
                        Your composed text will appear here...
                      </span>
                    )
                  )}
                </div>
              </div>
            </Card>
          </div>
          <Buymeacoffee />
          {/* Privacy Disclaimer */}
          <div className="mt-8 text-center mb-4">
            <Card className="inline-block bg-white/5 backdrop-blur-sm border-purple-500/10 shadow-sm max-w-[90vw] mx-auto">
              <div className="p-4 max-w-2xl mx-auto">
                <p className="text-sm text-purple-200/70 leading-relaxed">
                  <span className="font-semibold text-pink-200">Privacy Notice:</span> VibeWriter processes all text transformations in real-time using Anthropic's Claude API and does not store any user data or content. Your thoughts remain private and are discarded immediately after processing. All AI interactions are governed by{' '}
                  <a
                    href="https://www.anthropic.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-300 hover:text-pink-200 underline decoration-pink-500/30 hover:decoration-pink-500/50 transition-colors"
                  >
                    Anthropic's Privacy Policy
                  </a>
                  . We maintain a strict no-logging, no-tracking policy to ensure your creative process stays completely confidential.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default VibeWriter;