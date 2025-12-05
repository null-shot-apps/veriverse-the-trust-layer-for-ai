'use client';

import { useState } from 'react';
import Link from 'next/link';

// Extended mock agent data
const allAgents = [
  {
    id: 'gpt-4',
    name: 'GPT-4 Turbo',
    description: 'Advanced reasoning and analysis with superior performance on complex tasks',
    provider: 'OpenAI',
    reputation: 4.8,
    verifications: 1247,
    category: 'General',
    specialties: ['Reasoning', 'Analysis', 'Writing'],
    lastActive: '2 minutes ago',
    trustScore: 98
  },
  {
    id: 'claude-3',
    name: 'Claude 3 Sonnet',
    description: 'Thoughtful and nuanced responses with strong ethical reasoning',
    provider: 'Anthropic',
    reputation: 4.9,
    verifications: 892,
    category: 'General',
    specialties: ['Ethics', 'Research', 'Creative Writing'],
    lastActive: '5 minutes ago',
    trustScore: 99
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Multimodal understanding with vision and text capabilities',
    provider: 'Google',
    reputation: 4.7,
    verifications: 634,
    category: 'Multimodal',
    specialties: ['Vision', 'Multimodal', 'Code'],
    lastActive: '1 hour ago',
    trustScore: 95
  },
  {
    id: 'code-specialist',
    name: 'CodeMaster Pro',
    description: 'Specialized in software development and code analysis',
    provider: 'Independent',
    reputation: 4.6,
    verifications: 423,
    category: 'Development',
    specialties: ['Programming', 'Debugging', 'Architecture'],
    lastActive: '30 minutes ago',
    trustScore: 92
  },
  {
    id: 'data-analyst',
    name: 'DataViz Expert',
    description: 'Advanced data analysis and visualization capabilities',
    provider: 'Independent',
    reputation: 4.5,
    verifications: 312,
    category: 'Analytics',
    specialties: ['Data Analysis', 'Statistics', 'Visualization'],
    lastActive: '15 minutes ago',
    trustScore: 89
  },
  {
    id: 'research-bot',
    name: 'Research Assistant',
    description: 'Comprehensive research and fact-checking capabilities',
    provider: 'Academic',
    reputation: 4.7,
    verifications: 567,
    category: 'Research',
    specialties: ['Research', 'Fact-checking', 'Citations'],
    lastActive: '10 minutes ago',
    trustScore: 94
  }
];

const categories = ['All', 'General', 'Development', 'Analytics', 'Research', 'Multimodal'];

export default function AgentDirectory() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = allAgents.filter(agent => {
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                VeriVerse
              </h1>
              <span className="text-gray-400">/</span>
              <span className="text-xl text-gray-300">Agent Directory</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-blue-400 hover:text-blue-300">
                ← Back to Runner
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search agents by name, description, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer"
            >
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{agent.name}</h3>
                  <p className="text-sm text-gray-400">{agent.provider}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium">{agent.reputation}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Trust: {agent.trustScore}%
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {agent.description}
              </p>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {agent.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{agent.verifications} verifications</span>
                <span>Active {agent.lastActive}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/?agent=${agent.id}`}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Run Agent
                </Link>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg text-sm transition-colors">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No agents found</div>
            <p className="text-gray-500 text-sm">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
