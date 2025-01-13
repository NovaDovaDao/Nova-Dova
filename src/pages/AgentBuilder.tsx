// src/pages/AgentBuilder.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AgentConfig {
  name: string;
  description: string;
  selectedModels: string[];
  personality: string;
  goals: string[];
  capabilities: string[];
}

const availableModels = [
  { id: "gpt4", name: "GPT-4", description: "Advanced language understanding and generation" },
  { id: "claude", name: "Claude", description: "Specialized in analysis and reasoning" },
  { id: "dalle", name: "DALL-E", description: "Image generation and manipulation" },
  { id: "flux", name: "Flux", description: "Market analysis and prediction" },
];

const defaultGoals = [
  "Monitor market trends",
  "Generate trading signals",
  "Analyze sentiment",
  "Create content",
  "Research competitors",
];

const defaultCapabilities = [
  "Market Analysis",
  "Content Generation",
  "Data Processing",
  "Pattern Recognition",
  "Real-time Monitoring",
];

// const initialConfig: AgentConfig = {
//   name: "",
//   description: "",
//   selectedModels: [],
//   personality: "",
//   goals: [],
//   capabilities: [],
// };

export default function AgentBuilder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [personality, setPersonality] = useState("");
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [capabilities, setCapabilities] = useState<string[]>([]);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    const config: AgentConfig = {
      name,
      description,
      personality,
      selectedModels,
      goals,
      capabilities
    };
    console.log('Submitting config:', config);
    navigate("/dashboard");
  };

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleGoalToggle = (goal: string) => {
    setGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleCapabilityToggle = (capability: string) => {
    setCapabilities(prev =>
      prev.includes(capability)
        ? prev.filter(c => c !== capability)
        : [...prev, capability]
    );
  };

  const BasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="agentName" className="block text-sm font-medium text-gray-300 mb-2">
          Agent Name
        </label>
        <input
          id="agentName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-900/50 text-gray-300 rounded-xl px-4 py-3 
                   border border-gray-700 focus:border-purple-500 focus:ring-1 
                   focus:ring-purple-500 transition-all duration-300"
          placeholder="e.g., Trading Assistant Alpha"
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-900/50 text-gray-300 rounded-xl px-4 py-3 
                   border border-gray-700 focus:border-purple-500 focus:ring-1 
                   focus:ring-purple-500 transition-all duration-300 min-h-[100px]"
          placeholder="Describe your agent's primary purpose..."
        />
      </div>

      <div>
        <label htmlFor="personality" className="block text-sm font-medium text-gray-300 mb-2">
          Personality
        </label>
        <textarea
          id="personality"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="w-full bg-gray-900/50 text-gray-300 rounded-xl px-4 py-3 
                   border border-gray-700 focus:border-purple-500 focus:ring-1 
                   focus:ring-purple-500 transition-all duration-300 min-h-[100px]"
          placeholder="Describe your agent's personality traits..."
        />
      </div>
    </div>
  );

  const ModelSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {availableModels.map(model => (
        <div
          key={model.id}
          onClick={() => handleModelToggle(model.id)}
          className={`p-4 rounded-xl border cursor-pointer transition-all duration-300
                    ${selectedModels.includes(model.id)
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-700 bg-gray-800/50 hover:border-gray-600"}`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-200">{model.name}</h3>
            <div
              className={`w-5 h-5 rounded-full border-2 transition-colors duration-300
                       ${selectedModels.includes(model.id)
                         ? "border-purple-500 bg-purple-500"
                         : "border-gray-600"}`}
            />
          </div>
          <p className="mt-2 text-sm text-gray-400">{model.description}</p>
        </div>
      ))}
    </div>
  );

  const Capabilities = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4">Goals</h3>
        <div className="flex flex-wrap gap-2">
          {defaultGoals.map(goal => (
            <button
              key={goal}
              onClick={() => handleGoalToggle(goal)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300
                       ${goals.includes(goal)
                         ? "bg-purple-500 text-white"
                         : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4">Capabilities</h3>
        <div className="flex flex-wrap gap-2">
          {defaultCapabilities.map(capability => (
            <button
              key={capability}
              onClick={() => handleCapabilityToggle(capability)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300
                       ${capabilities.includes(capability)
                         ? "bg-purple-500 text-white"
                         : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
            >
              {capability}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="backdrop-blur-xl bg-gradient-to-r from-gray-900/60 via-gray-800/60 to-gray-900/60 border-b border-white/10">
        <div className="px-4 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Create AI Agent
            </h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 
                       border border-gray-700 hover:border-purple-500 
                       transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex items-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                         transition-all duration-300 ${
                           step === currentStep
                             ? "bg-purple-500 text-white"
                             : step < currentStep
                             ? "bg-green-500 text-white"
                             : "bg-gray-700 text-gray-400"
                         }`}
              >
                {step < currentStep ? "✓" : step}
              </div>
              {step < 3 && (
                <div
                  className={`w-full h-1 mx-2 transition-all duration-300 ${
                    step < currentStep ? "bg-green-500" : "bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          {currentStep === 1 && <BasicInfo />}
          {currentStep === 2 && <ModelSelection />}
          {currentStep === 3 && <Capabilities />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className={`px-6 py-2 rounded-lg border border-gray-700 
                     text-gray-300 transition-all duration-300 
                     ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : "hover:border-purple-500"}`}
            disabled={currentStep === 1}
          >
            Back
          </button>
          
          <button
            onClick={currentStep === 3 ? handleSubmit : handleNext}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-space-blue 
                     to-space-purple text-white hover:opacity-90 
                     transition-all duration-300"
          >
            {currentStep === 3 ? "Create Agent" : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
}