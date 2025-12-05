'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock AI agents for the platform
const availableAgents = [
  {
    id: 'gpt-4',
    name: 'GPT-4 Turbo',
    description: 'Advanced reasoning and analysis',
    provider: 'OpenAI',
    reputation: 4.8,
    verifications: 1247
  },
  {
    id: 'claude-3',
    name: 'Claude 3 Sonnet',
    description: 'Thoughtful and nuanced responses',
    provider: 'Anthropic',
    reputation: 4.9,
    verifications: 892
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Multimodal understanding',
    provider: 'Google',
    reputation: 4.7,
    verifications: 634
  }
];

export default function VeriVerse() {
  const [selectedAgent, setSelectedAgent] = useState(availableAgents[0]);
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{
    output: string;
    explanation: string[];
    signature: string;
    timestamp: string;
    verificationStatus: string;
  } | null>(null);

  const runAgent = async () => {
    if (!input.trim()) return;
    
    setIsRunning(true);
    
    // Simulate agent execution
    setTimeout(() => {
      const mockResult = {
        output: `Based on your input "${input}", I've analyzed the content and generated a comprehensive response. This demonstrates the agent's capability to process and understand complex queries.`,
        explanation: [
          'Analyzed the input text for key concepts and context',
          'Applied natural language processing techniques',
          'Generated a structured response based on training data',
          'Verified output quality and coherence'
        ],
        signature: '0x7a8b9c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d9e0f',
        timestamp: new Date().toISOString(),
        verificationStatus: 'pending'
      };
      
      setResult(mockResult);
      setIsRunning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                VeriVerse
              </h1>
              <p className="text-sm text-gray-400">The Global Trust Layer for AI Agents</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/workflows" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                Workflows
              </Link>
              <Link href="/agents" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Agent Directory
              </Link>
              <div className="text-sm text-gray-400">
                <span className="text-green-400">●</span> Network Active
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Agent Selection Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4">Select AI Agent</h2>
              <div className="space-y-3">
                {availableAgents.map((agent) => (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedAgent.id === agent.id
                        ? 'border-blue-400 bg-blue-400/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{agent.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm">{agent.reputation}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{agent.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{agent.provider}</span>
                      <span>{agent.verifications} verifications</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Runner Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4">Agent Runner</h2>
              
              {/* Input Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Task Input</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe the task you want the AI agent to perform..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                />
              </div>

              {/* Run Button */}
              <button
                onClick={runAgent}
                disabled={isRunning || !input.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Running {selectedAgent.name}...
                  </div>
                ) : (
                  `Run ${selectedAgent.name}`
                )}
              </button>

              {/* Results Section */}
              {result && (
                <div className="mt-8 space-y-6">
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-lg font-semibold mb-3">Agent Output</h3>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-gray-200">{result.output}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Explanation</h3>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <ul className="space-y-2">
                        {result.explanation.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span className="text-gray-200">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Verification Details</h3>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Cryptographic Signature:</span>
                        <span className="text-xs font-mono text-blue-400">{result.signature.slice(0, 20)}...</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Timestamp:</span>
                        <span className="text-sm text-gray-300">{new Date(result.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Verification Status:</span>
                        <span className="text-yellow-400 capitalize">{result.verificationStatus}</span>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
                          View on Distributed Storage →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




