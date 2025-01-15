// src/pages/Chat.tsx
import { useNavigate, useParams } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { ChatWindow } from "../components/chat/ChatWindow";

export default function Chat() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { logout } = usePrivy();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleCreateAgent = () => {
    navigate("/agent-builder");
  };

  return (
    <div className="min-h-screen">
      {/* Header - Matching Dashboard Style */}
      <header className="backdrop-blur-xl bg-gradient-to-r from-gray-900/60 via-gray-800/60 to-gray-900/60 border-b border-white/10">
        <div className="px-4 lg:px-8 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4 lg:mb-0">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <h2 className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                  AI Agent Chat
                </h2>
                <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-space-blue via-purple-500 to-space-purple transition-all duration-300"></div>
              </div>
            </div>
            <div className="flex gap-4">
              {/* Dashboard Button */}
              <button
                onClick={handleDashboard}
                className="chat-btn group relative items-center px-4 sm:px-6 py-2 sm:py-3 overflow-hidden rounded-lg bg-gradient-to-r from-space-purple to-space-blue transition-all duration-300 ease-out hover:scale-[1.02]"
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)]"></div>
                <span className="relative font-medium text-sm sm:text-base text-white">
                  Dashboard
                </span>
              </button>

              {/* Create Agent Button */}
              <button
                onClick={handleCreateAgent}
                disabled={true}
                className="create-agent-btn group relative items-center px-4 sm:px-6 py-2 sm:py-3 overflow-hidden rounded-lg bg-gradient-to-r from-space-blue to-space-purple transition-all duration-300 ease-out hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" // Add disabled styles
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)]"></div>
                <span className="relative font-medium text-sm sm:text-base text-white">
                  Create Agent
                </span>
              </button>


              {/* Disconnect Button */}
              <button
                onClick={logout}
                className="wallet-btn flex items-center gap-3 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
              >
                <span className="text-sm text-gray-300">Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid Layout for Chat Window and Info Panel */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Chat Window - Takes up more space */}
            <div className="xl:col-span-2">
              <ChatWindow
                agentName={agentId ? `Agent ${agentId}` : "Nova Assistant"}
                status="inactive"
                onActivate={() => console.log("Activating agent...")}
              />
            </div>

            {/* Info Panel - Similar to Dashboard cards */}
            <div className="space-y-6">
              {/* Agent Info Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-space-blue to-space-purple bg-clip-text text-transparent mb-4">
                  Agent Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400">
                      Status
                    </h4>
                    <p className="text-gray-300 mt-1">Ready to initialize</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400">
                      Models
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 text-xs bg-gray-700 rounded-full text-gray-300">
                        GPT-4
                      </span>
                      <span className="px-2 py-1 text-xs bg-gray-700 rounded-full text-gray-300">
                        Claude
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat History Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-space-blue to-space-purple bg-clip-text text-transparent mb-4">
                  Recent Chats
                </h3>
                <div className="space-y-3">
                  <div className="text-gray-400 text-sm">
                    No recent conversations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
