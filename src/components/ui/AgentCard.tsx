// src/components/ui/AgentCard.tsx
import React from "react";
import { Button } from "./Button";

interface AgentCardProps {
  id: string;
  name: string;
  description: string;
  isDisabled?: boolean;
  onConnect?: () => void;
}

export const AgentCard = React.memo(
  ({ name, description, isDisabled, onConnect }: AgentCardProps) => {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:shadow-purple-500/10">
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-space-blue to-space-purple bg-clip-text text-transparent">
            {name}
          </h3>
          <p className="text-gray-300 mt-4">{description}</p>
          <div className="mt-auto pt-4 flex justify-end">
            <Button
              onClick={onConnect}
              variant="primary"
              withGlow
              disabled={isDisabled}
              className={`${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isDisabled ? "Coming Soon" : "Connect"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

AgentCard.displayName = "AgentCard";

export default AgentCard;
