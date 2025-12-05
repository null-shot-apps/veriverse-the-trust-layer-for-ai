'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock workflow templates
const workflowTemplates = [
  {
    id: 'research-analysis',
    name: 'Research & Analysis',
    description: 'Research a topic, analyze findings, and generate a comprehensive report',
    steps: [
      { agent: 'Research Assistant', task: 'Gather information on the topic' },
      { agent: 'GPT-4 Turbo', task: 'Analyze and synthesize findings' },
      { agent: 'DataViz Expert', task: 'Create visualizations if applicable' }
    ]
  },
  {
    id: 'code-review',
    name: 'Code Review & Optimization',
    description: 'Review code, identify issues, and suggest optimizations',
    steps: [
      { agent: 'CodeMaster Pro', task: 'Review code for bugs and issues' },
      { agent: 'GPT-4 Turbo', task: 'Suggest architectural improvements' },
      { agent: 'CodeMaster Pro', task: 'Generate optimized code' }
    ]
  },
  {
    id: 'content-creation',
    name: 'Content Creation Pipeline',
    description: 'Research, write, and refine content with multiple perspectives',
    steps: [
      { agent: 'Research Assistant', task: 'Research topic and gather sources' },
      { agent: 'Claude 3 Sonnet', task: 'Write initial draft' },
      { agent: 'GPT-4 Turbo', task: 'Review and refine content' }
    ]
  }
];

interface WorkflowStep {
  id: string;
  agentId: string;
  agentName: string;
  task: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  output?: string;
  signature?: string;
}

export default function WorkflowComposer() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customWorkflow, setCustomWorkflow] = useState<WorkflowStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const availableAgents = [
    { id: 'gpt-4', name: 'GPT-4 Turbo' },
    { id: 'claude-3', name: 'Claude 3 Sonnet' },
    { id: 'gemini-pro', name: 'Gemini Pro' },
    { id: 'code-specialist', name: 'CodeMaster Pro' },
    { id: 'data-analyst', name: 'DataViz Expert' },
    { id: 'research-bot', name: 'Research Assistant' }
  ];

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      agentId: availableAgents[0].id,
      agentName: availableAgents[0].name,
      task: '',
      status: 'pending'
    };
    setCustomWorkflow([...customWorkflow, newStep]);
  };

  const updateStep = (stepId: string, field: string, value: string) => {
    setCustomWorkflow(customWorkflow.map(step => {
      if (step.id === stepId) {
        const updatedStep = { ...step, [field]: value };
        if (field === 'agentId') {
          const agent = availableAgents.find(a => a.id === value);
          updatedStep.agentName = agent?.name || '';
        }
        return updatedStep;
      }
      return step;
    }));
  };

  const removeStep = (stepId: string) => {
    setCustomWorkflow(customWorkflow.filter(step => step.id !== stepId));
  };

  const runWorkflow = async () => {
    if (customWorkflow.length === 0) return;
    
    setIsRunning(true);
    setCurrentStep(0);

    // Simulate workflow execution
    for (let i = 0; i < customWorkflow.length; i++) {
      setCurrentStep(i);
      
      // Update step status to running
      setCustomWorkflow(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'running' } : step
      ));

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update step status to completed with mock output
      setCustomWorkflow(prev => prev.map((step, index) => 
        index === i ? { 
          ...step, 
          status: 'completed',
          output: `Step ${i + 1} completed successfully. Agent ${step.agentName} has processed: "${step.task}"`,
          signature: `0x${Math.random().toString(16).substr(2, 40)}`
        } : step
      ));
    }

    setIsRunning(false);
  };

  const loadTemplate = (template) => {
    const workflowSteps = template.steps.map((step, index) => ({
      id: `template-${index}`,
      agentId: availableAgents.find(a => a.name === step.agent)?.id || availableAgents[0].id,
      agentName: step.agent,
      task: step.task,
      status: 'pending' as const
    }));
    setCustomWorkflow(workflowSteps);
    setSelectedTemplate(template);
  };

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
              <span className="text-xl text-gray-300">Workflow Composer</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/agents" className="text-purple-400 hover:text-purple-300">
                Agent Directory
              </Link>
              <Link href="/" className="text-blue-400 hover:text-blue-300">
                ← Back to Runner
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Templates Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4">Workflow Templates</h2>
              <div className="space-y-3">
                {workflowTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => loadTemplate(template)}
                    className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
                  >
                    <h3 className="font-medium mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                    <div className="text-xs text-gray-500">
                      {template.steps.length} steps
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    setCustomWorkflow([]);
                    setSelectedTemplate(null);
                  }}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Start Custom Workflow
                </button>
              </div>
            </div>
          </div>

          {/* Workflow Builder */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {selectedTemplate ? selectedTemplate.name : 'Custom Workflow'}
                </h2>
                <button
                  onClick={addStep}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  + Add Step
                </button>
              </div>

              {/* Workflow Steps */}
              <div className="space-y-4 mb-6">
                {customWorkflow.map((step, index) => (
                  <div
                    key={step.id}
                    className={`border rounded-lg p-4 transition-all ${
                      step.status === 'running' ? 'border-blue-400 bg-blue-400/10' :
                      step.status === 'completed' ? 'border-green-400 bg-green-400/10' :
                      step.status === 'failed' ? 'border-red-400 bg-red-400/10' :
                      'border-white/10 bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      
                      <select
                        value={step.agentId}
                        onChange={(e) => updateStep(step.id, 'agentId', e.target.value)}
                        disabled={isRunning}
                        className="bg-white/10 border border-white/10 rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-blue-400"
                      >
                        {availableAgents.map((agent) => (
                          <option key={agent.id} value={agent.id} className="bg-slate-800">
                            {agent.name}
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center gap-2 ml-auto">
                        {step.status === 'running' && (
                          <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                        )}
                        {step.status === 'completed' && (
                          <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        <button
                          onClick={() => removeStep(step.id)}
                          disabled={isRunning}
                          className="text-red-400 hover:text-red-300 disabled:opacity-50"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={step.task}
                      onChange={(e) => updateStep(step.id, 'task', e.target.value)}
                      placeholder="Describe what this agent should do..."
                      disabled={isRunning}
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 resize-none"
                      rows={2}
                    />

                    {step.output && (
                      <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded">
                        <div className="text-sm text-gray-400 mb-1">Output:</div>
                        <div className="text-sm text-gray-200">{step.output}</div>
                        {step.signature && (
                          <div className="text-xs text-blue-400 mt-2 font-mono">
                            Signature: {step.signature}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Run Workflow Button */}
              {customWorkflow.length > 0 && (
                <button
                  onClick={runWorkflow}
                  disabled={isRunning || customWorkflow.some(step => !step.task.trim())}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:cursor-not-allowed"
                >
                  {isRunning ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Running Step {currentStep + 1} of {customWorkflow.length}
                    </div>
                  ) : (
                    `Run Workflow (${customWorkflow.length} steps)`
                  )}
                </button>
              )}

              {customWorkflow.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="mb-2">No workflow steps defined</p>
                  <p className="text-sm">Add steps or select a template to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
